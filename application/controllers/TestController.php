<?php

class TestController extends Zend_Controller_Action
{

	 public function init()
	    {
	      	$namespace = new Zend_Session_Namespace(); 
	      	
			/* if($namespace->userid=='') 
			{ 
				$this->_helper->redirector->gotosimple('index','index',true);	
			} */
	    }
	
	  public function indexAction()
	    {	    	
	    	$response = $this->_helper->layout->disableLayout();
			return $response;
	    }
	  
}

