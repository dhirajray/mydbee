<?
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Content-Type: application/xml; charset=utf-8");

include "conf-db.php";
$conn=mysql_connect($host,$user,$password);
mysql_select_db($dbname);

include "functions.php";
$loggedin=true;
if(!isset($_COOKIE['user'])) $loggedin=false;
if($loggedin) $userloggedin='1'; else $userloggedin='0';

$return='';
$profileuser=$_POST['user'];

// CHECK IF PROFILE HOLDER
$cookieuser=$_COOKIE['user'];
if($cookieuser==$profileuser) $ProfileHolder=true;
else $ProfileHolder=false;
// CHECK IF PROFILE HOLDER

// SELECT USER DETAILS
$sel="select * from tblUsers where UserID=".$profileuser;
$res=mysql_query($sel,$conn);
$row=mysql_fetch_object($res);
// SELECT USER DETAILS

// SELECT IF VIEWING USER FOLLOWS PROFILE HOLDER
if(!$ProfileHolder && $loggedin) {
	$SQL='select * from tblFollows where User='.$profileuser.' AND FollowedBy='.$cookieuser;
	$Res=mysql_query($SQL,$conn);
	if(mysql_num_rows($Res)>0) $follow=1;
	else $follow=0;
}
else $follow=-1;
// SELECT IF VIEWING USER FOLLOWS PROFILE HOLDER

// CALCULATE PROFILE PIC DIMENTIONS
$imgDim=image_dimentions($row->ProfilePic,'userpics','145','145');
$imgDimArr=explode('~',$imgDim);
$imgW=$imgDimArr[0];
$imgH=$imgDimArr[1];
// CALCULATE PROFILE PIC DIMENTIONS

//if($row->Status==1) {
	$fName=explode(' ',$row->Name);

	// CALCULATE USERS AGE
	$age='';
	$diff=(_date_diff(time(), strtotime($row->Birthdate)));
	if($diff[y]!=0) $age=$diff[y];
	elseif($diff[m]!=0) $age=($diff[m]>1) ? $diff[m].' months ' : $diff[m].' month ';
	elseif($diff[d]!=0) $age=($diff[d]>1) ? $diff[d].' days ' : $diff[d].' day ';
	elseif($diff[h]!=0) $age=($diff[h]>1) ? $diff[h].' hours ' : $diff[h].' hour ';
	elseif($diff[i]!=0) $age=($diff[i]>1) ? $diff[i].' minutes ' : $diff[i].' minute ';
	elseif($diff[s]!=0) $age=($diff[s]>1) ? $diff[s].' seconds ' : $diff[s].' second ';
	// CALCULATE USERS AGE

	// SELECT TOTAL SCORES OF EACH KIND FOR THIS DBEE
	$totalLove=mysql_num_rows(mysql_query("select * from tblScoring where Owner=".$profileuser." AND Score=1 AND UserID!=".$profileuser,$conn));
	$totalLike=mysql_num_rows(mysql_query("select * from tblScoring where Owner=".$profileuser." AND Score=2 AND UserID!=".$profileuser,$conn));
	$totalPhil=mysql_num_rows(mysql_query("select * from tblScoring where Owner=".$profileuser." AND Score=3 AND UserID!=".$profileuser,$conn));
	$totalDislike=mysql_num_rows(mysql_query("select * from tblScoring where Owner=".$profileuser." AND Score=4 AND UserID!=".$profileuser,$conn));
	$totalHate=mysql_num_rows(mysql_query("select * from tblScoring where Owner=".$profileuser." AND Score=5 AND UserID!=".$profileuser,$conn));
	// SELECT TOTAL SCORES OF EACH KIND FOR THIS DBEE
	
	// SELECT USER BIOGRAPHY
	$BioSQL="select * from tblUserBiography where UserID=".$profileuser;
	$BioRes=mysql_query($BioSQL,$conn);
	$BioRow=mysql_fetch_object($BioRes);
	if($BioRow->AboutMe!='' || $BioRow->Occupation!='' || $BioRow->PoliticalViews!='' || $BioRow->RelegiousViews!='' || $BioRow->HobbiesInterests!='' || $BioRow->LikesDislikes!='') $Bio=true;
	else $Bio=false;
	// SELECT USER BIOGRAPHY

	if($loggedin) {
		$followDiv='<a href="javascript:void(0)" rel="follow-popup~300" class="poplight" onclick="javascript:followme('.$profileuser.');"><div id="follow-user" class="follow-user" style="margin:10px 0 0 15px; font-size:14px; float:left;"><div id="followme-label" style="width:85px; color:#000; padding-top:7px; margin-left:22px; text-align:center; font-size:12px;"></div></div></a>';
		$mutualscoreDiv='<div class="next-line"></div><div class="buttonNew" style="margin:10px 0 0 15px; font-size:14px; float:left;" onclick="javascript:openmutualscores('.$profileuser.')"><div style="text-align:center; font-size:12px;">mutual scores</div></div>';
		}
	else {
		$followDiv='';
		$mutualscoreDiv='';
	}

	$scoreDiv.='<div style="margin:0 5px 0 0;"><span id="loveTotalDB" style="float:left">'.$totalLove.'</span><span style="float:left; margin-left:-8px;"><img src="images/scoring/heart.png"></span></div><div style="margin-left:50px;"><span id="likeTotalDB" style="float:left">'.$totalLike.'</span><span style="float:left; margin-left:-8px;"><img src="images/scoring/thumbs-up.png"></span></div><div style="margin-left:50px;"><span id="philosopherTotalDB" style="float:left">'.$totalPhil.'</span><span style="float:left; margin-left:-8px;"><img src="images/scoring/egg.png"></span></div><div style="margin-left:50px;"><span id="dislikeTotalDB" style="float:left">'.$totalDislike.'</span><span style="float:left; margin-left:-8px;"><img src="images/scoring/thumbs-down.png"></span></div><div style="margin-left:50px;"><span id="hateTotalDB" style="float:left;">'.$totalHate.'</span><span style="float:left; margin-left:-8px;"><img src="images/scoring/skull.png"></span></div>';
	
	$scoreDivWrappper='<div id="maindb-scorewrapper" style="float:right; width:290px; margin-top:0;">'.$scoreDiv.'</div>';

	// PROFILE PIC AND NAME
	$profile_highlighted='<div class="maindb-user-infobox" style="line-height:20px"><div style="margin:0 0 5px 0; width:130px; height:'.$imgH.'px; background-image:url(show_thumbnails.php?ImgName='.$row->ProfilePic.'&ImgLoc=userpics&Width=130&Height=130); background-repeat:no-repeat; background-position:center"';
	 if($ProfileHolder)
	 	$profile_highlighted.=' onmouseover=\'javascript:document.getElementById("profilepic-edit").style.display="block";\' onmouseout=\'javascript:document.getElementById("profilepic-edit").style.display="none";\'';
	$profile_highlighted.='><div id="profilepic-edit" class="profilepic-edit"><div class="pic-edit-action" onclick="javascript:OpenShadowbox(\'change_profilepic.php?user='.$ProfileHolderID.'&currpic='.$ProfileUserPic.'\',\'\',\'220\',\'450\');">change picture</div></div></div><div align="center" class="medium-font-bold">'.$row->Name.'</div>';

	if($row->Status==1) {
		// MESSAGE ME
		if(!$ProfileHolder)
			$profile_highlighted.='<div style="cursor:pointer" onclick="javascript:opensendmessage('.$profileuser.',\''.$fName[0].'\');"><div class="small-font" style="float:left; margin-top:5px">message '.$fName[0].'</div><div style="float:left; margin:2px 0 0 3px" class="message"></div></div>';
		// SOCIAL ICONS
		if($row->SocialFB!='' || $row->SocialTwitter!='' || $row->SocialLinkedin!='') $profile_highlighted.='<div align="center" style="text-align:center; margin-top:10px;">';
		if($row->SocialFB!='')
			$profile_highlighted.='<a href="'.$row->SocialFB.'" target="_blank"><div class="profilesocial-fb" style="margin-right:5px"></div></a>';
		if($row->SocialTwitter!='')
			$profile_highlighted.='<a href="http://twitter.com/'.$row->SocialTwitter.'" target="_blank"><div class="profilesocial-twitter" style="margin-right:5px"></div></a>';
		if($row->SocialLinkedin!='')
			$profile_highlighted.='<a href="'.$row->SocialFB.'" target="_blank"><div class="profilesocial-linkedin"></div></a>';
		if($row->SocialFB!='' || $row->SocialTwitter!='' || $row->SocialLinkedin!='') $profile_highlighted.='</div>';
		// FOLLOW BUTTON
		if(!$ProfileHolder && $loggedin) {
			$profile_highlighted.=$followDiv;
			$profile_highlighted.=$mutualscoreDiv;
		}
	}
		
	$profile_highlighted.='</div><div class="maindb-db-infobox" style="margin-left:40px; width:740px;"><div><div style="float:left" class="medium-font-bold" style="margin:0 25px 10px 0;">Age:&nbsp;<span class="medium-font">'.$age.'</span></div><div style="float:left; margin-left:25px;" class="medium-font-bold">Location:&nbsp;<span id="user-age">'.$location.'</span></div>'.$scoreDivWrappper.'</div><div class="next-line"></div>';
	
	if($Bio) {
		$profile_highlighted.='<div class="line-height-normal"><div class="medium-font-bold">Biography:</div>';
		if($BioRow->AboutMe!='') $profile_highlighted.='<div class="small-font-bold">about me:&nbsp;<span class="small-font">'.$BioRow->AboutMe.'</span></div>';
		if($BioRow->Occupation!='') $profile_highlighted.='<div class="small-font-bold">occupation:&nbsp;<span class="small-font">'.$BioRow->Occupation.'</span></div>';
		if($BioRow->PoliticalViews!='') $profile_highlighted.='<div class="small-font-bold">political views:&nbsp;<span class="small-font">'.$BioRow->PoliticalViews.'</span></div>';
		if($BioRow->RelegiousViews!='') $profile_highlighted.='<div class="small-font-bold">religious views:&nbsp;<span class="small-font">'.$BioRow->RelegiousViews.'</span></div>';
		if($BioRow->HobbiesInterests!='') $profile_highlighted.='<div class="small-font-bold">hobbies & interests:&nbsp;<span class="small-font">'.$BioRow->HobbiesInterests.'</span></div>';
		if($BioRow->LikesDislikes!='') $profile_highlighted.='<div class="small-font-bold">likes & dislikes:&nbsp;<span class="small-font">'.$BioRow->LikesDislikes.'</span></div>';
		$profile_highlighted.='</div>';
	}

	// GATHER USERS FOLLOWERS AND FOLLOWING m
	//----- TOTAL FOLLOWING ---------//
	$TotalFollowingRes=mysql_query('select * from tblFollows,tblUsers where FollowedBy='.$profileuser.' AND tblFollows.User=tblUsers.UserID',$conn);
	//----- TOTAL FOLLOWING ---------//
	
	$FollowingSQL='select * from tblFollows,tblUsers where FollowedBy='.$profileuser." AND tblFollows.User=tblUsers.UserID limit 19";
	$FollowingRes=mysql_query($FollowingSQL,$conn);
	if(mysql_num_rows($FollowingRes)>0) {
		$profile_highlighted.='<div style="margin:20px 0 20px 0;"><div class="medium-font-bold" style="float:left; margin-right:20px;"><b>Following '.mysql_num_rows($TotalFollowingRes).' on dbee</b></div>';
		if(mysql_num_rows($TotalFollowingRes)>19)
			$profile_highlighted.='<div style="float:left; margin-right:20px;">|</div><div style="float:left"><a href="javascript:void(0);" onclick="javascript:OpenShadowbox(\'followers.php?user='.$profileuser.'&type=1\',\'\',\'325\',\'630\');">see all</a></div>';
		$profile_highlighted.='</div><div class="next-line"></div>';
		$counter=1;
		while($FollowingRow=mysql_fetch_object($FollowingRes)) {
			$fStatusRow=mysql_fetch_object(mysql_query("select Status from tblUsers WHERE UserID=".$FollowingRow->UserID,$conn));
			$fStatus=$fStatusRow->Status;
			if($fStatus==1) $fLinkStart='<a href="profile.php?user='.$FollowingRow->UserID.'">';

			$profile_highlighted.=$fLinkStart.'<div id="followinguser'.$counter.'" class="follower-box-profile" title="'.$FollowingRow->Name.'"><img src="show_thumbnails.php?ImgName='.$FollowingRow->ProfilePic.'&ImgLoc=userpics&Width=35&Height=35" border="0" /></div></a>';
			if($counter%19==0) $profile_highlighted.='<div class="next-line"></div>';
			$counter++;
		}
		$profile_highlighted.='<div class="next-line"></div>';
	}

	//----- TOTAL FOLLOWERS ---------//
	$TotalFollowersRes=mysql_query('select * from tblFollows,tblUsers where User='.$profileuser.' AND tblFollows.FollowedBy=tblUsers.UserID',$conn);
	//----- TOTAL FOLLOWERS ---------//
	
	$FollowersSQL='select * from tblFollows,tblUsers where User='.$profileuser." AND tblFollows.FollowedBy=tblUsers.UserID limit 19";
	$FollowersRes=mysql_query($FollowersSQL,$conn);
	if(mysql_num_rows($FollowersRes)>0) {
		$profile_highlighted.='<div style="margin:20px 0 20px 0;"><div class="medium-font-bold" style="float:left; margin-right:20px;"><b><span id="followercount">'.mysql_num_rows($TotalFollowersRes).'</span> following '.$fName[0].' on dbee</b></div>';
		if(mysql_num_rows($TotalFollowersRes)>19)
			$profile_highlighted.='<div style="float:left; margin-right:20px;">|</div><div style="float:left"><a href="javascript:void(0);" onclick="javascript:OpenShadowbox(\'followers.php?user='.$profileuser.'&type=2\',\'\',\'325\',\'630\');">see all</a></div>';
		$profile_highlighted.='</div><div class="next-line"></div>';
		$counter=1;
		while($FollowersRow=mysql_fetch_object($FollowersRes)) {
			$fStatusRow=mysql_fetch_object(mysql_query("select Status from tblUsers WHERE UserID=".$FollowersRow->UserID,$conn));
			$fStatus=$fStatusRow->Status;
			if($fStatus==1) $fLinkStart='<a href="profile.php?user='.$FollowersRow->UserID.'">';

			$profile_highlighted.=$fLinkStart.'<div class="follower-box-profile"><img src="show_thumbnails.php?ImgName='.$FollowersRow->ProfilePic.'&ImgLoc=userpics&Width=35&Height=35" border="0" /></div></a>';
			if($counter%19==0) $profile_highlighted.='<div class="next-line"></div>';
			$counter++;
		}
	}
	// GATHER USERS FOLLOWERS AND FOLLOWING

//}

$return=$profile_highlighted.'~#~'.$follow.'~#~'.$userloggedin.'~#~'.$following.'~#~'.mysql_num_rows($FollowingRes);

echo $return;
?>