<?php

class Application_Model_Polloption extends Application_Model_DbTable_Master
{
	
	protected $_name = null;
	
	protected function _setupTableName()
	{
		parent::_setupTableName();
		$this->_name = $this->getTableName(POLL_OPTION);
	}
	
	public function getpollvote($dbeeid) {	
		$select = $this->_db->select()
			->from($this->getTableName(POLL_VOTES),array("cnt"=>"count('ID')"))
					->where('PollID = ?',$dbeeid);			
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	public function getoptionbyid($vote)
	{
		$select = $this->_db->select()
		->from($this->getTableName(POLL_OPTION),
				array("OptionText"))
				->where('ID = ?',$vote);
		$result = $this->_db->fetchRow($select);
		return $result;
	}
	
	public function getpolloption($dbeeid) 
	{	
		$select = $this->_db->select()
		->from($this->getTableName(POLL_OPTION),
				array("OptionText","ID"))
				->where('PollID = ?',$dbeeid);			
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
	public function getopname($id)
	{
		$select = $this->_db->select()
		->from($this->getTableName(POLL_OPTION),
				array("OptionText"))
				->where('ID = ?',$id);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
	public function totalpoll($poll)
	{
		$select = $this->_db->select()
			->from($this->getTableName(POLL_VOTES))
					->where('PollID = ?',$poll);		
		$result = $this->_db->fetchAll($select);
		return count($result);
	}
	
	public function insertpoll($data)
	{
		 $this->_db->insert($this->getTableName(POLL_VOTES), $data);
		 return;
	}
	public function getinsertid()
	{
		$id = $this->_db->lastInsertId($this->getTableName(POLL_VOTES));
		return $id;
	}
	
	public function insertpollcomment($data)
	{
		$this->_db->insert($this->getTableName(COMMENT), $data);
		return 1;
	}
	
	public function getpolloptionvote($dbeeid,$opid) 
	{	
		$select = $this->_db->select()
			->from($this->getTableName(POLL_VOTES),array("cnt"=>"count('ID')"));					
					$select->where('Vote ='.$opid.' AND PollID = '.$dbeeid.'');						
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
	public function getpartcpres($dbeeid) 
	{
		$select = $this->_db->select()
			->from(array('p' => $this->getTableName(POLL_VOTES)))
				->joinLeft(array('u' => $this->getTableName(USERS)),'p.User = u.UserID')
							->where('p.PollID = ?',$dbeeid);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	public function getpartcpreslimit($dbeeid) 
	{
		$select = $this->_db->select()
		->from(array('p' => $this->getTableName(POLL_VOTES)))
			->joinLeft(array('u' => $this->getTableName(USERS)),'p.User = u.UserID')
				->where('p.PollID = ?',$dbeeid)
					->limit(19);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
	public function getpartstatusrow($userid) 
	{
		$select = $this->_db->select()
		->from( $this->getTableName(USERS),array('Status'))		
		->where('Status = ?',$userid);
		$result = $this->_db->fetchAll($select);
		return $result[0]['Status'];
	}
	public function getmyvoteres($dbeeid,$userid) 
	{
		$select = $this->_db->select()
			->from( $this->getTableName(POLL_VOTES))
				->where('user ='.$userid.' AND PollID ='.$dbeeid);			
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	public function getmyvoteresdbee($dbeeid,$vote,$userid)
	{
		$select = $this->_db->select()
		->from( $this->getTableName(POLL_VOTES))
		->where('PollID ='.$dbeeid.' AND Vote ='.$vote);			
		$result = $this->_db->fetchAll($select);
		return $result;
	}	
	public function getvsql($voteid) 
	{
		$select = $this->_db->select()
			->from( $this->getTableName(POLL_OPTION),array('OptionText'))
				->where('ID ='.$voteid);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}
	
	public function getpores($poll)
	{
		$select = $this->_db->select()
			->from( $this->getTableName(POLL_OPTION))
				->where('PollID = ?',$poll);		
		$result = $this->_db->fetchAll($select);
		return $result;
	}

}

