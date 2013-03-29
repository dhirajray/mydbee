<?php

class Application_Model_Rss extends Application_Model_DbTable_Master
{
    protected $_name = null; 
	  
   // protected $_dependentTables = array('Application_Model_Technicianjobtype');

	protected function _setupTableName()
    {
              parent::_setupTableName();		
		      $this->_name = $this->getTableName(USER_RSS);     
    }
	
    public function getallRss()
    {
    	$select = $this->_db->select()
			->from(array($this->_name),	array('CatID','CatName'));	
		$result = $this->_db->fetchAll($select);
		return $result;
    }
    

    public function gettotaluserrss($id)
    {
    	$select = $this->_db->select()
    		->from($this->getTableName(USER_RSS),array('Site'))
    			->where('User ='.$id);
    		$result = $this->_db->fetchAll($select);
	    	foreach($result as $data):
	    	$siteid[] = $data['Site'];
	    	endforeach;
	    	return $siteid;    	
    }
    
    public function getsiterss($id)
    {
    	$select = $this->_db->select()
    		->from($this->getTableName(USER_RSS),array('URL','Logo'))
    			->where('ID ='.$id);
    	$result = $this->_db->fetchRow($select);
		return $result;    	
    }
    public function saveusersite($data)
    {        		
    		if($this->_db->insert($this->getTableName(USER_RSS), $data)){    	
    			return 1;    	
    		}else{    	
    			return 0;
    		}    	
    }
    public function deleterss($id)
    {
    	$this->_db->delete($this->getTableName(USER_RSS),'User = '.$id);
    	return true;
    }
   public function getsite()
    {
	    $select = $this->_db->select()	   	
	   		->from(array('r' => 'tblRssSites'),array('r.ID','r.URL','r.Name','r.Country'))
	   			->join(array('e' => 'tblRssCountries'), 'r.Country = e.ID',array('cname' => 'Name'));	   	
	   $result = $this->_db->fetchAll($select);	
	   return $result;   	   		   	  	 
   } 
   public function getsitename($id)
   {
   	$select = $this->_db->select()   
   		->from('tblRssSites',array('URL','ID','Logo'))
   			->where('ID= ?',$id);   
   	$result = $this->_db->fetchRow($select);
	return $result;
   }

   
  
   public function getusersite($id)
   {  
   	$select = $this->_db->select()      	
   		->from(array('s' => 'tblRssSites'),array('ID','URL','Logo'))
   			->join(array('r' => $this->getTableName(USER_RSS)), 's.ID = r.Site','Site')
   				->where('r.User='.$id);
   $result = $this->_db->fetchAll($select);
   return $result;
   		
   }
   
   public function getscorenotification($userid,$activity)
   {
 	$select = $this->_db->select()   	
   	->from(array('s' => 'tblScoring'),array('ScoreDate','Score','Type','ID'))
   	->join(array('u' => 'tblUsers'), 's.UserID = u.UserID','Name')
   	->where('s.Owner='.$userid)
   	->where->greaterThan('s.ScoreDate',$activity)
   	->order(array('s.ScoreDate Desc'));
   	$result = $this->_db->fetchAll($select);		
   	return count($result);
   }   
   public function gecomm($Scoreid)
   {
   	$select = $this->_db->select()   	
	   	->from('tblDbeeComments',array('Type','Comment','LinkTitle','PicDesc','VidDesc'))
	   	   	->where('CommentID='.$ScoreRow);
   $result = $this->_db->fetchAll($select);
   return $result;
   }  
   public function getdb($Scoreid)
   {
   	$select = $this->_db->select()   	
	   	->from('tblDbeeComments',array('Type','Text','LinkTitle','PicDesc','VidDesc','PollText'))
	  	 	->where('CommentID='.$ScoreRow);
   $result = $this->_db->fetchAll($select);
   return $result;
   }
    
   public function getscore($seencomms,$CheckDateComments,$dbs,$cookieuser)
   {
   	$select = $this->_db->select()   	
	   	->from(array('c' => 'tblDbeeComments'),array('ScoreDate','Score','Type','ID'))
		   	->join(array('u' => 'tblUsers'), 'c.UserID = u.UserID','Name')
			   	->where('c.UserID='.$cookieuser)
				   	->where->greaterThan('c.CommentDate',$CheckDateComments)
				   		->where->in('c.DbeeID',$dbs);
   	if($seencomms){
   	$select->where->notEqualTo('c.CommentID',$seencomms);
   	}
   	$select->order(array('c.CommentDate Desc'));
    $result = $this->_db->fetchAll($select);
    return $result;
   }

   public function getNotifyPop($dbeeid,$cookieuser)
   {
   	$select = $this->_db->select()   
	   	->from('tblDbeeComments',array('NotifyPop'))
	   		->where('DbeeID='.$dbeeid)
	   			->where('UserID='.$cookieuser);
    $result = $this->_db->fetchRow($select);
	return $result;
   }
   public function getmessagenotify($cookieuser,$CheckDateMsgs)
   {
   	$select = $this->_db->select()   
	   	->from(array('m' => 'tblMessages'))
		   	->join(array('u' => 'tblUsers'), 'm.MessageFrom = u.UserID','Name')
			   	->where('m.MessageTo='.$cookieuser)
			  	 	->where('m.MessageDate='.$CheckDateMsgs);
   	$result = $this->_db->fetchAll($select);
	return $result;
   }
   public function getmessagenotifycnt($cookieuser,$CheckDateMsgs)
   {
   	$select = $this->_db->select()
   		->from(array('m' => 'tblMessages'))
  		 	->join(array('u' => 'tblUsers'), 'm.MessageFrom = u.UserID','Name')
   				->where('m.MessageTo='.$cookieuser)
   					->where('m.MessageDate='.$CheckDateMsgs);
   	$result = $this->_db->fetchAll($select);		
   	return count($result);
   }    
   public function getgroupmember($cookieuser,$CheckDateGroups)
   {
   	$select = $this->_db->select() 
	   	->from(array('g' => 'tblGroupMembers'))
		   	->join(array('u' => 'tblUsers'), 'g.Owner = u.UserID','Name')
			   	->where('g.User='.$cookieuser)
				   	->where('g.SentBy= owner')
					   	->where('g.Status= 0')
					   		->where('g.JoinDate > ?',$CheckDateGroups);  
   $result = $this->_db->fetchRow($select);
   return $result;
   }
   public function getgroupmembercnt($cookieuser,$CheckDateGroups)
   {
   	$select = $this->_db->select()   
	   	->from(array('g' => 'tblGroupMembers'))
		   	->join(array('u' => 'tblUsers'), 'g.Owner = u.UserID','Name')
			   	->where('g.User='.$cookieuser)
				   	->where('g.SentBy= owner')
					   	->where('g.Status= 0')
					   		->where->greaterThan('g.JoinDate',$CheckDateGroups);
   	$result = $this->_db->fetchRow($select);
	return $result;
   }
  
   public function getjoingroup($cookieuser,$CheckDateGroups)
   {
   	$select = $this->_db->select()   
	   	->from(array('g' => 'tblGroupMembers'))
		   	->join(array('u' => 'tblUsers'), 'g.User = u.UserID','Name')
			   	->where('g.Owner='.$cookieuser)
				   	->where('g.SentBy= Self')
					   	->where('g.Status= 0')
					  	 	->where->greaterThan('g.JoinDate',$CheckDateGroups);
   	$result = $this->_db->fetchRow($select);
	return $result;
   }
   public function getjoingroupcnt($cookieuser,$CheckDateGroups)
   {
   	$select = $this->_db->select()   	
   		->from(array('g' => 'tblGroupMembers'))
  		 	->join(array('u' => 'tblUsers'), 'g.User = u.UserID','Name')
   				->where('g.Owner='.$cookieuser)
   					->where('g.SentBy= Self')
   						->where('g.Status= 0')
  						 	->where('g.JoinDate > ?',$CheckDateGroups);
   	$result = $this->_db->fetchRow($select);
	return $result;
   }
}


    
    
