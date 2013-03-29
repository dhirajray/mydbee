<?php
class Application_Model_DbNotificationsettings
{
	protected $_dbTable;
		
	public function setDbTable($dbTable)
    {
		if (is_string($dbTable)) {
			$dbTable = new $dbTable();
        }
        if (!$dbTable instanceof Zend_Db_Table_Abstract) {
            throw new Exception('Invalid table data gateway provided');
        }
        $this->_dbTable = $dbTable;
		
        return $this;
    }		 
	public function getDbTable()
	{
		if (null === $this->_dbTable) {
			$this->setDbTable('Application_Model_DbTable_DbNotificationsettings');
		}
		return $this->_dbTable;
	}
	
	public function ausernotidetail($UserID)
	{   
	    $db = $this->getDbTable();
		$select = $db->select()->where('User = ?', $UserID);
		$result = $db->fetchAll($select);
		return $result->toArray();
	}
	
	public function editausernotidetail($data)
	{
	  //print_r($data);die; 
	  $db = $this->getDbTable();
	  $User =  $data['User'];
	  $where	=	$this->getDbTable()->getAdapter()->quoteInto('User = ?', $User); 
	  $allrec	=	$this->getDbTable()->update($data,$where);
	  //print_r($allrec);die;
	}
	
	

}

