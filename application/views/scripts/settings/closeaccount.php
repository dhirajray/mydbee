<?
$cookieuser=$_COOKIE['user'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<? include 'head.php'; ?>
<style type="text/css">
<!--
.style3 {	font-size: 12px;
	font-weight: bold;
}
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #FFFFFF;
}
-->
</style>
</head>

<body>
<div id="signuplastWrapper">
  <div class="style3" style="padding:10px; background-color:#C2BEBC">deactivate my account</div>
  <div id="confirmclose" align="center" style="padding:10px; font-size:16px">
    <p>Are you sure you want to deactivate your account?</p>
    <p><a href="javascript:closeaccount(<?=$cookieuser;?>)">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:parent.Shadowbox.close();">No</a></p>
  </div>

  <div id="closeaccountmessage" align="center" style="padding:10px; display:none;">
 	<p>It's sad to see you go :(</p>
	<p>Your account has been deactivated. You can re-activate your account any time by sending us a request using the link in footer.</p>
  </div>
</div>
</body>
</html>
