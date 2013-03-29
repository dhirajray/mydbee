<?php
class DbeedetailController extends Zend_Controller_Action
{

	protected $profileTable;
	
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
	    	$request = $this->getRequest();
	    	$id = $request->getPost('db');	    	
	    	$loginid = $this->_userid;
	    	$myhome= new Application_Model_Myhome();
	    	$userid = $myhome->getuserid($id);
	    	
	    	$profile= new Application_Model_Profile();
	    	$comment= new Application_Model_Comment();
	    	$polloption= new Application_Model_Polloption();	    
	    	$dbeepollvote_all = $polloption->getmyvoteres($id,$loginid);
	    	$result = $comment->getdbeecomment($id);   		    	
	    	
	    			$this->view->row = $result;	    			
	    			$this->view->totalLike = $profile->totalikesdbee($loginid,'2',$id);
	    			$this->view->totalLove = $profile->totalikesdbee($loginid,'1',$id);
	    			$this->view->totalPhil = $profile->totalikesdbee($loginid,'3',$id);
	    			$this->view->totalDislike = $profile->totalikesdbee($loginid,'4',$id);
	    			$this->view->totalHate = $profile->totalikesdbee($loginid,'5',$id);
	    			$this->view->TotalComments = $comment->totacomment($id);
	    			$this->view->row_comment = $comment->getcomment($id);
	    			$this->view->poRes = $polloption->getpolloption($id);
	    			$this->view->NotifyEmail = $comment->notifyemail($id,$loginid);	
	    			$this->view->totalvotesexist = $polloption->totalpoll($id);	    			
	    			$this->view->myvoterow = $dbeepollvote_all[0];	    			
	    			$this->view->userid = $userid;
	    			$this->view->db = $id;
	    	
	    	$response = $this->_helper->layout->disableLayout();
			return $response;
	    }
	    
	    public function castvoteAction()
	    {
	    	$request = $this->getRequest();
	    	$vote = $request->getPost('vote');
	    	$poll = $request->getPost('poll');
	    	$pollcomment = $request->getPost('pollcomment');	    	
	    	
	    	$loginid = $this->_userid;
	    	$Type=1;
	    	$myhome= new Application_Model_Myhome();	    	
	    	$profile= new Application_Model_Profile();
	    	$comment= new Application_Model_Comment();
	    	$polloption= new Application_Model_Polloption();
	    	$result = $comment->getdbeecomment($poll);
	    	$getdbee = $myhome->getall($poll);	    	
	    	$VoteDate=date('Y-m-d H:i:s');
	    	$data = array(
	    			'PollID' => $poll,
	    			'User' => $loginid,
	    			'Vote' => $vote,
	    			'VoteDate' => $VoteDate 
	    	);
	    	$polloption->insertpoll($data);	   	    	
	    	$id = $polloption->getinsertid();   	
	    	if($pollcomment!='') {
	    		$data = array(
	    				'DbeeID' => $poll,
	    				'DbeeOwner' =>  $getdbee['User'],
	    				'UserID' => $loginid,	 
	    				'Type'   => $Type,			
	    				'VoteID' => $id,
	    				'Comment' => $pollcomment,
	    				'CommentDate' => $VoteDate
	    		);
	    		$success = $polloption->insertpollcomment($data);	    		   		
	    	}	    		    	
	    	$votenaobj = $polloption->getopname($vote);		    	
	    	$votename = $votenaobj[0]['OptionText'];
	    	if($success) {
	    		$SubmitMsg=1;	    		
	    		$data2 = array(
	    				'LastActivity' => $VoteDate
	    		);
	    		$myhome->updatedbee($data2,$poll);	    		
	    		$totalvotesexist=$polloption->totalpoll($poll);	    		
	    		$count=1;
	    		$pres=$polloption->getpores($poll);	  	    	
	    		foreach($pres as $prow):	    		
	    		$total=$polloption->getpolloptionvote($poll,$prow['ID']);	    			
	    			${'polloptid'.$count}= $prow['ID'];
	    			${'pollopt'.$count} = $prow['OptionText'];
	    			${'pollopt'.$count.'num'} = $total[0]['cnt'];
	    			$count++;
	    		endforeach;
	    		$return='<div align="center"><div class="medium-font-bold-grey">you voted</div><div class="large-font-orange">'.$votename.'</div></div>';
	    	}	
	    	$SubmitMsg=1;
	    	echo $SubmitMsg.'~#~'.$return.'~#~'.$votename.'~#~'.$pollopt1.'~#~'.$pollopt2.'~#~'.$pollopt3.'~#~'.$pollopt4.'~#~'.$pollopt1num.'~#~'.$pollopt2num.'~#~'.$pollopt3num.'~#~'.$pollopt4num.'~#~'.$totalvotesexist.'~#~'.$vote.'~#~'.$polloptid1.'~#~'.$polloptid2.'~#~'.$polloptid3.'~#~'.$polloptid4;
			$response = $this->_helper->layout->disableLayout();
	    	return $response;
	    }

	 public function getProfileTable()
	    {
	        if (!$this->profileTable) {	           
	            $this->profileTable = new Application_Model_Profile();
	        }
	        return $this->profileTable;
	    }    
	    
	
	  
}

