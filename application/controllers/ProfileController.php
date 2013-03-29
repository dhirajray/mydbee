<?php

class ProfileController extends Zend_Controller_Action
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
	
	   public function indexAction(){	   		
	    	$userid = (int)$this->_getParam('id');
	    	if(!$userid){
	    		$userid = $this->_userid;    		
	    	}  	
	    	$profile = new Application_Model_Profile();
	    	
	            $this->view->profiles = $profile->getbiographi($userid);
	        	$this->view->userid = $userid;    
	        	$this->_helper->layout->setLayout('profile');
	       
	    }
	    
	    public function detailAction()
	    {
	    	$request = $this->getRequest();	    	
	    	$userid=$request->getPost('user');
	    	//$userid = 4;
	    	$cookieuser = $this->_userid;    	
	    	
	    	$age='';
	    	$profile = new Application_Model_Profile();
	    	$follwoing =  new Application_Model_Following();
	    	
	    			$this->view->following = $follwoing->getfolloweruser($userid);
	    			$this->view->follower = $follwoing->getallfollowing($userid);
	    			$this->view->row = $profile->getuserbyprofileid($userid);
	    			//$this->view->row = $profile->getsocial($userid,'1',$id);	    			
	    			$this->view->totalLike = $profile->totalikesprofile($userid,'2');
	    			$this->view->totalLove = $profile->totalikesprofile($userid,'1');
	    			$this->view->totalPhil = $profile->totalikesprofile($userid,'3');
	    			$this->view->totalDislike = $profile->totalikesprofile($userid,'4');
	    			$this->view->totalHate = $profile->totalikesprofile($userid,'5');	

	    			$this->view->TotalFollowingRes = $follwoing->getfolloweruserprofile($userid);
	    			$this->view->FollowingRow = $follwoing->getfolloweruserprofilelimit($userid);
	    			
	    			$this->view->TotalFollowersRes = $follwoing->getfollowing($userid);
	    			$this->view->FollowersRes = $follwoing->getfollowinglimit($userid);
	    			
	    			$this->view->cookieuser = $cookieuser;
	    			$this->view->userid = $userid;
	    			
	    }

	    public function scoredbeeAction(){
	    
	    	$SubmitMsg = 1;
	    	$deleted = 0;
	    	$mylastscore = 0;
	    	$user= $_COOKIE['user'];    
	    	$user = $this->_userid;
	    	$request = $this->getRequest();	    	
	    	$db=$request->getPost('db');
	    	$commentid=$request->getPost('comment');
	    	$score=$request->getPost('score');
	    	$type=$request->getPost('type');	    
	    	
	    	$myhome = new Application_Model_Myhome();
	    	$profile= new Application_Model_Profile();	
	    	$comment= new Application_Model_Comment();
		    	if($type=='1') {
		    		$id = $db;
		    		$dbeedetail = $myhome->getall($id);	  
		    		  		
		    		$Owner=$dbeedetail['User'];
		    		$MainDB=$db;
		    		$label='db';
		    	}
		    	else{	 	    		
		    		$commentRow = $comment->getcommentbyid($commentid);	    		
		    		$Owner=$commentRow['UserID'];
		    		$MainDB=$commentRow['DbeeID']; 
		    		if($commentRow['Type']=='1') $CommentText=$commentRow['Comment'];
		    		elseif($commentRow['Type']=='2') $CommentText=$commentRow['LinkTitle'];
		    		elseif($commentRow['Type']=='3') $CommentText=$commentRow['PicDesc'];
		    		elseif($commentRow['Type']=='4') $CommentText=$commentRow['VidDesc'];
		    		$label='comment';
		    	}
	    	$ScoreDate=date('Y-m-d H:i:s');
	    
		    	if($type=='1') {
		    		$id=$db;
		    		$scoredata = $comment->getscorebyid($id,$type,$user);	 
		    		//print_r($scoredata);  
		    		 $scoreid = $scoredata['ScoreID'];
		    	}
		    	else {
		    		$id=$commentid;
		    		$scoredata = $comment->getscorebyid($id,$type,$user);
		    		$scoreid = $scoredata['ScoreID'];
		    	}
	    
	    	$data = array(
	    			'ID'  	 => $id,
	    			'Owner'  => $Owner,
	    			'Type'   => $type,
	    			'UserID' => $user,
	    			'Score'  => $score,
	    			'MainDB'  => $MainDB,
	    			'ScoreDate' => $ScoreDate,
	    	);
	    	if(count($scoredata)==0 || $scoredata==false) {	
	    		echo "add";	    		   	    		
	    		if($comment->addscore($data))
	    			$scoreAdded=true;
	    	}
	    	else {	    	
	    		if($scoredata['Score']==1) $mylastscore='love';
	    		elseif($scoredata['Score']==2) $mylastscore='like';
	    		elseif($scoredata['Score']==3) $mylastscore='philosopher';
	    		elseif($scoredata['Score']==4) $mylastscore='dislike';
	    		elseif($scoredata['Score']==5) $mylastscore='hate';	    
	    		if($scoredata['Score']==$score) {
	    			$comment->deletescoring($scoreid);
	    			$deleted=1;
	    		}
	    		else {	
	    			$data2 = array(	    					
	    					'Type'   => $type	    					
	    			);
	    			$scoreid = $scoredata['ScoreID'];	    			
	    			$success = $comment->updatescoring($data,$scoreid);
	    			if($success)
	    				$scoreAdded=true;	    
	    		}
	    	}
	    	if($scoreAdded) {	    		
	    		$UserRow = $profile->getuserbyprofileid($user);
	    	
	    		if($UserRow['Status']!='0') {
	    			if($score=='1') $scorelabel='love'; elseif($score=='2') $scorelabel='like'; elseif($score=='3') $scorelabel='food for thought'; elseif($score=='4') $scorelabel='dislike'; elseif($score=='5') $scorelabel='hate';
	    	
	    			$MailBody='<div style="padding-bottom:5px; border-bottom:1px solid #CCC;"><a href="http://dbee.me" target="_blank"><img src="http://dbee.me/images/logo-emails.png" border="0"></a></div><div style="clear:both"></div><div style="margin-top:10px; margin-bottom:10px;"><div style="float:left; width:80px;"><img src="http://dbee.me/show_thumbnails.php?ImgName='.$UserRow['ProfilePic'].'&ImgLoc=userpics&Width=60&Height=60" border="0" /></div><div style="float:left; width:600px;"><font size="2" face="Arial, Helvetica, sans-serif"><a href="http://dbee.me/profile.php?user='.$UserRow['UserID'].'">'.$UserRow['Name'].'</a> scored your '.$label.' - <b>'.$scorelabel.'</b><br /><br /><a href="http://dbee.me/profile.php?db='.$MainDB.'">';
	    	
	    			if($type=='1') {
	    				if($dbeeRow->Type=='1') $Text=$dbeeRow['Text'];
	    				elseif($dbeeRow->Type=='2') $Text=$dbeeRow['LinkDesc'];
	    				elseif($dbeeRow->Type=='3') $Text=($dbeeRow['PicDesc']!='' ? $dbeeRow->PicDesc : '<img src="http://dbee.me/show_thumbnails.php?ImgName='.$dbeeRow['Pic'].'&ImgLoc=imageposts&Width=30&Height=30" border="0" />');
	    				elseif($dbeeRow->Type=='4') $Text=$dbeeRow['VidDesc'];
	    			} else $Text=$CommentText;
	    	
	    			$MailBody.='<i><font color="#999999">'.$Text.'</font></i></a><br><br>The dbee team :-)</div></div><div style="clear:both"></div><div style="width:auto; height:5px; border-bottom:1px solid #CCC;"></div><div style="clear:both"></div><div><font size="1" color="#999">This is an automated email from your dbee account. Please do not reply to it.<br /><br />copyright 2012 dbee <a href="http://dbee.me" target="_blank">dbee.me</a></font></div>';
	    	
	    			$MailFrom='"dbee" <noreply@dbee.me>'; //Give the Mail From Address Here
	    			$MailReplyTo='noreply@dbee.me';
	    	
	    			$MailSubject = "You have been scored";
	    			$Notification = new Application_Model_Notification();
	    			$ChkScoreNotification=$Notification->getnotificationuser($Owner);
	    			if($ChkScoreNotification['Scores']=='1') {
	    			$OwnerRow=$comment->getuser($Owner);
	    			$mail = new Zend_Mail();	    			
	    			$headers = "MIME-Version: 1.0" . "\r\n";
	    			$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	    			$headers .= 'From: <noreply@dbee.me>' . "\r\n";
	    			$mail->setBodyHtml(html_entity_decode($MailBody));
	    			$mail->setFrom('<noreply@dbee.me>', 'Dbee');
	    			$mail->addTo($OwnerRow['Email']);
	    			$mail->setSubject($MailSubject);
	    		//	$chk = $mail->send();    	
	    			
	    			}
	    		}
	    	}
	    	
	    	if($success)
	    		$SubmitMsg=1;
	    
	    	//}
	    
	    	echo $SubmitMsg.'~'.$id.'~'.$deleted.'~'.$type.'~'.$mylastscore.'~'.$scorelabel.'~'.$user;
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
			$ProfileDate=date('Y-m-d H:i:s');
			$commenttable = new Application_Model_Profile();
			$NotifyEmail = $commenttable->getnotifyemail($db,$userid);
			if(!$NotifyEmail)			
				$NotifyEmail=1;
			$data = array(
				    'DbeeID'      => $db,
				    'DbeeOwner' => $dbeeOwner,
				    'UserID'      => $user,
					'Type'      => $Type,
					'Profile' => $comment,
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
					'TwitterProfile' => $twittercomment,
					'TwitterGPName' => $gptn,
					'ProfileDate'      => $ProfileDate,
					'NotifyEmail' => $NotifyEmail					
				);				
			if($commenttable->insertcomment($data)) {
				setcookie('currloginlastseencomments', $ProfileDate);
				$SubmitMsg=1;
				// UPDATE LAST ACTIVITY TIME AND TOTAL COMMENTS FOR THE DBEE
				$newcomment = $myhometable->getcomment + 1;
				$data = array(
						'Profiles'      => $newcomment,
						'LastActivity' => $ProfileDate,
						'UserID'      => $user,
				);			
				
				// UPDATE LAST ACTIVITY TIME AND TOTAL COMMENTS FOR THE DBEE
		
				// SEND MAIL TO DB OWNER INFORMING OF A NEW COMMENT
				$OwnerRow = $commenttable->getuserdata($dbeeOwner);
				$UserRow = $commenttable->getuserdata($user);
				
			
				$MailBody='<div style="padding-bottom:5px; border-bottom:1px solid #CCC;"><a href="http://dbee.me" target="_blank"><img src="http://dbee.me/images/logo-emails.png" border="0"></a></div><div style="clear:both"></div><div style="margin-top:10px; margin-bottom:10px;"><div style="float:left; width:80px;"><img src="http://dbee.me/show_thumbnails.php?ImgName='.$UserRow->ProfilePic.'&ImgLoc=userpics&Width=60&Height=60" border="0" /></div><div style="float:left; width:600px;"><font size="2" face="Arial, Helvetica, sans-serif">'.$UserRow->Name.' has commented on db <a href="http://dbee.me/profile.php?db='.$db.'">';
		
				// BUILD DB TEXT
				if($dbeeRow['Type']=='1') $dbeeText=$dbeeRow['Text'];
				elseif($dbeeRow->Type=='2') $dbeeText=($dbeeRow->LinkDesc!='') ? $dbeeRow->LinkDesc : $dbeeRow->LinkTitle;
				elseif($dbeeRow->Type=='3') $dbeeText=($dbeeRow->PicDesc!='') ? $dbeeRow->PicDesc : '<img src="http://dbee.me/show_thumbnails.php?ImgName='.$dbeeRow->Pic.'&ImgLoc=imageposts&Width=30&Height=30" border="0" />';
				elseif($dbeeRow->Type=='4') $dbeeText=$dbeeRow->VidDesc;
		
				// BUILD COMMENT TEXT
				if($Type=='1') $commText=$comment;
				elseif($Type=='2') $commText=($linkdesc!='') ? $linkdesc : $linktitle;
				elseif($Type=='3') $commText=($picdesc!='') ? $picdesc : '<img src="http://dbee.me/show_thumbnails.php?ImgName='.$pic.'&ImgLoc=imageposts&Width=50&Height=50" border="0" />';
				elseif($Type=='4') $commText=$viddesc;
		
				$MailBody.='<i><font color="#999999">'.$dbeeText.'</font></i></a><br><br>'.$UserRow->Name.' wrote:<br><font color="#666666">'.str_replace("\\","",$commText).'</font><br><br>The dbee team :-)</div></div><div style="clear:both"></div><div style="width:auto; height:5px; border-bottom:1px solid #CCC;"></div><div style="clear:both"></div><div><font size="1" color="#999">This is an automated email from your dbee account. If you wish to turn off future notifications please edit your settings in your dbee profile.<br /><br />copyright 2012 dbee.me <a href="http://dbee.me" target="_blank">dbee.me</a></font></div>';
		
				$MailFrom='"dbee" <noreply@dbee.me>'; //Give the Mail From Address Here
				$MailReplyTo='noreply@dbee.me';
		
				$MailSubject = "New db comment posted";
		
				$MailCharset = "iso-8859-1";
				$MailEncoding = "8bit";
		
				$MailHeaders  = "From: $MailFrom\n";
				$MailHeaders .= "Reply-To: $MailReplyTo\n";
				$MailHeaders .= "MIME-Version: 1.0\r\n";
				$MailHeaders .= "Content-type: text/html; charset=$MailCharset\n";
				$MailHeaders .= "Content-Transfer-Encoding: $MailEncoding\n";
				$MailHeaders .= "X-Mailer: PHP/".phpversion();
		
				
				$commentuser = $commenttable->getcommentuser($db);
			
				foreach($commentuser as $ProfileUsersRow):				
						if(trim($ProfileUsersRow['Email'])!=""){
						/* mail($ProfileUsersRow->Email,$MailSubject,$MailBody,$MailHeaders,"-finfo@dbee.me"); */															
				}
					endforeach;
		
					// SEND MAIL TO DB OWNER
					if($OwnerRow['UserID']!=$user) {
						$notificationuser = new Application_Model_Notification();
						$ChkOwnerProfileNotification = $notificationuser->getnotificationuser($OwnerRow['UserID']);
						if($notificationuser['Profiles']=='1') {
							//				mail($OwnerRow->Email,$MailSubject,$MailBody,$MailHeaders,"-finfo@dbee.me");
						}
					}
					// SEND MAIL TO DB OWNER
				}
			
		
			// SELECT COMMENTS
			$TotalProfiles=$commenttable->totacomment($db);// CALCUATE TOTAL DBEES IN DATABASE
		
			//
			$excerpt=substr($comment,0,50).'...';
		
			// SEND BACK TOTAL COMMENTS IF GUEST USER FROM TWITTER
			if(isset($_COOKIE['gptn'])) {		
			$totalgpc=	$commenttable ->totalgpc($db,$_COOKIE['gptn']);
			set_cookie('gptc', $totalgpc);
		} else $totalgpc='-1';
		
		echo $SubmitMsg.'~'.$db.'~'.$TotalProfiles.'~'.$excerpt.'~'.$totalgpc.'~'.$cookieUserBlockedInt;
		
		$response = $this->_helper->layout->disableLayout();
		return $response;
		
	}
	  
}

