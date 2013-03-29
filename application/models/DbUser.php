<?php
class Application_Model_DbUser
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
			$this->setDbTable('Application_Model_DbTable_DbUser');
		}
		return $this->_dbTable;
	}
	
	public function userAll()
	{     
	  //echo'<pre>';print_r($this->getDbTable());die('hiiiii');
	  $abc = $this->getDbTable()->fetchAll();
	  return $abc->toArray();
	}
	
   //**************** Profile Users related functions *****************************		
	public function adduser($userPersonalInfo)
	{   //echo'<pre>';print_r($userPersonalInfo);die('after insert');
		return $allrec	=	$this->getDbTable()->insert($userPersonalInfo);
	}   //Adding users to data base at the time of registration
	
	
	public function auserdetail($email)
	{    
	    $db = $this->getDbTable();
		$select = $db->select()->where('Email = ?', $email);
		$result = $db->fetchAll($select);
		return $result->toArray();
	}
	
	public function ausersocialdetail($UserID)
	{     
	    $db = $this->getDbTable();
		$select = $db->select()->where('UserID = ?', $UserID);
		$result = $db->fetchAll($select);
		return $result->toArray();
	}
	
	public function editausersocialdetail($data)
	{
	  $db = $this->getDbTable();
	  $UserID =  $data['UserID'];
	  $where	=	$this->getDbTable()->getAdapter()->quoteInto('UserID=?',$UserID); 
	  $allrec	=	$this->getDbTable()->update($data,$where);
	}
		
     // *****************************
      // @ User Login Check 
     // *****************************
	
	public function chkLogin($email,$pass)
    {
	    //echo $email;echo $pass;die;
		$db = $this->getDbTable();
		$select = $db->select()->where('Email = ?', $email)->where('password = ?', $pass)->where('Status = ?', '1');
		$result = $db->fetchAll($select)->count();
		if($result==1)
		{
			return $result = $db->fetchAll($select);
		}
		else if($result==0)
		{
			$select1 = $db->select()->where('email = ?', $email)->where('password = ?', $pass)->where('Status = ?', '1');
			$result1 = $db->fetchAll($select1)->count();
			if($result1==1)
			{
				return 'Deactivate';
			}
			else
			{
				$select2 = $db->select()->where('email = ?', $email)->where('password = ?', $pass);
				$result2 = $db->fetchAll($select2)->count();
				if($result2==1)
				{
					return 'EmailActivation';
				}
				else
				{
					return 'Password Id not matched';
				}
			}
		}
		
    }
	
	public function chkAval_user($data)
    {
		$db = $this->getDbTable();
		$select = $db->select()->where('Email = ?', $data);
		$result = $db->fetchAll($select);
		return $result->count();
    }
	
		
// *****************************
// @ active users profile
// *****************************
	public function activate_user($email)
    {
		//echo'<pre>';print_r($email);die('hi');
		$db = $this->getDbTable();
		$data = array(
			'Status'      => '1',
		);
		$where	=	$db->getAdapter()->quoteInto('Email = ?', $email); 
		return $allrec	=	$this->getDbTable()->update($data, $where);
    }
	
	/*
	public function delete_user($email)
	{
	  $db = $this->getDbTable();
	  $where	=	$db->getAdapter()->quoteInto('Email = ?', $email); 
	  return $delrec	=	$this->getDbTable()->delete($data, $where);
	}
	*/
	
	/**********for settingcontroller ***********/
	
	public function updateinfouser($userPersInfoupdate)
	{   
	    $db = $this->getDbTable();
		$data = array(
		    'UserID'   => $userPersInfoupdate['UserID'],
            'Name'     => $userPersInfoupdate['fullname'],
			'Email'    => $userPersInfoupdate['email'],
			'Gender'   => $userPersInfoupdate['gender'],
			'Birthdate'  => $userPersInfoupdate['birthyear'].'-'.$userPersInfoupdate['birthmonth'].'-'.$userPersInfoupdate['birthday']
            );
		$where	=	$this->getDbTable()->getAdapter()->quoteInto('UserID=?',$data['UserID']); 
		$allrec	=	$this->getDbTable()->update($data,$where);
	}
	
	public function deactiveuser($UserID)
	{
	  $db = $this->getDbTable();
	  $data =  array( 'Status'   => '0' );
	  $where	=	$this->getDbTable()->getAdapter()->quoteInto('UserID=?',$UserID); 
	  $allrec	=	$this->getDbTable()->update($data,$where);
	}
	
	

}

