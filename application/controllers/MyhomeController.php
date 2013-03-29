<?php

class MyhomeController extends Zend_Controller_Action
{
	protected $_userid = null;
	
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
		$CurrDate=date('Y-m-d H:i:s');
			  $user = $this->_userid;			 
			  $cat  = new Application_Model_Category();
			  $usersite  = new Application_Model_Usersite();
			  $expire = time()+60*60*24;
			  setcookie('user', $user, $expire);
				  if(!isset($_COOKIE['currloginlastseen'])) {
				  	setcookie('currloginlastseen', $CurrDate, $expire);
				  	setcookie('currloginlastseenmsg', $CurrDate, $expire);
				  	setcookie('currloginlastseengroup', $CurrDate, $expire);
				  	setcookie('currloginlastseencomments', $CurrDate, $expire);
				  	setcookie('currloginlastscoretime', $CurrDate, $expire);
				  	setcookie('CookieLastActivity', $CurrDate, $expire);				  	
			    	}
			    	else			    	
			    	 $usersite  = new Application_Model_Usersite();
			    	 $this->view->cat = $cat->getallcategory();			    	 
			    	 $this->view->rssurl = $usersite->getsite($this->_userid);
			    	 $this->view->dbeeuser = $user;			    	
	}
	
	public function fetchdbeeAction()
	{
		
		 	$request = $this->getRequest();
		 	$end = $request->getpost('end'); 	
		 	$dbeeall  = new Application_Model_Myhome();		 		 	
		 	$this->view->dbeealldbees = $dbeeall->getdbeealldbee($this->_userid);;		 	
			$response = $this->_helper->layout->disableLayout();
		 	return $response;
	}
	
	public function categorysortAction()
	{
		$cat  = new Application_Model_Category();
		$this->view->cat = $cat->getsortcategory();	
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}	
	
	public function displaybyAction()
	{		
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}

	public function dbeereloadAction()
	{
		
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start');
		$end = $this->getRequest()->getPost('end');
		$initial = $request->getpost('initial');		
		$dbeereload  = new Application_Model_Myhome();
		 
		
		$this->view->dbeealldbees = $dbeereload->getdbeereload($start,$end,$this->_userid);	
		$this->view->end = $start+$end;
		$this->view->start = $start;
		$this->view->startnew = $start+5;
		$this->view->end = $initial;
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	
	public function mydbeeAction()
	{	
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start')?$this->getRequest()->getPost('start'):0;
		$end = $this->getRequest()->getPost('end')?$this->getRequest()->getPost('end'):5;			
		$dbeereload  = new Application_Model_Myhome();
		$dbeereloadrs = $dbeereload->getmydbee($start,$end,$this->_userid);	
		$this->view->dbeealldbees = $dbeereloadrs;		
		$this->view->start = $start;
		$this->view->startnew = $start+5;
		$this->view->end = $start+5;
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	
	public function catetorylistAction()
	{			
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start',0);
		$end = $start+5 ;
		$category = $this->getRequest()->getPost('cat');		
		$dbeecat  = new Application_Model_Myhome();
		$this->view->dbeealldbees = $dbeecat->mydbeecat($start,$end,$category);			
		$this->view->end = $end;
		$this->view->start = $start;
		$this->view->cat = $category;
		$this->view->startnew = $start+5;		
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}

	public function mostcommentedAction()
	{
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start',0);
		$end = $start+5 ;
		$initial = $request->getpost('initial');
		$dbeemostcommenet  = new Application_Model_Myhome();	
		$this->view->dbeealldbees = $dbeemostcommenet->mydbeesortby($start,$end);			
		$this->view->end = $end;
		$this->view->start = $start;
		$this->view->startnew = $start+5;		
		$response = $this->_helper->layout->disableLayout();
		return $response;			
	}	
	
	public function filtertypeAction()
	{		
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start',0);
		$end = $start+5 ;
		$initial = $request->getpost('initial');
		$type = $request->getpost('type');
		$dbeesortbydata  = new Application_Model_Myhome();
		$this->view->dbeealldbees = $dbeesortbydata->mydbeesortbydata($start,$end,$type);
		$this->view->end = $end;
		$this->view->start = $start;
		$this->view->startnew = $start+5;
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	public function dbfeedfilterAction()
	{
		$request = $this->getRequest();
		$start = $this->getRequest()->getPost('start',0);
		$end = $start+5 ;
		$initial = $request->getpost('initial');
		$score = $request->getpost('score');
		$dbeesortbydata  = new Application_Model_Myhome();
		$this->view->dbeealldbees = $dbeesortbydata->dbfeedfilter($start,$end,$score);
		$this->view->end = $end;
		$this->view->start = $start;
		$this->view->startnew = $start+5;
		$response = $this->_helper->layout->disableLayout();
		return $response;		
		
	}
	
	public function insertredbeeAction()
	{			
    	$request = $this->getRequest();
    	$dbee = (int)$request->getpost('db');
    	$user = (int)$request->getpost('dbOwner');     	
		$redbeeinsert  = new Application_Model_Myhome();
		$data = array('DbeeID'=>$dbee,'DbeeOwner'=>$user,'ReDBUser'=>$this->_userid,'ReDBDate' => date('Y-m-d H:i:s'));
		if($redbeeinsert->addredbee($data))
			$SubmitMsg=1;
		echo $SubmitMsg;		
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	
	public function addtofavAction()
	{		
		$request = $this->getRequest();
		$dbee = (int)$request->getpost('db');
		$user = (int)$request->getpost('dbOwner');
		$addtovav_obj  = new Application_Model_Myhome();
		$data = array('DbeeID'=>$dbee,'Owner'=>$user,'User'=>$this->_userid,'DateAdded' => date('Y-m-d H:i:s'));
		if($addtovav_obj->addfav($data))
			$SubmitMsg=1;
		echo $SubmitMsg;
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	
 	public function dbeedetailAction()
    {
    	$id = (int)$this->_getParam('id');
    	$uid = $this->_userid;    	 
    	
     	$this->view->userid = $this->_userid;
    	$this->view->dbeeid = $id;    	
    }
    
    public function dbeechkAction()
    {    	
    	$dbeeall  = new Application_Model_Myhome();
    	$cactivity = $_COOKIE['currloginlastseen'];
    	$this->view->data = $dbeeall->dbeechkdata($cactivity);
    	$response = $this->_helper->layout->disableLayout();
    	return $response;
    }  
    
	////////////////// Insert Start ////////////////
	
	public function dbinsertdataAction()
	{
		$request = $this->getRequest();
		//if ($request->isPost())
			//{
				
		$data2 = array();
		$dbeetype = $request->getPost('dbeetype');
		if($dbeetype=='Text') $Type=1;
		if($dbeetype=='Link') $Type=2;
		if($dbeetype=='Pix') $Type=3;
		if($dbeetype=='Vidz') $Type=4;
		if($dbeetype=='Polls') $Type=5;
		if($cat=='' || $cat=='undefined') $cat=10;
		$postdate=date('Y-m-d H:i:s');
		$pic=($request->getPost('picdis'))?$request->getPost('picdis'):'';
		$activity = date('Y-m-d H:i:s');
				
		$data['Type'] = $Type;
		$data['Text'] = stripslashes($request->getPost('text'));
		$data['Cats'] = stripslashes($request->getPost('cat'));
		$data['Pic'] = stripslashes($request->getPost('pic'));
		$data['PicDesc'] = stripslashes($request->getPost('picdesc'));
		$data['Link'] = stripslashes($request->getPost('link'));
		$data['LinkTitle'] = stripslashes($request->getPost('linktitle'));
		$data['LinkDesc'] = stripslashes($request->getPost('linkdesc'));
		$data['UserLinkDesc'] = stripslashes($request->getPost('userlinkdesc'));
		$data['Vid'] = stripslashes($request->getPost('vid'));
		$data['VidDesc'] = stripslashes($request->getPost('viddesc'));
		$data['VidSite'] = stripslashes($request->getPost('videosite'));
		$data['VidID'] = stripslashes($request->getPost('videoid'));
		$data['Audio'] = stripslashes($request->getPost('audio'));
		$data['User'] = $this->_userid;
		$data['TwitterTag'] = stripslashes($request->getPost('twittertag'));
		$data['PostDate'] = $postdate;
		$data['LastActivity'] = $activity; 	
		$data['polltext'] = stripslashes($request->getPost('polltext'));
		if($Type=='5')
		{
			$data2['polloption1'] = stripslashes($request->getPost('polloption1'));
			$data2['polloption2'] = stripslashes($request->getPost('polloption2'));
			$data2['polloption3'] = stripslashes($request->getPost('polloption3'));
			$data2['polloption4'] = stripslashes($request->getPost('polloption4'));
		}
		$insertdbeeobj  = new Application_Model_Myhome();
		$success1 = $insertdbeeobj->insertmydb($data);
		
		$last_insertedId=$success1;
		
		
		if($Type=='5')
		{
			$success = $insertdbeeobj->insertpol($data2,$last_insertedId,$ChosenCount=0);
		}
		if($success1){
			
			$success=1;
		}
		
		
		echo $success.'~'.'0';
		
		$response = $this->_helper->layout->disableLayout();
		return $response;
	}
	public function dbuploadAction()
	{
		$form=new Application_Form_Dbupload();		
		$request = $this->getRequest();
		$realpath = $request->getPost('relPath');
			$formData = $this->getRequest()->getPost();
			$adapter = new Zend_File_Transfer_Adapter_Http();	
			$adapter->addValidator('Extension', false, array('jpg','png','jpeg','gif','bmp'));
			 $adapter->setDestination($_SERVER['DOCUMENT_ROOT'].'/imageposts');		
				if ($adapter->receive($_FILES['filename']['name'])) {					
					$this->view->upload_image=$_FILES['filename']['name'];
					$this->view->relPath=$realpath;
					$this->view->picerr=$error;
				}
			//}
		//}
		
	}
			
	public function file_get_contents_curl($url)
			{
				$ch = curl_init();			
				curl_setopt($ch, CURLOPT_HEADER, 0);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			
				$data = curl_exec($ch);
				curl_close($ch);
			
				return $data;
			}
			
	public function check_matches($data, $arrayofneedles) {
				$arrayofneedles = array('youtube','vimeo','dailymotion','metacafe');
				foreach ($arrayofneedles as $needle) {
					if (stripos($data, $needle)!==FALSE) {
						return true;
					}
				}
				return false;
			}
			
			//Add http in link
			
	public function check_website($site_url){
				$SiteURL=$site_url;
				$sub_site_url=substr(trim($SiteURL), 0, 4);
				if($sub_site_url!='http') $SiteURL='http://'.$SiteURL;
				return $SiteURL;
			}
			
			// Get link data titile meta dis
			
	public function linkdetailAction(){
				$request = $this->getRequest();
				$linkurl = $request->getPost('dbeeurl');
				$url = $this->check_website($linkurl);
				//echo $url;
				if ($this->check_matches($url, $array_of_needles))
					$isvideo=true;
				else
					$isvideo=false;
			
				if(!$isvideo) {
					$html = $this->file_get_contents_curl($url);
			
					//parsing begins here:
					$doc = new DOMDocument();
					@$doc->loadHTML($html);
					$nodes = $doc->getElementsByTagName('title');
			
					//get and display what you need:
					$title = $nodes->item(0)->nodeValue;
			
					$metas = $doc->getElementsByTagName('meta');
			
					for ($i = 0; $i < $metas->length; $i++)
					{
					$meta = $metas->item($i);
					if($meta->getAttribute('name') == 'description' || $meta->getAttribute('name') == 'Description')
						$description = $meta->getAttribute('content');
						if($meta->getAttribute('name') == 'keywords')
						$keywords = $meta->getAttribute('content');
					}
			
					if(!$err) {
							$return='<div style="font-size:10px;"><label style="font-weight:bold">'.$title.'</label><br clear="all" /><label><a href="'.$url.'" target="_blank">'.substr($url ,0,50).'</a></label>';
							if($description!='')
									$return.='<br clear="all" /><br clear="all" /><label class="desc">'.$description.'</label>';
									$return.='</div><input type="hidden" id="LinkTitle" value="'.$title.'"><input type="hidden" id="LinkDesc" value="'.$description.'">';
			}
			else $return=0;
			}
			else $return=-1;
			
			echo $return;
			}			
			
	 public function convertrssAction()
	    {      
		    //$id = $this->_userid;    	       	
		    $request = $this->getRequest();
		    $siteid = (int)$request->getpost('id');	   
		    $site_obj  = new Application_Model_Rss();	    
		    $site = $site_obj->getsitename($siteid);	
			$siteurl =$site['URL'];
		 	$feedLinks = Zend_Feed_Reader::import($siteurl); 
		    $this->view->data=$feedLinks;
		    $this->view->url=$url; 
		    $this->view->feedLinks=$feedLinks;
		    $this->view->logo=$site['Logo'];
		    
	    }
	    
	    public function dbeerssAction()
	    {
		    $id = (int)$this->_userid;
		    $site_obj  = new Application_Model_Rss();
		    	
	    	$userrss = $site_obj->gettotaluserrss($id); 
	    	if($userrss=='') 
	    	$userrss=array(1,6,8,10);
	    	$newsite_obj  = new Application_Model_Rss();
	    	$siterss = $newsite_obj->getsite();      	
			$this->_helper->layout->setLayout('index');
	        	$this->view->userrss = $userrss;
	        	$this->view->siterss = $siterss;
	        	$this->view->feedLinks = $feedLinks;   
	        	$this->view->logo = $site['Logo'];	
	    }
			
	    public function savesiteAction()
	    {
	       	$request = $this->getRequest();
	    	$siteextract = $request->getpost('sites');	
		    $userid = (int)$this->_userid;;
	    	$site_obj  = new Application_Model_Rss;
		    $success = $site_obj->deleterss($userid);	    	    	
	    	$siteextract = explode(',',$siteextract);
	    			   
	    	foreach($siteextract as $chk):
	    	$data = '';	    	
	    	$data['Site'] = $chk;
	    	$data['User'] = $userid;	    	
	    	$site_obj  = new Application_Model_Rss;
	    	$success = $site_obj->saveusersite($data);
	    	endforeach;
	    	echo 1;  
	    	$response = $this->_helper->layout->disableLayout();
			return $response;
	    }
	    public function fetchiconAction()
	    {
	    	//$user = $this->_userid;
	  		$user =14515;
	    	$usersite  = new Application_Model_Usersite();  	
	    	$data = $usersite->getsite($user);	    	
	    	$this->view->rssurl = $data;		    	
	    	$response = $this->_helper->layout->disableLayout();
	    	return $response;
	    }
}

