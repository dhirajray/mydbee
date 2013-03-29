<?php

class SettingsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
		$request = $this->getRequest()->getParams();
		$namespace = new Zend_Session_Namespace();
    }

    public function indexAction()
    {

    }
	
	public function notificationsettingsAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   $namespace = new Zend_Session_Namespace();
	
	}
	
	public function detailAction()
	{
	   $request = $this->getRequest()->getParams();
       //print_r($request);die;
	   $this->_helper->layout->disableLayout();

	
	}
	
	public function updatenotificationAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	    //print_r($request);die;
		//ajax_editnotificationsettings
		$id=$request['id'];
		if($id=='1') $field='Dbees';
		elseif($id=='2') $field='Groups';
		elseif($id=='3') $field='Messages';
		elseif($id=='4') $field='GroupsDontFollow';
		elseif($id=='5') $field='Comments';
		elseif($id=='6') $field='Followers';
		//print_r($id);print_r($field);die;
		$storage = new Zend_Auth_Storage_Session();
		$data	= $storage->read();
		$UserID  = $data['UserID'];
		$usersnoti = new Application_Model_DbNotificationsettings();
		$getusersnotiinfo = $usersnoti->ausernotidetail($UserID);
	    //echo'<pre>';print_r($getusersnotiinfo);die;
		if($getusersnotiinfo[0][$field]==0) {
					$dataval = array(
						'User' => $UserID,
						 $field  => '1'
                     );	
					 $usersnoti = new Application_Model_DbNotificationsettings();
		             $updateusersnotiinfo = $usersnoti->editausernotidetail($dataval);
					 $SubmitMsg='1';
		}
		else {
		            $dataval = array(
						'User' => $UserID,
						 $field  => '0'
                     );
					$usersnoti = new Application_Model_DbNotificationsettings();
		            $updateusersnotiinfo = $usersnoti->editausernotidetail($dataval);
					$SubmitMsg='0';
		}
		
		exit($SubmitMsg.'~'.$id);
		
	}

    public function accountsettingsAction()
    {
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   $namespace = new Zend_Session_Namespace();
        
    }
	
	public function accounteditAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   $namespace = new Zend_Session_Namespace();	
	}
	
	public function updateAction()
	{
	   $request = $this->getRequest()->getParams();
	   $connusertbl =	new Application_Model_DbUser();
	   $changeuserinfo  = $connusertbl->updateinfouser($request);
	   exit('1');
	}
	
	public function closeaccountAction()
	{
	   $request = $this->getRequest()->getParams();
	   //print_r($request);
	   $this->_helper->layout->disableLayout();
	   $connusertbl =	new Application_Model_DbUser();
	   if(isset($request['UserID']) && !empty($request['UserID'])){
	       //print_r($request['UserID']);die('============');
		  $changeuserinfo  = $connusertbl->deactiveuser($request['UserID']);
	      exit('1');
	   }
	}
	
	
	public function biographyAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	}
	
	public function editbioAction()
	{
	   	$request = $this->getRequest()->getParams();
		//print_r($request);die;
	    $this->_helper->layout->disableLayout();	 	 	 	 	 	 	 	 
		$data = array(
						'ID'   => $request['ID'],
						'AboutMe'   => $request['AboutMe'],
						'Occupation'   => $request['occupation'],
						'PoliticalViews'   => $request['political'],
						'RelegiousViews'   => $request['relegious'],
						'HobbiesInterests'   => $request['hobbies'],
						'LikesDislikes'   => $request['likes'],
						'UserID' => $request['UserID'],
						'LastUpdateDate'   => date('Y-m-d H:i:s')
                     );			 
		$userbiography = new Application_Model_DbUserbiography();
	    $edituserbio = $userbiography->editauserbiodetail($data);
		//print_r($edituserbio);
		exit('1');
	}
	
	public function socialAction()
	{
	  	 $request = $this->getRequest()->getParams();
		 $this->_helper->layout->disableLayout();
		 if(isset($request['cheditsoci']) && $request['cheditsoci']=='checkeditsoci' ){
		      	 	
			 $data = array(
							'SocialFB'   => $request['socialfb'],
							'SocialTwitter'   => $request['socialtwitter'],
							'SocialLinkedin'   => $request['sociallinkedin'],
							'UserID'   => $request['UserID'],
							'LastUpdateDate'   => date('Y-m-d H:i:s')
                         );
		   $usersocial = new Application_Model_DbUser();
	       $updateusersocilinfo = $usersocial->editausersocialdetail($data);			 
		   exit('1');
		 }
	
	}
	
	public function scoreAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   if(isset($request['update_toscoring']) && $request['update_toscoring']=='updatetoscoring' ){
             //print_r($request);die('hhhhh');
				$storage = new Zend_Auth_Storage_Session();
				$data	= $storage->read();
				$UserID  = $data['UserID'];
				$userscore = new Application_Model_DbUser();
				$getuserscoreinfo = $userscore->ausersocialdetail($UserID);
			    //print_r($getuserscoreinfo[0]['ScoringStatus']);die('hhhhh111');
				if($getuserscoreinfo[0]['ScoringStatus']=='1'){
						$data = array(
                                        'ScoringStatus'   => '0',
										'UserID'   => $getuserscoreinfo[0]['UserID'],
										'LastUpdateDate'   => date('Y-m-d H:i:s')
								      );
						$usersocial = new Application_Model_DbUser();
						$updateusersocilinfo = $usersocial->editausersocialdetail($data);
						exit('0');
				}
				if($getuserscoreinfo[0]['ScoringStatus']=='0'){
						$data = array(
                                        'ScoringStatus'   => '1',
										'UserID'   => $getuserscoreinfo[0]['UserID'],
										'LastUpdateDate'   => date('Y-m-d H:i:s')
								      );
						$usersocial = new Application_Model_DbUser();
						$updateusersocilinfo = $usersocial->editausersocialdetail($data);
						exit('1');
				}
		 }
	}
	
	public function changepasswordAction()
	{	
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   //print_r($request);die;
	}
	
	public function sendpasswordAction()
	{
	   $request = $this->getRequest()->getParams();
	   $this->_helper->layout->disableLayout();
	   print_r($request);die;
	}
	
	
}



