<?php

class Application_Model_Usersite extends Application_Model_DbTable_Master
{
	protected $_name = null;
	
	protected function _setupTableName()
	{
		parent::_setupTableName();
		$this->_name = $this->getTableName(USER_RSS);
	}
	
	public function getsite($user)
	{
		$select = $this->_db->select()
		->from(array($this->_name),array('ID','Site','User'))		
		->where('User='.$user);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
}
