<?php

class Application_Model_Following extends Application_Model_DbTable_Master
{
    protected $_name = null; 
	  
   // protected $_dependentTables = array('Application_Model_Technicianjobtype');

	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(FOLLOWS);     
    }
	
    
    public function index($start,$end,$userid)
    {
    	$users = $this->getfolloweruserbyid($userid);    
    	$user = array_unique($users);
    	if($user!='') {
    		$Offset = (int)$start;    		
    		$select = $this->_db->select()
    		->from(array('c' => $this->getTableName(DBEE)),
    				array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','User','PostDate'))
    				->joinLeft(array('u' => $this->getTableName(USERS)),
    						'u.UserID = c.User',array('u.UserID', 'u.Name'))
    						->joinLeft(array('d' => $this->getTableName(COMMENT)),
    								'd.DbeeID = c.DbeeID', array('CommentDate',"cnt"=>"count(*)"));
							    		if(!empty($blockuser)){
							    			$select->where("c.GroupID NOT IN ?", $sub_select);}
							    		if(!empty($PrivateGroups)){
							    			$select->where("c.User NOT IN ?", $sub_select);}
									    		//$select->where("u.Status= 1");    	
									    			$select->where('c.User IN(?)', $users)
											    		->group('c.DbeeID')
											    			->order('c.LastActivity DESC')
											    				->limit(5, $Offset);					    		
    		$result = $this->_db->fetchAll($select);
    		return $result; 	    	   		
    	}
    }
    
   public function getfolloweruser($userid)
    {
    	$select = $this->_db->select();
    		$select->from(array('c' => $this->_name))
    			->join(array('u' => 'tblUsers'), 'u.UserID = c.User');
    				$select->where('c.User =.'.$userid);
    					$select->order(array('c.User asc'));    						
    							$result = $this->_db->fetchAll($select);
    								return $result;
    
    	
    }
    public function getfolloweruserbyid($id)
    {
    	$select = $this->_db->select();
    	$select->distinct();
    	$select->from($this->_name,array('User'));
    	$select->where('FollowedBy ='.$id);    				    		
    	$result = $this->_db->fetchAll($select);    	
    	foreach($result as $data):
    	$useid[] = $data['User'];
    	endforeach;
    	return $useid;
    }
    
    public function getfolloweruserprofile($id)
    {
    	$select = $this->_db->select();
    	$select->distinct();
    	$select->from($this->_name,array('User'))
    		->join(array('u' => 'tblUsers'), 'u.UserID = User')
    			->where('FollowedBy = ?',$id);        	
    	$result = $this->_db->fetchAll($select);    	    	
    	return $result;
    }
    
    
    public function getfolloweruserprofilelimit($id)
    {
    	$select = $this->_db->select();
    	$select->distinct();
    	$select->from($this->_name,array('User'))
	    	->join(array('u' => 'tblUsers'), 'u.UserID = User')
	    		->where('FollowedBy = ?',$id);
    	$select->limit(19);   
    	$result = $this->_db->fetchAll($select);    
    	return $result;
    }
    public function getallfollowing()
    {
    	$select = $this->_db->select()
		->from(array($this->_name));	
		$result = $this->_db->fetchAll($select);
		return $result;
    }
    public function getfollowing($userid)
    {
    	$select = $this->_db->select()
    	->from(array('f' => $this->_name))
    		->join(array('u' => 'tblUsers'), 'u.UserID = f.FollowedBy')
    			->where("f.User = ?",$userid);
    		
    	$result = $this->_db->fetchAll($select);
    	return $result;
    }
    public function getfollowinglimit($userid)
    {
    	$select = $this->_db->select()
    	->from(array('f' => $this->_name))
    		->join(array('u' => 'tblUsers'), 'u.UserID = f.FollowedBy')
    			->where("f.User =?",$userid)
    	->limit(19);
    	$result = $this->_db->fetchAll($select);
    	return $result;
    }
    
	
}	