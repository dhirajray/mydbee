<?php

class Application_Model_Dbeedetail extends Application_Model_DbTable_Master
{
    protected $_name = null; 
	  
   // protected $_dependentTables = array('Application_Model_Technicianjobtype');
    
	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(CAT);     
    }
	
}	