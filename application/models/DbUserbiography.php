<?php
class Application_Model_DbUserbiography
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
			$this->setDbTable('Application_Model_DbTable_DbUserbiography');
		}
		return $this->_dbTable;
	}
	
	public function auserbiodetail($UserID)
	{     
	    $db = $this->getDbTable();
		$select = $db->select()->where('UserID = ?', $UserID);
		$result = $db->fetchAll($select);
		return $result->toArray();
	}
	
	public function editauserbiodetail($data)
	{
	  $db = $this->getDbTable();
	  $UserID =  $data['UserID'];
	  $where	=	$this->getDbTable()->getAdapter()->quoteInto('UserID=?',$UserID); 
	  $allrec	=	$this->getDbTable()->update($data,$where);
	}
	
	

}

