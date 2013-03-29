<?php

class CommentController extends Zend_Controller_Action
{

 public function init()
	    {		
	      	$storage 	= new Zend_Auth_Storage_Session();	      	
	      	$auth        =  Zend_Auth::getInstance();  	
			if($auth->hasIdentity()) 
			{ 				
			$data	  	= $storage->read();	
			 $this->_userid = $data['UserID'];		
			}else{
					$this->_helper->redirector->gotosimple('index','index',true);		
			}
	    }
	
	    public function indexAction()
	    {
	    	$userid = $request->getpost('start',$this->_userid);	
	    	$request = $this->getRequest();	    	
	    	$start = $request->getpost('start',0);
	    	$end = $request->getpost('end',5);
	    	$mycomment= new Application_Model_Comment();	    	
	    			$this->view->dbeecomment = $mycomment->index($start,$end,$userid);	    			
	    			$this->view->startnew = $start+5;	
	    			$this->view->end = $start+5;
	    	$response = $this->_helper->layout->disableLayout();
			return $response;
	    }    
	    
	public function insertdataAction() {
		$SubmitMsg=0;
		$userid = $this->_userid;
		$request = $this->getRequest();		
		$db=intval($request->getpost('db'));
		$replytype=stripcslashes($request->getpost('replytype'));
		$comment=stripslashes(strip_tags($request->getpost('comment','')));
		$link=stripslashes(strip_tags($request->getpost('url','')));
		$linktitle=stripslashes(strip_tags($request->getpost('linktitle','')));
		$linkdesc=stripslashes(strip_tags($request->getpost('linkdesc','')));
		$userlinkdesc=stripslashes(strip_tags($request->getpost('userlinkdesc','')));
		$pic=stripslashes(strip_tags($request->getpost('pic','')));
		$picdesc=stripslashes(strip_tags($request->getpost('picdesc','')));
		$vid=stripslashes(strip_tags($request->getpost('vid','')));
		$viddesc=stripslashes(strip_tags($request->getpost('viddesc','')));
		$videosite=stripslashes(strip_tags($request->getpost('videosite','')));
		$videoid=stripslashes(strip_tags($request->getpost('videoid','')));
		$audio=stripslashes($request->getpost('audio',''));
		$twittercomment=stripslashes($request->getpost('twittercomment',''));
		$twittercomment=str_replace('&','%26',$twittercomment);	
		
		$twittercomment=str_replace("<div style='float:right;'><a href='javascript:void(0);' onclick='javascript:removetweetfromnewcomment();'>remove</a></div>","",$twittercomment);
		
		if($userlinkdesc=='write something about this link...') $userlinkdesc='';
		if($picdesc=='write something about this picture...') $picdesc='';
		if($viddesc=='write something about this media...') $viddesc='';
		if($vid=='paste YouTube link here') $vid='';
		if($audio=='paste SoundCloud embed code here') $audio='';
		
		$myhometable= new Application_Model_Myhome();
		$dbeeRow=$myhometable->getall($db);
		$dbeeOwner=$dbeeRow['User'];
		$link='';
		$linktitle='';
				
		if($replytype=='text') $Type=1;
		if($replytype=='link') $Type=2;
		if($replytype=='pix') $Type=3;
		if($replytype=='vidz') $Type=4;
		
		if(isset($_COOKIE['user'])) $user=$_COOKIE['user'];
		else $user='-1';		
		if(isset($_COOKIE['gptn'])) $gptn=$_COOKIE['gptn'];
		else $gptn='';		
			$CommentDate=date('Y-m-d H:i:s');
			$commenttable = new Application_Model_Comment();
			$NotifyEmail = $commenttable->getnotifyemail($db,$userid);
			if(!$NotifyEmail)			
				$NotifyEmail=1;
			$data = array(
				    'DbeeID'      => $db,
				    'DbeeOwner' => $dbeeOwner,
				    'UserID'      => $user,
					'Type'      => $Type,
					'Comment' => $comment,
					'Link'      => $link,
					'LinkTitle' => $linktitle,
					'LinkDesc'      => $linkdesc,
					'UserLinkDesc' => $userlinkdesc,
					'Pic'      => $pic,
					'PicDesc' => $picdesc,
					'Vid'      => $vid,
					'VidDesc' => $viddesc,
					'VidSite'      => $videosite,
					'VidID' => $videoid,
					'Audio'      => $audio,
					'TwitterComment' => $twittercomment,
					'TwitterGPName' => $gptn,
					'CommentDate'      => $CommentDate,
					'NotifyEmail' => $NotifyEmail					
				);				
			if($commenttable->insertcomment($data)) {
				setcookie('currloginlastseencomments', $CommentDate);
				$SubmitMsg=1;
				// UPDATE LAST ACTIVITY TIME AND TOTAL COMMENTS FOR THE DBEE
				$newcomment = $myhometable->getcomment + 1;
				$data = array(
						'Comments'      => $newcomment,
						'LastActivity' => $CommentDate,
						'UserID'      => $user,
				);		
				// SEND MAIL TO DB OWNER INFORMING OF A NEW COMMENT
				$OwnerRow = $commenttable->getuserdata($dbeeOwner);
				$UserRow = $commenttable->getuserdata($user);				
			
				$MailBody='<div style="padding-bottom:5px; border-bottom:1px solid #CCC;"><a href="http://dbee.me" target="_blank"><img src="http://dbee.me/images/logo-emails.png" border="0"></a></div><div style="clear:both"></div><div style="margin-top:10px; margin-bottom:10px;"><div style="float:left; width:80px;"><img src="http://dbee.me/show_thumbnails.php?ImgName='.$UserRow->ProfilePic.'&ImgLoc=userpics&Width=60&Height=60" border="0" /></div><div style="float:left; width:600px;"><font size="2" face="Arial, Helvetica, sans-serif">'.$UserRow->Name.' has commented on db <a href="http://dbee.me/profile.php?db='.$db.'">';
		
				// BUILD DB TEXT
				if($dbeeRow['Type']=='1') $dbeeText=$dbeeRow['Text'];
				elseif($dbeeRow['Type']=='2') $dbeeText=($dbeeRow['LinkDesc']!='') ? $dbeeRow['LinkDesc'] : $dbeeRow['LinkTitle'];
				elseif($dbeeRow['Type']=='3') $dbeeText=($dbeeRow['PicDesc']!='') ? $dbeeRow['PicDesc'] : '<img src="http://dbee.me/show_thumbnails.php?ImgName='.$dbeeRow['Pic'].'&ImgLoc=imageposts&Width=30&Height=30" border="0" />';
				elseif($dbeeRow['Type']=='4') $dbeeText=$dbeeRow['VidDesc'];
		
				// BUILD COMMENT TEXT
				if($Type=='1') $commText=$comment;
				elseif($Type=='2') $commText=($linkdesc!='') ? $linkdesc : $linktitle;
				elseif($Type=='3') $commText=($picdesc!='') ? $picdesc : '<img src="http://dbee.me/show_thumbnails.php?ImgName='.$pic.'&ImgLoc=imageposts&Width=50&Height=50" border="0" />';
				elseif($Type=='4') $commText=$viddesc;
		
				$MailBody.='<i><font color="#999999">'.$dbeeText.'</font></i></a><br><br>'.$UserRow->Name.' wrote:<br><font color="#666666">'.str_replace("\\","",$commText).'</font><br><br>The dbee team :-)</div></div><div style="clear:both"></div><div style="width:auto; height:5px; border-bottom:1px solid #CCC;"></div><div style="clear:both"></div><div><font size="1" color="#999">This is an automated email from your dbee account. If you wish to turn off future notifications please edit your settings in your dbee profile.<br /><br />copyright 2012 dbee.me <a href="http://dbee.me" target="_blank">dbee.me</a></font></div>';
		
				$MailFrom='"dbee" <noreply@dbee.me>'; //Give the Mail From Address Here
				$MailReplyTo='noreply@dbee.me';
		
				$MailSubject = "New db comment posted";
		
				$commentuser = $commenttable->getcommentuser($db);
			
				foreach($commentuser as $CommentUsersRow):				
						if(trim($CommentUsersRow['Email'])!=""){
					
					$mail = new Zend_Mail();
					$headers = "MIME-Version: 1.0" . "\r\n";
					$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
					$headers .= 'From: <admin@dbee.com>' . "\r\n";
					$mail->setBodyHtml(html_entity_decode($MailBody));
					$mail->setFrom('<noreply@dbee.me>', 'Dbee');
					$mail->addTo($CommentUsersRow['Email']);
					$mail->setSubject($MailSubject);
					//$chk = $mail->send();
						/* mail($CommentUsersRow->Email,$MailSubject,$MailBody,$MailHeaders,"-finfo@dbee.me"); */															
				}
					endforeach;
		
					// SEND MAIL TO DB OWNER
					if($OwnerRow['UserID']!=$user) {
						$notificationuser = new Application_Model_Notification();
						$ChkOwnerCommentNotification = $notificationuser->getnotificationuser($OwnerRow['UserID']);
						if($notificationuser['Comments']=='1') {
							//				mail($OwnerRow->Email,$MailSubject,$MailBody,$MailHeaders,"-finfo@dbee.me");
						}
					}
					// SEND MAIL TO DB OWNER
				}
			
		
			// SELECT COMMENTS
			$TotalComments=$commenttable->totacomment($db);// CALCUATE TOTAL DBEES IN DATABASE
		
			//
			$excerpt=substr($comment,0,50).'...';
		
			// SEND BACK TOTAL COMMENTS IF GUEST USER FROM TWITTER
			if(isset($_COOKIE['gptn'])) {		
			$totalgpc=	$commenttable ->totalgpc($db,$_COOKIE['gptn']);
			set_cookie('gptc', $totalgpc);
		} else $totalgpc='-1';
		
		echo $SubmitMsg.'~'.$db.'~'.$TotalComments.'~'.$excerpt.'~'.$totalgpc.'~'.$cookieUserBlockedInt;
		
		$response = $this->_helper->layout->disableLayout();
		return $response;
		
	}
	
	public function commentreloadAction(){
		$request = $this->getRequest();
		$data = $request->getParams();		
		$user=$_COOKIE['user'];		
		$myhome= new Application_Model_Myhome();
		$commenttable = new Application_Model_Comment();
		
		$dbeeid = $this->getRequest()->getParam('db');
		$end = $this->getRequest()->getParam('end');
		$start = $this->getRequest()->getParam('start');
		$reload = $this->getRequest()->getParam('reload');
		$order = $this->getRequest()->getParam('sortorder');  
		
				
		$this->view->row = $myhome->getuserdbee($dbeeid);
		$this->view->commentrow = $commenttable->getcommentreload($dbeeid,$start);
		$this->view->commenttotal = $commenttable->getcommenttotal($dbeeid,$start);
		$this->view->startnew = $start+5;
		$this->view->end = $start+5;
		
		$response = $this->_helper->layout->disableLayout();
		return $response;
		
	}
	  
}

