<?php

class Application_Model_Privateuser extends Application_Model_DbTable_Master
{
    protected $_name = null; 
	  
   // protected $_dependentTables = array('Application_Model_Technicianjobtype');

	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(GROUP);     
    }
	
    public function getprivategroup()
    {
    	$select = $this->_db->select()
			->from(array($this->_name),	array('ID'))
    			->where("GroupPrivacy= 2");    
		$result = $this->_db->fetchAll($select);
		return $result;
    }
    
	
}	