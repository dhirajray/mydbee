<?php

class Application_Model_Myhome extends Application_Model_DbTable_Master
{
	protected $_name = null;

	protected function _setupTableName()
	{
		parent::_setupTableName();
		$this->_name = $this->getTableName(DBEE);
	}

	public function getdbeealldbee($userid)
	{
		$status=1;
		$blocluser_obj = new Application_Model_Blockuser($userid);			
		$blockuser = $blocluser_obj->getblockuser($userid);			
		$privategroup_obj = new Application_Model_Privateuser();			
		$PrivateGroups = $privategroup_obj->getprivategroup();						
		$select = $this->_db->select()
		->from(array('c' => $this->_name),
				array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','c.User','c.PostDate','u.UserID', 'u.Name', 'u.Status'))
				->joinLeft(array('u' => $this->getTableName(USERS)),
						'u.UserID = c.User',array('u.UserID', 'u.Name'))
						->joinLeft(array('d' => $this->getTableName(COMMENT)),
								'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
								 if(!empty($blockuser)){
									$select->where("c.GroupID NOT IN ?", $sub_select);}
										if(!empty($PrivateGroups)){
											$select->where("c.User NOT IN ?", $sub_select);} 
												//$select->where("u.Status= ?",$status)
													$select->group('c.DbeeID')
													 	->order('c.LastActivity DESC')														 
												         	->limit(5, 0);
													
		$result = $this->_db->fetchAll($select);		
		return $result;
	}

public function getdbeereload($ds,$tr = null){	
	$blocluser_obj = new Application_Model_Blockuser($userid);
	$blockuser = $blocluser_obj->getblockuser($userid);	
	$privategroup_obj = new Application_Model_Privateuser();
	$PrivateGroups = $privategroup_obj->getprivategroup();
	
	$Offset = (int)$ds;	
	$select = $this->_db->select()
	->from(array('c' => $this->_name),
				array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','c.User','c.PostDate','u.UserID', 'u.Name','u.Status'))
				->joinLeft(array('u' => $this->getTableName(USERS)),
						'u.UserID = c.User',array('u.UserID', 'u.Name'))
						->joinLeft(array('d' => $this->getTableName(COMMENT)),
								'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
								 if(!empty($blockuser)){
									$select->where("c.GroupID NOT IN ?", $sub_select);}
										if(!empty($PrivateGroups)){
											$select->where("c.User NOT IN ?", $sub_select);} 
												//$select->where("u.Status= ?",$status)
													$select->group('c.DbeeID')
													 	->order('c.LastActivity DESC')														 
												         	->limit(5, $Offset);						
											
												$result = $this->_db->fetchAll($select);												
												return $result;
}
public function getmydbee($ds,$tr = null,$userid){
	$blocluser_obj = new Application_Model_Blockuser($userid);
	$blockuser = $blocluser_obj->getblockuser($userid);
	$privategroup_obj = new Application_Model_Privateuser();
	$PrivateGroups = $privategroup_obj->getprivategroup();
	$Offset = (int)$ds;
	$select = $this->_db->select()
		->from(array('c' => $this->_name),
			array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','User','PostDate'))
				->joinLeft(array('u' => $this->getTableName(USERS)),
					'u.UserID = c.User',array('u.UserID', 'u.Name'))
						->joinLeft(array('d' => $this->getTableName(COMMENT)),
							'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
								if(!empty($blockuser)){
									$select->where("c.GroupID NOT IN ?", $sub_select);
								}
								if(!empty($PrivateGroups)){
									$select->where("c.User NOT IN ?", $sub_select);
								}
								$select->where("u.UserID = '.$userid.'")
									->group('c.DbeeID')
										->order('c.LastActivity DESC')
											->limit(5, $Offset);								

	$result = $this->_db->fetchAll($select);
	return $result;
}

public function getdbeesearchid($cat)
{	
	$matchjobQry = $this->_db->select()->from($this->_name)
	->where('Active=1')
	->where("FIND_IN_SET('$cat',Cats)");	
	$rs = $this->_db->fetchAll($matchjobQry);	
	foreach($rs as $data):
	$mydata[] = $data['DbeeID'];
	endforeach;	
	return $mydata;
}
public function mydbeecat($start,$end,$cat)
{	
	//echo $cat;
	$dbee = $this->getdbeesearchid($cat);
	
	if($this->getdbeesearchid($cat)){
		$dbee = $this->getdbeesearchid($cat);			
		$Offset = (int)$start;
		$select = $this->_db->select();		
		$blocluser_obj = new Application_Model_Blockuser($userid);
		$blockuser = $blocluser_obj->getblockuser($userid);
		
		$privategroup_obj = new Application_Model_Privateuser();
		$PrivateGroups = $privategroup_obj->getprivategroup();
		
		$Offset = (int)$ds;
		$select = $this->_db->select()
		->from(array('c' => $this->_name),
				array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','c.User','c.PostDate','u.UserID', 'u.Name','u.Status'))
				->joinLeft(array('u' => $this->getTableName(USERS)),
						'u.UserID = c.User',array('u.UserID', 'u.Name'))
						->joinLeft(array('d' => $this->getTableName(COMMENT)),
								'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
								if(!empty($blockuser)){
									$select->where("c.GroupID NOT IN ?", $sub_select);
								}
								if(!empty($PrivateGroups)){
									$select->where("c.User NOT IN ?", $sub_select);
								}
									$select->where("c.DbeeID IN (?)", $dbee)										
											->group('c.DbeeID')
												->order('c.LastActivity DESC')
													->limit(5, $Offset);									
								
		$result = $this->_db->fetchAll($select);
		return $result;
	}else{
		return false;
	}
}

public function mydbeesortby($start,$end)
{
	$Offset = (int)$start;
	$select = $this->_db->select()
			->from(array('c' => $this->_name),
					array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','c.User','c.PostDate','u.UserID', 'u.Name','u.Status'))
					->joinLeft(array('u' => $this->getTableName(USERS)),
							'u.UserID = c.User',array('u.UserID', 'u.Name'))
							->joinLeft(array('d' => $this->getTableName(COMMENT)),
									'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
									if(!empty($blockuser)){
										$select->where("c.GroupID NOT IN ?", $sub_select);
									}
									if(!empty($PrivateGroups)){
										$select->where("c.User NOT IN ?", $sub_select);
									}
										//$select->where("u.Status= '1'");									
										$select->group('c.DbeeID')
													->order('cnt DESC')
														->limit(5, $Offset);	
										$result = $this->_db->fetchAll($select);
										return $result;
}

public function mydbeesortbydata($start,$end,$type)
{	
	$Offset = (int)$start;
	$select = $this->_db->select()
			->from(array('c' => $this->_name),
					array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','c.User','c.PostDate','u.UserID', 'u.Name','u.Status'))
					->joinLeft(array('u' => $this->getTableName(USERS)),
							'u.UserID = c.User',array('u.UserID', 'u.Name'))
							->joinLeft(array('d' => $this->getTableName(COMMENT)),
									'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"));
									if(!empty($blockuser)){
										$select->where("c.GroupID NOT IN ?", $sub_select);
									}
									if(!empty($PrivateGroups)){
										$select->where("c.User NOT IN ?", $sub_select);
									}
										$select->where("c.type = ".$type."")												
												->group('c.DbeeID')
													->order('cnt DESC')
														->limit(5, $Offset);											
										$result = $this->_db->fetchAll($select);
										
										return $result;							
	
}

public function dbfeedfilter($start,$end,$score)
{

	$Offset = (int)$start;
	$score = (int)$score;
	$select = $this->_db->select()
	->from(array('c' => $this->_name),
			array('c.DbeeID','c.Type','c.Text','c.Link','c.LinkTitle','c.LinkDesc','c.UserLinkDesc','c.Pic','c.PicDesc','c.Vid','c.VidDesc','c.VidSite','c.VidID','c.PollText','User','PostDate'))
			->joinLeft(array('u' => $this->getTableName(USERS)),
					'u.UserID = c.User',array('u.UserID', 'u.Name'))
					->joinLeft(array('d' => $this->getTableName(COMMENT)),
					'd.DbeeID = c.DbeeID', array("cnt"=>"count(*)"))
						->joinLeft(array('s' => $this->getTableName(SCORING)),
						's.ID = c.DbeeID', array("Score","Scorecnt"=>"count(*)"));
							if(!empty($blockuser)){
								$select->where("c.GroupID NOT IN ?", $sub_select);
							}
							if(!empty($PrivateGroups)){
								$select->where("c.User NOT IN ?", $sub_select);
							}
							$select->where("s.Type= 1 AND s.Score = '.$score.'")
								->group('c.DbeeID')
									->order('Scorecnt DESC')
										->limit(5, $Offset);
							
							$result = $this->_db->fetchAll($select);
							return $result;									

}
public function updatedbee($data,$id)
{
	$this->update($data, 'DbeeID ='.$id);
}
public function addredbee($data)
{
		/*******Insert redbee *********/
			if($this->_db->insert($this->getTableName(REDBEES),$data))
				return true;
			else 
				return false;
}
public function addfav($data)
{
	if($this->_db->insert($this->getTableName(FAVOURITES),$data))
		return true;
	else
		return false;
}
public function insertmydb($data)
{
	$insertid = $this->_db->insert($this->getTableName(DBEE),$data);
	$last_insertedId=$this->_db->lastInsertId();
		return $last_insertedId;
}
public function insertpol($data2,$insertid,$ChosenCount)
{	
	for($i=1;$i<=4;$i++) {
		//if($data['1'] !='') {
			$dd= array('OptionText' => $data2['polloption'.$i],
					'PollID'=> $insertid,
					'ChosenCount'=> $ChosenCount
					);
			if($this->_db->insert($this->getTableName(POLL_OPTION),$dd));				
	 	//}
	}
		return true;	
}

public function getuserid($dbee)
{
	$select = $this->_db->select()
		->from(array('c' => $this->_name),array('c.User'))
			->where("DbeeID = ?",$dbee);				
				$result = $this->_db->fetchRow($select);
				return $result['User'];
}
public function getuserdbee($dbee)
{
	$select = $this->_db->select()
		->from(array('c' => $this->_name))
			->where("c.DbeeID = ?",$dbee);
	$result = $this->_db->fetchRow($select);
	return $result;
}
public function getall($dbee)
{
	$select = $this->_db->select()
		->from(array('c' => $this->_name))
			->where("c.DbeeID =".$dbee);	
	$result = $this->_db->fetchRow($select);
	return $result;
}
public function getcomment($dbee)
{
	$select = $this->_db->select()
	 ->from(array('c' => $this->_name),array('c.User'))
	 	->where("DbeeID= ?",$dbee);
	$result = $this->_db->fetchRow($select);
	return $result['Comments'];
}



public function getdbeenotification($user,$activity)
{
	$select = $this->_db->select()
		->from(array('c' => 'tblDbees'))
			->join(array('u' => 'tblUsers'), 'u.UserID = c.User')
				->where('User IN ?',$user)
					->where('c.PostDate > ?',$activity);
	$result = $this->_db->fetchRow($select);
	return $result;
	
}

public function getdbeenotificationcnt($user,$activity)
{
	$select = $this->_db->select()
		->from(array('c' => 'tblDbees'))
			->join(array('u' => 'tblUsers'), 'u.UserID = c.User')
				->where('c.User IN ?',$user)
					->where('c.PostDate > ?',$activity);
	$result = $this->_db->fetchAll($select);
	return count($result);
}

public function dbeeusernotifi($id)
{
	$select = $this->_db->select()
		->from('tblDbeeComments',array('DbeeID'))
			->where('UserID = ?',$id);
	$result = $this->_db->fetchAll($select);	
	foreach($result as $data):
	$useid[] = $data['DbeeID'];
	endforeach;
	return $useid;
}
public function updatedbeecomment($data,$id)
{	
	//$txt = "WHERE DbeeID = ?";	
	//$myid = $this->_db->quoteInto($where, $id);	
	$this->update($data, 'DbeeID ='. $id);
	
}

public function dbeechkdata($lastactivity)
	{		
		$select = $this->_db->select()
		->from(array('c' => 'tblDbees'),'dBeeID')
		->where('c.LastActivity > ?',$lastactivity)
			->order('c.LastActivity DESC')
				->limit('1');	
		echo $select->__toString();	
		$result = count($this->_db->fetchRow($select));		
		return $result;
	}

}



