<?php

class FavouritesController extends Zend_Controller_Action
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
	    	$userid = $this->_userid;	
	    	$request = $this->getRequest();
	    	$start = $this->getRequest()->getPost('start')?$this->getRequest()->getPost('start'):0;
			$end = $this->getRequest()->getPost('end')?$this->getRequest()->getPost('end'):5;		
	    	$myFavourites= new Application_Model_Favourites();  	
	    	$this->view->favouritesdbees = $myFavourites->index($start,$end,$userid);	    			
	    	$this->view->start = $start;
	    	$this->view->startnew = $start+5;
			$this->view->end = $start+5;	
	    	$response = $this->_helper->layout->disableLayout();
			return $response;
			
	    } 			  
}

