<?php

class Application_Model_Blockuser extends Application_Model_DbTable_Master
{
    protected $_name = null; 
    
    protected $_userid = null;
	  
	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(BLOCKSUSER_DBEE);     
    }   
	
    public function getblockuser()
    { 
    	$select = $this->_db->select()
		->from(array($this->_name),	array('ID'));	
		$result = $this->_db->fetchAll($select);
		return $result;
    }
    	
}	

