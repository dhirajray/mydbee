<?php
require_once 'facebook/facebook.php';
class IndexController extends Zend_Controller_Action
{
    public function init()
    {	  
		$request = $this->getRequest()->getParams();	
		$this->_helper->layout->setLayout('index');
		$storage 	= new Zend_Auth_Storage_Session(); 		
		$data	  	= $storage->read();
		if($request['logoutMsg']!=='true'){
			if($data['UserID']!='' && $data['Email']!='') 
			{       
				$this->_helper->redirector->gotosimple('index','myhome',true);	
			}
        } 		
    }	
    public function indexAction()
    {
		$request = $this->getRequest()->getParams();
		$auth        =  Zend_Auth::getInstance();
		$registry    =  Zend_Registry::getInstance();
		$namespace = new Zend_Session_Namespace();			
		
			$config = Zend_Registry::get('config');
			$params = array(
				'appId' => $config->facebook->appid,
				'secret' => $config->facebook->secret,
				'domain' => $config->facebook->domain
				);			
			$facebook = new Facebook($params);
		
			$user = null;
			$user = $facebook->getUser();
							     
			if($user)
			{					
						try { 
							$loginUser = $facebook->api('/me');											
						 } catch (FacebookApiException $e) { 
						 	error_log($e);$user = null;
						 }					
				if($user)
				{       					    
						$uid = $facebook->getUser();  
						$api_call = array(  
											'method' => 'users.getinfo',  
											'uids' => $uid,  
											'fields' => 'uid, first_name, last_name, pic_square, pic_big, sex'  
										  );  
						$users_facebookinfo = $facebook->api($api_call);
						if(isset($users_facebookinfo) && !empty($users_facebookinfo)){
								$url =  $users_facebookinfo[0]['pic_big'];
								$dir =  $_SERVER['DOCUMENT_ROOT'].'/images/imagefacebook/';
								define('BUFSIZ', 40950);
								$rfile = fopen($url, 'r');
								$lfile = fopen($dir . basename($url), 'w');
								while(!feof($rfile))
								fwrite($lfile, fread($rfile, BUFSIZ), BUFSIZ);
								fclose($rfile);
								fclose($lfile);	
						}						
						$loginUser = $facebook->api('/me');
						$appId	 = $facebook->getAppId();
						$status = $this->_checkAndUpdateUser($loginUser);
						if($status == 2 || $status == 3)
						{
							// DbUser Model
								$userstuff = new Application_Model_DbUser();
								
								$logoutUrl =  $facebook->getLogoutUrl(array('scope' => 'email'));							
							// get user data
								$userData = $userstuff->auserdetail($loginUser['email']);

							     /***@@ Used Zend Auth condition for facebook @@****/
								$auth        =  Zend_Auth::getInstance();
								$filter = new Zend_Filter_Decrypt();
								$bootstrap = $this->getInvokeArg('bootstrap');
								$resource = $bootstrap->getPluginResource('db');
								$db = $resource->getDbAdapter();
								$adapter = new Zend_Auth_Adapter_DbTable($db);
								$adapter->setTableName('tblUsers');
								$adapter->setIdentityColumn('Email');
								$adapter->setCredentialColumn('Pass');
								$adapter->setIdentity($userData[0]['Email']);
								$chkPass = $adapter->setCredential($adapter->setCredentialdbee($userData[0]['Fbname'],$userData[0]['Pass']));									
								$result = $auth->authenticate($adapter);
								if($result->isValid())
								{
									//print_r($adapter->getResultRowObject());die;
									$data = array(
													'UserID' => $adapter->getResultRowObject()->UserID,
													'Email'	 => $adapter->getResultRowObject()->Email,
													'Name' => $adapter->getResultRowObject()->Name,
													'Username'	 => $adapter->getResultRowObject()->Username
												  );
	
									$remember = isset($data['UserID']) && $data['UserID'];
									$seconds  = 60*60; // 1 hour
									if ($remember) { Zend_Session::RememberMe($seconds);
									}else { Zend_Session::ForgetMe();}									
									/******
									@@ using zend std. class to storage the session value 
									@@ 
									******/	  
									$storage = new Zend_Auth_Storage_Session();
									$storage->write($data);
									echo '<script language="JavaScript">opener.location.reload();window.close();</script> ';die;	
									$this->_helper->redirector->gotosimple('','myhome',true,array('welcomeMsg'=>'true'));

								}
								else
								{
								     echo 'login failed,please register to this site!';
								}		
						}						
				}
				else
					$this->view->loginUrl = $facebook->getLoginUrl(array('scope' => 'email,user_birthday'));
			}
			else
			{
				$this->view->loginUrl = $facebook->getLoginUrl(array('scope' => 'email,user_birthday'));
			}		 
	}	
	/**
	@	Facebook add on
	@	This function check for whether a user logged in from facebook have already data collected in our database or not
	@	If existing user then do nothing
	@	If new user then add user to database 
	@	
	**/
	private function _checkAndUpdateUser($fbUser)
	{
			if(!$fbUser)
			{
				return 1;
			}
			$fbEmail = $fbUser['email'];
			$gender = $fbUser['gender'];
			// Check for user existence
			$userstuff		= new Application_Model_DbUser();
			$status = $userstuff->chkAval_user($fbEmail);
			if($status)
			{
				return 2;
			}
			else
			{
			    $passval = ucfirst($fbUser['first_name']);
				$hashpass = $this->_generateHash($passval);// secure password generated on _generateHash() function
				$users['Name'] = ucfirst($fbUser['first_name'].' '.$fbUser['last_name']);
				$users['Username'] = ucfirst($fbUser['first_name']);
                $users['Fbname'] = $passval;
				$users['Pass'] = $hashpass ;
				$users['Email'] = $fbUser['email'];
				$users['Gender'] = $fbUser['gender'];
				$users['Birthdate']= date("Y-m-d",strtotime($fbUser['birthday']));
				$users['RegistrationDate'] = date('Y-m-d H:i:s');
				$users['Status'] ='0';
				$addStatus	= $userstuff->adduser($users);
				/******************send a activation mail after facebook registartion*********************/
				if(isset($addStatus) && !empty($addStatus)){
				    //active confermation email start here */
				    $images	=	BASE_URL.'images/';
					$mail = new Zend_Mail();
					$body = '<head> content here</head>';
					$body="<table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/topbanner.png\" width=\"600\" height=\"174\" /></td>
  </tr>
  <tr>
	  <td colspan=\"4\">
	   <p><br />Welcome, <b>".$Row->Name."</b> and thanks for joining dbee.me</p><p><br />Your dbee account is now active and your login details are as Facebook credentials:<br><br></p>
	  </td>
  </tr>
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/middlebanner.png\" width=\"600\" height=\"363\" /></td>
  </tr>
  <tr>
    <td colspan=\"4\"><p><strong>'Debate n Rate'<br />
      <br />
Don't forget to spread the word about your new home for your online identity. Share your about.me page with your friends and followers and add the link to your email signature. Get more visitors.</p></td>
  </tr>
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/bottombanner.png\" width=\"600\" height=\"185\" /></td>
  </tr>
  <tr>
    <td width=\"25\">&nbsp;</td>
    <td width=\"275\" valign=\"top\"><p><strong>Create Private/Open Groups</strong></p>
    <p style='text-align:justify'>Don't forget, you can create an open, private or 'invitation only' group for an area of specific interest, study or work. Invite people to your group and your related discussions.  A few clicks and you\'re there, and you can control its visibility and who can join!</p></td>
    <td width=\"25\">&nbsp;</td>
    <td width=\"275\"><p><strong>Lost In Translation?</strong></p>
    <p style='text-align:justify'>Not any more thanks to dbee translation which will convert dbs in over 60 different languages and enable you to contribute to discussions posted by others in a different language. Since our site featured worldwide on TV last month, thanks to BBC 'Click', the number of countries in which dbee has begun building an audience has increased significantly and already our translation function is proving very popular.</p></td>

  </tr>
  <tr>
    <td colspan=\"4\"><p>
      We look forward to seeing you on dbee!<br /><br />Best wishes<br />
      <br />
the dbee team
      </p>
      <p>
    <img src=\"http://www.dbee.me/test/sendmail/images/logo.png\" width=\"89\" height=\"54\" /></p></td>
  </tr>
</table>
<table width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
  <tr>
    <td>&nbsp;</td>
    <td colspan=\"2\"><img src=\"http://www.dbee.me/test/sendmail/images/followus.png\" width=\"134\" height=\"16\" /></td>
  </tr>
  <tr>
    <td width=\"455\"><a href=\"http://www.dbee.me\"><img src=\"http://www.dbee.me/test/sendmail/images/login.png\" width=\"199\" height=\"60\" border=\"0\" /></a></td>
    <td width=\"72\"><a href=\"https://twitter.com/dbee_me\"><img src=\"http://www.dbee.me/test/sendmail/images/twitter.png\" width=\"65\" height=\"65\" border=\"0\" /></a></td>
    <td width=\"73\"><a href=\"http://www.facebook.com/dbee.me\"><img src=\"http://www.dbee.me/test/sendmail/images/fb.png\" width=\"67\" height=\"65\" border=\"0\" /></a></td>
  </tr>
  <tr>
    <td colspan=\"3\">Copyright MyPlanetLIFE.com 2012.</td>
  </tr>
</table>";
				    $headers = "MIME-Version: 1.0" . "\r\n";
					$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
					$headers .= 'From: <admin@dbee.com>' . "\r\n";	
					$mail->setBodyHtml(html_entity_decode($body));
					$mail->setFrom('admin@dbee.com', 'Dbee');
					$mail->addTo($fbUser['email']);
					$mail->setSubject('activation mail');
			        $chk =	$mail->send();
				
				}				
				return $addStatus ? 3: 4;
			}
	}
	// @
	// ** Login  Checking **
	// @		
	public function loginAction()
    {
      	$request	 =	$this->getRequest()->getParams();
		$connusertbl =	new Application_Model_DbUser();
		$auth        =  Zend_Auth::getInstance();
		$registry    =  Zend_Registry::getInstance();
		$result	 	 = 	$connusertbl->auserdetail($request['loginemail']);
		if((isset($request['loginemail'])&& !empty($request['loginemail'])) && (isset($request['loginpass']) && !empty($request['loginpass'])))
		{ 		      
				$filter = new Zend_Filter_Decrypt();
				$bootstrap = $this->getInvokeArg('bootstrap');
				$resource = $bootstrap->getPluginResource('db');
				$db = $resource->getDbAdapter();
				$adapter = new Zend_Auth_Adapter_DbTable($db);
				$adapter->setTableName('tblUsers');
				$adapter->setIdentityColumn('Email');
				$adapter->setCredentialColumn('Pass');
				$adapter->setIdentity($request['loginemail']);
				$chkPass = $adapter->setCredential($adapter->setCredentialdbee($request['loginpass'],$result[0]['Pass']));				
				$result = $auth->authenticate($adapter);
                
				if($result->isValid())
				{		
                      	  	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 	 			
						 $data = array(
							            'UserID' => $adapter->getResultRowObject()->UserID,
							            'Email'	 => $adapter->getResultRowObject()->Email,
							 			'Name' => $adapter->getResultRowObject()->Name,
							            'Username'	 => $adapter->getResultRowObject()->Username,										
										'Fbname' => $adapter->getResultRowObject()->Fbname,
							            'Address'	 => $adapter->getResultRowObject()->Address,
							 			'City' => $adapter->getResultRowObject()->City,
							            'Gender'	 => $adapter->getResultRowObject()->Gender,
										'Birthdate' => $adapter->getResultRowObject()->Birthdate,
							            'ProfilePic'	 => $adapter->getResultRowObject()->ProfilePic,
							 			'ActCode' => $adapter->getResultRowObject()->ActCode,
							            'ShowPPBox'	 => $adapter->getResultRowObject()->ShowPPBox,
										'SocialFB' => $adapter->getResultRowObject()->SocialFB,
							            'SocialTwitter'	 => $adapter->getResultRowObject()->SocialTwitter,
							 			'SocialLinkedin' => $adapter->getResultRowObject()->SocialLinkedin,
							            'ResetPassCode'	 => $adapter->getResultRowObject()->ResetPassCode,
										'CookieAccept' => $adapter->getResultRowObject()->CookieAccept,
							            'ScoringStatus'	 => $adapter->getResultRowObject()->ScoringStatus,
							 			'RegistrationDate' => $adapter->getResultRowObject()->RegistrationDate,
							            'LastUpdateDate'	 => $adapter->getResultRowObject()->LastUpdateDate,
										'LastLoginDate' => $adapter->getResultRowObject()->LastLoginDate,
							            'LastLoginSeenDate'	 => $adapter->getResultRowObject()->LastLoginSeenDate,
							 			'IP' => $adapter->getResultRowObject()->IP,
							            'LastLoginIP'	 => $adapter->getResultRowObject()->LastLoginIP,
										'Status'	 => $adapter->getResultRowObject()->Status,
										'state'	 => $adapter->getResultRowObject()->state
		                              );
						$remember = isset($data['UserID']) && $data['UserID'];
						$seconds  = 60*60; // 1 hour
						if ($remember) { Zend_Session::RememberMe($seconds);
						}else {
						        Zend_Session::ForgetMe();
						      }
						/******
						   @@ using zend std. class to storage the session value 
						   @@ 
						******/	  
						$storage = new Zend_Auth_Storage_Session();
						$storage->write($data);
						
						$this->_helper->redirector->gotosimple('index','myhome',true)	;
					
				}
				else
				{
				  echo 'login failed,please register to this site!';
				}
		}
		else
		{
		
		  $this->_helper->redirector->gotosimple('index','index',true,array('chk_error'=>'true'));
		
		}
		
	}
	     
	 public function signupAction()
	 {
		$request	=	$this->getRequest()->getParams();
		$this->_helper->layout->disableLayout();		
		$this->view->assign('action',"process");
		$this->view->assign('title','create an account');
		$this->view->assign('label_fname','full name');
		$this->view->assign('label_uname','username');	
		$this->view->assign('label_email','email');	
		$this->view->assign('label_pass','Password');
		$this->view->assign('label_gender','gender');
		$this->view->assign('label_birthday','birthday');
		$this->view->assign('label_captcha','Please enter the 5 letters displayed below:');
		$this->view->assign('label_submit','Register');		
		$this->view->assign('description','Please enter this form completely:');
		$form = new Application_Form_Registration();
        $this->view->form = $form;
	 }
	 
	 public function myprocessAction()
	 {
		 $request	=	$this->getRequest()->getParams();
		 $this->_helper->layout->disableLayout();
		 $addEntry	=	new Application_Model_DbUser();
		 if((isset($request['fullname']) && !empty($request['fullname'])) && (isset($request['username']) && !empty($request['username'])) && (isset($request['password']) && !empty($request['password'])) && (isset($request['email']) && !empty($request['email'])))
		 {
			  $bday = $request['birthyear'].'-'.$request['birthmonth'].'-'.$request['birthday'];
			  $formval =	$request['fullname'].'*asr*'.$request['username'].'*asr*'.$request['password'].'*asr*'.$request['email'].'*asr*'.$request['gender'].'*asr*'.$bday;			
				if(isset($formval) && !empty($formval)){
				echo "1~$formval";
				return;
				}else{
				echo "-1~$formval";
				return;						
				}						
		 }
	 }
	 
	 public function signupcaptchaAction()
	 {
	    $request	=	$this->getRequest()->getParams();
		$userinfo = explode("*asr*",$request['user']);
		$this->view->userinfo = $userinfo;
		$this->_helper->layout->disableLayout();
		$form = new Application_Form_Captcha();
        $this->view->form = $form;
		$this->view->user = $request['user'];
	 }
	 
	 public function signupmessageAction()
	 {
	    $request	=	$this->getRequest()->getParams();		
		$addEntry	=	new Application_Model_DbUser();
		$this->view->userinfo = $request;
		$this->view->user = $request['user'];
		$this->_helper->layout->disableLayout();
		$form = new Application_Form_Captcha();
        $this->view->form = $form;
		if(isset($errmsg)&&!empty($errmsg)){
		   echo $errmsg;
		}
		require_once('recaptcha/recaptchalib.php');
		$publickey  = '6LeAAd4SAAAAAJ3BeWLfc2mmYZW75ImFYjAZK029'; 
		$privatekey = '6LeAAd4SAAAAANXcScRJ7eHz4j_cuLWZZuHzEMs8'; 
		$response = recaptcha_check_answer($privatekey,$_SERVER["REMOTE_ADDR"], $_POST["recaptcha_challenge_field"],$_POST["recaptcha_response_field"]);
	    if (!$response->is_valid) 
	    {			
		   $errmsg = "recaptchaerror";
		   $errmsg = "recaptchaerror";
		   $this->view->recaperror = $errmsg;
	    } 
		else 
		{  
			   if(isset($request['recaptcha_challenge_field']) && !empty($request['recaptcha_challenge_field']))
			   {    
			        $hashpass = $this->_generateHash($request['password']);// secure password generated on _generateHash() function
					$userPersonalInfo = array(
								'Name' => $request['Name'] ,
								'Username' => $request['Username'] ,
								'Pass' => $hashpass ,
								'Email' => $request['Email'] ,
								'Gender' => $request['Gender'],
								'Birthdate'=> $request['Birthdate'],
								'RegistrationDate' => date('Y-m-d H:i:s'),
                                'Status' =>'0'								
							    );			                 
								
				          /******$returnres = '1';*********/                   
					       $returnres = $addEntry->adduser($userPersonalInfo);
				   if(isset($returnres) && !empty($returnres))
				   {			
						 $this->_helper->redirector->gotosimple('signupmail','Index',true,array('insert_userinfo'=>'true','userPersonalInfoall'=>$userPersonalInfo));
				   }
			  } 
		}
	 }
	 
	  private function _generateHash($plainText,$salt=null)	 
	  {	  
	      define('SALT_LENGTH',9);			
	      if ($salt === null)
		  {
			    $salt = substr(md5(uniqid(rand(), true)), 0, SALT_LENGTH);
		  } 
		  else 
		  {
		        $salt = substr($salt, 0, SALT_LENGTH);
		  }			
		  return $salt . sha1($salt . $plainText);	
	  }
	  
	 public function signupmailAction()
	 {
	    $request	=	$this->getRequest()->getParams();
		$this->_helper->layout->disableLayout();
		if(isset($request['insert_userinfo']) && ($request['insert_userinfo']=='true'))
		{
		   $this->view->userdetails = $request['userPersonalInfoall'];
		   /*********************activation mail send to user**********************************/
		   $images	=	BASE_URL.'images/';
           $mail = new Zend_Mail();
	       $body =  '<head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"><title>Dbee.com</title><style type="text/css"></style></head>
                     <body style="margin: 0; padding: 0;><td align="center">
  		               <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="padding: 35px 0; background-color:#fff;">
						<img src="'.$images.'logo-emails.png" border="0"></a></p>
						<p><font face="Arial, Helvetica, sans-serif" size="2">Dear '.$request['userPersonalInfoall'][1].',</font></p>
						<div class="im"><font face="Arial, Helvetica, sans-serif" size="2"><br><br>Thank you for registering with <a href="'.$_SERVER['HTTP_HOST'].'" target="_blank">'.$_SERVER['HTTP_HOST'].'</a>. 
						<br><br>Please click on the link below to confirm your email address and activate your dbee account.<br>
						</font></div><font face="Arial, Helvetica, sans-serif" size="2">
						<a href="'.$_SERVER['HTTP_HOST'].'/index/activelink/link/activate/id/'.$request['userPersonalInfoall'][3].'" target="_blank">
						   href='.$_SERVER['HTTP_HOST'].'/index/activelink/link/activate/id/'.$request['userPersonalInfoall'][3].'
						</a><br><br>The dbee Team :-)</font> 				  
					   </td></table>
			         </body>';			
				$headers = "MIME-Version: 1.0" . "\r\n";
				$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
				$headers .= 'From: <admin@dbee.com>' . "\r\n";	
				$mail->setBodyHtml(html_entity_decode($body));
				$mail->setFrom('admin@dbee.com', 'Dbee');
				$mail->addTo($request['userPersonalInfoall'][3]);
				$mail->setSubject('registration mail');
				$chk	=	$mail->send();				
		}
	 }
	 
	 // @
	 // ** Activate Email function ** //
	 // @@	 
	 public function activelinkAction()
	 {
		$request = $this->getRequest()->getParams();
		if($request['link']=='activate')
		{
			$addEntry	=	new Application_Model_DbUser();
			$chkUser	=	$addEntry->chkAval_user($request['id']);
			/*** check user email exist in  tblusers table *******/
			if($chkUser==1)
			{
			   /******* activated user account ***********/
			   $activated = $addEntry->activate_user($request['id']);
			   if(isset($activated) && !empty($activated)){
			       //active confermation email start here */
				    $images	=	BASE_URL.'images/';
					$mail = new Zend_Mail();
					$body = '<head> content here</head>';
					$body="<table width=\"600\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/topbanner.png\" width=\"600\" height=\"174\" /></td>
  </tr>
  <tr>
    <td colspan=\"4\">
      <p><br />Welcome, <b>".$Row->Name."</b> and thanks for joining dbee.me</p><p><br />Your dbee account is now active and your login details are as follows:<br><br>
					<strong>-----------------------<br>Login Details:</strong><br>-----------------------<br>
					<strong>Email:</strong> ".$Row->Email."<br>
					<strong>Password:</strong> what you set on sign up</p></td>
  </tr>
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/middlebanner.png\" width=\"600\" height=\"363\" /></td>
  </tr>
  <tr>
    <td colspan=\"4\"><p><strong>'Debate n Rate'<br />
      <br />
Don't forget to spread the word about your new home for your online identity. Share your about.me page with your friends and followers and add the link to your email signature. Get more visitors.</p></td>
  </tr>
  <tr>
    <td colspan=\"4\"><img src=\"http://www.dbee.me/sendmail/images/bottombanner.png\" width=\"600\" height=\"185\" /></td>
  </tr>
  <tr>
    <td width=\"25\">&nbsp;</td>
    <td width=\"275\" valign=\"top\"><p><strong>Create Private/Open Groups</strong></p>
    <p style='text-align:justify'>Don't forget, you can create an open, private or 'invitation only' group for an area of specific interest, study or work. Invite people to your group and your related discussions.  A few clicks and you\'re there, and you can control its visibility and who can join!</p></td>
    <td width=\"25\">&nbsp;</td>
    <td width=\"275\"><p><strong>Lost In Translation?</strong></p>
    <p style='text-align:justify'>Not any more thanks to dbee translation which will convert dbs in over 60 different languages and enable you to contribute to discussions posted by others in a different language. Since our site featured worldwide on TV last month, thanks to BBC 'Click', the number of countries in which dbee has begun building an audience has increased significantly and already our translation function is proving very popular.</p></td>

  </tr>
  <tr>
    <td colspan=\"4\"><p>
      We look forward to seeing you on dbee!<br /><br />Best wishes<br />
      <br />
the dbee team
      </p>
      <p>
    <img src=\"http://www.dbee.me/test/sendmail/images/logo.png\" width=\"89\" height=\"54\" /></p></td>
  </tr>
</table>
<table width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">
  <tr>
    <td>&nbsp;</td>
    <td colspan=\"2\"><img src=\"http://www.dbee.me/test/sendmail/images/followus.png\" width=\"134\" height=\"16\" /></td>
  </tr>
  <tr>
    <td width=\"455\"><a href=\"http://www.dbee.me\"><img src=\"http://www.dbee.me/test/sendmail/images/login.png\" width=\"199\" height=\"60\" border=\"0\" /></a></td>
    <td width=\"72\"><a href=\"https://twitter.com/dbee_me\"><img src=\"http://www.dbee.me/test/sendmail/images/twitter.png\" width=\"65\" height=\"65\" border=\"0\" /></a></td>
    <td width=\"73\"><a href=\"http://www.facebook.com/dbee.me\"><img src=\"http://www.dbee.me/test/sendmail/images/fb.png\" width=\"67\" height=\"65\" border=\"0\" /></a></td>
  </tr>
  <tr>
    <td colspan=\"3\">Copyright MyPlanetLIFE.com 2012.</td>
  </tr>
</table>";
				    $headers = "MIME-Version: 1.0" . "\r\n";
					$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
					$headers .= 'From: <admin@dbee.com>' . "\r\n";	
					$mail->setBodyHtml(html_entity_decode($body));
					$mail->setFrom('admin@dbee.com', 'Dbee');
					$mail->addTo($request['id']);
					$mail->setSubject('activation mail');
			        $chk =	$mail->send();
			   }
			}   
		}
	 }
	 
	 public function logoutAction()
    {		      
		$request = $this->getRequest()->getParams();
	    Zend_Session::ForgetMe();
	    $storage = new Zend_Auth_Storage_Session();
	    $data  = $storage->read();
	    $storage->clear();
	    Zend_Auth::getInstance()->clearIdentity();
	    $this->_helper->redirector('index');   	

    }
	 
	 public function signuperrorAction()
	 {
	    $request	=	$this->getRequest()->getParams();
		$this->_helper->layout->disableLayout();
	 }
	 public function imageresizeAction()
	 {
	    $request	=	$this->getRequest()->getParams();
		$this->_helper->layout->disableLayout();
	 }
}


