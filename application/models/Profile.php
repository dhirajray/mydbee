<?php

class Application_Model_Profile extends Application_Model_DbTable_Master
{
	protected $_name = null;

	protected function _setupTableName()
	{
		parent::_setupTableName();
		$this->_name = $this->getTableName(USERS);
	}

	public function totalikesdbee($userid,$score,$dbeeid)
	{
		$select = $this->_db->select()
			->from($this->getTableName(SCORING))	
				->where("UserID = ?",$userid)
					->where("Score = ?",$score)
						->where("MainDB = ?",$dbeeid);
		$result = $this->_db->fetchAll($select);		
		return count($result);
	}
	public function totalikesprofile($userid,$score)
	{
		$select = $this->_db->select()
			->from($this->getTableName(SCORING))
				->where("UserID = ?",$userid)
					->where("Score = ?",$score);
		echo $select->__toString();
		$result = $this->_db->fetchAll($select);
		return count($result);
	}
	
	public function getbiographi($userid)
	{
		$select = $this->_db->select();
		$select->from($this->getTableName(USER_BIOGRAPHY));
		$select->where("UserID =?",$userid);
		$result = $this->_db->fetchRow($select);
		return $result;
	}
	
	public function getuserbyprofileid($userid)
	{
		$select = $this->_db->select()
			->from($this->_name,array('UserID','Name','ProfilePic','Status'))		
				->where("UserID =?",$userid);		
		$result = $this->_db->fetchRow($select);
		return $result;
	}
	public function getfollow($userid)
	{
		$select = $this->_db->select()
			->from($this->_name,array('UserID','Name','ProfilePic','Status'))
				->where("UserID =?",$userid);
		$result = $this->_db->fetchRow($select);
		return $result;
	}
	
	/* public function getfollows($userid)
	{
		$select = $this->_db->select()
			->from($this->_name,array('UserID','Name','ProfilePic','Status'))
				->where("FollowedBy =?",$userid);
		$result = $this->_db->fetchRow($select);
		return $result;
	} */
	public function getfollowing($userid)
	{
		$select = $this->_db->select()
			->from($this->_name,array('UserID','Name','ProfilePic','Status'))
				->where("User =?",$userid);
		$result = $this->_db->fetchRow($select);
		return $result;
	}
	public function getfollowinglimit($userid)
	{
		$select = $this->_db->select()
			->from($this->_name,array('UserID','Name','ProfilePic','Status'))
				->where("User =?",$userid)
					->limit(19);
		$result = $this->_db->fetchRow($select);
		return $result;
	}
}



