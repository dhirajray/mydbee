<?php if(isset($_COOKIE['user'])) { ?>
<script language="javascript" type="text/javascript">setInterval("chktopnotification(1)",2000);</script>
<?php } else {
}
?>
<?php
		$storage 	= new Zend_Auth_Storage_Session();
		$data	  	= $storage->read();
		
?>
<div id="pagetop"></div>
<div id="topWrapper" class="topWrapper">
	<div class="top">
		<div class="topLeft">
			<div style="float:left; width:190px; margin-left:50px;">
			<?php if(isset($_COOKIE['user'])) { //echo $this->ZfcUserDisplayName(); ?>
				<div style="float:left; margin-top:3px;">
				   <!--<img src="show_thumbnails.php?ImgName=<?=$topRow->ProfilePic;?>&ImgLoc=userpics&Width=45&Height=45" style="border:1px solid #CCCCCC" />-->
				   <img src="<?php echo BASE_URL; ?>timthumb.php?src=<?php echo BASE_URL; ?>userpics/<?php echo $data['ProfilePic']; ?>&h=45&w=45&zc=1&q=100" style="border:1px solid #CCCCCC"/>
				   </div>
				<div>
					<?php if(strlen($fName[0])>15) $smallfont='font-size:10px;'; else $smallfont='font-size:12px;'; ?>
					<div style="float:left; color:#FFF; margin:10px 0 0 7px; <?=$smallfont;?>">Hi <?php echo $data['Username'];?><br /><a href="<?php echo $this->url(array('controller'=>'Myhome', 'action'=>'logout'),'default',true)?>" style="margin:2px 0 0 0;" class="logout-link">Logout</a></div>
				</div>
			<?php } else { ?>
				<div style="float:left; margin-top:3px" class="btn-signup" onclick="window.location='index.php'">sign up</div>
			<?php } ?>
			</div>
			<?php if(isset($_COOKIE['user'])) { ?>
			<div id="searchBox" style="float:left; margin-top:15px;"><div style="float:left"><form name="searchform" id="searchform" method="post" action="<? BASE_URL?>/myhome/search"><input type="text" id="searchword" name="searchword" class="textfieldSearch" onfocus="if(this.value == 'dbee username/keyword') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'dbee username/keyword'; }" value="dbee username/keyword"><input type="hidden" name="searchtype" id="searchtype"><input type="hidden" name="searchid" id="searchid"></form></div><div style="float:left;" class="search-go" onclick="javascript:document.searchform.submit();"><input type="image" src="images/navicons/search.png" style="margin-left:1px;"></div></div>
			<?php } ?>
		</div>
		<div class="topRight">
			<div class="<?php echo (isset($_COOKIE['user'])) ? 'topRightLinks' : 'topRightLinksIndex'; ?>"><? if(isset($_COOKIE['user'])) { ?>
<div id="menutab" class="ddcolortabs">
<? if(!eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) { ?>
	<ul>
		<li><div style="float:left"><div class="icon-navhome"></div><a href="<?php echo BASE_URL; ?>/myhome" title="Home"><span class="navLinksText">Home</span></a></div></li>
		
		<li><div class="nav-separator"></div></li>
		<li><div style="float:left"><div class="icon-navprofile"></div><a href="<?php echo BASE_URL; ?>/profile" title="Profile"><span class="navLinksText">Profile</span></a></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navnotification"></div><div style="float:left"><a href="<?php echo BASE_URL; ?>/notification" title="Notifications"><span class="navLinksText">Notifications</span></a></div><div style="position:absolute"><div id="notifications-top-wrapper" class="notificationcount topnotespos"><div id="notifications-top" style="margin-top:-3px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navmessages"></div><div style="float:left"><a href="<?php echo BASE_URL; ?>/message" title="Messages"><span class="navLinksText">Messages</span></a></div><div style="position:absolute"><div id="notifications-msg-top-wrapper" class="notificationcount topnotesmsgpos"><div id="notifications-msg-top" style="margin-top:-3px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navgroups"></div><div style="float:left"><a href="javascript:void(0);" rel="dropmenu_groups"><span class="navLinksText">Groups</span></a></div><div style="position:absolute"><div id="notifications-group-top-wrapper" class="notificationcount topnotesgrppos"><div id="notifications-group-top" style="margin-top:-3px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navsettings"></div><div style="float:left"><a href="javascript:void(0);" rel="dropmenu_settings"><span class="navLinksText">Settings</span></a></div></li>
	</ul>
<? } else { ?>
	<ul>
		<li><div style="float:left"><div class="icon-navhome"></div><a href="<?php echo BASE_URL; ?>/myhome" title="Home"><span class="navLinksText">Home</span></a></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div style="float:left"><div class="icon-navprofile"></div><a href="<?php echo BASE_URL; ?>/profile" title="Profile"><span class="navLinksText">Profile</span></a></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navnotification"></div><div style="float:left"><a href="<?php echo BASE_URL; ?>/notifications" title="Notifications"><span class="navLinksText">Notifications</span></a></div><div style="position:absolute"><div id="notifications-top-wrapper" class="notificationcount topnotespos"><div id="notifications-top" style="margin-top:-2px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navmessages"></div><div style="float:left"><a href="<?php echo BASE_URL; ?>/message" title="Messages"><span class="navLinksText">Messages</span></a></div><div style="position:absolute"><div id="notifications-msg-top-wrapper" class="notificationcount topnotesmsgpos"><div id="notifications-msg-top" style="margin-top:-2px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navgroups"></div><div style="float:left"><a href="javascript:void(0);" rel="dropmenu_groups"><span class="navLinksText">Groups</span></a></div><div style="position:absolute"><div id="notifications-group-top-wrapper" class="notificationcount topnotesgrppos"><div id="notifications-group-top" style="margin-top:-2px;"></div><div class="speech-top-notes"></div></div></div></li>
		<li><div class="nav-separator"></div></li>
		<li><div class="icon-navsettings"></div><div style="float:left"><a href="javascript:void(0);" rel="dropmenu_settings"><span class="navLinksText">Settings</span></a></div></li>
	</ul>
<?php } ?>
</div>

<!-- drop down menu -->
<div id="dropmenu_messages" class="dropmenudiv_a" style="width:107px;">
<a href="newmessages.php">unread</a>
<a href="mymessages.php">read</a>
</div>

<div id="dropmenu_groups" class="dropmenudiv_a" style="width:99px;">
<a href="<?php echo BASE_URL; ?>/group">my groups</a>
<a href="javascript:void(0);" onclick="javascript:OpenShadowbox('group/searchgroups','','125','580');">search groups</a>
<a href="javascript:void(0);" onclick="javascript:OpenShadowbox('group/creategroup','','325','600');">create group</a>
<a href="javascript:void(0);" onclick="javascript:OpenShadowbox('group/notifications','','320','600');">notifications</a>
</div>

<div id="dropmenu_settings" class="dropmenudiv_a" style="width:111px;">
<a href="javascript:void(0);" onclick="javascript:OpenShadowbox('<?php echo BASE_URL; ?>settings/accountsettings','','350','650');">my account</a>
<a href="javascript:void(0);" onclick="javascript:OpenShadowbox('<?php echo BASE_URL; ?>settings/notificationsettings','','390','500');">my notifications</a>
</div>

<script type="text/javascript" language="javascript">
//SYNTAX: tabdropdown.init("menu_id", [integer OR "auto"])
tabdropdown.init("menutab")
</script>

			<?php } else { ?><div class="loginBoxWrapper">
				<form id="login-form" method="post" action="processlogin.php" onsubmit="return checkLogin();">
				<div style="padding:3px; margin-bottom:20px; float:left; margin-right:15px; margin-top:2px; color:#A4A4A4; font-weight:bold;">sign in</div>
				<div style="padding:3px; margin-bottom:20px; float:left"><input id="loginemail" name="loginemail" type="text" class="textfieldLogin" onfocus="this.value=''; toggleloginclass('loginemail');" onblur="this.value=!this.value?'email':this.value; toggleloginclass('loginemail');" value="email"></div>
				<div id="loginpassdiv" style="padding:3px; margin-bottom:5px; float:left"><input id="loginpass" name="loginpass" type="text" class="textfieldLogin" onfocus="toggleLoginField('loginpass'); toggleloginclass('loginpass');" value="password"></div>
				<div style="float:left;"><input type="image" src="images/login.png" style="float:right; margin-top:<? echo eregi("chrome", $_SERVER['HTTP_USER_AGENT']) ? '4px' : '2px'; ?>;"></div>
				<div class="next-line"></div>
				<div style="float:left; margin-top:-17px; margin-left:60px;"><label><div style="float:left"><input type="checkbox" id="keeploggedin" name="keeploggedin" value="1"></div><div style="float:left; margin-top:1px; color:#A4A4A4">Keep me logged in</div></label></div><div style="float:left; margin-top:-17px; margin-left:70px;"><a href="javascript:void(0);" onclick="javascript:openforgotpass();"><font color="#A4A4A4">forgotten password?</font></a></div>
				<? if(isset($_GET['req'])) echo '<input type="hidden" id="grouprequest" name="grouprequest">'; ?>
				</form>
			</div><? } ?></div>
		</div>
	</div>
</div>
<input type="hidden" id="curr-notification-count">
<input type="hidden" id="notifications-top-hidden" value="<?=($_COOKIE['newdbcount-ghst']=='') ? '0' : $_COOKIE['newdbcount-ghst'];?>">
<input type="hidden" id="notifications-top-score-hidden" value="<?=($_COOKIE['newdbcountscore-ghst']=='') ? '0' : $_COOKIE['newdbcountscore-ghst'];?>">
<input type="hidden" id="notifications-top-comment-hidden" value="<?=($_COOKIE['newcommentcount-ghst']=='') ? '0' : $_COOKIE['newcommentcount-ghst'];?>">
<input type="hidden" id="notifications-top-msg-hidden" value="<?=($_COOKIE['newmsgcount-ghst']=='') ? '0' : $_COOKIE['newmsgcount-ghst'];?>">
<input type="hidden" id="notifications-top-grpinvite-hidden" value="<?=($_COOKIE['newgrpcount-ghst']=='') ? '0' : $_COOKIE['newgrpcount-ghst'];?>">
