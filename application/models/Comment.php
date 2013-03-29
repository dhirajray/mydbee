<?php

class Application_Model_Comment extends Application_Model_DbTable_Master
{
    protected $_name = null; 
	  
   // protected $_dependentTables = array('Application_Model_Technicianjobtype');

	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(COMMENT);     
    }
	
    public function getallComment()
    {
    	$select = $this->_db->select()
		->from(array($this->_name),	array('CatID','CatName'));	
		$result = $this->_db->fetchAll($select);
		return $result;
    }
    
    
    public function index($start,$end,$userid)
    {
    	$Offset = (int)$start;
    	$select = $this->_db->select()
    	->from(array('c' => $this->getTableName(DBEE)),
    			array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','User','PostDate'))
    			->joinLeft(array('u' => $this->getTableName(USERS)),
    					'u.UserID = c.User',array('u.UserID', 'u.Name'))
    					->joinLeft(array('d' => $this->getTableName(COMMENT)),
    							'd.DbeeID = c.DbeeID', array('CommentDate',"cnt"=>"count(*)"));
						    	if(!empty($blockuser)){
						    		$select->where("c.GroupID NOT IN ?", $sub_select);
						    	}
						    	if(!empty($PrivateGroups)){
						    		$select->where("c.User NOT IN ?", $sub_select);
						    	}
						    	$select->where("u.Status= 1");
						    		$select->where('d.UserID='.$userid)
								    	->group('c.DbeeID')
									    	->order('c.LastActivity DESC')
									    		->limit(5, $Offset);						    	
    	
    	$result = $this->_db->fetchAll($select);
    	return $result; 	    	    	
    }
    
    public function insertcomment($data)
    {
    	if($this->_db->insert($this->_name,$data))
		return 1;
	else
		return 0;
    
    }
    public function getuserdata($id)
    {
    	$select = $this->_db->select()
			->from($this->getTableName(USERS))
    			->where("UserID = ?",$id);    
		$result = $this->_db->fetchRow($select);
		return $result;
    
    }
    public function totalcomment($start,$end,$userid)
    {
    	$Offset = (int)$start;
    	$sql = new Sql($this->adapter);
    	$select = $sql->select();
    	$select->from(array('c' => 'tblDbees'),'*');
    	$select->join(array('u' => 'tblUsers'), 'u.UserID = c.User');
    	$select->join(array('d' => 'tblDbeeComments'), 'd.DbeeID = c.DbeeID',array('CommentDate','cnt'=> New Expression('count(distinct(d.CommentID))')),'left');
    	$select->where('d.UserID='.$userid);
    	$select->group(array('c.DbeeID'));
    	$select->order(array('d.CommentDate Desc'));
    	$select->offset($Offset);
    	$select->limit(5);
    	$statement = $sql->prepareStatementForSqlObject($select);    	
    	$result = $statement->execute();
    	return count($result);
    }
    
    public function getoners($dbid)
    {
    	$sql = new Sql($this->adapter);
    	$select = $sql->select();
    	$select->from('tblDbees',array('DbeeID','User'));
    	$statement = $sql->prepareStatementForSqlObject($select);
    	$select->where('DbeeID ='.$dbid);
    	$result = $this->_db->fetchAll($select);    	
    	return $result[0]['User'];     	
    }
    
    
    public function getdbeecomment($id)
    {
    	$select = $this->_db->select();
    	$select->from(array('c' => $this->getTableName(DBEE)))
    	->joinLeft(array('d' => $this->getTableName(USERS)), 'c.User = d.UserID');
    	$select->where("c.DbeeID =".$id."");
    	$select->order(array('c.DbeeID asc'));    	
    	$result = $this->_db->fetchAll($select);    	
    	return $result[0];    
    }
   
    public function getcommentuser($id)
    {
    	$select = $this->_db->select();
    	$select->from(array('c' => $this->_name),array('d.Email','d.Name','d.UserID'))
    	->joinLeft(array('d' => $this->getTableName(USERS)), 'c.UserID = d.UserID');
    	$select->where("c.DbeeID =".$id."");
    	$select->order(array('c.DbeeID asc'));    	
    	$result = $this->_db->fetchRow($select);
    	return $result;
    }
     
 public function totacomment($dbeerid)
    {
    	$dbeerid  = (int) $dbeerid;
    	$select = $this->_db->select();
    	$select->from(array('c' => 'tblDbeeComments'));
    	$select->where("c.DbeeID =".$dbeerid."");
    	$result = $this->_db->fetchAll($select);
    	return count($result);
    }
    
    public function totalgpc($dbeerid,$twitergp)
    {
    	$dbeerid  = (int) $dbeerid;
    	$select = $this->_db->select();
    	$select->from(array('c' => 'tblDbeeComments'));
    	$select->where("c.DbeeID =".$dbeerid."")->where("c.TwitterGPName =".$dbeerid."");
    	$result = $this->_db->fetchAll($select);
    	return count($result);
    }
    
    public function getcomment($dbeerid)
    {
    	$dbeerid  = (int) $dbeerid;
    	$select = $this->_db->select();
    	$select->from(array('c' => 'tblDbeeComments'));
    	$select->join(array('d' => 'tblUsers'), 'c.UserID = d.UserID');
    	$select->where("c.DbeeID =".$dbeerid."");
    	$select->order(array('c.CommentDate Desc'));
    	$select->limit(5);
    	$result = $this->_db->fetchAll($select);
    	return $result;
    }
    public function getcommentreload($dbeerid,$start)
    {
    	$Offset = (int)$start;
    	$dbeerid  = (int) $dbeerid;
    	$select = $this->_db->select();
    	$select->from(array('c' => 'tblDbeeComments'));
    	$select->join(array('d' => 'tblUsers'), 'c.UserID = d.UserID');
    	$select->where("c.DbeeID =".$dbeerid."");
    	$select->order(array('c.CommentDate Desc'))
    	->limit(5, $Offset);    
    	$result = $this->_db->fetchAll($select);
    	return $result;
    }
    public function getcommenttotal($dbeerid,$start)
    {
    	$Offset = (int)$start;
    	$dbeerid  = (int) $dbeerid;
    	$select = $this->_db->select();
    	$select->from(array('c' => 'tblDbeeComments'));
    	$select->join(array('d' => 'tblUsers'), 'c.UserID = d.UserID');
    	$select->where("c.DbeeID =".$dbeerid."");
    	$select->order(array('c.CommentDate Desc'))
    	->limit(6, $Offset);
    	$result = $this->_db->fetchAll($select);
    	return count($result);
    }
    
    public function getfollowedby($dbuid,$uid)
    {
    	$dbeeiduser = $this->getuserbydbeeid($dbuid);
    	$select = $this->_db->select();
    	$select->from('tblFollows');
    	$select->where("User =".$dbeeiduser."");
    	$select->where("FollowedBy =".$uid."");
    	$result = $this->_db->fetchAll($select);    	
    	return $result['ID'];
    }
    
    
    public function getuserbydbeeid($dbee)
    {
    	$select = $this->_db->select()
    	->from(array('c' => $this->_name),array('c.DbeeID'))
    	->where("c.DbeeID = (?)", $dbee);
    	$result = $this->_db->fetchAll($select);
    	return $result[0]['DbeeID'];
    }
    public function getnotifyemail($dbee,$userid)
    {
    	$select = $this->_db->select()
    		->from(array('c' => $this->_name),array('c.NotifyEmail'))
    			->where("c.DbeeID = (?)", $dbee)->where("c.UserID = (?)", $userid);
    	$result = $this->_db->fetchAll($select);
    	return $result[0]['UserID'];
    }
    public function notifyemail($dbee,$userid)
    {
    	$select = $this->_db->select()
    	->from(array('c' => $this->_name),array('c.NotifyEmail'))
    	->where("c.DbeeID = (?)", $dbee)->where("c.UserID = (?)", $userid);
    	$result = $this->_db->fetchAll($select);
    	return $result[0]['NotifyEmail'];
    }
    
    public function getcommentbyid($commentid)
    {
    	$select = $this->_db->select()
    		->from(array('c' => $this->_name),array('DbeeID','UserID','Type','Comment','LinkTitle','PicDesc','VidDesc'))
    			->where('CommentID = ?',$commentid);
    	$result = $this->_db->fetchRow($select);
    	return $result;
    }
      
    public function getscorebyid($id,$type,$userid)
    {
    	$select = $this->_db->select()
    	->from($this->getTableName(SCORING))
    			->where('ID = ?',$id)->where('Type = ?',$type)->where('UserID = ?',$userid);      		
    	$result = $this->_db->fetchRow($select);
    	return $result;
    }
    public function addscore($data)
    {    
    	if($this->_db->insert($this->getTableName(SCORING),$data))
    		return true;
    	else
    		return false;
    }
    
    public function deletescoring($id)
    {     
    	
    	if($this->_db->delete($this->getTableName(SCORING), array("ScoreID='".$id."'")))
    		return true;
    	else
    		return false;
    }
    public function updatescoring($data,$id)
    {
    	if($this->_db->update($this->getTableName(SCORING), $data,array("ScoreID='".$id."'")))
    		return true;
    	else
    		return false;
    }
    
    public function getuser($userid)
    {
    	$select = $this->_db->select()
    		->from($this->getTableName(USERS))
    			->where('UserID = ?',$userid);
    	$result = $this->_db->fetchRow($select);
    	return $result;
    }
    
    public function getnotigyemail($userid,$score,$dbeeid)
    {
    	$select = $this->_db->select();
    	$select->from(array('t' => $this->getTableName(USER_BIOGRAPHY)));
    	$select->join(array('c' => $this->getTableName(SCORING)),'t.UserID = c.UserID');
    	$select->where("c.Score =".$score."");
    	$select->where("c.MainDB =".$dbeeid."");
    	$result = $this->_db->fetchAll($select);
    	return count($result);
    }
}	