// ******************************************************************************************************************************
// PRELOAD ROLLOVER IMAGES
var myimages=new Array()
	function preloadimages() {
		for (i=0;i<preloadimages.arguments.length;i++) {
			myimages[i]=new Image()
			myimages[i].src=preloadimages.arguments[i]
	}
}

//Enter path of images to be preloaded inside parenthesis. Extend list as desired.
preloadimages("http://www.dbee.me/images/radio-tick.png","http://www.dbee.me/images/radio.png","http://www.dbee.me/images/open-dbee.png","http://www.dbee.me/images/close-dbee.png","http://www.dbee.me/images/filterby_over.png","http://www.dbee.me/images/arrow_up_small.png","http://www.dbee.me/images/maindbpost-tabbg-open.png","http://www.dbee.me/images/maindbpost-tabbg-open-last.png","http://www.dbee.me/images/dbee-feed-speech-arrow-over.png","http://www.dbee.me/images/displayby-downarrow.png","http://www.dbee.me/images/dbcomment-speecharrow-over.png","http://www.dbee.me/images/leaguepop/league-mostfollowed.png","http://www.dbee.me/images/leaguepop/league-love.png","http://www.dbee.me/images/leaguepop/league-rogue.png","http://www.dbee.me/images/leaguepop/league-philosopher.png","http://www.dbee.me/images/icon-db-homefeed-active.png","http://www.dbee.me/images/leaguetab-mostcomm-open.png","http://www.dbee.me/images/leaguetab-philosopher-open.png","http://www.dbee.me/images/leaguetab-rogue-open.png","http://www.dbee.me/images/leaguetab-love-open.png","http://www.dbee.me/images/leaguetab-mostfollowed.png","http://www.dbee.me/images/startnewdb_hover.png")
// PRELOAD ROLLOVER IMAGES
// ******************************************************************************************************************************


function check_number(obj_val)
{
	//Returns true if value is a number or is NULL
	//otherwise returns false
	
	if (obj_val.length == 0) return true;
	
	//Returns true if value is a number defined as
	//   having an optional leading +.
	//   having at most 1 decimal point.
	//   otherwise containing only the characters 0-9.
	var start_format = " .+0123456789";
	var number_format = " .0123456789";
	var check_char;
	var decimal = false;
	var trailing_blank = false;
	var digits = false;
	
	//The first character can be + .  blank or a digit.
	check_char = start_format.indexOf(obj_val.charAt(0))
	//Was it a decimal?
	if (check_char == 1) decimal = true;
	else if (check_char < 1) return false;
	
	//Remaining characters can be only . or a digit, but only one decimal.
	for (var i = 1; i < obj_val.length; i++)
	{
		check_char = number_format.indexOf(obj_val.charAt(i))
		if (check_char < 0) return false;
		else if (check_char == 1)
		{
			if (decimal)		// Second decimal.
				return false;
			else
				decimal = true;
		}
		else if (check_char == 0)
		{
			if (decimal || digits)
				trailing_blank = true;
			// ignore leading blanks
		}
		else if (trailing_blank) return false;
		else digits = true;
	}
	//All tests passed, so...
	return true
}

function echeck(str) 
{
	var at="@"
	var dot="."
	var lat=str.indexOf(at)
	var lstr=str.length
	var ldot=str.indexOf(dot)
	
	if (str.indexOf(at)==-1)
	{
	   return false
	}

	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr)
	{
	   return false
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr)
	{
	   return false
	}

	 if (str.indexOf(at,(lat+1))!=-1)
	 {
	   return false
	 }

	 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot)
	 {
	   return false
	 }

	 if (str.indexOf(dot,(lat+2))==-1)
	 {
	   return false
	 }
	
	 if (str.indexOf(" ")!=-1)
	 {
		return false
	 }
	 return true					
}

function isSpaces(s)
{
	var len=s.length;
	var i;
	for(i=0;i<len;++i)
	{
		if(s.charAt(i)==" ") return true;
	}
	return false;
}

function isBlank(s)
{
	var len=s.length;
	var i;
	for(i=0;i<len;++i)
	{
		if(s.charAt(i)!=" ") return false;
	}
	return true;
}

function expandtext(textArea){
	while (
		textArea.rows > 1 &&
		textArea.scrollHeight < textArea.offsetHeight
	){
		textArea.rows--;
	}
	
	while (textArea.scrollHeight > textArea.offsetHeight)
	{
		textArea.rows++;
	}
	textArea.rows++
}

function fadepopup() {
	//When you click on a link with class of poplight and the href starts with a # 
	jqnc('a.poplight[href^=#]').click(function() {
		var popID = jqnc(this).attr('rel'); //Get Popup Name
		var popURL = jqnc(this).attr('href'); //Get Popup href to define size
				
		//Pull Query & Variables from href URL
		var query= popURL.split('?');
		var dim= query[1].split('&');
		var popWidth = dim[0].split('=')[1]; //Gets the first query string value

		//Fade in the Popup and add close button
		jqnc('#' + popID).fadeIn().css({ 'width': Number( popWidth ) });
		
		//Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
		var popMargTop = (jqnc('#' + popID).height() + 80) / 2;
		var popMargLeft = (jqnc('#' + popID).width() + 80) / 2;
		
		//Apply Margin to Popup
		jqnc('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		//Fade in Background
		jqnc('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
		jqnc('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer 
		
		return false;
	});
	
	
/*
	//Close Popups and Fade Layer
	jqnc('a.close, #fade').live('click', function() { //When clicking on the close or fade layer...
	  	jqnc('#fade , .popup_block').fadeOut(function() {
			jqnc('#fade, a.close').remove();  
	}); //fade them both out
		
		return false;
	});
*/
}

function openFadePopup() {
	jqnc('a.poplight').click(function() {
		var popAttr = jqnc(this).attr('rel'); //Get Popup Name
		var popAttrArr = popAttr.split('~');

		var popID = popAttrArr[0]; //Get Popup Name
		var popWidth = popAttrArr[1]; //Get Popup href to define size
	
		//Fade in the Popup and add close button
		jqnc('#' + popID).fadeIn().css({ 'width': Number( popWidth ) });
		
		//Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
		var popMargTop = (jqnc('#' + popID).height() + 80) / 2;
		var popMargLeft = (jqnc('#' + popID).width() + 80) / 2;
		
		//Apply Margin to Popup
		jqnc('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		//Fade in Background
		jqnc('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
		jqnc('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer 
		
		return false;
	});
}

function limitText(text_area_id, total_limit, counter_show_id) {
	
	var TextAreaId=document.getElementById(text_area_id);
		
	if (TextAreaId.value.length > total_limit) {
		TextAreaId.value = TextAreaId.value.substring(0, total_limit);
	} else {
		if (TextAreaId.value.length!=0)
			document.getElementById(counter_show_id).innerHTML = total_limit - TextAreaId.value.length + ' limit';
		else
			document.getElementById(counter_show_id).innerHTML = total_limit - TextAreaId.value.length + ' limit';
	}
}


function loadQtipBelow(div,cont) {
	$("#"+div).qtip({
		content: cont,
		show: 'mouseover',
		hide: 'mouseout',
		style: { 
			tip: {
				corner: 'topMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		position: {
			corner: {
				target: 'bottomMiddle',
				tooltip: 'topMiddle'
			}
		}
	});
}

function loadQtipAbove(div,cont) {
	$("#"+div).qtip({
		content: cont,
		show: 'mouseover',
		hide: 'mouseout',
		style: { 
			tip: {
				corner: 'bottomMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		position: {
			corner: {
				target: 'topMiddle',
				tooltip: 'bottomMiddle'
			}
		}
	});
}

function loadQtipAboveMaindbFix(div,cont) {
	$("#"+div).qtip({
		content: cont,
		show: 'mouseover',
		hide: 'mouseout',
		style: { 
			tip: {
				corner: 'topMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		position: {
			corner: {
				target: 'topMiddle',
				tooltip: 'bottomMiddle'
			}
		}
	});
}

function loadQtipAboveClass(div,cont) {
	$("."+div).qtip({
		content: cont,
		show: 'mouseover',
		hide: 'mouseout',
		style: { 
			tip: {
				corner: 'bottomMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		position: {
			corner: {
				target: 'topMiddle',
				tooltip: 'bottomMiddle'
			}
		}
	});
}

function loadQtipFixedLeft(div,cont) {
	$("#"+div).qtip({
		content: cont, 
		position: {
			corner: { target: 'leftMiddle', tooltip: 'rightMiddle' }
		},
		style: { 
			tip: {
				corner: 'rightMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		show: {
			effect: { length: 500 },
			ready: true // Show when ready (page load)
		},
		hide: false
	});
}

function loadQtipFixedRight(div,cont) {
	$("#"+div).qtip({
		content: cont, 
		position: {
			corner: { target: 'rightMiddle', tooltip: 'leftMiddle' }
		},
		style: { 
			tip: {
				corner: 'leftMiddle', // We declare our corner within the object using the corner sub-option
				color: '#404040',
				size: {
					x: 10, // Be careful that the x and y values refer to coordinates on screen, not height or width.
					y : 8 // Depending on which corner your tooltip is at, x and y could mean either height or width!
				}
			},
			name: 'dark' // Inherit from preset style
		},		
		show: {
			effect: { length: 500 },
			ready: true // Show when ready (page load)
		},
		hide: false
	});
}


function getVoteOption()
{
	var oRadio = document.forms[1].elements['pollradio'];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}


// -----------------------------------------------------------------------------------------------------
// CUSTOM FUNCTIONS BEGIN ------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
var SignupHttp;
function opensignupmessage(user) {	
	//document.getElementById("signuploader").style.display='none';		
	RefreshShadowbox('index/signupcaptcha?user='+user,'','300','450');
    RefreshShadowbox(url,'','550','580');
	setTimeout("parent.Shadowbox.close()",5000);
}

function opensignuperror() {	
	document.getElementById("signuploader").style.display='none';
	RefreshShadowbox('index/signuperror','','50','375');
	setTimeout("parent.Shadowbox.close()",5000);
}


function signup()
{	
	//setTimeout("parent.Shadowbox.close()",5000);
	err=false;
	var fullname=document.getElementById("fullname").value;
	if(fullname=='') err=true;
	
	var username=document.getElementById("username").value;
	if(username=='') err=true;
	
	var email=document.getElementById("email").value;
	if(email=='') err=true;
	
	var password=document.getElementById("password").value;
	if(password=='') err=true;
	
	if(document.getElementById("gender").options[0].selected) err=true;
	else var gender=document.getElementById("gender").value;
	
	if(document.getElementById("birthday").options[0].selected) err=true;
	else var birthday=document.getElementById("birthday").value;

	if(document.getElementById("birthmonth").options[0].selected) err=true;
	else var birthmonth=document.getElementById("birthmonth").value;

	if(document.getElementById("birthyear").options[0].selected) err=true;
	else var birthyear=document.getElementById("birthyear").value;
	
	if(!document.getElementById("termscheck").checked==true) err=true;
	else err=false;

	if(!err) {
		document.getElementById("SignupErr").style.display='none';
		document.getElementById("signuploader").style.display='block';

		SignupHttp=Browser_Check(SignupHttp);
		
		var url="myprocess";
		var data="fullname="+fullname+"&username="+username+"&email="+email+"&password="+password+"&gender="+gender+"&birthday="+birthday+"&birthmonth="+birthmonth+"&birthyear="+birthyear;
			
		SignupHttp.open("POST",url,true);
		SignupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SignupHttp.setRequestHeader("Content-length", data.length);
		SignupHttp.setRequestHeader("Connection", "close");

		SignupHttp.onreadystatechange = signupresult;
		SignupHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function signupresult()
{
	if(SignupHttp.readyState==4)
	{			
		if(SignupHttp.status == 200 || SignupHttp.status == 0)
		{ 
			var GetResult=SignupHttp.responseText;			
			var resultArr=GetResult.split('~');
			if(resultArr[0]=='1') {
				setTimeout(opensignupmessage(resultArr[1]),1000);
				//setTimeout("opensignupmessage("+resultArr[1]+")",1000);
			} else if(resultArr[0]=='-1') {
				setTimeout("opensignuperror()",1000);
			}
		}			
		else alert("Retrieval Error: " + SignupHttp.statusText);
	}
}


function toggleLoginField(id) {
	if(id=='loginpass') {
		document.getElementById('loginpassdiv').innerHTML='<input name="loginpass" type="password" id="loginpass" class="textfieldLogin" value="" />';
		$("#loginpass").focus(function() {
			$(this).addClass("curFocus");
		});
		$("#loginpass").blur(function() {
			$(this).removeClass("curFocus")
		});
		document.getElementById('loginpass').focus();
	}
}

function toggleLoginFieldBack(id) {
	if(id=='loginpass') {
		document.getElementById('loginpassdiv').innerHTML='<input name="loginpass" type="text" id="loginpass" class="textfieldLogin" value="password" />';
		document.getElementById('loginpass').focus();
	}
}

function toggleloginclass(id) {
	if(document.getElementById(id).className=='textfieldLogin') document.getElementById(id).className='textfieldLoginBlack';
	else {
		if(id=='loginemail' && document.getElementById(id).value=='email')
			document.getElementById(id).className='textfieldLogin';
	}
}

function toggletwsearchclass(id) {
	if(id=='q') var tag='#hashtag or keyword'; else var tag='add Twitter username';
	var fld=document.getElementById(id);
	if(fld.className=='twitter-search-field-grey') fld.className='twitter-search-field';
	else {
		if(fld.value==tag) fld.className='twitter-search-field-grey'; else fld.className='twitter-search-field';
	}
}


// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function seevideo(video) {
	OpenShadowbox('viewvideo.php?video='+video,'','400','490');
}

// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function seeaudio(audio) {
	OpenShadowbox('viewaudio.php?audio='+audio,'','200','490');
}

// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function opencloseaccount() {
	OpenShadowbox('closeaccount','','150','400');
}

// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function openpostdb(group) {
	group = typeof(group) != 'undefined' ? group : '0';
	OpenShadowbox('/group/insertdb','','420','1000');
}

// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function opennewcomm() {
	OpenShadowbox('newcommpop.php','','220','700');
}

function openwhybirthday() {
	OpenShadowbox('whybirthday.php','','210','450');
}

function uploadprofilepicbox(pic) {
	OpenShadowbox('uploadprofilepic.php?currpic='+pic,'','225','500');
}

function openmutualscores(user) {
	OpenShadowbox('mutualscores.php?user='+user,'','500','660');
}

// OPEN WHY I NEED TO PROVIDE BIRTHDAY POPUP
function opensignup() {	
	
	OpenShadowbox('/index/signup','','380','610');
}
function openrssselector() {
	OpenShadowbox('/myhome/dbeerss','','380','760');
}
function showuploadpic() {
	document.getElementById('whynotupload').style.display='none';
	document.getElementById('selectnew').style.display='block';
}

function closeuploadpic() {
	parent.Shadowbox.close();
}

function closeaccountmessage() {
	OpenShadowbox('accountisclosed.php','','210','450');
}

// OPEN SEND MESSAGE BOX
function opensendmessage(user,name) {
	OpenShadowbox('sendmessage.php?user='+user+'&name='+name,'','240','400');
}

// OPEN ABOUT
function openabout() {
	OpenShadowbox('about.php','','450','500');
}

function refreshabout() {
	RefreshShadowbox('about.php','','450','500');
}

// OPEN TERMS
function openterms() {
	OpenShadowbox('terms.php','','850','800');
}

function refreshterms() {
	RefreshShadowbox('terms.php','','850','800');
}

// OPEN PRIVACY
function openprivacy() {
	OpenShadowbox('privacy.php','','850','800');
}

function refreshprivacy() {
	RefreshShadowbox('privacy.php','','850','800');
}

// OPEN SCORING EXPLAINED
function openscoringexplained() {
	OpenShadowbox('scoringexplained.php','','800','800');
}

// OPEN TERMS
function openforgotpass() {
	OpenShadowbox('forgotpass.php','','200','320');
}

// OPEN FEEDBACK FORM
function openfeedback() {
	OpenShadowbox('feedback.php','','370','500');
}

function refreshfeedback() {
	RefreshShadowbox('feedback.php','','370','500');
}


function speecharrowover(id) {
	document.getElementById('speecharrow-'+id).className='speech-arrow-over';
}

function speecharrowout(id) {
	document.getElementById('speecharrow-'+id).className='speech-arrow';
}

function comment_speecharrowover(id) {
	document.getElementById('dbcomment-speecharrow-'+id).className='dbcomment-speecharrow-over';
}

function comment_speecharrowout(id) {
	document.getElementById('dbcomment-speecharrow-'+id).className='dbcomment-speecharrow';
}

function showhidedbav(div) {
	document.getElementById('dbmedia-vidz').style.display='none';
	document.getElementById('dbmedia-audio').style.display='none';
	document.getElementById('dbmedia-'+div).style.display='block';
	document.getElementById('hiddenmediaposted').value=div;
}


// FETCH MUTUAL SCORES
var MutualScoresHttp;
function mutualscores(user) {
	MutualScoresHttp=Browser_Check(MutualScoresHttp);
	
	var url="ajax_mutualscores.php";
	var data="user="+user;
	
	MutualScoresHttp.open("POST",url,true);
	MutualScoresHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MutualScoresHttp.setRequestHeader("Content-length", data.length);
	MutualScoresHttp.setRequestHeader("Connection", "close");

	MutualScoresHttp.onreadystatechange = mutualscoresresult;
	MutualScoresHttp.send(data);	
}

function mutualscoresresult() {
	if(MutualScoresHttp.readyState==4)
	{			
		if(MutualScoresHttp.status == 200 || MutualScoresHttp.status == 0)
		{ 
			var GetResult=MutualScoresHttp.responseText;
			document.getElementById("mutual-scores").innerHTML=GetResult;
		}
		else {};
	}
}


// CONFIRM RESET PASSWORD CODE
var ResetCodeHttp;
function checkresetcode() {
	document.getElementById('resetcode-error').innerHTML='';
	var resetcode=document.getElementById('resetcode').value;
	var user=document.getElementById('user').value;
	ResetCodeHttp=Browser_Check(ResetCodeHttp);
	
	if(resetcode!='') {
		var url="ajax_checkresetcode.php";
		var data="resetcode="+resetcode+"&user="+user;
		
		ResetCodeHttp.open("POST",url,true);
		ResetCodeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ResetCodeHttp.setRequestHeader("Content-length", data.length);
		ResetCodeHttp.setRequestHeader("Connection", "close");
	
		ResetCodeHttp.onreadystatechange = checkresetcoderesult;
		ResetCodeHttp.send(data);	
	}
}

function checkresetcoderesult() {
	if(ResetCodeHttp.readyState==4)
	{			
		if(ResetCodeHttp.status == 200 || ResetCodeHttp.status == 0)
		{ 
			var GetResult=ResetCodeHttp.responseText;
			if(GetResult=='1') {
				document.getElementById("resetcode-wrapper").style.display='none';
				document.getElementById("resetpass-wrapper").style.display='block';
			}
			else {
				document.getElementById('resetcode-error').innerHTML='<font color="#CC0000">incorrect code entered!</font>';
			}
		}
		else {};
	}
}


// RESET PASSWORD
var ResetPassHttp;
function resetpass() {
	document.getElementById('resetpass-error').innerHTML='';
	var newpass=document.getElementById('newpass').value;
	var newpassrepeat=document.getElementById('newpassrepeat').value;
	var user=document.getElementById('user').value;
	if(newpassrepeat!=newpass) {
		document.getElementById('resetpass-error').innerHTML='<font color="#CC0000">repeat password does not match!</font>';
	}
	else {
		ResetPassHttp=Browser_Check(ResetPassHttp);
		
		var url="ajax_resetpass.php";
		var data="newpass="+newpass+"&user="+user;
		
		ResetPassHttp.open("POST",url,true);
		ResetPassHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ResetPassHttp.setRequestHeader("Content-length", data.length);
		ResetPassHttp.setRequestHeader("Connection", "close");
	
		ResetPassHttp.onreadystatechange = resetpassresult;
		ResetPassHttp.send(data);	
	}
}

function resetpassresult() {
	if(ResetPassHttp.readyState==4)
	{			
		if(ResetPassHttp.status == 200 || ResetPassHttp.status == 0)
		{ 
			var GetResult=ResetPassHttp.responseText;
			if(GetResult=='1') {
				document.getElementById("resetpass-wrapper").style.display='none';
				document.getElementById("resetpass-msg-wrapper").style.display='block';
			}
			else {
			}
		}
		else {};
	}
}


// SEND FORGOTTEN PASSWORD
var SendPassHttp;
function sendpass(n,id) {
	n = typeof(n) != 'undefined' ? n : '0';
	id = typeof(id) != 'undefined' ? id : '0';
	if(n==0) {
		var email=document.getElementById('forgotemail').value;
		var birthday=document.getElementById("birthday").value;
		var birthmonth=document.getElementById("birthmonth").value;
		var birthyear=document.getElementById("birthyear").value;
		var data="email="+email+"&birthday="+birthday+"&birthmonth="+birthmonth+"&birthyear="+birthyear+"&fromlogin=1";
	} else {
		var data="user="+id;
	}
	
	SendPassHttp=Browser_Check(SendPassHttp);
	
	//var url="ajax_sendpass.php";
	var url="sendpassword";
	
	SendPassHttp.open("POST",url,true);
	SendPassHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SendPassHttp.setRequestHeader("Content-length", data.length);
	SendPassHttp.setRequestHeader("Connection", "close");

	SendPassHttp.onreadystatechange = sendpassresult;
	SendPassHttp.send(data);	
}

function sendpassresult() {
	if(SendPassHttp.readyState==4)
	{			
		if(SendPassHttp.status == 200 || SendPassHttp.status == 0)
		{ 
			var GetResult=SendPassHttp.responseText;
			alert(GetResult);exit;
			var GetResultArr=GetResult.split('~');
			if(GetResultArr[1]=='1') {
				if(GetResultArr[0]=='1') {
					document.getElementById("passform").style.display='none';
					document.getElementById('forgotpass-message').innerHTML='<div align="center" style="margin:20px 0 0 0;">your password reset request has been sent to your registered email address.</div><div align="center" style="margin-top:10px; font-size:12px; font-weight:normal; color:#000;">Check your spam folder if the email does not arrive in 5 minutes.</div>';
					setTimeout("parent.Shadowbox.close()",4000);
				}
				else {
					document.getElementById('forgotpass-message').innerHTML='<font color="#CC0000"><br />details don\'t match!</font>';
				}
			}
			else {
				setTimeout("closepopup('fade')",5000);
			}
		}
		else alert("Retrieval Error: " + SendPassHttp.statusText);
	}
}

// FUNCTION TO CONFIRM COOKIE ACCEPTANCE ON SIGN IN
var AcceptCookiesHttp;
function cookiesaccepted(user) {

	AcceptCookiesHttp=Browser_Check(AcceptCookiesHttp);
	
	if(document.getElementById('acceptcookies').checked) {
		var url="ajax_cookiesaccepted.php";
		var data="user="+user;
		
		AcceptCookiesHttp.open("POST",url,true);
		AcceptCookiesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		AcceptCookiesHttp.setRequestHeader("Content-length", data.length);
		AcceptCookiesHttp.setRequestHeader("Connection", "close");
	
		AcceptCookiesHttp.onreadystatechange = cookiesacceptedresult;
		AcceptCookiesHttp.send(data);	
	} else {
		document.getElementById('acceptcookies').focus();
	}
}

function cookiesacceptedresult() {
	if(AcceptCookiesHttp.readyState==4)
	{			
		if(AcceptCookiesHttp.status == 200 || AcceptCookiesHttp.status == 0)
		{ 
			var GetResult=AcceptCookiesHttp.responseText;
			if(GetResult=='1') {
				parent.document.location.href = 'processlogin.php?ca';
			}
		}
		else {};
	}
}


// DONT SHOW PROFILE PIC UPLOAD BOX AGAIN ON SIGN IN
var StopPPBoxHttp;
function stopppbox() {
	StopPPBoxHttp=Browser_Check(StopPPBoxHttp);

	var url="ajax_stopppbox.php";
	var data="";
	
	StopPPBoxHttp.open("POST",url,true);
	StopPPBoxHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	StopPPBoxHttp.setRequestHeader("Content-length", data.length);
	StopPPBoxHttp.setRequestHeader("Connection", "close");

	StopPPBoxHttp.onreadystatechange = stopppboxresult;
	StopPPBoxHttp.send(data);	
}

function stopppboxresult() {
	if(StopPPBoxHttp.readyState==4)
	{			
		if(StopPPBoxHttp.status == 200 || StopPPBoxHttp.status == 0)
		{ 
			var GetResult=StopPPBoxHttp.responseText;
		}
		else {};
	}
}


// SEND FEEDBACK
var SendFeedbackHttp;
function sendfeedback() {
	var feedbacktext=document.getElementById('feedbacktext').value;
	SendFeedbackHttp=Browser_Check(SendFeedbackHttp);
	
	var url="ajax_sendfeedback.php";
	var data="feedbacktext="+feedbacktext;
	
	SendFeedbackHttp.open("POST",url,true);
	SendFeedbackHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SendFeedbackHttp.setRequestHeader("Content-length", data.length);
	SendFeedbackHttp.setRequestHeader("Connection", "close");

	SendFeedbackHttp.onreadystatechange = sendfeedbackresult;
	SendFeedbackHttp.send(data);	
}

function sendfeedbackresult() {
	if(SendFeedbackHttp.readyState==4)
	{			
		if(SendFeedbackHttp.status == 200 || SendFeedbackHttp.status == 0)
		{ 
			var GetResult=SendFeedbackHttp.responseText;
			if(GetResult=='1') {
				document.getElementById("feedbackform").style.display='none';
				document.getElementById('feedback-message').innerHTML='<div style="margin:100px 0 0 110px;">your feedback has been submitted.</div>';
				setTimeout("parent.Shadowbox.close()",2000);
			}
			else {
				document.getElementById('forgotpass-message').innerHTML='<font color="#CC0000">incorrect email</font>';
			}
		}
		else alert("Retrieval Error: " + SendFeedbackHttp.statusText);
	}
}


// SEND BUG REPORT
var SendBugReportHttp;
function sendbugreport() {
	var err=false;
	var bug=document.getElementById('bug').value;
	var userbrowser=document.getElementById('userbrowser').value;
	
	if(bug=='') {
		document.getElementById('bug').focus();
		err=true;
	}
	else if(userbrowser=='0') {
		document.getElementById('userbrowser').focus();
		err=true;
	}
	
	if(!err) {
		SendBugReportHttp=Browser_Check(SendBugReportHttp);
		
		var url="ajax_sendbugreport.php";
		var data="bug="+bug+"&userbrowser="+userbrowser;
		
		SendBugReportHttp.open("POST",url,true);
		SendBugReportHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SendBugReportHttp.setRequestHeader("Content-length", data.length);
		SendBugReportHttp.setRequestHeader("Connection", "close");
	
		SendBugReportHttp.onreadystatechange = sendbugreportresult;
		SendBugReportHttp.send(data);
	}
}

function sendbugreportresult() {
	if(SendBugReportHttp.readyState==4)
	{			
		if(SendBugReportHttp.status == 200 || SendBugReportHttp.status == 0)
		{ 
			var GetResult=SendBugReportHttp.responseText;
			if(GetResult=='1') {
				document.getElementById("bugform").style.display='none';
				document.getElementById('bugreport-message').innerHTML='<div align="center" style="margin:70px 0 0 0;">Thank you for your valued feedback :)<br /><br />We have received the bug report and will act on it soon.</div>';
				setTimeout("parent.Shadowbox.close()",4000);
			}
			else {
			}
		}
		else {};
	}
}


// GO TO DB WHEN NEW COMMENT IS CLICKED FROM NEW COMMENT POPUP
var GoToDbHttp;
function gotodb(id,comm) {
	GoToDbHttp=Browser_Check(GoToDbHttp);
	
	var url="ajax_gotodb.php";
	var data="db="+id+"&comm="+comm;
	
	GoToDbHttp.open("POST",url,true);
	GoToDbHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GoToDbHttp.setRequestHeader("Content-length", data.length);
	GoToDbHttp.setRequestHeader("Connection", "close");

	GoToDbHttp.onreadystatechange = gotodbresult;
	GoToDbHttp.send(data);	
}

function gotodbresult() {
	if(GoToDbHttp.readyState==4)
	{			
		if(GoToDbHttp.status == 200 || GoToDbHttp.status == 0)
		{ 
			var result=GoToDbHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				parent.document.location.href = 'profile.php?db='+resultArr[1];
			}
			else {
			}
		}
		else {};
	}
}


// FUNCTION TO HANDLE NEW COMMENT NOTIFY
var CommentNotifyHttp;
function commentnotify(db,type) {
	CommentNotifyHttp=Browser_Check(CommentNotifyHttp);
	
	if(type=='1') {
		document.getElementById("notify-email-status").style.display='none';
		document.getElementById("commnoteloader").style.display='block';
	}

	var url="ajax_commentnotify.php";
	var data="db="+db+"&type="+type;
	
	CommentNotifyHttp.open("POST",url,true);
	CommentNotifyHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	CommentNotifyHttp.setRequestHeader("Content-length", data.length);
	CommentNotifyHttp.setRequestHeader("Connection", "close");

	CommentNotifyHttp.onreadystatechange = commentnotifyresult;
	CommentNotifyHttp.send(data);	
}

function commentnotifyresult() {
	if(CommentNotifyHttp.readyState==4)
	{			
		if(CommentNotifyHttp.status == 200 || CommentNotifyHttp.status == 0)
		{ 
			var result=CommentNotifyHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[1]=='1') {
				document.getElementById("notify-email-status").style.display='block';
				document.getElementById("commnoteloader").style.display='none';
			}
			if(resultArr[0]=='1') { // IF TURNED ON
				if(resultArr[1]=='1') { // IF TOGGLE EMAIL
					$(".qtip").remove();
					loadQtipAboveMaindbFix('notify-email-status','Turn OFF email notifications for this dbee');
					document.getElementById("notify-email-status").className='radioTick';
				} else if(resultArr[1]=='2') { // IF TOGGLE POPUP NOTES
				}
			}
			else if(resultArr[0]=='0') { // IF TURNED OFF
				if(resultArr[1]=='1') { // IF TOGGLE EMAIL
					$(".qtip").remove();
					loadQtipAboveMaindbFix('notify-email-status','Turn ON email notifications for this dbee');
					document.getElementById("notify-email-status").className='radio';
				} else if(resultArr[1]=='2') { // IF TOGGLE POPUP NOTES
					var countdown=window.parent.document.getElementById('notifications-top-comment-hidden').value-resultArr[3];
					window.parent.document.getElementById('notifications-top-comment-hidden').value=countdown;
					window.parent.document.getElementById('sticky-left-newcomm-num').innerHTML=window.parent.document.getElementById('notifications-top-comment-hidden').value;
					$(".cmntnote-"+resultArr[2]).remove();
					if(countdown<=0) {
						window.parent.document.getElementById('sticky-left-newcomm').style.display='none';
						document.getElementById('nocomment-msg').style.display='block';
					}
				}
			}
			if(resultArr[1]=='1') {
				setTimeout("closepopup('fade')",3000);
				setTimeout("document.getElementById('commentnotify-popup').innerHTML=''",4000);
			}
		}
		else {};
	}
}


// CHECK LOGIN
function checkLogin() {
	if(document.getElementById("loginemail").value=='' || document.getElementById("loginemail").value=='registered email') {
//		document.getElementById("loginemail").style.border='1px solid #F2D904';
		document.getElementById("loginemail").style.backgroundColor='#F3F2F1';
		
		document.getElementById("loginemail").focus();	
		return false;
	}
	else
		document.getElementById("loginemail").style.backgroundColor='#FFF';

	if(document.getElementById("loginpass").value=='') {
//		document.getElementById("loginpass").style.border='1px solid #F2D904';
		document.getElementById("loginpass").style.backgroundColor='#F3F2F1';
		document.getElementById("loginpass").focus();
		return false;
	}
	else
		document.getElementById("loginpass").style.backgroundColor='#FFF';

	return true;
}

// CHECK SEARCH
function checksearch() {
	var searchid=document.getElementById("searchid").value;
	
	return false;
	if(searchtype!='') {
		if(searchtype=='1') {
			var dbee=document.getElementById('searchid').value;
			document.searchform.action='profile.php?db='+dbee;
		}
		else if(searchtype=='2') {
			var user=document.getElementById('searchid').value;
			document.searchform.action='profile.php?user='+user;
		}
	}
}

function seemoresearch(id) {
	document.getElementById('searchtype').value=id;
	document.searchform.submit();
}

function togglesearchres(n) {
	document.getElementById('search-results-dbees').style.display='none';
	document.getElementById('search-results-users').style.display='none';
	document.getElementById('search-results-dbees-tab').className='search-results-title';
	document.getElementById('search-results-users-tab').className='search-results-title';

	document.getElementById(n).style.display='block';
	document.getElementById(n+'-tab').className='search-results-title-active';
}

// FILL CATEGORY SORT OPTIONS DIV ON HOME
var CategorySortHttp;
function fillcategory() {
	CategorySortHttp=Browser_Check(CategorySortHttp);	
	//var url="ajax_categorysortoptions.php";
	var url="/myhome/categorysort";
	var data="";	
	CategorySortHttp.open("POST",url,true);
	CategorySortHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	CategorySortHttp.setRequestHeader("Content-length", data.length);
	CategorySortHttp.setRequestHeader("Connection", "close");
	CategorySortHttp.onreadystatechange = fillcategoryresult;
	CategorySortHttp.send(data);	
}

function fillcategoryresult() {
	if(CategorySortHttp.readyState==4)
	{			
		if(CategorySortHttp.status == 200 || CategorySortHttp.status == 0)
		{ 
			var result=CategorySortHttp.responseText;
			document.getElementById("category-options").innerHTML=result;
		}
		else {};
	}
}

// FILL DISPLAY BY OPTIONS DIV ON HOME
var DisplayByHttp;
function filldisplayby() {
	DisplayByHttp=Browser_Check(DisplayByHttp);
	
	//var url="ajax_displayby.php";
	var url="/myhome/displayby";
	var data="";
	
	DisplayByHttp.open("POST",url,true);
	DisplayByHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DisplayByHttp.setRequestHeader("Content-length", data.length);
	DisplayByHttp.setRequestHeader("Connection", "close");

	DisplayByHttp.onreadystatechange = filldisplaybyresult;
	DisplayByHttp.send(data);	
}

function filldisplaybyresult() {
	if(DisplayByHttp.readyState==4)
	{			
		if(DisplayByHttp.status == 200 || DisplayByHttp.status == 0)
		{ 
			var result=DisplayByHttp.responseText;
			document.getElementById("display-by-options").innerHTML=result;
		}
		else {};
	}
}


// FILL GROUP FEED VIEW OPTIONS DIV ON PROFILE
var GroupFeedOptionsHttp;
function fillgroupfeedoptions(user) {
	GroupFeedOptionsHttp=Browser_Check(GroupFeedOptionsHttp);
	
	var url="ajax_groupfeedoptions.php";
	var data="user="+user;
	
	GroupFeedOptionsHttp.open("POST",url,true);
	GroupFeedOptionsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupFeedOptionsHttp.setRequestHeader("Content-length", data.length);
	GroupFeedOptionsHttp.setRequestHeader("Connection", "close");

	GroupFeedOptionsHttp.onreadystatechange = fillgroupfeedoptionsresult;
	GroupFeedOptionsHttp.send(data);	
}

function fillgroupfeedoptionsresult() {
	if(GroupFeedOptionsHttp.readyState==4)
	{			
		if(GroupFeedOptionsHttp.status == 200 || GroupFeedOptionsHttp.status == 0)
		{ 
			var result=GroupFeedOptionsHttp.responseText;
			document.getElementById("groupfeed-profile-options").innerHTML=result;
		}
		else {};
	}
}

// OPEN DIV TO POST DBEE
function showdbeepostoption(id) {
	document.getElementById("DbeeTextTab").className='dbee-post-tab-Text-close';
	document.getElementById("DbeeLinkTab").className='dbee-post-tab-Link-close';
	document.getElementById("DbeePixTab").className='dbee-post-tab-Pix-close';
	document.getElementById("DbeeVidzTab").className='dbee-post-tab-Vidz-close';
	document.getElementById("DbeePollsTab").className='dbee-post-tab-Polls-close';
	document.getElementById("Dbee"+id+"Tab").className='dbee-post-tab-'+id+'-open';

	document.getElementById("dbee-post-options-wrapper").style.display='block';
	document.getElementById("DbeeText").style.display='none';
	document.getElementById("DbeeLink").style.display='none';
	document.getElementById("DbeePix").style.display='none';
	document.getElementById("DbeeVidz").style.display='none';
	document.getElementById("DbeePolls").style.display='none';
	document.getElementById("DbeeCat").style.display='none';
	$("#Dbee"+id).fadeIn("slow");
//	document.getElementById("Dbee"+id).style.display='block';
	
	if(id=='Text') {
		document.getElementById('dbee-post-options-wrapper').style.borderTopLeftRadius = "0px";
		document.getElementById('dbee-post-options-wrapper').style.borderTopRightRadius = "8px";
	}
	else if(id=='Polls') {
		document.getElementById('dbee-post-options-wrapper').style.borderTopLeftRadius = "8px";
		document.getElementById('dbee-post-options-wrapper').style.borderTopRightRadius = "0px";
	}
	else {
		document.getElementById('dbee-post-options-wrapper').style.borderTopLeftRadius = "8px";
		document.getElementById('dbee-post-options-wrapper').style.borderTopRightRadius = "8px";
	}

	document.getElementById("dbeetype").value=id;
}
// OPEN DIV TO POST DBEE
function closedbeepostoption() {
//	document.getElementById("dbee-post-options-wrapper").style.display='none';
	$("#dbee-post-options-wrapper").slideUp("slow");
	document.getElementById("DbeeTextTab").className='dbee-post-tab-Text-close';
	document.getElementById("DbeeLinkTab").className='dbee-post-tab-Link-close';
	document.getElementById("DbeePixTab").className='dbee-post-tab-Pix-close';
	document.getElementById("DbeeVidzTab").className='dbee-post-tab-Vidz-close';
	document.getElementById("DbeePollsTab").className='dbee-post-tab-Polls-close';
}

// OPEN DIV TO REPLY DBEE
function showreplyoption(id) {
	$('#dbreply-icon-text').fadeTo(30, 0.20);
	$('#dbreply-icon-link').fadeTo(30, 0.20);
	$('#dbreply-icon-pix').fadeTo(30, 0.20);
	$('#dbreply-icon-vidz').fadeTo(30, 0.20);
	$('#dbreply-icon-'+id).fadeTo(30, 1);

	document.getElementById("dbreply-text").style.display='none';
	document.getElementById("dbreply-link").style.display='none';
	document.getElementById("dbreply-pix").style.display='none';
	document.getElementById("dbreply-vidz").style.display='none';
	document.getElementById("dbreply-"+id).style.display='block';
	
	if(id!='text')
		document.getElementById("dbcommentcountdown").style.display='none';
	else
		document.getElementById("dbcommentcountdown").style.display='block';
	
	document.getElementById("replytype").value=id;
}

// ATTACH LINK TO DBEE
var AttachlinkHttp;
function attachlinkdbee() {
	var err=false;
	var dbeeurl=document.getElementById('PostLink').value;
	if(dbeeurl=='' || dbeeurl=='paste link here') err=true;
	
	if(!err) {
		AttachlinkHttp=Browser_Check(AttachlinkHttp);
		
		document.getElementById('LinkInfoWrapper').style.display='none';
		document.getElementById('attachlinkloader').style.display='block';
		
		var url="/myhome/linkdetail";
		var data="dbeeurl="+dbeeurl;
		
		AttachlinkHttp.open("POST",url,true);
		AttachlinkHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		AttachlinkHttp.setRequestHeader("Content-length", data.length);
		AttachlinkHttp.setRequestHeader("Connection", "close");
	
		AttachlinkHttp.onreadystatechange = attachlinkdbeeresult;
		AttachlinkHttp.send(data);	
	}
}

function attachlinkdbeeresult() {
	if(AttachlinkHttp.readyState==4)
	{			
		if(AttachlinkHttp.status == 200 || AttachlinkHttp.status == 0)
		{ 
			var GetResult=AttachlinkHttp.responseText;
			if(GetResult!='0' && GetResult!='-1' && GetResult!='') {
				document.getElementById('attachlinkerror').style.display='none';
				document.getElementById('attachlinkloader').style.display='none';
				document.getElementById('LinkInfoWrapper').style.display='block';
				document.getElementById('LinkInfo').innerHTML=GetResult;
			}
			else {
				if(GetResult=='0' || GetResult=='') {
					document.getElementById('attachlinkloader').style.display='none';
					document.getElementById('attachlinkerror-text').innerHTML='The website addresss was not found.';
					document.getElementById('attachlinkerror').style.display='block';
				}
				else if(GetResult=='-1') {
					document.getElementById('attachlinkloader').style.display='none';
					document.getElementById('attachlinkerror-text').innerHTML='To post a video click on \'db vidz\'';
					document.getElementById('attachlinkerror').style.display='block';
				}
			}
		}
		else alert("Retrieval Error: " + AttachlinkHttp.statusText);
	}
}

// VALIDATE VIDEO URL
var ValidateVideoHttp;
function validatevideo(vid) {
	ValidateVideoHttp=Browser_Check(ValidateVideoHttp);

	//var url="ajax_validatevideo.php";
	var url="/dbinsert/validatevideo";
	var data="video="+vid;
	
	ValidateVideoHttp.open("POST",url,true);
	ValidateVideoHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ValidateVideoHttp.setRequestHeader("Content-length", data.length);
	ValidateVideoHttp.setRequestHeader("Connection", "close");

	ValidateVideoHttp.onreadystatechange = validatevideoresult;
	ValidateVideoHttp.send(data);	
}

function validatevideoresult() {
	if(ValidateVideoHttp.readyState==4)
	{			
		if(ValidateVideoHttp.status == 200 || ValidateVideoHttp.status == 0)
		{ 
			var GetResult=ValidateVideoHttp.responseText;
			
			if(GetResult=='1') {			
				return true;
			}
			else {
				
				return false;
			}
		}
		else alert("Retrieval Error: " + ValidateVideoHttp.statusText);
	}
}


// SHOW/HIDE DB POST CATEGORY OPTIONS
function showdbpostcat(type) {
	var err=false;
	if(type=='Text') {
		if(document.getElementById('PostText').value=="what's on your mind?") {
			err=true;
			document.getElementById('PostText').focus();
		}
	}
	else if(type=='Link') {
		if(document.getElementById('LinkInfo').innerHTML=="") {
			err=true;
			document.getElementById('PostLink').focus();
		}
	}
	else if(type=='Pix') {
		if(!(document.getElementById('PostPix')) || document.getElementById('PostPix').value=="") {
			err=true;
			document.getElementById('ajaxfilename').focus();
		}
	}
	else if(type=='Vidz') {
		if(document.getElementById('PostVidz').value=="paste YouTube link here" && document.getElementById('PostAudio').value=="paste SoundCloud embed code here") {
			err=true;
			var mediaposted=document.getElementById('hiddenmediaposted').value;
			if(mediaposted=='vidz')
				document.getElementById('PostVidz').focus();
			else if(mediaposted=='audio')
				document.getElementById('PostAudio').focus();
		}
	}
	
	if(!err) {
		document.getElementById('Dbee'+type).style.display='none';
		document.getElementById('dbpostcat-return').innerHTML='<div style="float:right; margin-left:25px; font-size:14px;">3. categorize db</div><div style="float:right; font-size:14px; color:#999999; cursor:pointer;" onclick="javascript:hidedbpostcat(\''+type+'\')">1. add text&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. add hashtag</div>';
		document.getElementById('DbeeCat').style.display='block';
	}
}

function hidedbpostcat(type) {
	document.getElementById('DbeeCat').style.display='none';
	document.getElementById('Dbee'+type).style.display='block';
}
// SHOW/HIDE DB POST CATEGORY OPTIONS


// POST DBEE
var PostdbeeHttp;
function postdbee(group,reloadfeed) {
	group = typeof(group) != 'undefined' ? group : '0';
	reloadfeed = typeof(reloadfeed) != 'undefined' ? reloadfeed : '1';
	var err=false;
	var caterr=false;
	var dbeetype=document.getElementById('dbeetype').value;
	var user=document.getElementById('dbeeuser').value;
	
	if(dbeetype=='Text') {
		if(document.getElementById('twitter-tag-text') && document.getElementById('twitter-tag-text').value!='# hashtag/keyword') {
			var twittertag=document.getElementById('twitter-tag-text').value;
		} else var twittertag='';
		var text=document.getElementById('PostText').value;
		text=text.replace(/&/g,'%26');
		if(text!="" && text!="what's on your mind?") {
			var data="text="+text+"&user="+user+"&dbeetype="+dbeetype+"&twittertag="+twittertag;
		}
		else err=true;
		
	}
	
	if(dbeetype=='Link') {
		var url=document.getElementById('PostLink').value;
		var linktitle=document.getElementById('LinkTitle').value;
		var linkdesc=document.getElementById('LinkDesc').value;
		if(document.getElementById('twitter-tag-link') && document.getElementById('twitter-tag-link').value!='# hashtag/keyword') {
			var twittertag=document.getElementById('twitter-tag-link').value;
		} else var twittertag='';
		var userlinkdesc=document.getElementById('PostLinkDesc').value;
		userlinkdesc=userlinkdesc.replace(/&/g,'%26');
		if(linktitle!="") {
			var data="url="+url+"&linktitle="+linktitle+"&linkdesc="+linkdesc+"&userlinkdesc="+userlinkdesc+"&user="+user+"&dbeetype="+dbeetype+"&twittertag="+twittertag;
		
		}
		else err=true;
	}
	
	if(dbeetype=='Pix') {
		var pic=document.getElementById('PostPix').value;
		if(document.getElementById('twitter-tag-pix') && document.getElementById('twitter-tag-pix').value!='# hashtag/keyword') {
			var twittertag=document.getElementById('twitter-tag-pix').value;
		} else var twittertag='';
		var picdesc=document.getElementById('PostPixDesc').value;
		picdesc=picdesc.replace(/&/g,'%26');
		if(pic!="") {
			var data="pic="+pic+"&picdesc="+picdesc+"&user="+user+"&dbeetype="+dbeetype+"&twittertag="+twittertag;
		}
		else err=true;
	}
	
	if(dbeetype=='Vidz')
	{
		var vid=document.getElementById('PostVidz').value;
		var audio=document.getElementById('PostAudio').value;
		audio=audio.replace(/&/g,'%26');
		if(document.getElementById('twitter-tag-vidz') && document.getElementById('twitter-tag-vidz').value!='# hashtag/keyword') {
			var twittertag=document.getElementById('twitter-tag-vidz').value;
		} else var twittertag='';
		var VidChk=validatevideo(vid);
		var VidChk=true;
		var videosite = '';
		var videoid = '';		
		if(VidChk)
		{
			document.getElementById('videoerror').style.display='none';
			var VideoURLArr=vid.split(".com");
			if(VideoURLArr[0]=='http://www.youtube' || VideoURLArr[0]=='http://youtube' || VideoURLArr[0]=='https://www.youtube' || VideoURLArr[0]=='https://youtube' || VideoURLArr[0]=='www.youtube' || VideoURLArr[0]=='youtube') {
				videosite="Youtube";
				var VideoURLIDArr=vid.split("watch?v=")[1].split("&");
				videoid=VideoURLIDArr[0];
			}
			else if(VideoURLArr[0]=='http://www.vimeo' || VideoURLArr[0]=='http://vimeo' || VideoURLArr[0]=='www.vimeo' || VideoURLArr[0]=='vimeo') {
				videosite="Vimeo";
				var VideoURLIDArr=vid.split(".com/");
				videoid=VideoURLIDArr[1];
			}
			else if(VideoURLArr[0]=='http://www.dailymotion' || VideoURLArr[0]=='http://dailymotion' || VideoURLArr[0]=='www.dailymotion' || VideoURLArr[0]=='dailymotion') {
				videosite="Dailymotion";
				var VideoURLIDArr=vid.split("video/")[1].split('#');
				videoid=VideoURLIDArr[0];
			}
			
			var viddesc=document.getElementById('PostVidzDesc').value;
			viddesc=viddesc.replace(/&/g,'%26');
			if(vid!="" || audio!="") {
				var data="vid="+vid+"&viddesc="+viddesc+"&videosite="+videosite+"&videoid="+videoid+"&audio="+audio+"&user="+user+"&dbeetype="+dbeetype+"&twittertag="+twittertag;
		
			}
		}
		else {			
			err=true;
			document.getElementById('videoerror').style.display='block';
		}
	}

	if(dbeetype=='Polls') {
		var twittertag='';
		var polltext=document.getElementById('PollText').value;
		var polloption1=document.getElementById('poll-option-1').value;
		var polloption2=document.getElementById('poll-option-2').value;
		var polloption3=document.getElementById('poll-option-3').value;
		var polloption4=document.getElementById('poll-option-4').value;
		if(polltext=='write poll text here') { document.getElementById('PollText').focus(); err=true; }
		if(polloption1=='') { document.getElementById('poll-option-1').focus(); err=true; }
		if(polloption2=='') { document.getElementById('poll-option-2').focus(); err=true; }
		if(polloption3=='') { document.getElementById('poll-option-3').focus(); err=true; }
		if(polltext!="" && polloption1!="" && polloption2!="" && polloption3!="") {
			var polltext=document.getElementById('PollText').value;
			var data="polltext="+polltext+"&polloption1="+polloption1+"&polloption2="+polloption2+"&polloption3="+polloption3+"&polloption4="+polloption4+"&user="+user+"&dbeetype="+dbeetype+"&twittertag="+twittertag;  
		}
		else err=true;
	}

	if(dbeetype!='Polls') {
		var cat=document.getElementById('db-post-cat').value;
		if(cat=='') {
			err=true;
			caterr=true;
		}
		
		if(caterr) {
			document.getElementById('cat-req-msg').innerHTML='Required';
			$('#cat-req-msg').fadeIn(20000);
		}
	}

	if(!err) {
		PostdbeeHttp=Browser_Check(PostdbeeHttp);
		$('#cat-req-msg').fadeOut('slow');
		
		document.getElementById('signuploader').style.display='block';
		
		var url="/myhome/dbinsertdata";
		data+="&cat="+cat+"&group="+group;				
		PostdbeeHttp.open("POST",url,true);
		PostdbeeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		PostdbeeHttp.setRequestHeader("Content-length", data.length);
		PostdbeeHttp.setRequestHeader("Connection", "close");
	
//		PostdbeeHttp.onreadystatechange = postdbeeresult;
		PostdbeeHttp.onreadystatechange = function () {
			postdbeeresult(reloadfeed);
		};
		PostdbeeHttp.send(data);	
	}
}

function postdbeeresult(reloadfeed) {
	if(PostdbeeHttp.readyState==4)
	{			
		if(PostdbeeHttp.status == 200 || PostdbeeHttp.status == 0)
		{ 

			var frompop=document.getElementById('frompop').value;
			var GetResult=PostdbeeHttp.responseText;			
			var resultArr=GetResult.split('~');
			if(resultArr[0]=='1') {
				
				if(document.getElementById('twitter-tag-text')) {
					document.getElementById('twitter-tag-text').value='# hashtag/keyword';
				}
				if(document.getElementById('twitter-tag-link')) {
					document.getElementById('twitter-tag-link').value='# hashtag/keyword';
				}
				if(document.getElementById('twitter-tag-pix')) {
					document.getElementById('twitter-tag-pix').value='# hashtag/keyword';
				}
				if(document.getElementById('twitter-tag-vidz')) {
					document.getElementById('twitter-tag-vidz').value='# hashtag/keyword';
				}

				$(".check").each(function(){
					if($(this).attr('checked')){
						$(this).removeAttr("checked");
					}
				});

				document.getElementById('signuploader').style.display='none';
				document.getElementById('PostText').value="what's on your mind?";
				document.getElementById('PostLink').value="paste link here";
				document.getElementById('LinkInfo').innerHTML="";
				document.getElementById('LinkInfoWrapper').style.display='none';
				document.getElementById('ajaxfilename').value='';
				document.getElementById('PostPixDesc').value='write something about this picture...';
				document.getElementById('PostVidz').value='paste YouTube link here';
				document.getElementById('PostAudio').value='paste SoundCloud embed code here';
				document.getElementById('PostVidzDesc').value='write something about this media...';
				document.getElementById('PollText').value='write poll text here';
				document.getElementById('poll-option-1').value='Yes';
				document.getElementById('poll-option-2').value='No';
				document.getElementById('poll-option-3').value='May be';
				document.getElementById('poll-option-4').value='optional';
				document.getElementById('dbeePix_upload_area').innerHTML='<div style="margin-top:12px">Preview your picture</div>';
				if(reloadfeed=='1') {
				setTimeout('reloadFeeds()',700);
				document.getElementById('dbee-post-options-wrapper').style.display='none';
				} else {
					setTimeout("closepopup('fade')",2000);
				}
				if(resultArr[1]!=0) setTimeout('parent.reloadGroupFeeds()',700); // RELOAD GROUP DBEE FEED IF POSTED WITHIN A GROUP
				if(frompop=='1') {
					$('#dbpostmsg').fadeIn('slow');
					setTimeout("parent.Shadowbox.close()",3000);
				}
				showdbeepostoption('Text');
			}
		}
		else alert("Retrieval Error: " + PostdbeeHttp.statusText);
	}
}


// OPEN EDIT DBEE
function openeditdbee() {
	document.getElementById('non-editable').style.display='none';
	document.getElementById('editable').style.display='block';
	var dbtype=document.getElementById('dbeetype').value;
	if(dbtype=='1') document.getElementById('PostText').focus();
	else if(dbtype=='2') document.getElementById('PostLinkDesc').focus();
	else if(dbtype=='3') document.getElementById('PostPixDesc').focus();
	else if(dbtype=='4') document.getElementById('PostVidzDesc').focus();
}

var EditdbeeHttp;
function editdbee() {
	var id=document.getElementById('dbid').value;
	var err=false;
	var dbeetype=document.getElementById('dbeetype').value;
	if(dbeetype=='1') {
		var text=document.getElementById('PostText').value;
		text=text.replace(/&/g,'%26');
		if(text!="" && text!="what's on your mind?") {
			var data="text="+text+"&id="+id+"&dbeetype="+dbeetype;
		}
		else err=true;
	}
	
	if(dbeetype=='2') {
		var userlinkdesc=document.getElementById('PostLinkDesc').value;
		userlinkdesc=userlinkdesc.replace(/&/g,'%26');
		if(userlinkdesc!="") {
			var data="userlinkdesc="+userlinkdesc+"&id="+id+"&dbeetype="+dbeetype;
		}
		else err=true;
	}
	
	if(dbeetype=='3') {
		var picdesc=document.getElementById('PostPixDesc').value;
		picdesc=picdesc.replace(/&/g,'%26');
		if(picdesc!="") {
			var data="picdesc="+picdesc+"&id="+id+"&dbeetype="+dbeetype;
		}
		else err=true;
	}
	
	if(dbeetype=='4')
	{
		var viddesc=document.getElementById('PostVidzDesc').value;
		viddesc=viddesc.replace(/&/g,'%26');
		if(viddesc!="") {
			var data="viddesc="+viddesc+"&id="+id+"&dbeetype="+dbeetype;
		}
		else err=true;
	}

	if(!err) {
		EditdbeeHttp=Browser_Check(EditdbeeHttp);
		
		var url="ajax_editdbee.php";
		
		EditdbeeHttp.open("POST",url,true);
		EditdbeeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditdbeeHttp.setRequestHeader("Content-length", data.length);
		EditdbeeHttp.setRequestHeader("Connection", "close");
	
		EditdbeeHttp.onreadystatechange = editdbeeresult;
		EditdbeeHttp.send(data);	
	}
}

function editdbeeresult() {
	if(EditdbeeHttp.readyState==4)
	{			
		if(EditdbeeHttp.status == 200 || EditdbeeHttp.status == 0)
		{ 
			var GetResult=EditdbeeHttp.responseText;
			var resultArr=GetResult.split('~#~');
			if(resultArr[0]=='1') {
				document.getElementById('editable').style.display='none';
				document.getElementById('non-editable').innerHTML=resultArr[1];
				document.getElementById('non-editable').style.display='block';
				$('#msg-db-updated').fadeIn('slow');
				setTimeout("$('#msg-db-updated').fadeOut('slow')",2000);
			}
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE VISIT
var InitialFeedHttp;
function fetchintialfeeds(showloader) {
//	changedbfeedtabClass(1);
	showloader = typeof(showloader) != 'undefined' ? showloader : '1';
	document.getElementById('all-dbees-home').className='feed-link-active';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	if(showloader=='1')
		document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('startnewall').value='5';
	InitialFeedHttp=Browser_Check(InitialFeedHttp);
	
	var url="/myhome/fetchdbee";
	var data="check=0&initial=1";
	if(showloader=='0') {
		var end=document.getElementById('reloadend').value;
		end=parseInt(end)+5;
		data=data+"&end="+end;
	}
	
	InitialFeedHttp.open("POST",url,true);
	InitialFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	InitialFeedHttp.setRequestHeader("Content-length", data.length);
	InitialFeedHttp.setRequestHeader("Connection", "close");

	InitialFeedHttp.onreadystatechange = initialfeedresult;
	InitialFeedHttp.send(data);	
}

function initialfeedresult()
{

	if(InitialFeedHttp.readyState==4)
	{			
		if(InitialFeedHttp.status == 200 || InitialFeedHttp.status == 0)
		{
			var result=InitialFeedHttp.responseText;
			
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='all';
			document.getElementById('filter-label').style.display='none';			
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];

			document.getElementById('dbee-feed-following').className='feed-link';
			document.getElementById('dbee-feed-favourite').className='feed-link';
			document.getElementById('dbee-feed-category').className='feed-link';
			document.getElementById('dbee-feed-displayby').className='feed-link';
			
			/*
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-following').fadeTo(30, 0.60);
				$('#dbee-feed-favourite').fadeTo(30, 0.60);
				$('#dbee-feed-mostcommented').fadeTo(30, 0.60);
			}
			*/
			
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
					var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
					return false;
				});
			}
			
/*
			$('a.plus').click(function(){
			   var id = 'collapse' + $(this).attr('dbee-num');
		       $('div#' + id).slideToggle();
			   return false;
			});
*/
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE WHEN MY COMMENTS IS CLICKED
var MyCommentsFeedHttp;
function dbfeedmycomments(n,id) {	
	n = typeof(n) != 'undefined' ? n : '0';
	id = typeof(id) != 'undefined' ? id : '0';
	if(n==0) {
		document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
		document.getElementById('all-dbees-home').className='feed-link';
		document.getElementById('my-comments-home').className='feed-link-active';
		document.getElementById('my-dbees-home').className='feed-link';
		document.getElementById('dbee-feed-following').className='feed-link';
		document.getElementById('dbee-feed-favourite').className='feed-link';
		document.getElementById('dbee-feed-category').className='feed-link';
		document.getElementById('dbee-feed-displayby').className='feed-link';
	}
	else if(n==1) {
		document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
		document.getElementById('my-dbees-profile').className='feed-link feed-link-border';
		if(document.getElementById('my-redbees-profile'))
			document.getElementById('my-redbees-profile').className='feed-link feed-link-border';
		document.getElementById('my-comments-profile').className='feed-link-active feed-link-border';
		document.getElementById('my-leaguepos-profile').className='feed-link feed-link-border';
		document.getElementById('my-followers-profile').className='feed-link feed-link-border';
		document.getElementById('my-following-profile').className='feed-link feed-link-border';
		document.getElementById('my-groups-profile').className='feed-link';
	}
	
	document.getElementById('startnewmycomments').value='5';
	
	MyCommentsFeedHttp=Browser_Check(MyCommentsFeedHttp);
	
	var url="/Comment/index";
	var data="user="+id;
	
	MyCommentsFeedHttp.open("POST",url,true);
	MyCommentsFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MyCommentsFeedHttp.setRequestHeader("Content-length", data.length);
	MyCommentsFeedHttp.setRequestHeader("Connection", "close");

	MyCommentsFeedHttp.onreadystatechange = function () {
        if(n==0) dbfeedmycommentsresultfromhome();
		else if(n==1) dbfeedmycommentsresult();
    };
	MyCommentsFeedHttp.send(data);	
}

function dbfeedmycommentsresult()
{
	if(MyCommentsFeedHttp.readyState==4)
	{
		if(MyCommentsFeedHttp.status == 200 || MyCommentsFeedHttp.status == 0)
		{
			var result=MyCommentsFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='mycomments';
			document.getElementById('my-dbees').innerHTML=resultArr[0];
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}

function dbfeedmycommentsresultfromhome()
{
	if(MyCommentsFeedHttp.readyState==4)
	{
		if(MyCommentsFeedHttp.status == 200 || MyCommentsFeedHttp.status == 0)
		{
			var result=MyCommentsFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='mycomments';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			/*
			document.getElementById('dbee-feed-mostcommented').className='view-mostcommented-feed';
			document.getElementById('dbee-feed-all').className='view-feed-active-fade';
			document.getElementById('dbee-feed-following').className='view-following-feed-fade';
			document.getElementById('dbee-feed-favourite').className='view-favourite-feed-fade';
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-mostcommented').fadeTo(30, 0.60);
				$('#dbee-feed-following').fadeTo(30, 0.60);
				$('#dbee-feed-favourite').fadeTo(30, 0.60);
			}
			*/
			openFadePopup();
			
			var idsArr=resultArr[3].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE WHEN FOLLOWING IS CLICKED
var FollowingFeedHttp;
function dbfeedfollowing() {

	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('all-dbees-home').className='feed-link';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	document.getElementById('dbee-feed-favourite').className='feed-link';
	document.getElementById('dbee-feed-following').className='feed-link-active';
	document.getElementById('startnewfollowing').value='5';
//	changedbfeedtabClass(2);
	FollowingFeedHttp=Browser_Check(FollowingFeedHttp);
	
	var url="/following/index";
	var data="";
	FollowingFeedHttp.open("POST",url,true);
	FollowingFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FollowingFeedHttp.setRequestHeader("Content-length", data.length);
	FollowingFeedHttp.setRequestHeader("Connection", "close");

	FollowingFeedHttp.onreadystatechange = dbfeedfollowingresult;
	FollowingFeedHttp.send(data);	
}

function dbfeedfollowingresult()
{
	if(FollowingFeedHttp.readyState==4)
	{			
		if(FollowingFeedHttp.status == 200 || FollowingFeedHttp.status == 0)
		{
			var result=FollowingFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='following';
			document.getElementById('filter-label').style.display='none';
			document.getElementById('newdbcount-wrapper').style.display='none';
			document.getElementById('icon-dbfeed-buzz-following').className='icon-dbfeed-buzz';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			/*
			document.getElementById('dbee-feed-following').className='view-following-feed';
			document.getElementById('dbee-feed-all').className='view-feed-active-fade';
			document.getElementById('dbee-feed-favourite').className='view-favourite-feed-fade';
			document.getElementById('dbee-feed-mostcommented').className='view-mostcommented-feed-fade';
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-following').fadeTo(30, 1);
				$('#dbee-feed-all').fadeTo(30, 0.60);
				$('#dbee-feed-favourite').fadeTo(30, 0.60);
				$('#dbee-feed-mostcommented').fadeTo(30, 0.60);
			}
			*/

			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE WHEN FAVOURITE IS CLICKED
var FavouriteFeedHttp;
function dbfeedfavourite() {
	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('all-dbees-home').className='feed-link';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	document.getElementById('dbee-feed-favourite').className='feed-link-active';
	document.getElementById('dbee-feed-following').className='feed-link';
	document.getElementById('startnewfav').value='5';
//	changedbfeedtabClass(2);
	FavouriteFeedHttp=Browser_Check(FavouriteFeedHttp);
	
	var url="/favourites/index";
	var data="";
	
	FavouriteFeedHttp.open("POST",url,true);
	FavouriteFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FavouriteFeedHttp.setRequestHeader("Content-length", data.length);
	FavouriteFeedHttp.setRequestHeader("Connection", "close");

	FavouriteFeedHttp.onreadystatechange = dbfeedfavouriteresult;
	FavouriteFeedHttp.send(data);	
}

function dbfeedfavouriteresult()
{
	if(FavouriteFeedHttp.readyState==4)
	{
		if(FavouriteFeedHttp.status == 200 || FavouriteFeedHttp.status == 0)
		{
			var result=FavouriteFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='favourite';
			document.getElementById('filter-label').style.display='none';
			document.getElementById('newdbcount').style.display='none';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			/*
			document.getElementById('dbee-feed-favourite').className='view-favourite-feed';
			document.getElementById('dbee-feed-all').className='view-feed-active-fade';
			document.getElementById('dbee-feed-following').className='view-following-feed-fade';
			document.getElementById('dbee-feed-mostcommented').className='view-mostcommented-feed-fade';
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-favourite').fadeTo(30, 1);
				$('#dbee-feed-all').fadeTo(30, 0.60);
				$('#dbee-feed-following').fadeTo(30, 0.60);
				$('#dbee-feed-mostcommented').fadeTo(30, 0.60);
			}
			*/
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE WHEN MOST COMMENTED IS CLICKED
var MostCommentedFeedHttp;
function dbfeedmostcommented(n) {
	n = typeof(n) != 'undefined' ? n : '0';
	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	if(n==0) {
		document.getElementById('all-dbees-home').className='feed-link';
		document.getElementById('my-comments-home').className='feed-link';
		document.getElementById('my-dbees-home').className='feed-link';
		document.getElementById('dbee-feed-following').className='feed-link';
		document.getElementById('dbee-feed-favourite').className='feed-link';
		document.getElementById('dbee-feed-category').className='feed-link';
		document.getElementById('dbee-feed-displayby').className='feed-link';
		document.getElementById('startnewmc').value='5';
	}
//	changedbfeedtabClass(2);
	MostCommentedFeedHttp=Browser_Check(MostCommentedFeedHttp);	
	var url="/myhome/mostcommented";
	var data="";
	
	MostCommentedFeedHttp.open("POST",url,true);
	MostCommentedFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MostCommentedFeedHttp.setRequestHeader("Content-length", data.length);
	MostCommentedFeedHttp.setRequestHeader("Connection", "close");

	MostCommentedFeedHttp.onreadystatechange = function () {
        dbfeedmostcommentedresult(n);
    };
	MostCommentedFeedHttp.send(data);	
}

function dbfeedmostcommentedresult(n)
{
	if(MostCommentedFeedHttp.readyState==4)
	{
		if(MostCommentedFeedHttp.status == 200 || MostCommentedFeedHttp.status == 0)
		{
			var result=MostCommentedFeedHttp.responseText;
			var resultArr=result.split('~#~');
			if(n==0) {
				document.getElementById('feedtype').value='mostcommented';
				document.getElementById('filter-label').style.display='none';
				document.getElementById('newdbcount').style.display='none';
			}
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			/*
			document.getElementById('dbee-feed-mostcommented').className='view-mostcommented-feed';
			document.getElementById('dbee-feed-all').className='view-feed-active-fade';
			document.getElementById('dbee-feed-following').className='view-following-feed-fade';
			document.getElementById('dbee-feed-favourite').className='view-favourite-feed-fade';
			
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-mostcommented').fadeTo(30, 1);
				$('#dbee-feed-all').fadeTo(30, 0.60);
				$('#dbee-feed-following').fadeTo(30, 0.60);
				$('#dbee-feed-favourite').fadeTo(30, 0.60);
			}
			*/
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + MostCommentedFeedHttp.statusText);
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE FOR A SCORE WHEN FILTERED BY CAT
var FilterFeedCatHttp;
function dbfeedfilterbycat(cat) {
	
	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('all-dbees-home').className='feed-link';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	document.getElementById('dbee-feed-following').className='feed-link';
	document.getElementById('dbee-feed-favourite').className='feed-link';
	document.getElementById('dbee-feed-category').className='feed-link';
	document.getElementById('dbee-feed-displayby').className='feed-link';
	document.getElementById('startnewcat').value='5';
	document.getElementById('filtercat').value=cat;
	FilterFeedCatHttp=Browser_Check(FilterFeedCatHttp);	
	//var url="ajax_dbfeedcat.php";
	var url="/myhome/catetorylist";		
	var data="cat="+cat;	
	FilterFeedCatHttp.open("POST",url,true);
	FilterFeedCatHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FilterFeedCatHttp.setRequestHeader("Content-length", data.length);
	FilterFeedCatHttp.setRequestHeader("Connection", "close");	
	FilterFeedCatHttp.onreadystatechange = dbfeedfilterbycatresult;
	FilterFeedCatHttp.send(data);	
}

function dbfeedfilterbycatresult()
{
	if(FilterFeedCatHttp.readyState==4)
	{
		if(FilterFeedCatHttp.status == 200 || FilterFeedCatHttp.status == 0)
		{
			var result=FilterFeedCatHttp.responseText;			
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='cat';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE FOR A SCORE WHEN FILTERED BY TYPE
var FilterFeedHttp;
function dbfeedfilterbytype(type) {
	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('all-dbees-home').className='feed-link';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	document.getElementById('dbee-feed-following').className='feed-link';
	document.getElementById('dbee-feed-favourite').className='feed-link';
	document.getElementById('dbee-feed-category').className='feed-link';
	document.getElementById('dbee-feed-displayby').className='feed-link';
	document.getElementById('startnewtype').value='5';
	document.getElementById('filtertype').value=type;
	FilterFeedHttp=Browser_Check(FilterFeedHttp);
	
	//var url="ajax_dbfeedtype.php";
	var url="/myhome/filtertype";
	var data="type="+type;
	
	FilterFeedHttp.open("POST",url,true);
	FilterFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FilterFeedHttp.setRequestHeader("Content-length", data.length);
	FilterFeedHttp.setRequestHeader("Connection", "close");

	FilterFeedHttp.onreadystatechange = dbfeedfilterbytyperesult;
	FilterFeedHttp.send(data);	
}

function dbfeedfilterbytyperesult()
{
	if(FilterFeedHttp.readyState==4)
	{
		if(FilterFeedHttp.status == 200 || FilterFeedHttp.status == 0)
		{
			var result=FilterFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='type';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + FilterFeedHttp.statusText);
	}
}


// FETCH INTIAL 5 FEEDS ON HOMEPAGE FOR A SCORE WHEN FILTERED
var FilterFeedHttp;
function dbfeedfilter(score) {
	document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('all-dbees-home').className='feed-link';
	document.getElementById('my-comments-home').className='feed-link';
	document.getElementById('my-dbees-home').className='feed-link';
	document.getElementById('dbee-feed-following').className='feed-link';
	document.getElementById('dbee-feed-favourite').className='feed-link';
	document.getElementById('dbee-feed-category').className='feed-link';
	document.getElementById('dbee-feed-displayby').className='feed-link';
	document.getElementById('startnewfilter').value='5';
	document.getElementById('filterscore').value=score;
	FilterFeedHttp=Browser_Check(FilterFeedHttp);  	
	var url="/myhome/dbfeedfilter";
	var data="score="+score;
	
	FilterFeedHttp.open("POST",url,true);
	FilterFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FilterFeedHttp.setRequestHeader("Content-length", data.length);
	FilterFeedHttp.setRequestHeader("Connection", "close");

	FilterFeedHttp.onreadystatechange = dbfeedfilterresult;
	FilterFeedHttp.send(data);	
}

function dbfeedfilterresult()
{
	if(FilterFeedHttp.readyState==4)
	{
		if(FilterFeedHttp.status == 200 || FilterFeedHttp.status == 0)
		{
			var result=FilterFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='filter';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			/*
			document.getElementById('filter-label').style.display='block';
			document.getElementById('filter-label').innerHTML=resultArr[3];

			document.getElementById('dbee-feed-all').className='view-feed-active';
			document.getElementById('dbee-feed-following').className='view-following-feed';
			document.getElementById('dbee-feed-favourite').className='view-favourite-feed';
			document.getElementById('dbee-feed-mostcommented').className='view-mostcommented-feed';
			
			if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			} else {
				$('#dbee-feed-all').fadeTo(30, 0.60);
				$('#dbee-feed-following').fadeTo(30, 0.60);
				$('#dbee-feed-favourite').fadeTo(30, 0.60);
				$('#dbee-feed-mostcommented').fadeTo(30, 0.60);
			}
			*/
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + FilterFeedHttp.statusText);
	}
}

function changedbfeedtabClass(n) {
	if(n=='1') {
		var chk=document.getElementById('dbee-feed-following');
		document.getElementById('dbee-feed-all').className='view-feed-active';
		if(chk) document.getElementById('dbee-feed-following').className='view-feed';
	}
	else if(n=='2') {
		document.getElementById('dbee-feed-all').className='view-feed';
		document.getElementById('dbee-feed-following').className='view-feed-active';
	}
}


// CHECK NEW DB NOTIFICATIONS
var NotificationCountHttp;
function chktopnotification(n) {
	NotificationCountHttp=Browser_Check(NotificationCountHttp);
	var currCount=document.getElementById('notifications-top').innerHTML;
	
	//var url="ajax_chknotifications.php";
	var url="/chknotification/index";
	var data="checkFlag="+n;
//	var data="checkFlag="+n+"&currCount="+currCount;
	
	NotificationCountHttp.open("POST",url,true);
	NotificationCountHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	NotificationCountHttp.setRequestHeader("Content-length", data.length);
	NotificationCountHttp.setRequestHeader("Connection", "close");
	NotificationCountHttp.onreadystatechange = chktopnotificationresult;
	NotificationCountHttp.send(data);
}

function chktopnotificationresult()
{
	if(NotificationCountHttp.readyState==4)
	{			
		if(NotificationCountHttp.status == 200 || NotificationCountHttp.status == 0)
		{
			var result=NotificationCountHttp.responseText;
			var resultArr=result.split('~');
			
			// *****************************************
			// NEW DB NOTIFICATION
			if(resultArr[0]!='0' && resultArr[0]!='' && typeof(resultArr[0]) !== 'undefined') {
				document.getElementById('notifications-top-wrapper').style.display='block';
				document.getElementById('notifications-top').innerHTML=resultArr[0]+' new';
				document.getElementById('curr-notification-count').value=resultArr[0];
				
				var notedbhidden=document.getElementById('notifications-top-hidden').value;
				if(notedbhidden!=resultArr[0]) {
					document.getElementById('ghstpopup-text').innerHTML=resultArr[5]+' just added a new db.';
					$('#ghstpopup').fadeIn('slow', function() {
						document.getElementById('notifications-top-hidden').value=resultArr[0];
					});
					setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
				}
			}
			else
				document.getElementById('notifications-top-wrapper').style.display='none';
			
			
			// *****************************************
			// NEW SCORE NOTIFICATION
			if(resultArr[12]!='0' && resultArr[12]!='' && typeof(resultArr[12]) !== 'undefined') {
				var notescorehidden=document.getElementById('notifications-top-score-hidden').value;
				if(notescorehidden!=resultArr[12]) {
					document.getElementById('ghstpopup').style.width='150px';
					if(resultArr[14]!='food for thought')
						document.getElementById('ghstpopup-text').innerHTML=resultArr[13]+' '+resultArr[14]+' your '+resultArr[15]+'<br /><i>'+resultArr[16]+'</i>';
					else
						document.getElementById('ghstpopup-text').innerHTML=resultArr[13]+' think your '+resultArr[15]+' is '+resultArr[14]+'<br /><i>'+resultArr[16]+'</i>';
					$('#ghstpopup').fadeIn('slow', function() {
						document.getElementById('notifications-top-score-hidden').value=resultArr[12];
					});
					setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
				}
			}
			else {}



			// *****************************************
			// NEW COMMENT NOTIFICATION
			if(resultArr[9]!='0' && resultArr[9]!='' && typeof(resultArr[9]) !== 'undefined') {
				/*
				document.getElementById('notifications-msg-top-wrapper').style.display='block';
				document.getElementById('notifications-msg-top').innerHTML=resultArr[1]+' new';
				document.getElementById('curr-notification-count').value=resultArr[1];
				*/
				if(resultArr[11]==0) {
					var notecommenthidden=document.getElementById('notifications-top-comment-hidden').value;
					if(resultArr[9]!=0 && notecommenthidden!=resultArr[9]) {
						if(resultArr[9]>notecommenthidden) {
							document.getElementById('sticky-left-newcomm-num').innerHTML=resultArr[9];
							$('#sticky-left-newcomm').fadeIn('slow');
							document.getElementById('ghstpopup').style.width='200px';
							document.getElementById('ghstpopup-text').innerHTML=resultArr[10]+' commented on a dbee you are involved in.';
							$('#ghstpopup').fadeIn('slow', function() {
								document.getElementById('notifications-top-comment-hidden').value=resultArr[9];
							});
							setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
						} else if(resultArr[9]<notecommenthidden) {
							document.getElementById('sticky-left-newcomm-num').innerHTML=resultArr[9];
							document.getElementById('ghstpopup').style.width='200px';
							document.getElementById('ghstpopup-text').innerHTML=resultArr[10]+' removed his comment from a dbee you are involved in.';
							$('#ghstpopup').fadeIn('slow', function() {
								document.getElementById('notifications-top-comment-hidden').value=resultArr[9];
							});
							setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
						}
					}

					if(resultArr[9]==0) document.getElementById('notifications-top-comment-hidden').value=0;
				}
			}
			else {
				if(resultArr[9]==0) {
					document.getElementById('sticky-left-newcomm').style.display='none';
				}
			}
			
			
			// *****************************************
			// NEW MESSAGE NOTIFICATION
			if(resultArr[1]!='0' && resultArr[1]!='' && typeof(resultArr[1]) !== 'undefined') {
				document.getElementById('notifications-msg-top-wrapper').style.display='block';
				document.getElementById('notifications-msg-top').innerHTML=resultArr[1]+' new';
				document.getElementById('curr-notification-count').value=resultArr[1];
				
				var notemsghidden=document.getElementById('notifications-top-msg-hidden').value;
				if(notemsghidden!=resultArr[1]) {
					document.getElementById('ghstpopup').style.width='150px';
					document.getElementById('ghstpopup-text').innerHTML=resultArr[6]+' just sent you a new message.';
					$('#ghstpopup').fadeIn('slow', function() {
						document.getElementById('notifications-top-msg-hidden').value=resultArr[1];
					});
					setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
				}
			}
			else 
				document.getElementById('notifications-msg-top-wrapper').style.display='none';

			// NEW GROUP INVITE/REQUEST NOTIFICATION
			if(resultArr[2]!='0' && resultArr[2]!='' && typeof(resultArr[2]) !== 'undefined') {
				document.getElementById('notifications-group-top-wrapper').style.display='block';
				document.getElementById('notifications-group-top').innerHTML=resultArr[2]+' new';
				document.getElementById('curr-notification-count').value=resultArr[2];
				
				var notegrpinvitehidden=document.getElementById('notifications-top-grpinvite-hidden').value;
				if(notegrpinvitehidden!=resultArr[3]) {
					document.getElementById('ghstpopup').style.width='150px';
					document.getElementById('ghstpopup-text').innerHTML=resultArr[7]+' just invited you to his group.';
					$('#ghstpopup').fadeIn('slow', function() {
						document.getElementById('notifications-top-grpinvite-hidden').value=resultArr[3];
					});
					setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
				}
				
				var notegrpreqhidden=document.getElementById('notifications-top-grpreq-hidden').value;
				if(notegrpreqhidden!=resultArr[4]) {
					document.getElementById('ghstpopup-text').innerHTML=resultArr[8]+' just requested to join your group.';
					$('#ghstpopup').fadeIn('slow', function() {
						document.getElementById('notifications-top-grpreq-hidden').value=resultArr[4];
					});
					setTimeout("$('#ghstpopup').fadeOut('slow')",8000);
				}
			}
			else 
				document.getElementById('notifications-group-top-wrapper').style.display='none';

//			alert(document.getElementById('curr-notification-count').value);
		}
		else {}
	}
}


// CHECK NEW DB COUNT
var NewFollowingCountHttp;
function chknewfollowingdb(n) {
	NewFollowingCountHttp=Browser_Check(NewFollowingCountHttp);
	
	//var url="ajax_chknewfollowingdb.php";
	var url="/following/checknewfollowing";
	var data="checkFlag="+n;
	
	NewFollowingCountHttp.open("POST",url,true);
	NewFollowingCountHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	NewFollowingCountHttp.setRequestHeader("Content-length", data.length);
	NewFollowingCountHttp.setRequestHeader("Connection", "close");

	NewFollowingCountHttp.onreadystatechange = chknewfollowingdbresult;
	NewFollowingCountHttp.send(data);	
}

function chknewfollowingdbresult()
{
	if(NewFollowingCountHttp.readyState==4)
	{			
		if(NewFollowingCountHttp.status == 200 || NewFollowingCountHttp.status == 0)
		{
			var result=NewFollowingCountHttp.responseText;
			if(result!='0' && result!='' && typeof(result) !== 'undefined') {
				document.getElementById('newdbcount-wrapper').style.display='block';
				document.getElementById('newdbcount').innerHTML=result;
				document.getElementById('icon-dbfeed-buzz-following').className='icon-dbfeed-buzz-active';
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MORE FEEDS
var MoreFeedsHttp;
function seemorefeeds(start,end) {		
	start = start.replace(/(^[\s]+|[\s]+$)/g, '');
	MoreFeedsHttp=Browser_Check(MoreFeedsHttp);	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	var url="/myhome/dbeereload";
	var data="check=0&seemore=1&start="+start+'&end='+end;	
	MoreFeedsHttp.open("POST",url,true);
	MoreFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreFeedsHttp.setRequestHeader("Connection", "close");
	MoreFeedsHttp.onreadystatechange = function () {
        seemorefeedresult(start);
    };
	MoreFeedsHttp.send(data);	
}

function seemorefeedresult(id)
{	

	if(MoreFeedsHttp.readyState==4)
	{		
		if(MoreFeedsHttp.status == 200 || MoreFeedsHttp.status == 0)
		{
			var result=MoreFeedsHttp.responseText;	
		
			var resultArr=result.split('~#~');			
			document.getElementById('reloadend').value=id;			
			if(document.getElementById('see-more-feeds'+id)) {				
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			}			
			document.getElementById('startnewall').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');			
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}			
		else alert("Retrieval Error: " + MoreFeedsHttp.statusText);
	}
}



// FUNCTION TO SEE MORE FOLLOWING FEEDS
var MoreMyCommentsFeedsHttp;
function seemoremycomments(start,end,id) {
	start = start.replace(/(^[\s]+|[\s]+$)/g, '');
	id = typeof(id) != 'undefined' ? id : '0';
	
	MoreMyCommentsFeedsHttp=Browser_Check(MoreMyCommentsFeedsHttp);
	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';

	var url="/Comment/index";
	var data="seemore=1&start="+start+'&end='+end+'&user='+id;
	
	MoreMyCommentsFeedsHttp.open("POST",url,true);
	MoreMyCommentsFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreMyCommentsFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreMyCommentsFeedsHttp.setRequestHeader("Connection", "close");
	MoreMyCommentsFeedsHttp.onreadystatechange = function () {
        seemoremycommentsresult(start);
    };
	MoreMyCommentsFeedsHttp.send(data);	
}

function seemoremycommentsresult(id)
{
	if(MoreMyCommentsFeedsHttp.readyState==4)
	{			
		if(MoreMyCommentsFeedsHttp.status == 200 || MoreMyCommentsFeedsHttp.status == 0)
		{
			var result=MoreMyCommentsFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewmycomments').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MORE GROUP FEEDS
var MoreGroupFeedsHttp;
function seemoregroupfeeds(group,start,end) {
	MoreGroupFeedsHttp=Browser_Check(MoreGroupFeedsHttp);
	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';

	var url="ajax_groupdbees.php";
	var data="check=0&seemore=1&group="+group+"&start="+start+'&end='+end;
	
	MoreGroupFeedsHttp.open("POST",url,true);
	MoreGroupFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreGroupFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreGroupFeedsHttp.setRequestHeader("Connection", "close");
	MoreGroupFeedsHttp.onreadystatechange = function () {
        seemoregroupfeedsresult(start);
    };
	MoreGroupFeedsHttp.send(data);	
}

function seemoregroupfeedsresult(id)
{
	if(MoreGroupFeedsHttp.readyState==4)
	{			
		if(MoreGroupFeedsHttp.status == 200 || MoreGroupFeedsHttp.status == 0)
		{
			var result=MoreGroupFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}			
		else alert("Retrieval Error: " + MoreGroupFeedsHttp.statusText);
	}
}

//SAVE RSS SITES SELECTED BY USER TO SHOW ON HOME
var SaveRssHttp;
function saveuserrss() {
	
	SaveRssHttp=Browser_Check(SaveRssHttp);
	var err=false;

	var sites=document.getElementById('rss-sites').value;
	if(sites=='') err=true;
	
	if(!err) {
		$("#msg").fadeOut('slow');
		$("#msg").html('You can select a maximum of 4');
		var url="/myhome/savesite";
		var data="sites="+sites;		
		SaveRssHttp.open("POST",url,true);
		SaveRssHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SaveRssHttp.setRequestHeader("Content-length", data.length);
		SaveRssHttp.setRequestHeader("Connection", "close");		
		SaveRssHttp.onreadystatechange = saveuserrssresult;
		SaveRssHttp.send(data);
	} else {
		$("#msg").html('Please select at least one RSS feed');
		$("#msg").fadeIn('slow');
	}
}

function saveuserrssresult() {
	if(SaveRssHttp.readyState==4)
	{			
		if(SaveRssHttp.status == 200 || SaveRssHttp.status == 0)
		{
			var result=SaveRssHttp.responseText;	
			alert(result);
			if(result==1) {
				reloaduserrssicons('1');
				loaduserrss('1');
			}
		}
		else {};
	}
}

//SAVE RSS SITES SELECTED BY USER TO SHOW ON HOME
var ReloadRssHttp;
function reloaduserrssicons(from) {
	from = typeof(from) != 'undefined' ? from : '0';
	ReloadRssHttp=Browser_Check(ReloadRssHttp);

	window.parent.document.getElementById('rss-icons').innerHTML='Loading...';
	var url="/myhome/fetchicon";
	var data="";

	ReloadRssHttp.open("POST",url,true);
	ReloadRssHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ReloadRssHttp.setRequestHeader("Content-length", data.length);
	ReloadRssHttp.setRequestHeader("Connection", "close");

	ReloadRssHttp.onreadystatechange = function () {
		reloaduserrssiconsresult(from);
	};
	ReloadRssHttp.send(data);
}

function reloaduserrssiconsresult(from) {
	if(ReloadRssHttp.readyState==4)
	{			
		if(ReloadRssHttp.status == 200 || ReloadRssHttp.status == 0)
		{
			var result=ReloadRssHttp.responseText;
			
			if(from=='1') {
				window.parent.document.getElementById('rss-icons').innerHTML=result;
				$('#rss0').css({'background-color': '#EFEFEF', 'border': '1px solid #FACE3F'});
			}
			else {
				document.getElementById('rss-icons').innerHTML=result;
			}
			parent.Shadowbox.close();
		}
		else {};
	}
}


// SAVE RSS SITES SELECTED BY USER TO SHOW ON HOME
var LoadUserRssHttp;
function loaduserrss(from) {
	from = typeof(from) != 'undefined' ? from : '0';
	LoadUserRssHttp=Browser_Check(LoadUserRssHttp);

	var url="ajax_loaduserrss.php";
	var data="";

	LoadUserRssHttp.open("POST",url,true);
	LoadUserRssHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	LoadUserRssHttp.setRequestHeader("Content-length", data.length);
	LoadUserRssHttp.setRequestHeader("Connection", "close");

	LoadUserRssHttp.onreadystatechange = function () {
		loaduserrssresult(from);
	};
	LoadUserRssHttp.send(data);
}

function loaduserrssresult(from) {
	if(LoadUserRssHttp.readyState==4)
	{			
		if(LoadUserRssHttp.status == 200 || LoadUserRssHttp.status == 0)
		{
			var result=LoadUserRssHttp.responseText;
			var resultArr=result.split('~#~');
//			if(from=='1') window.parent.loadrss(resultArr[0],resultArr[1],1);
//			else loadrss(resultArr[0],resultArr[1],1);
			if(from=='1') window.parent.loadrss('twitter',0,0);
			else loadrss('twitter',0,0);
		}
		else {};
	}
}


//FUNCTION TO SEE FEEDS new--------------
var MyfeedsHttp;
function myfeeds(id) {	
	MyfeedsHttp=Browser_Check(MyfeedsHttp);	
	document.getElementById('twitter-search-box').style.display='none';
	document.getElementById('rssfeed-logo').style.display='block';
	document.getElementById('rssfeed-wrapper').style.display='block';
	$('#rssfeed-wrapper').html('<div align="center"><img src="convertrss/ajaxloader-big.gif"></div>');		
	//$('#rssfeed-logo').html('<img src="images/rsslogos/'+logo+'">');
	if(document.getElementById('rssfeed-wrapper'))
		document.getElementById('rssfeed-wrapper').innerHTML='<img src="images/ajaxloader.gif">';
	var url="/myhome/convertrss";
	var data="id="+id;		
	MyfeedsHttp.open("POST",url,true);
	MyfeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MyfeedsHttp.setRequestHeader("Content-length", data.length);
	MyfeedsHttp.setRequestHeader("Connection", "close");
	MyfeedsHttp.onreadystatechange = function () {
		myfeedsresult(id);
 };
	MyfeedsHttp.send(data);
}

function myfeedsresult(id)
{   
	if(MyfeedsHttp.readyState==4)
	{			
		if(MyfeedsHttp.status == 200 || MyfeedsHttp.status == 0)
		{
			var result=MyfeedsHttp.responseText;				
			document.getElementById('rssfeed-wrapper').innerHTML=result;			
			
		}			
		else alert("Retrieval Error: " + MyfeedsHttp.statusText);
	}
}

// FUNCTION TO SEE MORE FOLLOWING FEEDS
var MoreFollowinfFeedsHttp;
function seemorefollowing(start,end) {
	start = start.replace(/(^[\s]+|[\s]+$)/g, '');
	MoreFollowinfFeedsHttp=Browser_Check(MoreFollowinfFeedsHttp);
	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	
	//var url="ajax_dbfeedfollowing.php"; 
	var url="/following/index";
	var data="seemore=1&start="+start+'&end='+end;
	
	
	MoreFollowinfFeedsHttp.open("POST",url,true);
	MoreFollowinfFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreFollowinfFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreFollowinfFeedsHttp.setRequestHeader("Connection", "close");
	MoreFollowinfFeedsHttp.onreadystatechange = function () {
        seemorefollowingresult(start);
    };
    
	MoreFollowinfFeedsHttp.send(data);	
}

function seemorefollowingresult(id)
{ 
	if(MoreFollowinfFeedsHttp.readyState==4)
	{			
		if(MoreFollowinfFeedsHttp.status == 200 || MoreFollowinfFeedsHttp.status == 0)
		{
			var result=MoreFollowinfFeedsHttp.responseText;			
			var resultArr=result.split('~#~');			
			document.getElementById('icon-dbfeed-buzz-following').className='icon-dbfeed-buzz';
			document.getElementById('reloadend').value=id;			
			if(document.getElementById('see-more-feeds'+id))				
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewfollowing').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + MoreFollowinfFeedsHttp.statusText);
	}
}


// FUNCTION TO SEE MORE FAVOURITE FEEDS
var MoreFavouriteFeedsHttp;
function seemorefavourites(start,end) {	
	start = start.replace(/(^[\s]+|[\s]+$)/g, '');
	MoreFavouriteFeedsHttp=Browser_Check(MoreFavouriteFeedsHttp);
	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';

	//var url="ajax_dbfeedfavourite.php";
	var url="/favourites/index";
	var data="seemore=1&start="+start+'&end='+end;
	
	MoreFavouriteFeedsHttp.open("POST",url,true);
	MoreFavouriteFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreFavouriteFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreFavouriteFeedsHttp.setRequestHeader("Connection", "close");
	MoreFavouriteFeedsHttp.onreadystatechange = function () {
        seemorefavouritesresult(start);
    };
	MoreFavouriteFeedsHttp.send(data);	
}

function seemorefavouritesresult(id)
{
	if(MoreFavouriteFeedsHttp.readyState==4)
	{			
		if(MoreFavouriteFeedsHttp.status == 200 || MoreFavouriteFeedsHttp.status == 0)
		{
			var result=MoreFavouriteFeedsHttp.responseText;			
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewfav').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + MoreFavouriteFeedsHttp.statusText);
	}
}


// FUNCTION TO SEE MORE MOST COMMENTED FEEDS
var MoreMostCommentedFeedsHttp;
function seemoremostcommented(start,end) {
	MoreMostCommentedFeedsHttp=Browser_Check(MoreMostCommentedFeedsHttp);	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';var url="ajax_dbfeedmostcommented.php";
	var data="seemore=1&start="+start+'&end='+end;
	
	MoreMostCommentedFeedsHttp.open("POST",url,true);
	MoreMostCommentedFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreMostCommentedFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreMostCommentedFeedsHttp.setRequestHeader("Connection", "close");
	MoreMostCommentedFeedsHttp.onreadystatechange = function () {
        seemoremostcommentedresult(start);
    };
	MoreMostCommentedFeedsHttp.send(data);	
}

function seemoremostcommentedresult(id)
{
	if(MoreMostCommentedFeedsHttp.readyState==4)
	{			
		if(MoreMostCommentedFeedsHttp.status == 200 || MoreMostCommentedFeedsHttp.status == 0)
		{
			var result=MoreMostCommentedFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewmc').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + MoreMostCommentedFeedsHttp.statusText);
	}
}
// FUNCTION TO SEE MORE CAT FEEDS
var MoreCatFeedsHttp;
function seemorecat(start,end,cat) {
	MoreCatFeedsHttp=Browser_Check(MoreCatFeedsHttp);	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	//var url="ajax_dbfeedcat.php";
	var url="/dbeeall/mydbeecat";
	var data="seemore=1&cat="+cat+"&start="+start+'&end='+end;
	
	MoreCatFeedsHttp.open("POST",url,true);
	MoreCatFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreCatFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreCatFeedsHttp.setRequestHeader("Connection", "close");
	MoreCatFeedsHttp.onreadystatechange = function () {
        seemorecatresult(start);
    };
	MoreCatFeedsHttp.send(data);	
}

function seemorecatresult(id)
{
	if(MoreCatFeedsHttp.readyState==4)
	{			
		if(MoreCatFeedsHttp.status == 200 || MoreCatFeedsHttp.status == 0)
		{
			var result=MoreCatFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewcat').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MORE TYPE FEEDS
var MoreTypeFeedsHttp;
function seemoretype(start,end,type) {
	MoreTypeFeedsHttp=Browser_Check(MoreTypeFeedsHttp);	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	var url = "/dbeeall/mydbeesortby";
	var data="seemore=1&type="+type+"&start="+start+'&end='+end;
	
	MoreTypeFeedsHttp.open("POST",url,true);
	MoreTypeFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreTypeFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreTypeFeedsHttp.setRequestHeader("Connection", "close");
	MoreTypeFeedsHttp.onreadystatechange = function () {
        seemoretyperesult(start);
    };
	MoreTypeFeedsHttp.send(data);	
}

function seemoretyperesult(id)
{
	if(MoreTypeFeedsHttp.readyState==4)
	{			
		if(MoreTypeFeedsHttp.status == 200 || MoreTypeFeedsHttp.status == 0)
		{
			var result=MoreTypeFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewtype').value=resultArr[3];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MORE FILTERED FEEDS
var MoreFilterFeedsHttp;
function seemorefilterdb(start,end,score) {
	MoreFilterFeedsHttp=Browser_Check(MoreFilterFeedsHttp);	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';document.getElementById('filterscore').value=score;
	
	//var url="ajax_dbfeedfilter.php";
	var url="/dbeeall/dbfeedfilter";
	var data="seemore=1&start="+start+'&end='+end+"&score="+score;
	
	MoreFilterFeedsHttp.open("POST",url,true);
	MoreFilterFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreFilterFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreFilterFeedsHttp.setRequestHeader("Connection", "close");
	MoreFilterFeedsHttp.onreadystatechange = function () {
        seemorefilterdbresult(start);
    };
  
	MoreFilterFeedsHttp.send(data);	
}

function seemorefilterdbresult(id)
{
	if(MoreFilterFeedsHttp.readyState==4)
	{			
		if(MoreFilterFeedsHttp.status == 200 || MoreFilterFeedsHttp.status == 0)
		{
			var result=MoreFilterFeedsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			document.getElementById('startnewfilter').value=resultArr[4];
			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + MoreFilterFeedsHttp.statusText);
	}
}


// FUNCTION TO CHECK AND REALOD NEW COMMENTS AUTOMATICALLY
var CheckNewCommentsHttp;
function checknewcomments() {
	if(document.getElementById('hiddendb')) {
		var db=document.getElementById('hiddendb').value;
		CheckNewCommentsHttp=Browser_Check(CheckNewCommentsHttp);
		
		var url="ajax_chknewcomments.php";
		var data="check=1&db="+db;
		
		CheckNewCommentsHttp.open("POST",url,true);
		CheckNewCommentsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		CheckNewCommentsHttp.setRequestHeader("Content-length", data.length);
		CheckNewCommentsHttp.setRequestHeader("Connection", "close");
	
		CheckNewCommentsHttp.onreadystatechange = checknewcommentsresult;
		CheckNewCommentsHttp.send(data);	
	}
}

function checknewcommentsresult()
{
	if(CheckNewCommentsHttp.readyState==4)
	{			
		if(CheckNewCommentsHttp.status == 200 || CheckNewCommentsHttp.status == 0)
		{
			var result=CheckNewCommentsHttp.responseText;
			var resultArr=result.split('~#~');
			if(resultArr[0]=='1') {
				reloadComments(resultArr[1]);
				document.getElementById('total_comments').innerHTML=resultArr[2]+' comments';
			}
		}			
		else {}
	}
}



// FUNCTION TO SEE MORE COMMENTS
var MoreCommentsHttp;
function seemorecomments(start,end,db) {
	
	MoreCommentsHttp=Browser_Check(MoreCommentsHttp);
	
	//document.getElementById('more-comments-loader').innerHTML='<img src="images/ajaxloader.gif">';
	
	var sortorder=document.getElementById('currcommentsortorder').value;
	var url="/comment/commentreload";
	var data="start="+start+'&end='+end+'&db='+db+'&sortorder='+sortorder+'&reload=1';

	MoreCommentsHttp.open("POST",url,true);
	MoreCommentsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreCommentsHttp.setRequestHeader("Content-length", data.length);
	MoreCommentsHttp.setRequestHeader("Connection", "close");
	MoreCommentsHttp.onreadystatechange = function () {
        seemorecommentsresult(start);
    };
	MoreCommentsHttp.send(data);	
}

function seemorecommentsresult(id)
{
	if(MoreCommentsHttp.readyState==4)
	{			
		if(MoreCommentsHttp.status == 200 || MoreCommentsHttp.status == 0)
		{
			var result=MoreCommentsHttp.responseText;
		
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-comments'+id))
				document.getElementById('see-more-comments'+id).innerHTML=resultArr[0];
			document.getElementById('startnew').value=resultArr[1];
			fadepopup();
		}			
		else alert("Retrieval Error: " + MoreCommentsHttp.statusText);
	}
}


// FILL REMOVE TWEET FROM COMMENT CONFIRMATION POPOUP
function fillremovetweetpopup(comment,user,owner,ownercomment) {
	if(ownercomment=='0')
		document.getElementById('removetweet-popup').innerHTML='Do you want to remove tweet from comment?<br><br><label><input type="checkbox" id="notifyremovetweet" value="1"><span style="color:#999">Notify comment user</span></label><p align="center"><a href="javascript:void(0);" onclick="javascript:removetweet('+comment+','+user+','+owner+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
	else
		document.getElementById('removetweet-popup').innerHTML='Do you want to remove tweet from comment?<p align="center"><a href="javascript:void(0);" onclick="javascript:removetweet('+comment+','+user+','+owner+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
}


// FILL REMOVE COMMENT CONFIRMATION POPOUP
function fillremovecommentpopup(comment,user,n,owner) {
	n = typeof(n) != 'undefined' ? n : '0';
	owner = typeof(owner) != 'undefined' ? owner : '0';
	if(n=='0')
		document.getElementById('removecomment-popup').innerHTML='Do you want to remove your comment?<p align="center"><a href="javascript:void(0);" onclick="javascript:removecomment('+comment+','+user+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
	else
		document.getElementById('removecomment-popup').innerHTML='Do you want to remove this comment? Any attached tweet will also be removed.<br><br><label><input type="checkbox" id="notifyremovetweet" value="1"><span style="color:#999">Notify comment user</span></label><p align="center"><a href="javascript:void(0);" onclick="javascript:removecomment('+comment+','+user+',1,'+owner+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
}


// FILL BLOCK USER FROM MESSAGE CONFIRMATION POPOUP
function fillblockfrommsg(user,name,id) {
	document.getElementById('blockusermsg-popup').innerHTML='You are about to block <b>'+name+'</b> from messaging you. This action cannot be undone. Are you sure you want to continue?<p align="center"><a href="javascript:void(0);" onclick="javascript:blockuserfrommsg('+user+','+id+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
}


// FUNCTION TO REMOVE TWEET FROM COMMENT
var RemoveTweetHttp;
function removetweet(comment,user,owner) {
	var db=document.getElementById('hiddendb').value;
	if(document.getElementById('notifyremovetweet'))
		var notify=document.getElementById('notifyremovetweet').value;
	RemoveTweetHttp=Browser_Check(RemoveTweetHttp);
	
	var url="ajax_removetweet.php";
	var data="comment="+comment+"&user="+user+"&owner="+owner+"&db="+db+"&notify="+notify;
	
	RemoveTweetHttp.open("POST",url,true);
	RemoveTweetHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	RemoveTweetHttp.setRequestHeader("Content-length", data.length);
	RemoveTweetHttp.setRequestHeader("Connection", "close");
	
	RemoveTweetHttp.onreadystatechange = removetweetresult;

	RemoveTweetHttp.send(data);
}

function removetweetresult()
{
	if(RemoveTweetHttp.readyState==4)
	{
		if(RemoveTweetHttp.status == 200 || RemoveTweetHttp.status == 0)
		{
			var result=RemoveTweetHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]!=0) {
				document.getElementById('tweet-block-'+resultArr[0]).style.display='none';
				closepopup('fade');
			}
		}
		else {};
	}
}


// FUNCTION TO REMOVE MY COMMENT
var RemoveCommentHttp;
function removecomment(comment,user,n,owner) {
	n = typeof(n) != 'undefined' ? n : '0';
	owner = typeof(owner) != 'undefined' ? owner : '0';
	var db=document.getElementById('hiddendb').value;
	RemoveCommentHttp=Browser_Check(RemoveCommentHttp);
	
	if(n=='1') {
		if(document.getElementById('notifyremovetweet'))
			var notify=document.getElementById('notifyremovetweet').value;
	}
	
	var url="ajax_removecomment.php";
	var data="comment="+comment+"&user="+user+"&db="+db+"&notify="+notify+"&owner="+owner;
	
	RemoveCommentHttp.open("POST",url,true);
	RemoveCommentHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	RemoveCommentHttp.setRequestHeader("Content-length", data.length);
	RemoveCommentHttp.setRequestHeader("Connection", "close");
	
	RemoveCommentHttp.onreadystatechange = removecommentresult;

	RemoveCommentHttp.send(data);
}

function removecommentresult()
{
	if(RemoveCommentHttp.readyState==4)
	{
		if(RemoveCommentHttp.status == 200 || RemoveCommentHttp.status == 0)
		{
			var result=RemoveCommentHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]!=0) {
				document.getElementById('comment-block-'+resultArr[0]).style.display='none';
				document.getElementById('total_comments').innerHTML=resultArr[1]+' comments';
				closepopup('fade');
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MY DBEE'S ON PROFILE
var SeeMyDbeesHttp;
function seedbeelist(id,from) {		
	from = typeof(from) != 'undefined' ? from : '0';
	if(from=='0' || from=='2') {
		document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
		document.getElementById('my-dbees-profile').className='feed-link-active feed-link-border';
		if(document.getElementById('my-redbees-profile'))
			document.getElementById('my-redbees-profile').className='feed-link feed-link-border';
		document.getElementById('my-comments-profile').className='feed-link feed-link-border';
		document.getElementById('my-leaguepos-profile').className='feed-link feed-link-border';
		document.getElementById('my-followers-profile').className='feed-link feed-link-border';
		document.getElementById('my-following-profile').className='feed-link feed-link-border';
		document.getElementById('my-groups-profile').className='feed-link';
		document.getElementById('startnewmydb').value='5';
	}
	else if(from=='1') {
		document.getElementById('dbee-feeds').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
		document.getElementById('all-dbees-home').className='feed-link';
		document.getElementById('my-comments-home').className='feed-link';
		document.getElementById('my-dbees-home').className='feed-link-active';
		document.getElementById('dbee-feed-following').className='feed-link';
		document.getElementById('dbee-feed-favourite').className='feed-link';
		document.getElementById('dbee-feed-category').className='feed-link';
		document.getElementById('dbee-feed-displayby').className='feed-link';
		document.getElementById('startnewmydb').value='5';
	}
	
	SeeMyDbeesHttp=Browser_Check(SeeMyDbeesHttp);
	var url="/myhome/mydbee"; 
	var data="user="+id;	
	SeeMyDbeesHttp.open("POST",url,true);
	SeeMyDbeesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeMyDbeesHttp.setRequestHeader("Content-length", data.length);
	SeeMyDbeesHttp.setRequestHeader("Connection", "close");
	
	if(from=='0')
		SeeMyDbeesHttp.onreadystatechange = seedbeelistresult;
	else if(from=='1')
		SeeMyDbeesHttp.onreadystatechange = seedbeelistresultfromhome;	
	SeeMyDbeesHttp.send(data);	

//	changeClass(1);
}

function seedbeelistresult()
{
	if(SeeMyDbeesHttp.readyState==4)
	{
		if(SeeMyDbeesHttp.status == 200 || SeeMyDbeesHttp.status == 0)
		{
			var result=SeeMyDbeesHttp.responseText;
			
			var resultArr=result.split('~#~');
			document.getElementById('my-dbees').innerHTML=resultArr[0];
			document.getElementById('totaldbees').value=resultArr[5];
			document.getElementById('feedtype').value='mydbs';
			document.getElementById('startnewmydb').value='5';
			if(resultArr[2]!='-1') {
				if(resultArr[2]=='1') {
					document.getElementById('follow-user').className='unfollow-user';
					document.getElementById('followme-label').innerHTML='unfollow';
					document.getElementById('follow-popup').innerHTML='You do not follow '+resultArr[3]+' any more';
				}
				else {
					document.getElementById('follow-user').className='follow-user';
					document.getElementById('followme-label').innerHTML='follow';
					document.getElementById('follow-popup').innerHTML='You now follow '+resultArr[3];
				}
			}
			openFadePopup();
			
			loadQtipAboveClass('delete-db','You can only delete a db until you receive a new comment.');
			
			var idsArr=resultArr[4].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}
		else alert("Retrieval Error: " + SeeMyDbeesHttp.statusText);
	}
}


function seedbeelistresultfromhome()
{
	if(SeeMyDbeesHttp.readyState==4)
	{			
		if(SeeMyDbeesHttp.status == 200 || SeeMyDbeesHttp.status == 0)
		{
			var result=SeeMyDbeesHttp.responseText;			
			var resultArr=result.split('~#~');
			document.getElementById('feedtype').value='mydbs';
			document.getElementById('filter-label').style.display='none';
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];			

			Shadowbox.init();
			Shadowbox.setup();
			openFadePopup();
		}
		else {};
	}
}



// FUNCTION TO SEE MORE MY DBEE FEED
var MoreMyFeedsHttp;
function seemoremyfeeds(start,end,from) {
	from = typeof(from) != 'undefined' ? from : '0';
	MoreMyFeedsHttp=Browser_Check(MoreMyFeedsHttp);	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';	
	if(from==0)
		var user=document.getElementById('profileuser').value;
	else if(from==1)
		var user='-1';	
	var url="/myhome/mydbee";
	var data="check=0&seemore=1&start="+start+'&end='+end+'&user='+user;
	MoreMyFeedsHttp.open("POST",url,true);
	MoreMyFeedsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreMyFeedsHttp.setRequestHeader("Content-length", data.length);
	MoreMyFeedsHttp.setRequestHeader("Connection", "close");
	MoreMyFeedsHttp.onreadystatechange = function () {
        seemoremyfeedresult(start);
    };
	MoreMyFeedsHttp.send(data);	
}

function seemoremyfeedresult(id){
	
	if(MoreMyFeedsHttp.readyState==4)
	{			
		if(MoreMyFeedsHttp.status == 200 || MoreMyFeedsHttp.status == 0)
		{
			var result=MoreMyFeedsHttp.responseText;	
			
			var resultArr=result.split('~#~');
			
			document.getElementById('startnewmydb').value=resultArr[1];
			
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
			openFadePopup();
		}
		else alert("Retrieval Error: " + MoreMyFeedsHttp.statusText);
	}
}


// FUNCTION TO SEE RE DBEE'S ON PROFILE
var SeeReDbeesHttp;
function seeredbeelist(id) {	
	document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('my-dbees-profile').className='feed-link feed-link-border';
	if(document.getElementById('my-redbees-profile'))
		document.getElementById('my-redbees-profile').className='feed-link-active feed-link-border';
	document.getElementById('my-comments-profile').className='feed-link feed-link-border';
	document.getElementById('my-leaguepos-profile').className='feed-link feed-link-border';
	document.getElementById('my-followers-profile').className='feed-link feed-link-border';
	document.getElementById('my-following-profile').className='feed-link feed-link-border';
	document.getElementById('my-groups-profile').className='feed-link';
	document.getElementById('feedtype').value='myredbs';
	document.getElementById('startnewmydb').value='5';
	
	SeeReDbeesHttp=Browser_Check(SeeReDbeesHttp);
	
	//var url="ajax_myredbees.php";
	var url="/tblredb/index";
	var data="user="+id;
	
	SeeReDbeesHttp.open("POST",url,true);
	SeeReDbeesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeReDbeesHttp.setRequestHeader("Content-length", data.length);
	SeeReDbeesHttp.setRequestHeader("Connection", "close");	
	SeeReDbeesHttp.onreadystatechange = seeredbeelistresult;	
	SeeReDbeesHttp.send(data);
	
//	changeClass(2);
}

function seeredbeelistresult()
{
	if(SeeReDbeesHttp.readyState==4)
	{			
		if(SeeReDbeesHttp.status == 200 || SeeReDbeesHttp.status == 0)
		{
			var result=SeeReDbeesHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('totaldbees').value=resultArr[3];
			document.getElementById('my-dbees').innerHTML=resultArr[0];
			fadepopup();
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}	
		else alert("Retrieval Error: " + SeeReDbeesHttp.statusText);
	}
}

function changeClass(n) {
	if(n=='1') {
		var chk=document.getElementById('my-redb-profile');
		document.getElementById('my-db-profile').className='user-name';
		if(chk) document.getElementById('my-redb-profile').className='user-name-grey';
	}
	else if(n=='2') {
		document.getElementById('my-db-profile').className='user-name-grey';
		document.getElementById('my-redb-profile').className='user-name';
	}
}
// FUNCTION TO SEE RE DBEE'S ON PROFILE


// FUNCTION TO SEE DBEE HISTORY ON PROFILE
var SeeMyHistoryHttp;
function seehistorylist(id,months) {
	$('div#maindb-wrapper').removeClass('maindb-wrapper-border');
	document.getElementById('mydbcontrols').style.display='none';
	document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	SeeMyHistoryHttp=Browser_Check(SeeMyHistoryHttp);
	
	var url="ajax_mydbees.php";
	var data="user="+id+"&months="+months;
	
	SeeMyHistoryHttp.open("POST",url,true);
	SeeMyHistoryHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeMyHistoryHttp.setRequestHeader("Content-length", data.length);
	SeeMyHistoryHttp.setRequestHeader("Connection", "close");
	
	SeeMyHistoryHttp.onreadystatechange = seehistorylistresult;
	
	SeeMyHistoryHttp.send(data);	
}

function seehistorylistresult()
{
	if(SeeMyHistoryHttp.readyState==4)
	{
		if(SeeMyHistoryHttp.status == 200 || SeeMyHistoryHttp.status == 0)
		{
			var result=SeeMyHistoryHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('totaldbees').value=resultArr[5];
			document.getElementById('startnewmydb').value='5';
			document.getElementById('my-dbees').innerHTML=resultArr[0];
			fadepopup();
		}			
		else alert("Retrieval Error: " + SeeMyHistoryHttp.statusText);
	}
}


// FUNCTION TO SEE BIOGRAPHY ON PROFILE
var SeeBioHttp;
function seebio(id) {
	$('div#maindb-wrapper').removeClass('maindb-wrapper-border');
	document.getElementById('mydbcontrols').style.display='none';
	document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	SeeBioHttp=Browser_Check(SeeBioHttp);
	
	var url="ajax_bio.php";
	var data="user="+id;
	
	SeeBioHttp.open("POST",url,true);
	SeeBioHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeBioHttp.setRequestHeader("Content-length", data.length);
	SeeBioHttp.setRequestHeader("Connection", "close");
	
	SeeBioHttp.onreadystatechange = seebioresult;
	
	SeeBioHttp.send(data);
}

function seebioresult()
{
	if(SeeBioHttp.readyState==4)
	{
		if(SeeBioHttp.status == 200 || SeeBioHttp.status == 0)
		{
			var result=SeeBioHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('my-dbees').innerHTML=resultArr[0];
		}			
		else alert("Retrieval Error: " + SeeBioHttp.statusText);
	}
}


// FUNCTION TO SEE USER POSITION IN LEAGUES TABLE ON PROFILE
var SeeUserLeagueHttp;
function seeuserleague(league,id,showtabs) {
	showtabs = typeof(showtabs) != 'undefined' ? showtabs : '0';
	$('div#maindb-wrapper').removeClass('maindb-wrapper-border');
	document.getElementById('mydbcontrols').style.display='none';

	if(showtabs==0) {
		document.getElementById('leagues-tab-love').className='leagues-tab';
		document.getElementById('leagues-tab-rogue').className='leagues-tab';
		document.getElementById('leagues-tab-mostfollowed').className='leagues-tab';
		document.getElementById('leagues-tab-philosopher').className='leagues-tab';
		document.getElementById('leagues-tab-'+league).className='leagues-tab-active';
	}
	
	if(showtabs=='1')
		document.getElementById('my-dbees').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	else
		document.getElementById('league-table').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';

	SeeUserLeagueHttp=Browser_Check(SeeUserLeagueHttp);
	
	var url="ajax_userleague.php";
	var data="user="+id+"&league="+league+"&showtabs="+showtabs;
	
	SeeUserLeagueHttp.open("POST",url,true);
	SeeUserLeagueHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeUserLeagueHttp.setRequestHeader("Content-length", data.length);
	SeeUserLeagueHttp.setRequestHeader("Connection", "close");
	
	SeeUserLeagueHttp.onreadystatechange = seeuserleagueresult;
	
	SeeUserLeagueHttp.send(data);
}

function seeuserleagueresult()
{
	if(SeeUserLeagueHttp.readyState==4)
	{
		if(SeeUserLeagueHttp.status == 200 || SeeUserLeagueHttp.status == 0)
		{
			var result=SeeUserLeagueHttp.responseText;
			var resultArr=result.split('~#~');
			if(resultArr[1]==1)
				document.getElementById('my-dbees').innerHTML=resultArr[0];
			else if(resultArr[1]==0)
				document.getElementById('league-table').innerHTML=resultArr[0];
		}			
		else alert("Retrieval Error: " + SeeUserLeagueHttp.statusText);
	}
}


// FUNCTION TO SEE USER LEAGUE POSITION IN POPUP FROM PROFILE
var SeeUserLeaguePopHttp;
function seeuserleaguepop(league,id) {
	document.getElementById('league-table').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	document.getElementById('leaguepop-tab-mostfollowed').className='leaguepop-tab-mostfollowed';
	document.getElementById('leaguepop-tab-love').className='leaguepop-tab-love';
	document.getElementById('leaguepop-tab-rogue').className='leaguepop-tab-rogue';
	document.getElementById('leaguepop-tab-philosopher').className='leaguepop-tab-philosopher';
	document.getElementById('leaguepop-tab-'+league).className='leaguepop-tab-'+league+'-open';

	SeeUserLeaguePopHttp=Browser_Check(SeeUserLeaguePopHttp);
	
	var url="ajax_userleaguepopup.php";
	var data="user="+id+"&league="+league;
	
	SeeUserLeaguePopHttp.open("POST",url,true);
	SeeUserLeaguePopHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeUserLeaguePopHttp.setRequestHeader("Content-length", data.length);
	SeeUserLeaguePopHttp.setRequestHeader("Connection", "close");
	
	SeeUserLeaguePopHttp.onreadystatechange = seeuserleaguepopresult;
	
	SeeUserLeaguePopHttp.send(data);
}

function seeuserleaguepopresult()
{
	if(SeeUserLeaguePopHttp.readyState==4)
	{
		if(SeeUserLeaguePopHttp.status == 200 || SeeUserLeaguePopHttp.status == 0)
		{
			var result=SeeUserLeaguePopHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('league-table').innerHTML=resultArr[0];
		}			
		else {};
	}
}


// FUNCTION TO DB LEAGUES ON THE LEAGUES PAGE
var DbLeagueHttp;
function seedbleague(league,id,showtabs) {
	showtabs = typeof(showtabs) != 'undefined' ? showtabs : '0';
	document.getElementById("LeaguemostfollowedTab").className='league-tab-mostfollowed-close';
	document.getElementById("LeagueloveTab").className='league-tab-love-close';
	document.getElementById("LeaguerogueTab").className='league-tab-rogue-close';
	document.getElementById("LeaguephilosopherTab").className='league-tab-philosopher-close';
	document.getElementById("LeaguemostcommTab").className='league-tab-mostcomm-close';
	document.getElementById("League"+league+"Tab").className='league-tab-'+league+'-open';

	if(league=='mostfollowed') {
		document.getElementById('top-leagues-wrapper').style.borderTopLeftRadius = "0px";
		document.getElementById('top-leagues-wrapper').style.borderTopRightRadius = "8px";
	}
	else if(league=='mostcomm') {
		document.getElementById('top-leagues-wrapper').style.borderTopLeftRadius = "8px";
		document.getElementById('top-leagues-wrapper').style.borderTopRightRadius = "0px";
	}
	else {
		document.getElementById('top-leagues-wrapper').style.borderTopLeftRadius = "8px";
		document.getElementById('top-leagues-wrapper').style.borderTopRightRadius = "8px";
	}

/*
	if(showtabs==0) {
		document.getElementById('leagues-tab-love').className='leagues-tab';
		document.getElementById('leagues-tab-rogue').className='leagues-tab';
		document.getElementById('leagues-tab-mostfollowed').className='leagues-tab';
		document.getElementById('leagues-tab-philosopher').className='leagues-tab';
		document.getElementById('leagues-tab-'+league).className='leagues-tab-active';
		document.getElementById('league-table').innerHTML='<div style="margin:20px 0 0 20px;">Loading...</div>';
	}
*/
	document.getElementById('topthree-leagues').innerHTML='<div style="margin-top:150px; margin-left:450px;">Loading...</div>';
	document.getElementById('leagues-feed').innerHTML='';
	DbLeagueHttp=Browser_Check(DbLeagueHttp);
	
	//var url="ajax_userleague.php";
	var url="/dbleagues/userleague";
	var data="user="+id+"&league="+league+"&showtabs="+showtabs+"&dbleague=1";
	
	DbLeagueHttp.open("POST",url,true);
	DbLeagueHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DbLeagueHttp.setRequestHeader("Content-length", data.length);
	DbLeagueHttp.setRequestHeader("Connection", "close");
	
	DbLeagueHttp.onreadystatechange = seedbleagueresult;
	
	DbLeagueHttp.send(data);
}

function seedbleagueresult()
{
	if(DbLeagueHttp.readyState==4)
	{
		if(DbLeagueHttp.status == 200 || DbLeagueHttp.status == 0)
		{
			var result=DbLeagueHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('topthree-leagues').innerHTML=resultArr[0];
			document.getElementById('leagues-feed').innerHTML=resultArr[1];
/*
			document.getElementById('leagues-tab-love').className='leagues-tab';
			document.getElementById('leagues-tab-rogue').className='leagues-tab';
			document.getElementById('leagues-tab-mostfollowed').className='leagues-tab';
			document.getElementById('leagues-tab-philosopher').className='leagues-tab';
			document.getElementById('leagues-tab-'+resultArr[2]).className='leagues-tab-active';
*/
		}			
		else alert("Retrieval Error: " + DbLeagueHttp.statusText);
	}
}


// FUNCTION TO SEE MORE LEAGUES
var MoreLeaguesHttp;
function seemoreleagues(start,end,league,counter) {
	MoreLeaguesHttp=Browser_Check(MoreLeaguesHttp);
	
	document.getElementById('more-leagues-loader').innerHTML='<img src="images/ajaxloader.gif">';
	 
	var url="ajax_userleaguemore.php";
	var data="seemore=1&league="+league+"&start="+start+'&end='+end+'&counter='+counter;
	
	MoreLeaguesHttp.open("POST",url,true);
	MoreLeaguesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreLeaguesHttp.setRequestHeader("Content-length", data.length);
	MoreLeaguesHttp.setRequestHeader("Connection", "close");
	MoreLeaguesHttp.onreadystatechange = function () {
        seemoreleaguesresult(start);
    };
	MoreLeaguesHttp.send(data);	
}

function seemoreleaguesresult(id)
{
	if(MoreLeaguesHttp.readyState==4)
	{			
		if(MoreLeaguesHttp.status == 200 || MoreLeaguesHttp.status == 0)
		{
			var result=MoreLeaguesHttp.responseText;
			var resultArr=result.split('~#~');
			if(document.getElementById('see-more-leagues'+id))
				document.getElementById('see-more-leagues'+id).innerHTML=resultArr[0];
//			document.getElementById('startnewall').value=resultArr[3];
		}			
		else {};
	}
}
var DbeeuserHttp;
function dbeeuserall() {	
	DbeeuserHttp=Browser_Check(DbeeuserHttp);
	

	var url="/profile/dbeeusercomment";
	var data="";
		
	DbeeuserHttp.open("POST",url,true);
	DbeeuserHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DbeeuserHttp.setRequestHeader("Content-length", data.length);
	DbeeuserHttp.setRequestHeader("Connection", "close");
	
	DbeeuserHttp.onreadystatechange = function () {
		dbeeuserallresult();
    };
	
    DbeeuserHttp.send(data);	
}

function dbeeuserallresult()
{
	if(DbeeuserHttp.readyState==4)
	{			
		if(DbeeuserHttp.status == 200 || DbeeuserHttp.status == 0)
		{			
			var result=DbeeuserHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('dbee-highlighted').innerHTML=resultArr[0];
			document.getElementById('dbee-post-comment').value=resultArr[3];
			document.getElementById('dbee-comments').value=resultArr[2];
			fadepopup();
		}			
		else {};
	}
}

// FUNCTION TO SEE DBEE DETAILS ON PROFILE
var SeeDbeeHttp;
function seedbee(id,fade) {
	
	SeeDbeeHttp=Browser_Check(SeeDbeeHttp);
	
//	document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	//var url="/profile/dbeeusercomment";
	var url="/dbeedetail/index";	
	var data="db="+id;		
	SeeDbeeHttp.open("POST",url,true);
	SeeDbeeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeDbeeHttp.setRequestHeader("Content-length", data.length);
	SeeDbeeHttp.setRequestHeader("Connection", "close");	
	SeeDbeeHttp.onreadystatechange = function () {
        seedbeeresult(id,fade);
    };
	
	SeeDbeeHttp.send(data);	
}

function seedbeeresult(id,fade)
{
	if(SeeDbeeHttp.readyState==4)
	{			
		if(SeeDbeeHttp.status == 200 || SeeDbeeHttp.status == 0)
		{
			var result=SeeDbeeHttp.responseText;
			var resultArr=result.split('~#~');		
			
			if(resultArr[8]=='0')
				document.getElementById('dbeetype').value=resultArr[20];
			if(resultArr[0]!=0) {
				document.getElementById('dbee-highlighted').innerHTML=resultArr[0];
				if(resultArr[8]=='0') {
					document.getElementById('dbee-post-comment').innerHTML=resultArr[1];
					document.getElementById('dbee-comments').innerHTML=resultArr[2];
					var tipfunc=loadQtipAboveMaindbFix;
					if(resultArr[6]==0) {  
						document.getElementById('sort-comments').style.display='none';
					}
				} else {					
					if(resultArr[12]!='' && resultArr[12]!='undefined') {
						drawChart(resultArr[9],resultArr[10],resultArr[11],resultArr[12],resultArr[13],resultArr[14],resultArr[15],resultArr[16],resultArr[17]);
						
						if(resultArr[18]!='' && resultArr[18]!='undefined') {						
							//loadQtipFixedLeft('pollopt'+resultArr[18],'Your Vote');
							document.getElementById('button-vote').style.display='none';
							document.getElementById('vote-submitted').style.display='block';
						}
						var tipfunc=loadQtipAbove;						
						if(resultArr[2]!='0') document.getElementById('dbee-comments').innerHTML=resultArr[2];
					}
				else {
					drawChart(resultArr[9],resultArr[10],resultArr[11],resultArr[13],resultArr[14],resultArr[15]);
					}
				}
				
				loadQtipAboveMaindbFix('edit-db','You can only edit a db until you receive a new comment. Just click anywhere outsite the box to save changes.');
				
				if(resultArr[3]!='') {
					fadeto=0.30;
					$('#love-dbee').fadeTo(30, fadeto);
					$('#like-dbee').fadeTo(30, fadeto);
					$('#philosopher-dbee').fadeTo(30, fadeto);
					$('#dislike-dbee').fadeTo(30, fadeto);
					$('#hate-dbee').fadeTo(30, fadeto);
					$('#'+resultArr[3]).fadeTo(30, 1);
				}
				
				// FADE NON-TEXT DB REPLY ICONS
				$('#dbreply-icon-link').fadeTo(30, 0.20);
				$('#dbreply-icon-pix').fadeTo(30, 0.20);
				$('#dbreply-icon-vidz').fadeTo(30, 0.20);
				// FADE NON-TEXT DB REPLY ICONS
	
				if(resultArr[4]!='-1') {
					tipfunc('love-dbee','I love this db');
					tipfunc('like-dbee','I like this db');
					tipfunc('philosopher-dbee','This db is food for thought');
					tipfunc('dislike-dbee','I dislike this db');
					tipfunc('hate-dbee','I hate this db');
				} else {
					tipfunc('love-dbee','You can\'t score your own db');
					tipfunc('like-dbee','You can\'t score your own db');
					tipfunc('philosopher-dbee','You can\'t score your own db');
					tipfunc('dislike-dbee','You can\'t score your own db');
					tipfunc('hate-dbee','You can\'t score your own db');
				}
	
				loadQtipAboveMaindbFix('howembedsc','click Share on a SoundCloud audio, copy the Embed Code and paste here');
				if(resultArr[19]=='1') loadQtipAboveMaindbFix('notify-email-status','Turn ON email notifications for this dbee');
				else if(resultArr[19]=='0') loadQtipAboveMaindbFix('notify-email-status','Turn OFF email notifications for this dbee');
	
				// LOAD TIPS FOR REPLY ICONS
				loadQtipAboveMaindbFix('dbreply-icon-text','reply with text');
				loadQtipAboveMaindbFix('dbreply-icon-link','reply with link');
				loadQtipAboveMaindbFix('dbreply-icon-pix','reply with picture');
				loadQtipAboveMaindbFix('dbreply-icon-vidz','reply with media');
				// LOAD TIPS FOR REPLY ICONS
	
				// ADD ORANGE BORDER TO ALL TEXTBOXES AND TEXTAREAS FOR COMMENT
				$("input").focus(function() {
					$(this).addClass("curFocus");
				});
				$("input").blur(function() {
					$(this).removeClass("curFocus")
				});
			
				$("textarea").focus(function() {
					$(this).addClass("curFocusTextarea");
				});
				$("textarea").blur(function() {
					$(this).removeClass("curFocusTextarea")
				});
				// ADD ORANGE BORDER TO ALL TEXTBOXES AND TEXTAREAS FOR COMMENT
	
				if(resultArr[7]=='1') { // IF USER IS LOGGED IN
					if(resultArr[4]!='-1') {
						if(resultArr[4]=='1') {
							document.getElementById('follow-user').className='unfollow-user';
							document.getElementById('followme-label').innerHTML='unfollow';
							document.getElementById('follow-popup').innerHTML='You do not follow '+resultArr[5]+' any more';
						}
						else {
							document.getElementById('follow-user').className='follow-user';
							document.getElementById('followme-label').innerHTML='follow';
							document.getElementById('follow-popup').innerHTML='You now follow '+resultArr[5];
						}
					}
				}
				
				$("#dbee_comment").autocomplete("ajax_usersearch.php", {
					width: 195,
					matchContains: true,
					//mustMatch: true,
					minChars: 1,
					multiple: true,
					//highlight: false,
					multipleSeparator: ",",
					selectFirst: false
				});
			
				$("#dbee_comment").result(function(event, data, formatted) {
					if($("#userid-holder").val()!='')
						$("#userid-holder").val($("#userid-holder").val()+','+data[2]);
					else
						$("#userid-holder").val(data[2]);
				});

				if(resultArr[8]=='0') document.getElementById('totalcomments').value=resultArr[6];
	
				loadcommentleague(id);
				openFadePopup();
				createdrop(1,5);
				Shadowbox.init();
				Shadowbox.setup();
				
				setInterval("checknewcomments()", 2000);
			}
			else document.getElementById('dbee-highlighted').innerHTML='This dbee is no longer active.';
		}			
		else {};
	}
}


// FUNCTION TO SEE DBEE DETAILS ON PROFILE
var SeeDbeeHttp2;
function seedbee2(id,fade) {
	SeeDbeeHttp2=Browser_Check(SeeDbeeHttp2);
	
//	document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	var url="fetch_dbee2.php";
	var data="db="+id;
	
	SeeDbeeHttp2.open("POST",url,true);
	SeeDbeeHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SeeDbeeHttp2.setRequestHeader("Content-length", data.length);
	SeeDbeeHttp2.setRequestHeader("Connection", "close");
	
	SeeDbeeHttp2.onreadystatechange = function () {
        seedbeeresult2(id,fade);
    };
	
	SeeDbeeHttp2.send(data);	
}

function seedbeeresult2(id,fade)
{
	if(SeeDbeeHttp2.readyState==4)
	{			
		if(SeeDbeeHttp2.status == 200 || SeeDbeeHttp2.status == 0)
		{
			var result=SeeDbeeHttp2.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('dbee-highlighted').innerHTML=resultArr[0];
			document.getElementById('dbee-post-comment').innerHTML=resultArr[1];
			document.getElementById('dbee-comments').innerHTML=resultArr[2];
			if(resultArr[3]!='') {
				$('#'+resultArr[3]).fadeTo(30, 0.20);
			}
			load_qtip('#dbee-score div[tooltip]');
			for(i=1;i<=5;i++) {
				load_qtip('#scorecomment-content'+i+' div[tooltip]');
			}

			if(resultArr[7]=='1') { // IF USER IS LOGGED IN
				if(resultArr[4]!='-1') {
					if(resultArr[4]=='1') {
						document.getElementById('follow-user').className='unfollow-user';
						document.getElementById('followme-label').innerHTML='unfollow';
						document.getElementById('follow-popup').innerHTML='You do not follow '+resultArr[5]+' any more';
					}
					else {
						document.getElementById('follow-user').className='follow-user';
						document.getElementById('followme-label').innerHTML='follow';
						document.getElementById('follow-popup').innerHTML='You now follow '+resultArr[5];
					}
				}
			}
			
			document.getElementById('totalcomments').value=resultArr[6];

			fadepopup();
			createdrop(1,5);
			Shadowbox.init();
			Shadowbox.setup();
			setInterval("checknewcomments()", 2000);
		}			
		else alert("Retrieval Error: " + SeeDbeeHttp2.statusText);
	}
}



// FUNCTION TO SORT DB COMMENTS
var SortCommentsHttp;
function sortcomments(sortorder) {
	SortCommentsHttp=Browser_Check(SortCommentsHttp);
	
	var db=document.getElementById('hiddendb').value;
	var url="ajax_dbeecomments.php";
	var data="db="+db+"&sortorder="+sortorder;
	
	if(sortorder=='ASC') {
		document.getElementById('sort-latest').className='sort-nonactive';
		document.getElementById('sort-oldest').className='sort-active';
	}
	else if(sortorder=='DESC') {
		document.getElementById('sort-latest').className='sort-active';
		document.getElementById('sort-oldest').className='sort-nonactive';
	}
	
	SortCommentsHttp.open("POST",url,true);
	SortCommentsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SortCommentsHttp.setRequestHeader("Content-length", data.length);
	SortCommentsHttp.setRequestHeader("Connection", "close");
	
	SortCommentsHttp.onreadystatechange = function () {
        sortcommentsresult();
    };
	
	SortCommentsHttp.send(data);	
}

function sortcommentsresult()
{
	if(SortCommentsHttp.readyState==4)
	{			
		if(SortCommentsHttp.status == 200 || SortCommentsHttp.status == 0)
		{
			var result=SortCommentsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('dbee-comments').innerHTML=resultArr[0];
			document.getElementById('currcommentsortorder').value=resultArr[3];
			document.getElementById('commentsortorder').value=resultArr[2];
			fadepopup();
		}			
		else {};
	}
}


// FUNCTION TO HANDLE CAST VOTE ON POLLS
var CastVoteHttp;
function castvote(poll) {
	CastVoteHttp=Browser_Check(CastVoteHttp);

	err=false;
	var vote=getVoteOption();
	if(vote=='') {
		err=true;
	}
	
	if(!err) {
		document.getElementById('voteerr').style.display='none';
		var pollcomment=document.getElementById('PollComment').value;
		if(pollcomment=='write something to support your vote')
			pollcomment='';
		
		var url ="/dbeedetail/castvote";	
		var data="vote="+vote+"&poll="+poll+"&pollcomment="+pollcomment;		
		CastVoteHttp.open("POST",url,true);
		CastVoteHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		CastVoteHttp.setRequestHeader("Content-length", data.length);
		CastVoteHttp.setRequestHeader("Connection", "close");
	
		CastVoteHttp.onreadystatechange = function () {
			castvoteresult();
		};
	
		CastVoteHttp.send(data);	
	} else {
		document.getElementById('voteerr').style.display='block';
	}
}

function castvoteresult()
{
	if(CastVoteHttp.readyState==4)
	{			
		if(CastVoteHttp.status == 200 || CastVoteHttp.status == 0)
		{
			var result=CastVoteHttp.responseText;					
			var resultArr=result.split('~#~');
			if(resultArr[0]=='1') {
//				$('#voteoptions').fadeOut('slow');
//				$('#voteoptions').fadeTo(30, 0.40);
				//loadQtipFixedLeft('pollopt'+resultArr[12],'Your Vote');
				document.getElementById('poll-comment').style.display='none';
//				setTimeout("showmyvote('"+resultArr[1]+"')",200);
				for(i=13;i<=16;i++) {
					if(i!=16) {
						document.getElementById('pollradio'+resultArr[i]).disabled=true;
						document.getElementById('pollopt'+resultArr[i]).style.color = '#666';
					}
					else if(resultArr[16]!='undefined' && resultArr[16]!='') {
						if(document.getElementById('pollradio'+resultArr[16])) {
							document.getElementById('pollradio'+resultArr[16]).disabled=true;
							document.getElementById('pollopt'+resultArr[16]).style.color = '#666';
						}
					}
				}
				document.getElementById('pollradio'+resultArr[12]).disabled=false;
				document.getElementById('pollopt'+resultArr[12]).style.color = '#000';
				document.getElementById('button-vote').style.display='none';
				document.getElementById('vote-submitted').style.display='block';
			}
//			if(resultArr[6]!='' && resultArr[6]!='undefined')
				drawChart(resultArr[3],resultArr[4],resultArr[5],resultArr[6],resultArr[7],resultArr[8],resultArr[9],resultArr[10],resultArr[11]);
//			else
//				drawChart(resultArr[3],resultArr[4],resultArr[5],resultArr[7],resultArr[8],resultArr[9]);
		}
		else {};
	}
}

//
function showmyvote(txt) {
	document.getElementById('myvote').innerHTML=txt;
	$('#myvote').fadeIn('slow');
}

//
function toggledbreplywrapper() {
	if(document.getElementById('dbee-reply-textarea-wrapper').className=='dbee-reply-textarea-wrapper')
		document.getElementById('dbee-reply-textarea-wrapper').className='dbee-reply-textarea-wrapper-shaddow';
	else
		document.getElementById('dbee-reply-textarea-wrapper').className='dbee-reply-textarea-wrapper';

	$('#dbee_comment').removeClass("curFocus");
}

//
function togglemsgreplywrapper() {
	if(document.getElementById('message-reply-wrapper-2').className=='message-reply-wrapper')
		document.getElementById('message-reply-wrapper-2').className='message-reply-wrapper-shadow';
	else
		document.getElementById('message-reply-wrapper-2').className='message-reply-wrapper';
}


// FUNCTION TO USER DETAILS ON PROFILE
var ProfileDetailsHttp;
function seeuserprofile(id) {
	
	ProfileDetailsHttp=Browser_Check(ProfileDetailsHttp);
	
//	document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	//var url="ajax_userprofile.php";
	var url="/profile/detail";
	var data="user="+id;
	ProfileDetailsHttp.open("POST",url,true);
	ProfileDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ProfileDetailsHttp.setRequestHeader("Content-length", data.length);
	ProfileDetailsHttp.setRequestHeader("Connection", "close");	
	ProfileDetailsHttp.onreadystatechange = function () {
        seeuserprofileresult(id);
    };

	ProfileDetailsHttp.send(data);	
}

function seeuserprofileresult(id,fade)
{
	if(ProfileDetailsHttp.readyState==4)
	{			
		if(ProfileDetailsHttp.status == 200 || ProfileDetailsHttp.status == 0)
		{
			var result=ProfileDetailsHttp.responseText;			
			var resultArr=result.split('~#~');
			document.getElementById('profile-highlighted').innerHTML=resultArr[0];
			if(resultArr[2]=='1') { // IF USER IS LOGGED IN
				if(resultArr[1]!='-1') {
					if(resultArr[1]=='1') {
						document.getElementById('follow-user').className='unfollow-user';
						document.getElementById('followme-label').innerHTML='unfollow';
						document.getElementById('follow-popup').innerHTML='You do not follow '+resultArr[3]+' any more';
					}
					else {
						document.getElementById('follow-user').className='follow-user';
						document.getElementById('followme-label').innerHTML='follow';
						document.getElementById('follow-popup').innerHTML='You now follow '+resultArr[3];
					}
				}
			}
			
			/*
			for(i=1;i<=resultArr[4];i++) {
				loadQtipAbove('followinguser'+i,'how to embed explanation goes here');
			}
			*/

			openFadePopup();
			Shadowbox.init();
			Shadowbox.setup();
		}			
		else {};
	}
}


// FUNCTION TO POST DBEE COMMENT
var PostCommentHttp;
function postcomment() {
	var db=document.getElementById('hiddendb').value;
	if(document.getElementById('hiddentwitterreply')) {
		var twittercomment=document.getElementById('hiddentwitterreply').value;
	} else var twittercomment='';
	twittercomment=twittercomment.replace(/&/gi, "%26");

	var err=false;
	var replytype=document.getElementById('replytype').value;
	if(replytype=='text') {
		var comment=document.getElementById('dbee_comment').value;
		if(!isBlank(comment) && comment!="have your say...") {
			comment=comment.replace(/&/g,'%26');
			var data="comment="+comment+"&replytype="+replytype;
			
		}
		else err=true;
	}
	
	if(replytype=='link') {
		var url=document.getElementById('PostLink').value;
		if(document.getElementById('LinkTitle'))
			var linktitle=document.getElementById('LinkTitle').value;
		else err=true;
		if(document.getElementById('LinkDesc'))
			var linkdesc=document.getElementById('LinkDesc').value;
		if(document.getElementById('PostLinkDesc'))
			var userlinkdesc=document.getElementById('PostLinkDesc').value;
		userlinkdesc=userlinkdesc.replace(/&/g,'%26');
		if(linktitle!="") {
			var data="url="+url+"&linktitle="+linktitle+"&linkdesc="+linkdesc+"&userlinkdesc="+userlinkdesc+"&replytype="+replytype;
		}
		else err=true;
	}
	
	if(replytype=='pix') {
		if(document.getElementById('PostPix'))
			var pic=document.getElementById('PostPix').value;
		else err=true;
		if(document.getElementById('PostPixDesc')) {
			var picdesc=document.getElementById('PostPixDesc').value;
			picdesc=picdesc.replace(/&/g,'%26');
		}
		if(pic!="") {
			var data="pic="+pic+"&picdesc="+picdesc+"&replytype="+replytype;
		}
		else err=true;
	}
	
	if(replytype=='vidz')
	{
		var vid=document.getElementById('PostVidz').value;
		var audio=document.getElementById('PostAudio').value;
		audio=audio.replace(/&/g,'%26');
		var VidChk=validatevideo(vid);
		var VidChk=true;
		var videosite = '';
		var videoid = '';
		if(VidChk)
		{
			document.getElementById('videoerror').style.display='none';
			var VideoURLArr=vid.split(".com");
			if(VideoURLArr[0]=='http://www.youtube' || VideoURLArr[0]=='http://youtube' || VideoURLArr[0]=='www.youtube' || VideoURLArr[0]=='youtube') {
				videosite="Youtube";
				var VideoURLIDArr=vid.split("watch?v=")[1].split("&");
				videoid=VideoURLIDArr[0];
			}
			else if(VideoURLArr[0]=='http://www.vimeo' || VideoURLArr[0]=='http://vimeo' || VideoURLArr[0]=='www.vimeo' || VideoURLArr[0]=='vimeo') {
				videosite="Vimeo";
				var VideoURLIDArr=vid.split(".com/");
				videoid=VideoURLIDArr[1];
			}
			else if(VideoURLArr[0]=='http://www.dailymotion' || VideoURLArr[0]=='http://dailymotion' || VideoURLArr[0]=='www.dailymotion' || VideoURLArr[0]=='dailymotion') {
				videosite="Dailymotion";
				var VideoURLIDArr=vid.split("video/")[1].split('#');
				videoid=VideoURLIDArr[0];
			}
			
			var viddesc=document.getElementById('PostVidzDesc').value;
			viddesc=viddesc.replace(/&/g,'%26');
			if(vid!="" || audio!="") {
				var data="vid="+vid+"&viddesc="+viddesc+"&videosite="+videosite+"&videoid="+videoid+"&audio="+audio+"&replytype="+replytype;
			}
		}
		else {
			err=true;
			document.getElementById('videoerror').style.display='block';
		}
	}

	if(!err) {
		
		PostCommentHttp=Browser_Check(PostCommentHttp);
	
		var url="/comment/insertdata";
		data+="&db="+db+"&twittercomment="+twittercomment;		
		PostCommentHttp.open("POST",url,true);
		PostCommentHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		PostCommentHttp.setRequestHeader("Content-length", data.length);
		PostCommentHttp.setRequestHeader("Connection", "close");
		
		PostCommentHttp.onreadystatechange = postcommentresult;
	
		PostCommentHttp.send(data);	
	}
}

function postcommentresult()
{
	if(PostCommentHttp.readyState==4)
	{			
		if(PostCommentHttp.status == 200 || PostCommentHttp.status == 0)
		{
			var result=PostCommentHttp.responseText;	
			
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				setTimeout('reloadComments('+resultArr[1]+')',700);
				document.getElementById('total_comments').innerHTML=resultArr[2]+' comments';
				document.getElementById('dbee_comment').value='have your say...';
				document.getElementById('PostLink').value='paste link here';
				document.getElementById('LinkInfoWrapper').style.display='none';
				document.getElementById('dbeePix_upload_area').innerHTML='<div style="margin-top:12px">Preview your picture</div>';
				document.getElementById('PostPixDesc').value='write something about this picture...';
				document.getElementById('PostVidz').value='paste YouTube link here';
				document.getElementById('PostAudio').value='paste SoundCloud embed code here';
				document.getElementById('PostVidzDesc').value='write something about this media...';
				if(document.getElementById('twitter-reply-box')) {
					document.getElementById('twitter-reply-box').style.display='none';
					var twittername=document.getElementById('hiddentwittername').value;
					if(twittername!='') {
						sendtweetnotification(twittername,resultArr[1],resultArr[3]);
					}
					document.getElementById('hiddentwitterreply').value='';
				}
				if(resultArr[4]!='-1' && resultArr[4]==2) {
					document.getElementById('dbreplybtnwrapper').innerHTML="<div style='float:right; padding:8px;'>Login to post comment</div><div class='next-line'></div>";
				}
				document.getElementById('notify-comment-div').style.display='block';
				document.getElementById('sort-comments').style.display='block';
			}
			else {
				if(resultArr[5]==1) {
					OpenShadowbox('youareblocked.php','','40','340');
					setTimeout("parent.Shadowbox.close()",6000);
				}
			}
		}			
		else {};
	}
}



// FILL BLOCK USER POPOUP
function fillblockuserpopup(user,owner,db) {
	document.getElementById('blockuser-popup').innerHTML='This user will no longer be able to post a comment on this db. Are you sure you want to continue?<br><br><label><input type="checkbox" id="notifyblockuser" value="1"><span style="color:#999">Notify user</span></label><p align="center"><a href="javascript:void(0);" onclick="javascript:blockusertocomment('+user+','+owner+','+db+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
}


// FUNCTION TO POST DBEE COMMENT
var BlockUserHttp;
function blockusertocomment(user,owner,db) {
	BlockUserHttp=Browser_Check(BlockUserHttp);
	
	if(document.getElementById('notifyblockuser'))
		var notify=document.getElementById('notifyblockuser').value;

	var url="ajax_blockuser.php";
	var data="db="+db+"&user="+user+"&owner="+owner+"&notify="+notify;
	
	BlockUserHttp.open("POST",url,true);
	BlockUserHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	BlockUserHttp.setRequestHeader("Content-length", data.length);
	BlockUserHttp.setRequestHeader("Connection", "close");
	
	BlockUserHttp.onreadystatechange = blockusertocommentresult;

	BlockUserHttp.send(data);	
}

function blockusertocommentresult()
{
	if(BlockUserHttp.readyState==4)
	{			
		if(BlockUserHttp.status == 200 || BlockUserHttp.status == 0)
		{
			var result=BlockUserHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				$(".blockuser-"+resultArr[2]).html('<a href="javascript:void(0);" onclick="javascript:unblockuser('+resultArr[2]+','+resultArr[3]+','+resultArr[4]+');"><span style="color:#EB8649">Unblock</span></a><div style="width:1px; height:10px;"></div>');
//				$(".blockuser-"+resultArr[2]).fadeTo(30, 0.80);
				document.getElementById('blockuser-popup').innerHTML=resultArr[1]+' has been blocked from this db.';
				setTimeout("closepopup('fade')",2000);
			}
		}
		else {};
	}
}


// FUNCTION TO UNBLOCK USER FROM DB
var UnBlockUserHttp;
function unblockuser(user,owner,db) {
	UnBlockUserHttp=Browser_Check(UnBlockUserHttp);
	
	var url="ajax_blockuser.php";
	var data="db="+db+"&user="+user+"&owner="+owner+"&unblock=1";
	
	UnBlockUserHttp.open("POST",url,true);
	UnBlockUserHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	UnBlockUserHttp.setRequestHeader("Content-length", data.length);
	UnBlockUserHttp.setRequestHeader("Connection", "close");
	
	UnBlockUserHttp.onreadystatechange = unblockuserresult;

	UnBlockUserHttp.send(data);	
}

function unblockuserresult()
{
	if(UnBlockUserHttp.readyState==4)
	{			
		if(UnBlockUserHttp.status == 200 || UnBlockUserHttp.status == 0)
		{
			var result=UnBlockUserHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				$(".blockuser-"+resultArr[2]).html('<a href="#?w=400" rel="blockuser-popup" class="poplight" onclick="javascript:fillblockuserpopup('+resultArr[2]+','+resultArr[3]+','+resultArr[4]+');"><span style="color:#F40B0B">Block</span></a>');
				$(".blockuser-"+resultArr[2]).fadeTo(30, 1);
				document.getElementById('blockuser-popup').innerHTML=resultArr[1]+' un-blocked. '+resultArr[1]+' can again post comments now.';
				setTimeout("closepopup('fade')",2000);
				fadepopup();
			}
		}			
		else {};
	}
}


// FUNCTION TO BLOCK USER FROM MESSAGING YOU
var BlockUserMsgHttp;
function blockuserfrommsg(user,id) {
	BlockUserMsgHttp=Browser_Check(BlockUserMsgHttp);
	
	var url="ajax_blockuserfrommsg.php";
	var data="user="+user+"&id="+id;
	
	BlockUserMsgHttp.open("POST",url,true);
	BlockUserMsgHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	BlockUserMsgHttp.setRequestHeader("Content-length", data.length);
	BlockUserMsgHttp.setRequestHeader("Connection", "close");
	
	BlockUserMsgHttp.onreadystatechange = blockuserfrommsgresult;

	BlockUserMsgHttp.send(data);	
}

function blockuserfrommsgresult()
{
	if(BlockUserMsgHttp.readyState==4)
	{			
		if(BlockUserMsgHttp.status == 200 || BlockUserMsgHttp.status == 0)
		{
			var result=BlockUserMsgHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				document.getElementById('blockusermsg-popup').innerHTML=resultArr[1]+' has been blocked from messaging you.';
				document.getElementById('blockuser-div-'+resultArr[2]+'').innerHTML='<div style="float:left; margin-left:10px; color:#CC0000;" title="'+resultArr[1]+' is blocked from messaging you">['+resultArr[1]+' is blocked]</div>';
				setTimeout("closepopup('fade')",2000);
			}
		}
		else {};
	}
}


// FUNCTION TO SCORE DBEE
var ScoreDbeeHttp;
function scoredbee(score,tag,type,cid) {
/*	if(type=='1')
		var db=document.getElementById('hiddendb').value;
	else if(type=='2')
*/		var db=window.parent.document.getElementById('hiddendb').value;
	
	ScoreDbeeHttp=Browser_Check(ScoreDbeeHttp);
	
	var url="/profile/scoredbee";
	var data="db="+db+"&comment="+cid+"&score="+score+"&type="+type;	
	ScoreDbeeHttp.open("POST",url,true);
	ScoreDbeeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ScoreDbeeHttp.setRequestHeader("Content-length", data.length);
	ScoreDbeeHttp.setRequestHeader("Connection", "close");
	
	ScoreDbeeHttp.onreadystatechange = function () {
        scoredbeeresult(tag,cid);
    };
 
	ScoreDbeeHttp.send(data);	
}

function scoredbeeresult(tag,cid)
{ 
	if(ScoreDbeeHttp.readyState==4)
	{			
		if(ScoreDbeeHttp.status == 200 || ScoreDbeeHttp.status == 0)
		{
			var result=ScoreDbeeHttp.responseText;			
			var resultArr=result.split('~');
			if(resultArr[3]=='1' && resultArr[0]=='1') {
				if(resultArr[2]!='1') fadeto=0.30; else fadeto=1;
				$('#love-dbee').fadeTo(30, fadeto);
				$('#like-dbee').fadeTo(30, fadeto);
				$('#philosopher-dbee').fadeTo(30, fadeto);
				$('#dislike-dbee').fadeTo(30, fadeto);
				$('#hate-dbee').fadeTo(30, fadeto);
				if(resultArr[2]!='1')
					$('#'+tag+'-dbee').fadeTo(30, 1);

				var scoreTotal=parseInt(window.parent.document.getElementById(tag+'TotalDB').innerHTML);
				if(resultArr[2]=='0') window.parent.document.getElementById(tag+'TotalDB').innerHTML=scoreTotal+1; // IF NO PREVIOUS SCORE WAS DELETED
				if(resultArr[4]!='0') { // IF PREVIOUS SCORE EXISTED AND WAS DELETED
					var scoreTotalLast=parseInt(window.parent.document.getElementById(resultArr[4]+'TotalDB').innerHTML);
					window.parent.document.getElementById(resultArr[4]+'TotalDB').innerHTML=scoreTotalLast-1;
				}
			}
			else if(resultArr[3]=='2' && resultArr[0]=='1') {
				if(resultArr[2]=='0')
					window.parent.document.getElementById('comment-score'+cid).innerHTML='YOU SCORED&nbsp;&nbsp;<img src="images/scoring/small/'+tag+'.png" style="position:absolute; margin-top:-5px;">';
				else if(resultArr[2]=='1')
					window.parent.document.getElementById('comment-score'+cid).innerHTML='';
			}

			parent.Shadowbox.close();
		}
		else alert("Retrieval Error: " + ScoreDbeeHttp.statusText);
	}
}
// FUNCTION TO SCORE DBEE


// FILL HIDE USER DB POPOUP
function fillhideuserdbpopup(user) {
	document.getElementById('hideuserdb-popup').innerHTML='You are about to hide this users dbees from your homepage.<br><br>This action can\'t be undone. Are you sure you want to continue?<br><br><a href="javascript:void(0);" onclick="javascript:hideuserdb('+user+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a>';
}

// FUNCTION TO HIDE DBEES FROM A USER
var HideUserDbsHttp;
function hideuserdb(id) {
	HideUserDbsHttp=Browser_Check(HideUserDbsHttp);
	
	var url="ajax_hideuserdb.php";
	var data="user="+id;
	
	HideUserDbsHttp.open("POST",url,true);
	HideUserDbsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	HideUserDbsHttp.setRequestHeader("Content-length", data.length);
	HideUserDbsHttp.setRequestHeader("Connection", "close");
	
	HideUserDbsHttp.onreadystatechange = function () {
        hideuserdbresult(id);
    };

	HideUserDbsHttp.send(data);	
}

function hideuserdbresult(id)
{
	if(HideUserDbsHttp.readyState==4)
	{			
		if(HideUserDbsHttp.status == 200 || HideUserDbsHttp.status == 0)
		{
			var result=HideUserDbsHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				document.getElementById('hideuserdb-popup').innerHTML='<div align="center" style="color:#999; font-size:18px;">You will not see dbees from this user on your homepage any more.</div>';
				reloadFeeds();
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else {};
	}
}


// FUNCTION TO FOLLOW USER
var FollowMeHttp;
function followme(id) {
	
	FollowMeHttp=Browser_Check(FollowMeHttp);
	
	var url="/following/insertdata";
	var data="user="+id;
	
	FollowMeHttp.open("POST",url,true);
	FollowMeHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FollowMeHttp.setRequestHeader("Content-length", data.length);
	FollowMeHttp.setRequestHeader("Connection", "close");
	
	FollowMeHttp.onreadystatechange = function () {
        followmeresult(id);
    };
   
	FollowMeHttp.send(data);	
}

function followmeresult(id)
{
	if(FollowMeHttp.readyState==4)
	{			
		
		if(FollowMeHttp.status == 200 || FollowMeHttp.status == 0)
		{
			var result=FollowMeHttp.responseText;
			
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				if(resultArr[2]=='1') { // IF UNFOLLOW
					var flag=0;
					document.getElementById('follow-popup').innerHTML='You do not follow '+resultArr[1]+' any more';
					document.getElementById('followme-label').innerHTML='follow';
					document.getElementById('follow-user').className='follow-user';
				}
				else { // IF FOLLOW
					var flag=1;
					document.getElementById('follow-popup').innerHTML='You now follow '+resultArr[1];
					document.getElementById('followme-label').innerHTML='unfollow';
					document.getElementById('follow-user').className='unfollow-user';
				}
//				document.getElementById('followercount').innerHTML=resultArr[3];
				setTimeout("closepopup('fade',"+flag+",'"+resultArr[1]+"')",2000);
			}
		}			
		else alert("Retrieval Error: " + FollowMeHttp.statusText);
	}
}

function setpopupHTML(flag,name) {
	if(flag=='0') document.getElementById('follow-popup').innerHTML='You now follow '+name;
	else if(flag=='1') document.getElementById('follow-popup').innerHTML='You do not follow '+name+' any more';
}
// FUNCTION TO FOLLOW USER


// FUNCTION TO RE DB
var ReDbHttp;
function redbee(db,user) {
	
	ReDbHttp=Browser_Check(ReDbHttp);		
	var url="/myhome/insertredbee";
	var data="db="+db+"&dbOwner="+user;	
	ReDbHttp.open("POST",url,true);
	ReDbHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ReDbHttp.setRequestHeader("Content-length", data.length);
	ReDbHttp.setRequestHeader("Connection", "close");	
	ReDbHttp.onreadystatechange = redbeeresult;	
	ReDbHttp.send(data);	
}

function redbeeresult()
{
	if(ReDbHttp.readyState==4)
	{			
		if(ReDbHttp.status == 200 || ReDbHttp.status == 0)
		{
			var result=ReDbHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else alert("Retrieval Error: " + ReDbHttp.statusText);
	}
}
// FUNCTION TO RE DB



// FUNCTION TO ADD DB TO FAVOURITES
var AddToFavouriteHttp;
function addtofavourite(db,user) {
	AddToFavouriteHttp=Browser_Check(AddToFavouriteHttp);
	var url="/myhome/addtofav";
	var data="db="+db+"&dbOwner="+user;	
	AddToFavouriteHttp.open("POST",url,true);
	AddToFavouriteHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	AddToFavouriteHttp.setRequestHeader("Content-length", data.length);
	AddToFavouriteHttp.setRequestHeader("Connection", "close");	
	AddToFavouriteHttp.onreadystatechange = addtofavouriteresult;
	AddToFavouriteHttp.send(data);	
}

function addtofavouriteresult()
{
	if(AddToFavouriteHttp.readyState==4)
	{			
		if(AddToFavouriteHttp.status == 200 || AddToFavouriteHttp.status == 0)
		{
			var result=AddToFavouriteHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1') {
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else alert("Retrieval Error: " + AddToFavouriteHttp.statusText);
	}
}


function filldeletedbcontrols(db) {
	document.getElementById('deletedb-controls').innerHTML='<a href="javascript:deletedbee('+db+',\'main\')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:closepopup(\'fade\')">No</a>';
}

function filldeleteredbcontrols(db) {
	document.getElementById('deleteredb-controls').innerHTML='<a href="javascript:deletedbee('+db+',\'redb\')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:closepopup(\'fade\')">No</a>';
}

function filldeletefavouritecontrols(db) {
	document.getElementById('deletefavourite-controls').innerHTML='<a href="javascript:deletedbee('+db+',\'favourite\')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:closepopup(\'fade\')">No</a>';
}

// FUNCTION TO DELETE DB FROM YOUR PROFILE
var DeleteDbHttp;
function deletedbee(db,type) {
	DeleteDbHttp=Browser_Check(DeleteDbHttp);
	
	var url="ajax_deletedb.php";
	var data="db="+db+"&type="+type;
	
	DeleteDbHttp.open("POST",url,true);
	DeleteDbHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DeleteDbHttp.setRequestHeader("Content-length", data.length);
	DeleteDbHttp.setRequestHeader("Connection", "close");
	
	DeleteDbHttp.onreadystatechange = deletedbeeresult;

	DeleteDbHttp.send(data);	
}

function deletedbeeresult()
{
	if(DeleteDbHttp.readyState==4)
	{			
		if(DeleteDbHttp.status == 200 || DeleteDbHttp.status == 0)
		{
			var result=DeleteDbHttp.responseText;
			var resultArr=result.split('~');
			if(resultArr[0]=='1' && resultArr[2]=='main') {
				document.getElementById('dbee-id-'+resultArr[1]).style.display='none';
				document.getElementById('deletepost-popup').innerHTML='DB deleted successfully.';
				setTimeout("closepopup('fade')",2000);
				setTimeout("resetdeletedbcontrols()",4000);
			}
			if(resultArr[0]=='1' && resultArr[2]=='redb') {
				document.getElementById('dbee-id-'+resultArr[1]).style.display='none';
				document.getElementById('deleteredb-popup').innerHTML='DB removed from your profile successfully.';
				setTimeout("closepopup('fade')",2000);
				setTimeout("resetdeleteredbcontrols()",4000);
			}
			if(resultArr[0]=='1' && resultArr[2]=='favourite') {
				document.getElementById('dbee-id-'+resultArr[1]).style.display='none';
				document.getElementById('deletefavourite-popup').innerHTML='DB removed from your favourites.';
				if(resultArr[4]==0)
					document.getElementById('dbee-feeds').innerHTML=resultArr[3];
				setTimeout("closepopup('fade')",2000);
				setTimeout("resetdeletefavouritecontrols()",4000);
			}
			openFadePopup();
		}
		else alert("Retrieval Error: " + DeleteDbHttp.statusText);
	}
}

// FUNCTION TO RESET DELETE DBEE CONTROLS AFTER A PREVIOUS DBEE HAS BEEN DELETED
function resetdeletedbcontrols() {
	document.getElementById('deletepost-popup').innerHTML='Do you really want to delete this dbee?<br /><br /><div id="deletedb-controls"></div>';
}

// FUNCTION TO RESET DELETE DBEE CONTROLS AFTER A PREVIOUS DBEE HAS BEEN DELETED
function resetdeleteredbcontrols() {
	document.getElementById('deleteredb-popup').innerHTML='Do you really want to remove this db from your profile?<br /><br /><div id="deleteredb-controls"></div>';
}

// FUNCTION TO RESET DELETE DBEE CONTROLS AFTER A PREVIOUS DBEE HAS BEEN DELETED
function resetdeletefavouritecontrols() {
	document.getElementById('deletefavourite-popup').innerHTML='Do you really want to remove this db from your favourites?<br /><br /><div id="deletefavourite-controls"></div>';
}


// GENERIC FUNCTION TO AUTO CLOSE FADE POPUP
function closepopup(id,flag,name) {
	flag = typeof(flag) != 'undefined' ? flag : '-1';
	name = typeof(name) != 'undefined' ? name : '';
	$('#'+id+', .popup_block').fadeOut(function() {
		$('#'+id+', a.close').remove();  
	});
	if(flag!='-1') setTimeout("setpopupHTML("+flag+",'"+name+"')",1000);;
}
// GENERIC FUNCTION TO AUTO CLOSE FADE POPUP



// FUNCTION TO SEE USER FOLLOWERS
var FollowersHttp;
function seefollowers(id) {
	FollowersHttp=Browser_Check(FollowersHttp);

	var url="ajax_followers.php";
	var data="user="+id;

	FollowersHttp.open("POST",url,true);
	FollowersHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FollowersHttp.setRequestHeader("Content-length", data.length);
	FollowersHttp.setRequestHeader("Connection", "close");
	
	FollowersHttp.onreadystatechange = seefollowersresult;
	
	FollowersHttp.send(data);	
}

function seefollowersresult()
{
	if(FollowersHttp.readyState==4)
	{			
		if(FollowersHttp.status == 200 || FollowersHttp.status == 0)
		{
			var result=FollowersHttp.responseText;
//			var resultArr=result.split('~#~');
			document.getElementById('maindb-wrapper').innerHTML=result;
		}			
		else alert("Retrieval Error: " + FollowersHttp.statusText);
	}
}


// FUNCTION TO SEE USER FOLLOWING
var FollowingHttp;
function seefollowing(id) {
	FollowingHttp=Browser_Check(FollowingHttp);

	//var url="ajax_following.php";
	var url="/following/index";
	var data="user="+id;
	
	FollowingHttp.open("POST",url,true);
	FollowingHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	FollowingHttp.setRequestHeader("Content-length", data.length);
	FollowingHttp.setRequestHeader("Connection", "close");

	FollowingHttp.onreadystatechange = seefollowingresult;
	
	FollowingHttp.send(data);	
}

function seefollowingresult()
{
	if(FollowingHttp.readyState==4)
	{			
		if(FollowingHttp.status == 200 || FollowingHttp.status == 0)
		{
			var result=FollowingHttp.responseText;
//			var resultArr=result.split('~#~');
			document.getElementById('maindb-wrapper').innerHTML=result;
		}			
		else alert("Retrieval Error: " + FollowingHttp.statusText);
	}
}



//FUNCTION TO SEE NOTIFICATIONS WHEN LINK IS CLICKED FROM HEADER
var NotificationHttp;
function seenotification(end,type) {
	
	NotificationHttp=Browser_Check(NotificationHttp);
	
	document.getElementById('notification-feed').innerHTML='<div style="margin:10px 0 0 20px;">Loading...</div>';
	document.getElementById('notes-tab-1').className='notification-tab';
	document.getElementById('notes-tab-2').className='notification-tab';
	document.getElementById('notes-tab-3').className='notification-tab';
	document.getElementById('notes-tab-'+type).className='notification-tab-open';
	
	if(type=='2') {
	if(document.getElementById("newredb-icon"))
		document.getElementById("newredb-icon").style.display='none';
	}
	
	if(type=='3') {
	if(document.getElementById("newmention-icon"))
		document.getElementById("newmention-icon").style.display='none';
	}
	
	//var url="ajax_notifications.php";
	var url="/notification/fetchnotification";
	var data="end="+end+"&type="+type;
	
	NotificationHttp.open("POST",url,true);
	NotificationHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	NotificationHttp.setRequestHeader("Content-length", data.length);
	NotificationHttp.setRequestHeader("Connection", "close");
	
	NotificationHttp.onreadystatechange = seenotificationresult;
	
	NotificationHttp.send(data);
}

function seenotificationresult()
{
	if(NotificationHttp.readyState==4)
	{
		if(NotificationHttp.status == 200 || NotificationHttp.status == 0)
		{
			var result=NotificationHttp.responseText;
			var resultArr=result.split('~');
			document.getElementById('notification-feed').innerHTML=resultArr[0];
		}
		else {};
	}
}




// FUNCTION TO SHOW USER PIC ON MESSAGE
var MessageUserHttp;
function messagefeed(uid,read,mid) {
	MessageUserHttp=Browser_Check(MessageUserHttp);
	
	var url="ajax_messagefeed.php";
	var data="user="+uid+"&read="+read+"&mid="+mid;
	
	MessageUserHttp.open("POST",url,true);
	MessageUserHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MessageUserHttp.setRequestHeader("Content-length", data.length);
	MessageUserHttp.setRequestHeader("Connection", "close");
	
	MessageUserHttp.onreadystatechange = messagefeedresult;

	MessageUserHttp.send(data);
}

function messagefeedresult()
{
	if(MessageUserHttp.readyState==4)
	{
		if(MessageUserHttp.status == 200 || MessageUserHttp.status == 0)
		{
			var result=MessageUserHttp.responseText;
			var resultArr=result.split('~#~');
			/*
			if(resultArr[0]!='')
				document.getElementById('message-archive-dates').innerHTML=resultArr[0];
			*/
			document.getElementById('message-feed').innerHTML=resultArr[1];
		}
		else alert("Retrieval Error: " + MessageUserHttp.statusText);
	}
}


// FUNCTION TO SHOW MY MESSAGES
var MyMessagesHttp;
function allmessagefeed(n) {
	document.getElementById('all-message-feed').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	MyMessagesHttp=Browser_Check(MyMessagesHttp);
	
	var url="ajax_mymessages.php";
	var data="archive="+n;
	
	MyMessagesHttp.open("POST",url,true);
	MyMessagesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MyMessagesHttp.setRequestHeader("Content-length", data.length);
	MyMessagesHttp.setRequestHeader("Connection", "close");
	
	MyMessagesHttp.onreadystatechange = allmessagefeedresult;

	MyMessagesHttp.send(data);
}

function allmessagefeedresult()
{
	if(MyMessagesHttp.readyState==4)
	{
		if(MyMessagesHttp.status == 200 || MyMessagesHttp.status == 0)
		{
			var result=MyMessagesHttp.responseText;
			document.getElementById('all-message-feed').innerHTML=result;
		}
		else alert("Retrieval Error: " + MyMessagesHttp.statusText);
	}
}


// FUNCTION TO SHOW NEW MESSAGES
var NewMessagesHttp;
function newmessagefeed(n) {
	document.getElementById('all-message-feed').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	NewMessagesHttp=Browser_Check(NewMessagesHttp);
	
	var url="/message/dbeemessage";
	var data="archive="+n;
	
	NewMessagesHttp.open("POST",url,true);
	NewMessagesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	NewMessagesHttp.setRequestHeader("Content-length", data.length);
	NewMessagesHttp.setRequestHeader("Connection", "close");
	
	NewMessagesHttp.onreadystatechange = newmessagefeedresult;

	NewMessagesHttp.send(data);
}

function newmessagefeedresult()
{
	if(NewMessagesHttp.readyState==4)
	{
		if(NewMessagesHttp.status == 200 || NewMessagesHttp.status == 0)
		{	
			
			var result=NewMessagesHttp.responseText;			
			document.getElementById('all-message-feed').innerHTML=result;
			fadepopup();
		}
		else {};
	}
}


// FUNCTION TO POST MESSAGE
var PostMessageHttp;
function postmessage(from) {
	from = typeof(from) != 'undefined' ? from : 'msgmain';
	
	var user=document.getElementById('hiddenuser').value;
	var message=document.getElementById('message-reply').value;
	var parent =document.getElementById('parent').value;
	
	document.getElementById('signuploader').style.display='block';

	PostMessageHttp=Browser_Check(PostMessageHttp);
	
	var url="ajax_postmessage.php";
	var url="/message/add";
	var data="user="+user+"&message="+message+"&parent="+parent;	
	PostMessageHttp.open("POST",url,true);
	PostMessageHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	PostMessageHttp.setRequestHeader("Content-length", data.length);
	PostMessageHttp.setRequestHeader("Connection", "close");
	
	PostMessageHttp.onreadystatechange = function () {
		postmessageresult(from);
	};

	PostMessageHttp.send(data);	
}

function postmessageresult(from)
{
	if(PostMessageHttp.readyState==4)
	{			
		if(PostMessageHttp.status == 200 || PostMessageHttp.status == 0)
		{
			var result=PostMessageHttp.responseText;			
			var resultArr=result.split('~');
			document.getElementById('signuploader').style.display='none';			
			if(resultArr[0]!='-1') {
				if(from=='msgmain') {					
					//setTimeout('reloadMessages('+resultArr[0]+','+resultArr[1]+')',700);					
					setTimeout('gotomessagereload('+resultArr[0]+','+resultArr[2]+')',700);
					document.getElementById('message-reply').value='leave a message...';
				}
				else if(from=='popup') {
					document.getElementById('sendmessagepopup-content').style.display='none';
					document.getElementById('sendmessage-msg').style.display='block';
					setTimeout("parent.Shadowbox.close()",3000);
				}
			} else {
				document.getElementById('message-reply-wrapper').innerHTML='<div class="user-blocked-box">You cannot send a message as '+resultArr[2]+' has blocked you.</div>';
			}
		}			
		else {};
	}
}


// FUNCTION TO FETCH OLDER MESSAGES
var OldMessagesHttp;
function showoldmessages(dt) {
	var user=document.getElementById('hiddenuser').value;
	document.getElementById('message-feed').innerHTML='Loading...';

	OldMessagesHttp=Browser_Check(OldMessagesHttp);
	
	var url="ajax_messagefeed_older.php";
	var data="user="+user+"&dt="+dt;
	
	OldMessagesHttp.open("POST",url,true);
	OldMessagesHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	OldMessagesHttp.setRequestHeader("Content-length", data.length);
	OldMessagesHttp.setRequestHeader("Connection", "close");
	
	OldMessagesHttp.onreadystatechange = showoldmessagesresult;

	OldMessagesHttp.send(data);	
}

function showoldmessagesresult()
{
	if(OldMessagesHttp.readyState==4)
	{			
		if(OldMessagesHttp.status == 200 || OldMessagesHttp.status == 0)
		{
			var result=OldMessagesHttp.responseText;
			document.getElementById('message-feed').innerHTML=result;
			document.getElementById('send-message').style.display='block';
		}
		else alert("Retrieval Error: " + OldMessagesHttp.statusText);
	}
}

var MessagedetailsHttp;
function gotomessage(uid,mid) {
	//window.location='messagedetail'+mid;
	document.getElementById('all-message-feed').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	MessagedetailsHttp=Browser_Check(MessagedetailsHttp);
	
	var url="/message/messagedbee";
	var data="id="+mid+"&user="+uid;	
	MessagedetailsHttp.open("POST",url,true);
	MessagedetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MessagedetailsHttp.setRequestHeader("Content-length", data.length);
	MessagedetailsHttp.setRequestHeader("Connection", "close");
	
	MessagedetailsHttp.onreadystatechange = messagedetailsresult;

	MessagedetailsHttp.send(data);
}
function messagedetailsresult()
{
	
	if(MessagedetailsHttp.readyState==4)
	{
		if(MessagedetailsHttp.status == 200 || MessagedetailsHttp.status == 0)
		{							
			var result=MessagedetailsHttp.responseText;	
			
			document.getElementById('all-message-feed').innerHTML=result;
			fadepopup();
		}
		else {};
	}
}


var MessagereloadHttp;
function gotomessagereload(uid,mid) {
	//window.location='messagedetail'+mid;
	document.getElementById('message-feed-wrapper').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	MessagereloadHttp=Browser_Check(MessagereloadHttp);
	
	var url="/message/messagereload";
	var data="id="+mid+"&user="+uid;
	MessagereloadHttp.open("POST",url,true);
	MessagereloadHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MessagereloadHttp.setRequestHeader("Content-length", data.length);
	MessagereloadHttp.setRequestHeader("Connection", "close");	
	MessagereloadHttp.onreadystatechange = messagereloadresult2;	
	MessagereloadHttp.send(data);
}
function messagereloadresult2()
{
	
	if(MessagereloadHttp.readyState==4)
	{
		if(MessagereloadHttp.status == 200 || MessagereloadHttp.status == 0)
		{							
			var result=MessagereloadHttp.responseText;					
			document.getElementById('message-feed-wrapper').innerHTML=result;
			fadepopup();
		}
		else {};
	}
}
// FUNCTION TO ARCHIVE MESSAGE
var ArchiveMessageHttp;
function archivemessage(user,message,status) {
	ArchiveMessageHttp=Browser_Check(ArchiveMessageHttp);
	
	var url="ajax_archivemessage.php";
	var data="user="+user+"&message="+message+"&status="+status;
	
	ArchiveMessageHttp.open("POST",url,true);
	ArchiveMessageHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ArchiveMessageHttp.setRequestHeader("Content-length", data.length);
	ArchiveMessageHttp.setRequestHeader("Connection", "close");
	
	ArchiveMessageHttp.onreadystatechange = archivemessageresult;

	ArchiveMessageHttp.send(data);
}

function archivemessageresult()
{
	if(ArchiveMessageHttp.readyState==4)
	{
		if(ArchiveMessageHttp.status == 200 || ArchiveMessageHttp.status == 0)
		{
			var result=ArchiveMessageHttp.responseText;
			document.getElementById('message-'+result).style.display='none';
			setTimeout("closepopup('fade')",2000);
		}
		else {};
	}
}


function removeuserfrominvite(user) {
	var users=document.getElementById('total-users-toinvite').value;
	users = users.replace(user, "");
	document.getElementById('total-users-toinvite').value=users;
	document.getElementById('select-invite-'+user).style.display='none';
}


// FUNCTION TO SEE GROUP DETAILS ON MAIN GROUP PAGE
var GroupDetailsHttp;
function seegroupdetails(group,owner,joinlink,dbpage) {
	dbpage = typeof(dbpage) != 'undefined' ? dbpage : '0';
	GroupDetailsHttp=Browser_Check(GroupDetailsHttp);
	
//	document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';
	var url="ajax_groupdetails.php";
	var data="group="+group+"&owner="+owner+"&joinlink="+joinlink+"&dbpage="+dbpage;
	
	GroupDetailsHttp.open("POST",url,true);
	GroupDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupDetailsHttp.setRequestHeader("Content-length", data.length);
	GroupDetailsHttp.setRequestHeader("Connection", "close");
	
	GroupDetailsHttp.onreadystatechange = function () {
        seegroupdetailsresult(group);
    };
	
	GroupDetailsHttp.send(data);	
}

function seegroupdetailsresult(id,fade)
{
	if(GroupDetailsHttp.readyState==4)
	{			
		if(GroupDetailsHttp.status == 200 || GroupDetailsHttp.status == 0)
		{
			var result=GroupDetailsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('group-highlighted').innerHTML=resultArr[0];

			openFadePopup();
			Shadowbox.init();
			Shadowbox.setup();
		}			
		else {};
	}
}

// FUNCTION TO MOVE TO STEP 2 OF CREATE GROUP
function creategroupstep2() {
	err=false;
	if(document.getElementById('group-name').value=='') {
		document.getElementById("group-name").style.backgroundColor='#F3F2F1';
		document.getElementById("group-name").focus();
		err=true;
	}
	else {
		document.getElementById("group-name").style.backgroundColor='#FFF';
	}
	
	if(!err) {
		document.getElementById('create-groups-wrapper').style.display='none';
		document.getElementById('creategroup-step2').style.display='block';
	}
}


// FUNCTION TO CREATE GROUP
var ProceedCreateGroupHttp;
function proceedcreategroup() {
	err=false;
/*	if(document.getElementById('group-name').value=='') {
		document.getElementById("group-name").style.backgroundColor='#F3F2F1';
		document.getElementById("group-name").focus();
		err=true;
	}
	else {
		document.getElementById("group-name").style.backgroundColor='#FFF';
	}
*/	
	if(!err) {
//		document.getElementById('create-groups-wrapper').style.display='none';
		document.getElementById('creategroup-step2').style.display='none';
		document.getElementById('invite-group-members').style.display='block';
	
		// INITIATE INVITE TABS
		var invitetb=new ddtabcontent("invitetabs");
		invitetb.setpersist(false);
		invitetb.setselectedClassTarget("link"); //"link" or "linkparent"
		invitetb.init();
		// INITIATE INVITE TABS
	}
}

//FUNCTION TO CREATE GROUP
var CreateGroupHttp;
function creategroup() {
	err=false;
	if(document.getElementById('group-name').value=='') {
		document.getElementById("group-name").style.backgroundColor='#F3F2F1';
		document.getElementById("group-name").focus();
		err=true;
	}
	else {
		var groupname=document.getElementById("group-name").value;
		document.getElementById("group-name").style.backgroundColor='#FFF';
	}
//	var grouptype=document.getElementById("group-type").value;
	var grouptype=getGroupType('create');
	var grouptypeother=document.getElementById("group-type-other").value;
	var groupprivacy=getGroupPrivacy();
	if(document.getElementById("PostPix")) var grouppic=document.getElementById("PostPix").value;
	else var grouppic='default_pic.jpg';
	var groupdesc=document.getElementById("group-desc").value;	
	if(grouptype=='') grouptype=0;
	
	if(!err) {
		CreateGroupHttp=Browser_Check(CreateGroupHttp);
		
		//var url="ajax_creategroup.php";
		var url="/group/insertdata";
		var data="groupname="+groupname+"&grouptype="+grouptype+"&grouptypeother="+grouptypeother+"&groupprivacy="+groupprivacy+"&grouppic="+grouppic+"&groupdesc="+groupdesc;
		
		CreateGroupHttp.open("POST",url,true);
		CreateGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		CreateGroupHttp.setRequestHeader("Content-length", data.length);
		CreateGroupHttp.setRequestHeader("Connection", "close");		
		CreateGroupHttp.onreadystatechange = creategroupresult;		
		CreateGroupHttp.send(data);
	}
}

function creategroupresult()
{
	if(CreateGroupHttp.readyState==4)
	{
		if(CreateGroupHttp.status == 200 || CreateGroupHttp.status == 0)
		{
			var result=CreateGroupHttp.responseText;
			if(result!='0') {				
				/*
				document.getElementById('create-groups-wrapper').style.display='none';
				document.getElementById('groupid').value=result;
				document.getElementById('invite-group-members').style.display='block';

				var invitetb=new ddtabcontent("invitetabs")
				invitetb.setpersist(false)
				invitetb.setselectedClassTarget("link") //"link" or "linkparent"
				invitetb.init()
				*/
				sendgroupinvite(result);
				setTimeout("parent.Shadowbox.close()",4000);
			}
			else {
				document.getElementById('invite-group-members').style.display='none';
				document.getElementById('invite-message').style.display='block';
				document.getElementById('invite-message').innerHTML=result;
			}
		}
		else alert("Retrieval Error: " + CreateGroupHttp.statusText);
	}
}


function getGroupType(from)
{
/*	if(from=='create')
		var oRadio = document.forms[1].elements['group-type'];
	else
		var oRadio = document.forms[0].elements['group-type'];
*/
	var oRadio = document.forms[0].elements['group-type'];
	for(var i = 0; i < oRadio.length; i++)
	{
	  if(oRadio[i].checked)
	  {
		 return oRadio[i].value;
	  }
	}
	return '';
}

function getGroupPrivacy()
{
	var oRadio = document.forms[0].elements['group-privacy'];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function autoselectgrouptype(type) {
	var oRadio = document.forms[0].elements['group-type'];
	for(var i = 0; i < oRadio.length; i++) {
		if(oRadio[i].value==type) {
			oRadio[i].checked=true;
			break;
		}
	}
}

function checkothergrouptype(n) {
	if(n=='-1') {
		document.getElementById('group-other-textbox').style.display='block';
		document.getElementById('group-type-other').focus();
	}
	else document.getElementById('group-other-textbox').style.display='none';
}


// FUNCTION TO EDIT GROUP
var EditGroupHttp;
function editgroup() {
	err=false;
	if(document.getElementById('group-name').value=='') {
		document.getElementById("group-name").style.backgroundColor='#F3F2F1';
		document.getElementById("group-name").focus();
		err=true;
	}
	else {
		var groupname=document.getElementById("group-name").value;
		document.getElementById("group-name").style.backgroundColor='#FFF';
	}

//	var grouptype=document.getElementById("group-type").value;
//	var groupprivacy=document.getElementById("group-privacy").value;
	var grouptype=getGroupType('edit');
	var groupprivacy=getEditGroupPrivacy();
	var grouptypeother=document.getElementById("group-type-other").value;
	if(document.getElementById("group-pic")) var grouppic=document.getElementById("group-pic").value;
	else var grouppic='default_pic.jpg';
	var groupdesc=document.getElementById("group-desc").value;
	var groupid=document.getElementById("groupid").value;
	
	if(!err) {
		EditGroupHttp=Browser_Check(EditGroupHttp);
		
		//var url="ajax_editgroup.php";
		var url="/group/insertdata";
		var data="groupname="+groupname+"&grouptype="+grouptype+"&grouptypeother="+grouptypeother+"&groupprivacy="+groupprivacy+"&grouppic="+grouppic+"&groupdesc="+groupdesc+"&group="+groupid;
		
		EditGroupHttp.open("POST",url,true);
		EditGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditGroupHttp.setRequestHeader("Content-length", data.length);
		EditGroupHttp.setRequestHeader("Connection", "close");
		
		EditGroupHttp.onreadystatechange = editgroupresult;
	
		EditGroupHttp.send(data);
	}
}

function editgroupresult()
{
	if(EditGroupHttp.readyState==4)
	{
		if(EditGroupHttp.status == 200 || EditGroupHttp.status == 0)
		{
			var result=EditGroupHttp.responseText;			
			var resultArr=result.split('~#~');
			if(resultArr[0]!='0') {
				document.getElementById('edit-groups-wrapper').style.display='none';
				document.getElementById('edit-groups-message').style.display='block';
//				window.parent.document.getElementById('label-group-name'+resultArr[1]).innerHTML=resultArr[2];
				window.parent.loadmygroups(resultArr[3],0);
				setTimeout("parent.Shadowbox.close()",2000);
			}
		}
		else alert("Retrieval Error: " + EditGroupHttp.statusText);
	}
}


function getEditGroupPrivacy()
{
	var oRadio = document.forms[0].elements['group-privacy'];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}



// FUNCTION TO DELETE GROUP
var ReportAbuseHttp;
function reportabuse(db,comment,type) {
	ReportAbuseHttp=Browser_Check(ReportAbuseHttp);
	
	var url="ajax_reportabuse.php";
	var data="db="+db+"&comment="+comment+"&type="+type;
	
	ReportAbuseHttp.open("POST",url,true);
	ReportAbuseHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ReportAbuseHttp.setRequestHeader("Content-length", data.length);
	ReportAbuseHttp.setRequestHeader("Connection", "close");
	
	ReportAbuseHttp.onreadystatechange = reportabuseresult;

	ReportAbuseHttp.send(data);
}

function reportabuseresult()
{
	if(ReportAbuseHttp.readyState==4)
	{
		if(ReportAbuseHttp.status == 200 || ReportAbuseHttp.status == 0)
		{
			var result=ReportAbuseHttp.responseText;
			var resultArr=result.split('~#~');
			if(resultArr[0]!='0') {
				document.getElementById('reportabuse-wrapper').style.display='none';
				document.getElementById('reportabuse-message').style.display='block';
				setTimeout("parent.Shadowbox.close()",2000);
			}
		}
		else {};
	}
}


// FUNCTION TO DELETE GROUP
var DeleteGroupHttp;
function deletegroup(group) {
	DeleteGroupHttp=Browser_Check(DeleteGroupHttp);
	
	//var url="ajax_deletegroup.php";
	var url="/group/groupdelete";
	var data="group="+group;
	
	DeleteGroupHttp.open("POST",url,true);
	DeleteGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DeleteGroupHttp.setRequestHeader("Content-length", data.length);
	DeleteGroupHttp.setRequestHeader("Connection", "close");	
	DeleteGroupHttp.onreadystatechange = deletegroupresult;	
	DeleteGroupHttp.send(data);
}

function deletegroupresult()
{
	
	if(DeleteGroupHttp.readyState==4)
	{
		if(DeleteGroupHttp.status == 200 || DeleteGroupHttp.status == 0)
		{
			var result=DeleteGroupHttp.responseText;		
			var resultArr=result.split('~#~');
			if(resultArr[0]!='0') {
				document.getElementById('delete-group-wrapper').style.display='none';
				document.getElementById('delete-group-message').style.display='block';
				window.parent.document.getElementById('mygroup-row-'+resultArr[1]).style.display='none';
				setTimeout("parent.Shadowbox.close()",2000);
			}
		}
		else alert("Retrieval Error: " + DeleteGroupHttp.statusText);
	}
}


// FUNCTION TO FETCH GROUP MEMBERS
var GroupMembersHttp;
function groupmembers(group) {
	GroupMembersHttp=Browser_Check(GroupMembersHttp);
	
	var url="ajax_groupmembers.php";
	var data="group="+group;
	
	GroupMembersHttp.open("POST",url,true);
	GroupMembersHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupMembersHttp.setRequestHeader("Content-length", data.length);
	GroupMembersHttp.setRequestHeader("Connection", "close");
	
	GroupMembersHttp.onreadystatechange = groupmembersresult;

	GroupMembersHttp.send(data);
}

function groupmembersresult()
{
	if(GroupMembersHttp.readyState==4)
	{
		if(GroupMembersHttp.status == 200 || GroupMembersHttp.status == 0)
		{
			var result=GroupMembersHttp.responseText;
			document.getElementById('group-members').innerHTML=result;
		}
		else alert("Retrieval Error: " + GroupMembersHttp.statusText);
	}
}


// FILL REMOVE MEMBER CONFIRMATION POPOUP
function fillremovememberpopup(group,user) {
	document.getElementById('removemember-popup').innerHTML='Remove member from group?<p align="center"><a href="javascript:void(0);" onclick="javascript:removegroupmember('+group+','+user+')">Yes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="javascript:closepopup(\'fade\');">Cancel</a></p>';
}


// FUNCTION TO REMOVE GROUP MEMBER
var RemoveGroupMemberHttp;
function removegroupmember(group,user) {

	RemoveGroupMemberHttp=Browser_Check(RemoveGroupMemberHttp);
	
	//var url="ajax_removegroupmember.php";
	var url="/group/removegroupmember";
	var data="group="+group+"&user="+user;
	
	RemoveGroupMemberHttp.open("POST",url,true);
	RemoveGroupMemberHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	RemoveGroupMemberHttp.setRequestHeader("Content-length", data.length);
	RemoveGroupMemberHttp.setRequestHeader("Connection", "close");
	
	RemoveGroupMemberHttp.onreadystatechange = removegroupmemberresult;
	
	RemoveGroupMemberHttp.send(data);
}

function removegroupmemberresult()
{
	
	if(RemoveGroupMemberHttp.readyState==4)
	{
		if(RemoveGroupMemberHttp.status == 200 || RemoveGroupMemberHttp.status == 0)
		{
		
			var result=RemoveGroupMemberHttp.responseText;			
			if(result!=0) {
				document.getElementById('group-member-box-'+result).style.display='none';
				closepopup('fade');
			}
		}
		else alert("Retrieval Error: " + RemoveGroupMemberHttp.statusText);
	}
}


// FUNCTION TO INITIATE SEARCH GROUPS
function searchgroupsinitiate() {	
	var keyword=document.getElementById('groupkeyword').value;
	var type=document.getElementById('grouptype').value;
	keyword=keyword.replace(" ","-");
	//var url='searchgroups.php?keyword='+keyword+'&type='+type;
	var url='/group/searchgroupsresult/'+'aa'+keyword+'/'+'1'+type;
	RefreshShadowbox(url,'','550','580');
}


// FUNCTION TO SEARCH GROUPS
var SearchGroupsHttp;
function searchgroups(type,keyword) {		
	SearchGroupsHttp=Browser_Check(SearchGroupsHttp);	
	document.getElementById('search-results').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
/*	var keyword=document.getElementById('groupkeyword').value;
	var type=document.getElementById('grouptype').value;
*/
	//var url="ajax_searchgroups.php";
	var url="/group/searchmember";
	var data="keyword="+keyword+"&type="+type;
	SearchGroupsHttp.open("POST",url,true);
	SearchGroupsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SearchGroupsHttp.setRequestHeader("Content-length", data.length);
	SearchGroupsHttp.setRequestHeader("Connection", "close");
	
	SearchGroupsHttp.onreadystatechange = searchgroupsresult;	
	SearchGroupsHttp.send(data);
}

function searchgroupsresult()
{
	if(SearchGroupsHttp.readyState==4)
	{
		if(SearchGroupsHttp.status == 200 || SearchGroupsHttp.status == 0)
		{
			var result=SearchGroupsHttp.responseText;
//			RefreshShadowbox('searchgroups.php','','325','640');
			document.getElementById('search-results').innerHTML=result;
		}
		else alert("Retrieval Error: " + SearchGroupsHttp.statusText);
	}
}


// FUNCTION TO OPEN AND RESIZE GROUPS TOP SUBMENU MENU LINKS WHEN OPENED FROM WITHIN POPUP
function refreshSearchgroups() {
	RefreshShadowbox('/group/searchgroups','','125','640');
}

function refreshCreategroup() {
	RefreshShadowbox('/group/creategroup','','325','600');
}

function refreshGroupnotifications() {
	RefreshShadowbox('/group/notifications','','320','600');
}

function refreshInvitetogroup(id) {
	RefreshShadowbox('inviteuserstogroup.php?group='+id,'','345','600');
}


// FUNCTION TO SEARCH USERS TO INVITE TO GROUP
var SearchUsersGroupHttp;
function searchuserstoinvite() {
	SearchUsersGroupHttp=Browser_Check(SearchUsersGroupHttp);
	
	document.getElementById('search-invite-list').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	
	var keyword=document.getElementById('keyword').value;
	var from=document.getElementById('from').value;
	var group=document.getElementById('groupid').value;
	
	//var url="ajax_invitefollowers.php";
	var url="/group/invitefollowing";
	var data="searchuser=1&keyword="+keyword+"&from="+from+"&group="+group;
	
	SearchUsersGroupHttp.open("POST",url,true);
	SearchUsersGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SearchUsersGroupHttp.setRequestHeader("Content-length", data.length);
	SearchUsersGroupHttp.setRequestHeader("Connection", "close");	
	SearchUsersGroupHttp.onreadystatechange = searchuserstoinviteresult;	
	SearchUsersGroupHttp.send(data);
}

function searchuserstoinviteresult()
{
	if(SearchUsersGroupHttp.readyState==4)
	{
		if(SearchUsersGroupHttp.status == 200 || SearchUsersGroupHttp.status == 0)
		{
			var result=SearchUsersGroupHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('search-invite-list').innerHTML=resultArr[0];
			document.getElementById('total-search').value=resultArr[1];
		}
		else alert("Retrieval Error: " + SearchUsersGroupHttp.statusText);
	}
}


// FUNCTION TO LOAD FOLLOWERS TO INVITE TO GROUP
var GroupFollowersHttp;
function loadfollowersforgroup(from,group) {
	
	from = typeof(from) != 'undefined' ? from : '0';
	group = typeof(group) != 'undefined' ? group : '0';
	GroupFollowersHttp=Browser_Check(GroupFollowersHttp);
	
	//var url="ajax_invitefollowers.php";
	var url="/group/invitefollowing";
	var data="groupname=name&usertype=followers&from="+from+"&group="+group;
	
	GroupFollowersHttp.open("POST",url,true);
	GroupFollowersHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupFollowersHttp.setRequestHeader("Content-length", data.length);
	GroupFollowersHttp.setRequestHeader("Connection", "close");	
	GroupFollowersHttp.onreadystatechange = loadfollowersforgroupresult;	
	
	GroupFollowersHttp.send(data);
}

function loadfollowersforgroupresult()
{	
	if(GroupFollowersHttp.readyState==4)
	{
		if(GroupFollowersHttp.status == 200 || GroupFollowersHttp.status == 0)
		{
			var result=GroupFollowersHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('followers-list').innerHTML=resultArr[0];
			document.getElementById('total-followers').value=resultArr[1];
		}
		else alert("Retrieval Error: " + GroupFollowersHttp.statusText);
	}
}


// FUNCTION TO LOAD FOLLOWING USERS TO INVITE TO GROUP
var GroupFollowingHttp;
function loadfollowingforgroup(from,group) {

	from = typeof(from) != 'undefined' ? from : '0';
	group = typeof(group) != 'undefined' ? group : '0';
	GroupFollowingHttp=Browser_Check(GroupFollowingHttp);
	
	//var url="ajax_invitefollowers.php";
	var url="/group/invitefollowing";
	var data="groupname=name&usertype=following&from="+from+"&group="+group;
	
	GroupFollowingHttp.open("POST",url,true);
	GroupFollowingHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupFollowingHttp.setRequestHeader("Content-length", data.length);
	GroupFollowingHttp.setRequestHeader("Connection", "close");
	
	GroupFollowingHttp.onreadystatechange = loadfollowingforgroupresult;
	
	GroupFollowingHttp.send(data);
}

function loadfollowingforgroupresult()
{	
	if(GroupFollowingHttp.readyState==4)
	{
		if(GroupFollowingHttp.status == 200 || GroupFollowingHttp.status == 0)
		{
			var result=GroupFollowingHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('following-list').innerHTML=resultArr[0];
			document.getElementById('total-following').value=resultArr[1];
		}
		else alert("Retrieval Error: " + GroupFollowingHttp.statusText);
	}
}


// FUNCTION TO SHOW SELECTED USERS FOR INVITE
var SelectUsersToInviteHttp;
function selectuserstoinvite() {
	
	var err=false;
	document.getElementById("invitetogroup-header").style.display='block';
	document.getElementById('invite-selected').style.display='block';
	document.getElementById("selected-users-label").innerHTML='Users selected by you to invite to group.';
	var totalfollowers=document.getElementById('total-followers').value;
	var totalfollowing=document.getElementById('total-following').value;
	var totalsearch=document.getElementById('total-search').value;
	var users='';		
	for(i=1;i<=totalfollowers;i++) {
		if(document.getElementById('inviteuser-followers'+i).checked==true) {
			users+=document.getElementById('inviteuser-followers'+i).value+',';
		}
	}
	for(i=1;i<=totalfollowing;i++) {
		if(document.getElementById('inviteuser-following'+i).checked==true) {
			users+=document.getElementById('inviteuser-following'+i).value+',';
		}
	}
	
	for(i=1;i<=totalsearch;i++) {
		if(document.getElementById('inviteuser-search'+i).checked==true) {
			users+=document.getElementById('inviteuser-search'+i).value+',';
		}
	}
	
	if (users!="") users=trim_last(users);
	else err=true;
	
	document.getElementById('total-users-toinvite').value=users;
	
	if(!err) {
		
		SelectUsersToInviteHttp=Browser_Check(SelectUsersToInviteHttp);
		
		//var url="ajax_selecttoinvite.php";
		var url="/group/selecttoinvite";
		var data="users="+users;
		
		SelectUsersToInviteHttp.open("POST",url,true);
		SelectUsersToInviteHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SelectUsersToInviteHttp.setRequestHeader("Content-length", data.length);
		SelectUsersToInviteHttp.setRequestHeader("Connection", "close");
		
		SelectUsersToInviteHttp.onreadystatechange = selectuserstoinviteresult;		
		SelectUsersToInviteHttp.send(data);
	}
	else alert('Please select users to invite');
}

function selectuserstoinviteresult()
{
	if(SelectUsersToInviteHttp.readyState==4)
	{
		if(SelectUsersToInviteHttp.status == 200 || SelectUsersToInviteHttp.status == 0)
		{
			var result=SelectUsersToInviteHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('invite-group-members').style.display='none';
			document.getElementById('invite-selected-div').style.display='block';
			document.getElementById('invite-selected').innerHTML=resultArr[0];
		}
		else alert("Retrieval Error: " + SelectUsersToInviteHttp.statusText);
	}
}



// FUNCTION TO LOAD PAGE THAT INVITE USERS TO A GROUP
function inviteuserstogroup(group) {
	parent.document.location.href = 'inviteuserstogroup.php?group='+group;
}


// FUNCTION TO INVITE USERS TO GROUP
function trim_last(str_val) {
	var l;
	l=str_val.length;
	str_val=str_val.substr(0,l-1);
	return str_val;
}

var InviteToGroupHttp;
function sendgroupinvite(groupid,from) {
//	var groupid=document.getElementById('groupid').value;
	from = typeof(from) != 'undefined' ? from : '0';
	var users=document.getElementById('total-users-toinvite').value;	
	InviteToGroupHttp=Browser_Check(InviteToGroupHttp);	
	//var url="ajax_sendgroupinvite.php";
	var url="/group/sendgroupinvite";
	var data="group="+groupid+"&users="+users+"&from="+from;	
	InviteToGroupHttp.open("POST",url,true);
	InviteToGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	InviteToGroupHttp.setRequestHeader("Content-length", data.length);
	InviteToGroupHttp.setRequestHeader("Connection", "close");	
	InviteToGroupHttp.onreadystatechange = sendgroupinviteresult;	
	InviteToGroupHttp.send(data);
}

function sendgroupinviteresult()
{
	
	if(InviteToGroupHttp.readyState==4)
	{
		if(InviteToGroupHttp.status == 200 || InviteToGroupHttp.status == 0)
		{
			var totalfollowers=document.getElementById('total-followers').value;
			for(i=1;i<=totalfollowers;i++) {
				if(document.getElementById('inviteuser-followers'+i).checked==true) {
					document.getElementById('inviteuser-followers'+i).checked=false;
				}
			}

			var totalfollowing=document.getElementById('total-following').value;
			for(i=1;i<=totalfollowing;i++) {
				if(document.getElementById('inviteuser-following'+i).checked==true) {
					document.getElementById('inviteuser-following'+i).checked=false;
				}
			}

			var totalsearch=document.getElementById('total-search').value;
			for(i=1;i<=totalsearch;i++) {
				if(document.getElementById('inviteuser-search'+i).checked==true) {
					document.getElementById('inviteuser-search'+i).checked=false;
				}
			}

			var result=InviteToGroupHttp.responseText;
			document.getElementById('invite-selected-div').style.display='none';
			document.getElementById('invite-message').style.display='block';
			document.getElementById('invite-message').innerHTML=result;

			setTimeout("parent.Shadowbox.close()",3000);
		}
		else alert("Retrieval Error: " + InviteToGroupHttp.statusText);
	}
}


// FUNCTION TO LOAD MY GROUPS
var MyGroupsHttp;
function loadmygroups(user,memberof) {
	memberof = typeof(memberof) != 'undefined' ? memberof : '0';
//	document.getElementById('my-groups').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	document.getElementById('my-dbees').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	document.getElementById('my-dbees-profile').className='feed-link feed-link-border';
	if(document.getElementById('my-redbees-profile'))
		document.getElementById('my-redbees-profile').className='feed-link feed-link-border';
	document.getElementById('my-comments-profile').className='feed-link feed-link-border';
	document.getElementById('my-leaguepos-profile').className='feed-link feed-link-border';
	document.getElementById('my-followers-profile').className='feed-link feed-link-border';
	document.getElementById('my-following-profile').className='feed-link feed-link-border';
	document.getElementById('my-groups-profile').className='feed-link-active';	
	MyGroupsHttp=Browser_Check(MyGroupsHttp);
	//var url="ajax_mygroups.php";
	var url="/group/groupdetail";
	var data="user="+user+"&memberof="+memberof;	
	MyGroupsHttp.open("POST",url,true);
	MyGroupsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MyGroupsHttp.setRequestHeader("Content-length", data.length);
	MyGroupsHttp.setRequestHeader("Connection", "close");	
	MyGroupsHttp.onreadystatechange = loadmygroupsresult;
	MyGroupsHttp.send(data);
}

function loadmygroupsresult()
{
	if(MyGroupsHttp.readyState==4)
	{
		if(MyGroupsHttp.status == 200 || MyGroupsHttp.status == 0)
		{
			var result=MyGroupsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('my-dbees').innerHTML=resultArr[0];

			var gidArr=resultArr[3].split(',');
			for(i=0;i<gidArr.length;i++) {
				dropdowncontent.init("groupoptions"+gidArr[i], "left-bottom", 200, "mouseover");
			}
		}
		else {};
	}
}


// FUNCTION TO SEE MORE MY GROUPS
var MoreGroupsHttp;
function seemoremygroups(start,end) {
	MoreGroupsHttp=Browser_Check(MoreGroupsHttp);
	
	if(document.getElementById('more-feeds-loader'))
		document.getElementById('more-feeds-loader').innerHTML='<img src="images/ajaxloader.gif">';

	var user=document.getElementById('groupuser').value;
	
	var url="ajax_mygroups.php";
	var data="seemore=1&start="+start+'&end='+end+'&user='+user;
	
	MoreGroupsHttp.open("POST",url,true);
	MoreGroupsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	MoreGroupsHttp.setRequestHeader("Content-length", data.length);
	MoreGroupsHttp.setRequestHeader("Connection", "close");
	MoreGroupsHttp.onreadystatechange = function () {
        seemoremygroupsresult(start);
    };
	MoreGroupsHttp.send(data);	
}

function seemoremygroupsresult(id)
{
	if(MoreGroupsHttp.readyState==4)
	{			
		if(MoreGroupsHttp.status == 200 || MoreGroupsHttp.status == 0)
		{
			var result=MoreGroupsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('reloadend').value=id;
			if(document.getElementById('see-more-feeds'+id))
				document.getElementById('see-more-feeds'+id).innerHTML=resultArr[0];
		}			
		else alert("Retrieval Error: " + MoreGroupsHttp.statusText);
	}
}


// FUNCTION TO SHOW GROUP DBEES
var GroupDbeeFeedHttp;
function loadgroupdbees(id) {
	GroupDbeeFeedHttp=Browser_Check(GroupDbeeFeedHttp);
	
	var url="ajax_groupdbees.php";
	var data="group="+id;
	
	GroupDbeeFeedHttp.open("POST",url,true);
	GroupDbeeFeedHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupDbeeFeedHttp.setRequestHeader("Content-length", data.length);
	GroupDbeeFeedHttp.setRequestHeader("Connection", "close");

	GroupDbeeFeedHttp.onreadystatechange = loadgroupdbeesresult;
	GroupDbeeFeedHttp.send(data);	
}

function loadgroupdbeesresult()
{
	if(GroupDbeeFeedHttp.readyState==4)
	{			
		if(GroupDbeeFeedHttp.status == 200 || GroupDbeeFeedHttp.status == 0)
		{
			var result=GroupDbeeFeedHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('dbee-feeds').innerHTML=resultArr[0];
			
			var idsArr=resultArr[2].split(',');
			for(k=0;k<idsArr.length;k++) {
				$('a.plus'+idsArr[k]).click(function(){
				   var id = 'collapse' + $(this).attr('dbee-num');
					var dbid = $(this).attr('dbee-num');
					$('div#' + id).slideToggle('fast');
					if(document.getElementById('toggle'+dbid).className=='close-dbee')
						document.getElementById('toggle'+dbid).className='open-dbee';
					else
						document.getElementById('toggle'+dbid).className='close-dbee'
				   return false;
				});
			}
		}			
		else alert("Retrieval Error: " + GroupDbeeFeedHttp.statusText);
	}
}


// FUNCTION TO JOIN GROUP
var JoinGroupHttp;
function joingroupreq(group,owner,user,remind,frompopup) {
	remind = typeof(remind) != 'undefined' ? remind : '0';
	frompopup = typeof(frompopup) != 'undefined' ? frompopup : '0';
	JoinGroupHttp=Browser_Check(JoinGroupHttp);
	
	var url="ajax_joingroup.php";
	var data="group="+group+"&owner="+owner+"&user="+user+"&remind="+remind;
	
	JoinGroupHttp.open("POST",url,true);
	JoinGroupHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	JoinGroupHttp.setRequestHeader("Content-length", data.length);
	JoinGroupHttp.setRequestHeader("Connection", "close");

	JoinGroupHttp.onreadystatechange = function () {
        joingroupresult(frompopup);
    };
	JoinGroupHttp.send(data);	
}

function joingroupresult(frompopup)
{
	if(JoinGroupHttp.readyState==4)
	{			
		if(JoinGroupHttp.status == 200 || JoinGroupHttp.status == 0)
		{
			var result=JoinGroupHttp.responseText;
			if(frompopup==0) {
				document.getElementById('request-group-message').innerHTML='YOUR REQUEST IS PENDING APPROVAL BY GROUP OWNER.';
				setTimeout("closepopup('fade')",2000);
			}
			else if(frompopup==1) {
				document.getElementById('requesttojoin').style.display='none';
				document.getElementById('requesttojoin-message').style.display='block';
				setTimeout("parent.Shadowbox.close()",3000);
			}
		}			
		else {};
	}
}


// FUNCTION TO SHOW NEW MESSAGES
var GroupNotificationsHttp;
function showgroupnotifications(n) {
	document.getElementById('group-notification-feed').innerHTML='<div style="margin-left:25px;">Loading...</div>';
	GroupNotificationsHttp=Browser_Check(GroupNotificationsHttp);
	
	//var url="ajax_groupnotifications.php";
	var url="/group/showgroupnotifications";
	var data="";
	
	GroupNotificationsHttp.open("POST",url,true);
	GroupNotificationsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	GroupNotificationsHttp.setRequestHeader("Content-length", data.length);
	GroupNotificationsHttp.setRequestHeader("Connection", "close");
	
	GroupNotificationsHttp.onreadystatechange = showgroupnotificationsresult;

	GroupNotificationsHttp.send(data);
}

function showgroupnotificationsresult()
{
	if(GroupNotificationsHttp.readyState==4)
	{
		if(GroupNotificationsHttp.status == 200 || GroupNotificationsHttp.status == 0)
		{
			var result=GroupNotificationsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('group-notification-feed').innerHTML=resultArr[0];
		}
		else alert("Retrieval Error: " + GroupNotificationsHttp.statusText);
	}
}


// FUNCTION TO RESPOND TO GROUP INVITATION
var RespondGrpInvitationHttp;
function respondgroupinvite(action,id) {
	RespondGrpInvitationHttp=Browser_Check(RespondGrpInvitationHttp);
	
	//var url="ajax_respondinvite.php";
	var url="/group/respondinvite";
	var data="action="+action+"&id="+id;
	
	RespondGrpInvitationHttp.open("POST",url,true);
	RespondGrpInvitationHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	RespondGrpInvitationHttp.setRequestHeader("Content-length", data.length);
	RespondGrpInvitationHttp.setRequestHeader("Connection", "close");
	
	RespondGrpInvitationHttp.onreadystatechange = respondgroupinviteresult;

	RespondGrpInvitationHttp.send(data);
}

function respondgroupinviteresult()
{
	if(RespondGrpInvitationHttp.readyState==4)
	{
		if(RespondGrpInvitationHttp.status == 200 || RespondGrpInvitationHttp.status == 0)
		{
			var result=RespondGrpInvitationHttp.responseText;
			var resultArr=result.split('~');
			document.getElementById('grpnote-'+resultArr[0]).style.display='none';
			if(resultArr[1]=='0') {
				document.getElementById('group-notification-feed').innerHTML='<div align="center" class="no-record-msg" style="margin-top:110px;">No pending notifications.</div>';
			}
		}
		else alert("Retrieval Error: " + RespondGrpInvitationHttp.statusText);
	}
}


// FUNCTION TO SKIP GROUP INVITE
function skipinvitetogroup() {
	document.getElementById('invite-group-members').style.display='none';
	document.getElementById('invite-message').style.display='none';
	document.getElementById('total-users-toinvite').value='';
	document.getElementById('invite-selected').style.display='none';
	document.getElementById('invite-selected-div').style.display='block';
	document.getElementById("invitetogroup-header").style.display='none';
	document.getElementById("selected-users-label").innerHTML='You have chosen to create the group without inviting anyone.<br /><br />Click the button below to proceed OR click \'back to selection\' to select users to invite.';
}


// FUNCTION TO GET BACK TO CREATE GROUP FROM INVITE
function backtocreategroup() {
	document.getElementById('invite-group-members').style.display='none';
	document.getElementById('invite-message').style.display='none';
	document.getElementById('create-groups-wrapper').style.display='block';
	document.getElementById("group-name").value='';
	var oRadio = document.forms[1].elements['group-type'];
	for(var i = 0; i < oRadio.length; i++) {
		oRadio[i].checked=false;
	}
	document.forms[1].elements['group-privacy'][0].checked=true;
	document.getElementById("group-type-other").value='';
	document.getElementById('group-other-textbox').style.display='none';
}


// FUNCTION TO FETCH PROFILE DETAILS FOR EDIT
var ProfileDetailsHttp;
function fetchprofiledetails() {
	
	ProfileDetailsHttp=Browser_Check(ProfileDetailsHttp);	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-account-title').className='user-name';
	document.getElementById('edit-bio-title').className='user-name-grey';
	document.getElementById('edit-social-title').className='user-name-grey';
	document.getElementById('edit-password-title').className='user-name-grey';
	document.getElementById('edit-scoring-title').className='user-name-grey';

/*	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-profile-title').className='user-name';
*/	
	var url="accountedit";
	var data="";
	
	ProfileDetailsHttp.open("POST",url,true);
	ProfileDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ProfileDetailsHttp.setRequestHeader("Content-length", data.length);
	ProfileDetailsHttp.setRequestHeader("Connection", "close");
	ProfileDetailsHttp.onreadystatechange = fetchprofiledetailsresult;
	ProfileDetailsHttp.send(data);	
}

function fetchprofiledetailsresult()
{
	if(ProfileDetailsHttp.readyState==4)
	{			
		if(ProfileDetailsHttp.status == 200 || ProfileDetailsHttp.status == 0)
		{
			var result=ProfileDetailsHttp.responseText;
			var resultArr=result.split('~#~');
			document.getElementById('profile-edit').innerHTML=resultArr[0];
			
			for(i=0;i<document.getElementById('birthmonth').length;i++) {
				if(document.getElementById('birthmonth').options[i].value==resultArr[1]) {
					document.getElementById('birthmonth').options[i].selected=true;
					break;
				}
			}
			
			openFadePopup();
		}			
		else alert("Retrieval Error: " + ProfileDetailsHttp.statusText);
	}
}


// FUNCTION TO FETCH USER BIOGRAPHY DETAILS FOR EDIT
var BioDetailsHttp;
function fetchbiodetails() {
	
	BioDetailsHttp=Browser_Check(BioDetailsHttp);
	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-account-title').className='user-name-grey';
	document.getElementById('edit-bio-title').className='user-name';
	document.getElementById('edit-social-title').className='user-name-grey';
	document.getElementById('edit-password-title').className='user-name-grey';
	document.getElementById('edit-scoring-title').className='user-name-grey';
	
	//var url="ajax_fetchbiodetails.php";
	var url = 'biography';
	var data="";
	
	BioDetailsHttp.open("POST",url,true);
	BioDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	BioDetailsHttp.setRequestHeader("Content-length", data.length);
	BioDetailsHttp.setRequestHeader("Connection", "close");
	BioDetailsHttp.onreadystatechange = fetchbiodetailsresult;
	BioDetailsHttp.send(data);	
}

function fetchbiodetailsresult()
{
	if(BioDetailsHttp.readyState==4)
	{			
		if(BioDetailsHttp.status == 200 || BioDetailsHttp.status == 0)
		{
			var result=BioDetailsHttp.responseText;
			//alert(result);exit;
			document.getElementById('profile-edit').innerHTML=result;
			openFadePopup();
		}			
		else alert("Retrieval Error: " + BioDetailsHttp.statusText);
	}
}


// FUNCTION TO FETCH USERS SOCIAL DETAILS FOR EDIT
var SocialDetailsHttp;
function fetchsocialdetails() {
	
	SocialDetailsHttp=Browser_Check(SocialDetailsHttp);
	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-account-title').className='user-name-grey';
	document.getElementById('edit-bio-title').className='user-name-grey';
	document.getElementById('edit-social-title').className='user-name';
	document.getElementById('edit-password-title').className='user-name-grey';
	document.getElementById('edit-scoring-title').className='user-name-grey';

	//var url="ajax_fetchsocialdetails.php";
	var url="social";
	var data="";
	
	SocialDetailsHttp.open("POST",url,true);
	SocialDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	SocialDetailsHttp.setRequestHeader("Content-length", data.length);
	SocialDetailsHttp.setRequestHeader("Connection", "close");
	SocialDetailsHttp.onreadystatechange = fetchsocialdetailsresult;
	SocialDetailsHttp.send(data);	
}

function fetchsocialdetailsresult()
{
	if(SocialDetailsHttp.readyState==4)
	{			
		if(SocialDetailsHttp.status == 200 || SocialDetailsHttp.status == 0)
		{
			var result=SocialDetailsHttp.responseText;
			//alert(result);die;
			var resultArr=result.split('~#~');
			document.getElementById('profile-edit').innerHTML=resultArr[0];
			openFadePopup();
		}			
		else {};
	}
}


// FUNCTION TO FETCH USER PASSWORD DETAILS FOR EDIT
var PasswordDetailsHttp;
function fetchpassworddetails() {	
	PasswordDetailsHttp=Browser_Check(PasswordDetailsHttp);
	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-account-title').className='user-name-grey';
	document.getElementById('edit-bio-title').className='user-name-grey';
	document.getElementById('edit-social-title').className='user-name-grey';
	document.getElementById('edit-password-title').className='user-name';
	document.getElementById('edit-scoring-title').className='user-name-grey';

	//var url="ajax_fetchpassworddetails.php";
	var url="changepassword";
	var data="";
	
	PasswordDetailsHttp.open("POST",url,true);
	PasswordDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	PasswordDetailsHttp.setRequestHeader("Content-length", data.length);
	PasswordDetailsHttp.setRequestHeader("Connection", "close");
	PasswordDetailsHttp.onreadystatechange = fetchpassworddetailsresult;
	PasswordDetailsHttp.send(data);	
}

function fetchpassworddetailsresult()
{
	if(PasswordDetailsHttp.readyState==4)
	{			
		if(PasswordDetailsHttp.status == 200 || PasswordDetailsHttp.status == 0)
		{
			var result=PasswordDetailsHttp.responseText;
			document.getElementById('profile-edit').innerHTML=result;
			openFadePopup();
		}			
		else alert("Retrieval Error: " + PasswordDetailsHttp.statusText);
	}
}


// FUNCTION TO FETCH USER SCORING SETTINGS FOR EDIT
var ScoringDetailsHttp;
function fetchscoringdetails() {
	ScoringDetailsHttp=Browser_Check(ScoringDetailsHttp);
	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	document.getElementById('edit-account-title').className='user-name-grey';
	document.getElementById('edit-bio-title').className='user-name-grey';
	document.getElementById('edit-social-title').className='user-name-grey';
	document.getElementById('edit-password-title').className='user-name-grey';
	document.getElementById('edit-scoring-title').className='user-name';		
	var url="score";
	var data="";
	
	ScoringDetailsHttp.open("POST",url,true);
	ScoringDetailsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ScoringDetailsHttp.setRequestHeader("Content-length", data.length);
	ScoringDetailsHttp.setRequestHeader("Connection", "close");
	ScoringDetailsHttp.onreadystatechange = fetchscoringdetailsresult;
	ScoringDetailsHttp.send(data);	
}

function fetchscoringdetailsresult()
{
	if(ScoringDetailsHttp.readyState==4)
	{			
		if(ScoringDetailsHttp.status == 200 || ScoringDetailsHttp.status == 0)
		{
			var result=ScoringDetailsHttp.responseText;
			//alert(result);exit;
			document.getElementById('profile-edit').innerHTML=result;
			openFadePopup();
		}			
		else alert("Retrieval Error: " + ScoringDetailsHttp.statusText);
	}
}


// FUNCTION TO FETCH USER NOTIFICATION SETTINGS FOR EDIT
var NotificationSettingsHttp;
function fetchnotificationdetails() {

	NotificationSettingsHttp=Browser_Check(NotificationSettingsHttp);
	
	document.getElementById('profile-edit').innerHTML='<div style="margin:20px 0 0 0;">Loading...</div>';
	
	//var url="ajax_fetchnotificationdetails.php";
	var url="detail";
	
	
	var data="";
	
	NotificationSettingsHttp.open("POST",url,true);
	NotificationSettingsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	NotificationSettingsHttp.setRequestHeader("Content-length", data.length);
	NotificationSettingsHttp.setRequestHeader("Connection", "close");
	NotificationSettingsHttp.onreadystatechange = fetchnotificationdetailsresult;
	NotificationSettingsHttp.send(data);	
}

function fetchnotificationdetailsresult()
{
	if(NotificationSettingsHttp.readyState==4)
	{			
		if(NotificationSettingsHttp.status == 200 || NotificationSettingsHttp.status == 0)
		{
			var result=NotificationSettingsHttp.responseText;
			//alert(result);exit;
			document.getElementById('profile-edit').innerHTML=result;
			openFadePopup();
		}			
		else alert("Retrieval Error asr: " + NotificationSettingsHttp.statusText);
	}
}


// FUNCTION TO EDIT PROFILE DETAILS
var EditProfileHttp;
function updateprofile()
{	
	err=false;
	var fullname=document.getElementById("fullname").value;
	if(fullname=='') err=true;
	
/*	var username=document.getElementById("username").value;
	if(username=='') err=true;
*/	
	var email=document.getElementById("email").value;
	if(email=='') err=true;
	
	var gender=document.getElementById("gender").value;
	
	var UserID=document.getElementById("UserID").value;
	
	var birthday=document.getElementById("birthday").value;

	var birthmonth=document.getElementById("birthmonth").value;

	var birthyear=document.getElementById("birthyear").value;
	
	if(!err) {
		document.getElementById("SignupErr").style.display='none';
		document.getElementById("signuploader").style.display='block';

		EditProfileHttp=Browser_Check(EditProfileHttp);
		
		var url="update";
//		var data="fullname="+fullname+"&username="+username+"&email="+email+"&gender="+gender+"&birthday="+birthday+"&birthmonth="+birthmonth+"&birthyear="+birthyear;
		var data="fullname="+fullname+"&email="+email+"&gender="+gender+"&birthday="+birthday+"&birthmonth="+birthmonth+"&birthyear="+birthyear+"&UserID="+UserID;
		//var data="fullname="+fullname+"&email="+email+"&gender="+gender+"&birthday="+birthyear+"-"+birthmonth+"-"+birthday;
		//alert(url);alert(data);
		EditProfileHttp.open("POST",url,true);
		EditProfileHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditProfileHttp.setRequestHeader("Content-length", data.length);
		EditProfileHttp.setRequestHeader("Connection", "close");
		EditProfileHttp.onreadystatechange = updateprofileresult;
		EditProfileHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function updateprofileresult()
{
	
	if(EditProfileHttp.readyState==4)
	{	
	
		if(EditProfileHttp.status == 200 || EditProfileHttp.status == 0)
		{ 
			var GetResult=EditProfileHttp.responseText;
			
			if(GetResult=='1') {
				document.getElementById("signuploader").style.display='none';
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else alert("Retrieval Error: " + EditProfileHttp.statusText);
	}
}


// FUNCTION TO EDIT BIO DETAILS
var EditBioHttp;
function updatebio()
{	
	
	err=false;
	var aboutme=document.getElementById("aboutme").value;
	var occupation=document.getElementById("occupation").value;
	var political=document.getElementById("political").value;
	var relegious=document.getElementById("relegious").value;
	var hobbies=document.getElementById("hobbies").value;
	var likes=document.getElementById("likes").value;
	var ID=document.getElementById("ID").value;
	var UserID=document.getElementById("UserID").value;
	
	if(!err) {
		document.getElementById("SignupErr").style.display='none';
		document.getElementById("signuploader").style.display='block';

		EditBioHttp=Browser_Check(EditBioHttp);
		
		//var url="ajax_editbio.php";
		var url="editbio";
		var data="occupation="+occupation+"&political="+political+"&relegious="+relegious+"&hobbies="+hobbies+"&likes="+likes+"&AboutMe="+aboutme+"&ID="+ID+"&UserID="+UserID;
		//alert(data);
		EditBioHttp.open("POST",url,true);
		EditBioHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditBioHttp.setRequestHeader("Content-length", data.length);
		EditBioHttp.setRequestHeader("Connection", "close");
		
		EditBioHttp.onreadystatechange = updatebioresult;
		EditBioHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function updatebioresult()
{
	if(EditBioHttp.readyState==4)
	{			
		if(EditBioHttp.status == 200 || EditBioHttp.status == 0)
		{ 
			var GetResult=EditBioHttp.responseText;
			//alert(GetResult);
			if(GetResult=='1') {
				document.getElementById("signuploader").style.display='none';
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else alert("Retrieval Error: " + EditBioHttp.statusText);
	}
}


// FUNCTION TO EDIT SOCIAL DETAILS
var EditSocialHttp;
function updatesocial()
{	
	err=false;
	var socialfb=document.getElementById("socialfb").value;
	var socialtwitter=document.getElementById("socialtwitter").value;
	var sociallinkedin=document.getElementById("sociallinkedin").value;
    var cheditsoci=document.getElementById("cheditsoci").value;	
    var UserID=document.getElementById("UserID").value;		
	if(!err) {
		document.getElementById("signuploader").style.display='block';
		EditSocialHttp=Browser_Check(EditSocialHttp);		
		//var url="ajax_editsocial.php";
		var url="social";
		var data="socialfb="+socialfb+"&socialtwitter="+socialtwitter+"&sociallinkedin="+sociallinkedin+"&cheditsoci="+cheditsoci+"&UserID="+UserID;
        //alert(data);exit;		
		EditSocialHttp.open("POST",url,true);
		EditSocialHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditSocialHttp.setRequestHeader("Content-length", data.length);
		EditSocialHttp.setRequestHeader("Connection", "close");
		EditSocialHttp.onreadystatechange = updatesocialresult;
		EditSocialHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function updatesocialresult()
{
	if(EditSocialHttp.readyState==4)
	{			
		if(EditSocialHttp.status == 200 || EditSocialHttp.status == 0)
		{ 
			var GetResult=EditSocialHttp.responseText;
			//alert(GetResult);exit;
			if(GetResult=='1') {
				document.getElementById("signuploader").style.display='none';
				setTimeout("closepopup('fade')",2000);
			}
		}			
		else {};
	}
}


// FUNCTION TO EDIT PASSWORD
var EditPasswordHttp;
function updatepassword()
{	
	err=false;
	var curr_password=document.getElementById("curr_password").value;
	var new_password=document.getElementById("new_password").value;
	var new_repeat_password=document.getElementById("new_repeat_password").value;
	
	if(new_password!=new_repeat_password)
		err=true;
	
	if(!err) {
		document.getElementById("PassErr").style.display='none';
		document.getElementById("ConfirmPassErr").style.display='none';
		document.getElementById("signuploader").style.display='block';

		EditPasswordHttp=Browser_Check(EditPasswordHttp);
		
		var url="ajax_editpassword.php";
		var data="curr_password="+curr_password+"&new_password="+new_password+"&new_repeat_password="+new_repeat_password;
		
		EditPasswordHttp.open("POST",url,true);
		EditPasswordHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditPasswordHttp.setRequestHeader("Content-length", data.length);
		EditPasswordHttp.setRequestHeader("Connection", "close");

		EditPasswordHttp.onreadystatechange = updatepasswordresult;
		EditPasswordHttp.send(data);	
	}
	else {
		document.getElementById("ConfirmPassErr").style.display='block';
	}
}

function updatepasswordresult()
{
	if(EditPasswordHttp.readyState==4)
	{			
		if(EditPasswordHttp.status == 200 || EditPasswordHttp.status == 0)
		{ 
			var GetResult=EditPasswordHttp.responseText;
			if(GetResult=='0') {
				document.getElementById("PassErr").style.display='block';
				document.getElementById("signuploader").style.display='none';
			}
			else {
				document.getElementById("curr_password").value='';
				document.getElementById("new_password").value='';
				document.getElementById("new_repeat_password").value='';
				document.getElementById("signuploader").style.display='none';
				document.getElementById("PassChanged").style.display='block';
				setTimeout("document.getElementById('PassChanged').style.display='none'",3000);
			}
		}			
		else alert("Retrieval Error: " + EditPasswordHttp.statusText);
	}
}


// FUNCTION TO EDIT SCORING SETTING
var EditScoringHttp;
function updatescoring()
{	
	err=false;
	
	if(!err) {
		EditScoringHttp=Browser_Check(EditScoringHttp);
		
		//var url="ajax_editscoring.php";
		var url="score";
		//var data="";
		var data="update_toscoring="+'updatetoscoring';
		//alert(data);
		EditScoringHttp.open("POST",url,true);
		EditScoringHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditScoringHttp.setRequestHeader("Content-length", data.length);
		EditScoringHttp.setRequestHeader("Connection", "close");

		EditScoringHttp.onreadystatechange = updatescoringresult;
		EditScoringHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function updatescoringresult()
{
	if(EditScoringHttp.readyState==4)
	{
		if(EditScoringHttp.status == 200 || EditScoringHttp.status == 0)
		{ 
			var GetResult=EditScoringHttp.responseText;
			//alert(GetResult);
			if(GetResult=='1') {
				document.getElementById('scoring-radio').innerHTML='<a href="#?w=200" rel="scoring-off-popup" class="poplight" onclick="javascript:updatescoring();"><div id="scoring-status" class="radioTick"></div></a>';
			}
			else if(GetResult=='0') {
				document.getElementById('scoring-radio').innerHTML='<a href="#?w=250" rel="scoring-on-popup" class="poplight" onclick="javascript:updatescoring();"><div id="scoring-status" class="radio"></div></a>';
			}
			fadepopup();
			setTimeout("closepopup('fade')",2000);
		}			
		else alert("Retrieval Error: " + EditScoringHttp.statusText);
	}
}



// FUNCTION TO EDIT SCORING SETTING
var EditNotificationSettingsHttp;
function updatenotificationsetting(id)
{
	err=false;

	if(!err) {
		EditNotificationSettingsHttp=Browser_Check(EditNotificationSettingsHttp);
		
		//var url="ajax_editnotificationsettings.php";
		var url="updatenotification";
		var data="id="+id;
		
		EditNotificationSettingsHttp.open("POST",url,true);
		EditNotificationSettingsHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		EditNotificationSettingsHttp.setRequestHeader("Content-length", data.length);
		EditNotificationSettingsHttp.setRequestHeader("Connection", "close");
	
		EditNotificationSettingsHttp.onreadystatechange = updatenotificationsettingresult;
		EditNotificationSettingsHttp.send(data);	
	}
	else {
		document.getElementById("SignupErr").style.display='block';
	}
}

function updatenotificationsettingresult()
{
	if(EditNotificationSettingsHttp.readyState==4)
	{
		if(EditNotificationSettingsHttp.status == 200 || EditNotificationSettingsHttp.status == 0)
		{ 
			var result=EditNotificationSettingsHttp.responseText;
			//alert(result);die;
			var resultArr=result.split('~');

			if(resultArr[1]=='2') append='<div style="float:left; margin:8px 0 0 10px; color:#999;">from people I follow</div>';
			else if(resultArr[1]=='4') append='<div style="float:left; margin:8px 0 0 10px; color:#999;">from people I dont follow</div>';
			else append='';
			
			if(resultArr[0]=='1') {
				
				document.getElementById('scoring-radio-'+resultArr[1]).innerHTML='<a href="#?w=150" rel="scoring-off-popup" class="poplight" onclick="javascript:updatenotificationsetting('+resultArr[1]+');"><div id="scoring-status" class="radioTick"></div></a>'+append;
			}
			else if(resultArr[0]=='0') {
				document.getElementById('scoring-radio-'+resultArr[1]).innerHTML='<a href="#?w=150" rel="scoring-on-popup" class="poplight" onclick="javascript:updatenotificationsetting('+resultArr[1]+');"><div id="scoring-status" class="radio"></div></a>'+append;
			}
			fadepopup();
			setTimeout("closepopup('fade')",1000);
		}			
		else alert("Retrieval Error: " + EditNotificationSettingsHttp.statusText);
	}
}



// FUNCTION TO CHANGE PROFILE PICTURE
var ChangeProfilePicHttp;
function changeprofilepic(user)
{	
	ChangeProfilePicHttp=Browser_Check(ChangeProfilePicHttp);
	
	document.getElementById('editProfilePicDiv').style.display='none';
	document.getElementById('AjaxWaitingDiv').style.display='block';	
	var pic=document.getElementById('UserProfilePic').value;	
	//var url="ajax_changeprofilepic.php";
	var url="/profile/changepic";
	var data="user="+user+"&picture="+pic;	
	ChangeProfilePicHttp.open("POST",url,true);
	ChangeProfilePicHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ChangeProfilePicHttp.setRequestHeader("Content-length", data.length);
	ChangeProfilePicHttp.setRequestHeader("Connection", "close");
	
	ChangeProfilePicHttp.onreadystatechange = changeprofilepicresult;
	ChangeProfilePicHttp.send(data);	
}

function changeprofilepicresult()
{
	if(ChangeProfilePicHttp.readyState==4)
	{
		if(ChangeProfilePicHttp.status == 200 || ChangeProfilePicHttp.status == 0)
		{ 
			var result=ChangeProfilePicHttp.responseText;		
			if(result=='1') {
				document.getElementById('AjaxWaitingDiv').style.display='none';
				document.getElementById('profile-change-message').innerHTML='Profile picture changed successfully';
				setTimeout('parent.window.location.href=parent.window.location.href;', 2000);								
			}
			else {
				document.getElementById('AjaxWaitingDiv').style.display='none';
				document.getElementById('profile-change-message').innerHTML='There was an error saving your new picture. Please close and try again.';
			}
		}			
		else alert("Retrieval Error: " + ChangeProfilePicHttp.statusText);
	}
}


// FUNCTION TO CLOSE USERS DBEE LIFE ACCOUNT
var CloseAccountHttp;
function closeaccount(userid)
{
	document.getElementById('confirmclose').innerHTML='<img src="../images/ajaxloader-big.gif">';
	CloseAccountHttp=Browser_Check(CloseAccountHttp);
	
	var url="closeaccount";
	var data="UserID="+userid;
    //alert(url);alert(data);
	CloseAccountHttp.open("POST",url,true);
	CloseAccountHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	CloseAccountHttp.setRequestHeader("Content-length", data.length);
	CloseAccountHttp.setRequestHeader("Connection", "close");

	CloseAccountHttp.onreadystatechange = closeaccountresult;
	CloseAccountHttp.send(data);	
}

function closeaccountresult()
{
	if(CloseAccountHttp.readyState==4)
	{
		if(CloseAccountHttp.status == 200 || CloseAccountHttp.status == 0)
		{ 
			var result=CloseAccountHttp.responseText;
			//alert(result);exit;
			if(result=='1') {
				document.getElementById('confirmclose').style.display='none';
				document.getElementById('closeaccountmessage').style.display='block';
				setTimeout('parent.parent.window.location.href="../myhome/index"', 5000);								
			}
		}	
		else {};
	}
}


// FUNCTION TO START TWITTER SEARCH
var SearchTwitterHttp;
function searchtwitter(showloader,stoptweetreply,tweetnum,profileholder,q)
{
	var n='';
	var u='';
	showloader = typeof(showloader) != 'undefined' ? showloader : '1';
	stoptweetreply = typeof(stoptweetreply) != 'undefined' ? stoptweetreply : '0';
	profileholder = typeof(profileholder) != 'undefined' ? profileholder : '0';
	if(document.getElementById('from')) from=document.getElementById('from').value;
	else from='';
	if(from=='') from=0;
	if(showloader=='1') {
		q = typeof(q) != 'undefined' ? q : document.getElementById('q').value;
		if(q=='#hashtag or keyword') q = '';

		document.getElementById('hiddentwittertagtosend').value=q;

		if(document.getElementById('uname')) {
			u = document.getElementById('uname').value;
		}
		if(u!='' && u!='add Twitter username') n = q+' '+'from:'+u;
		else n = q;
		document.getElementById('hiddentwittertag').value=n;
	}
	else {
		n=document.getElementById('hiddentwittertag').value;
	}
	SearchTwitterHttp=Browser_Check(SearchTwitterHttp);

	if(n!='') {
		document.getElementById('twitter-results').style.display='block';
		if(showloader=='1') {
			document.getElementById('twitter-results').innerHTML='<img src="images/ajaxloader.gif" align="center">';
		}
	
		//var url="ajax_searchtwitter.php";
		var url="/dbrss/searchtwitter";
		var data="q="+n+"&stoptweetreply="+stoptweetreply+"&profileholder="+profileholder+"&tweetnum="+tweetnum+"&from="+from;
		
		SearchTwitterHttp.open("POST",url,true);
		SearchTwitterHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SearchTwitterHttp.setRequestHeader("Content-length", data.length);
		SearchTwitterHttp.setRequestHeader("Connection", "close");
	
		SearchTwitterHttp.onreadystatechange = searchtwitterresult;
		SearchTwitterHttp.send(data);	
	}
	else {
	}
}

function searchtwitterresult()
{
	if(SearchTwitterHttp.readyState==4)
	{
		if(SearchTwitterHttp.status == 200 || SearchTwitterHttp.status == 0)
		{ 
			var result=SearchTwitterHttp.responseText;
			var resultArr=result.split('~#~');
			if(resultArr[0]!='') {
				document.getElementById('twitter-results').innerHTML=resultArr[0];
				document.getElementById('twitter-results-hidden').innerHTML=resultArr[1];
//				var refreshIntervalId=setInterval("searchtwitter('"+resultArr[2]+"','0')",10000);
			} else if(resultArr[0]=='') {
				document.getElementById('twitter-results').innerHTML='<font color="#666">No tweet results for '+resultArr[2]+'</font>';
			}
		}	
		else {};
	}
}


// FUNCTION TO START TWITTER SEARCH
/* OLD FUNCITON BACKUP
var SearchTwitterHttp;
function searchtwitter(q,showloader)
{
	var n='';
	var u='';
	showloader = typeof(showloader) != 'undefined' ? showloader : '1';
	if(showloader=='1') {
		q = typeof(q) != 'undefined' ? q : document.getElementById('q').value;
		if(q=='#hashtag or keyword') q = '';
		if(document.getElementById('uname')) {
			u = document.getElementById('uname').value;
		}
		if(u!='' && u!='add Twitter username') n = q+' '+'from:'+u;
		else n = q;
		document.getElementById('hiddentwittertag').value=n;
	}
	else {
		n=document.getElementById('hiddentwittertag').value;
	}
	SearchTwitterHttp=Browser_Check(SearchTwitterHttp);

	if(n!='') {
		document.getElementById('twitter-results').style.display='block';
		if(showloader=='1') {
			document.getElementById('twitter-results').innerHTML='<img src="images/ajaxloader.gif" align="center">';
		}
		var url="ajax_searchtwitter.php";
		var data="q="+n;
		
		SearchTwitterHttp.open("POST",url,true);
		SearchTwitterHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		SearchTwitterHttp.setRequestHeader("Content-length", data.length);
		SearchTwitterHttp.setRequestHeader("Connection", "close");
	
		SearchTwitterHttp.onreadystatechange = searchtwitterresult;
		SearchTwitterHttp.send(data);	
	}
	else {
	}
}

function searchtwitterresult()
{
	if(SearchTwitterHttp.readyState==4)
	{
		if(SearchTwitterHttp.status == 200 || SearchTwitterHttp.status == 0)
		{ 
			var result=SearchTwitterHttp.responseText;
			var resultArr=result.split('~#~');
			if(resultArr[0]!='') {
				document.getElementById('twitter-results').innerHTML=resultArr[0];
				document.getElementById('twitter-results-hidden').innerHTML=resultArr[1];
//				var refreshIntervalId=setInterval("searchtwitter('"+resultArr[2]+"','0')",10000);
			} else if(resultArr[0]=='') {
				document.getElementById('twitter-results').innerHTML='<font color="#666">No tweet results for '+resultArr[2]+'</font>';
			}
		}	
		else {};
	}
}
*/


// FUNCTION TO SEND TWEET USED NOTIFICATION
var TweetNoteHttp;
function sendtweetnotification(twittername,db,excerpt)
{
	TweetNoteHttp=Browser_Check(TweetNoteHttp);
	
	var tag = document.getElementById('hiddentwittertagtosend').value;

	var url="http://www.dbee.me/twitter/oauth/index.php";
	var data="name="+twittername+"&db="+db+"&excerpt="+excerpt+"&tag="+tag;
	
	TweetNoteHttp.open("POST",url,true);
	TweetNoteHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	TweetNoteHttp.setRequestHeader("Content-length", data.length);
	TweetNoteHttp.setRequestHeader("Connection", "close");

	TweetNoteHttp.onreadystatechange = sendtweetnotificationresult;
	TweetNoteHttp.send(data);	
}

function sendtweetnotificationresult()
{
	if(TweetNoteHttp.readyState==4)
	{
		if(TweetNoteHttp.status == 200 || TweetNoteHttp.status == 0)
		{ 
			var result=TweetNoteHttp.responseText;
			document.getElementById('hiddentwittername').value='';
		}	
		else {};
	}
}


// FUNCTION TO ADD TWITTER RESULTS TO DB REPLY
function addtoreply(id,twittername) {
	document.getElementById('twitter-reply-box').style.display='block';
	document.getElementById('twitter-db-reply').innerHTML=document.getElementById('twitter-result-'+id).value;
	document.getElementById('hiddentwitterreply').value=document.getElementById('twitter-result-'+id).value;
	document.getElementById('hiddentwittername').value=twittername;
}

// FUNCTION TO REMOVE TWITTER RESULT FROM DB REPLY
function removetweetfromnewcomment() {
	document.getElementById('twitter-reply-box').style.display='none';
	document.getElementById('twitter-db-reply').innerHTML='';
	document.getElementById('hiddentwitterreply').value='';
	document.getElementById('hiddentwittername').value='';
}



// FUNCTION TO SEND TWEET USED NOTIFICATION
var TweetReplyHttp;
function stoptweetreply(db)
{
	TweetReplyHttp=Browser_Check(TweetReplyHttp);

	var url="ajax_stoptweetreply.php";
	var data="db="+db;
	
	TweetReplyHttp.open("POST",url,true);
	TweetReplyHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	TweetReplyHttp.setRequestHeader("Content-length", data.length);
	TweetReplyHttp.setRequestHeader("Connection", "close");

	TweetReplyHttp.onreadystatechange = stoptweetreplyresult;
	TweetReplyHttp.send(data);
}

function stoptweetreplyresult()
{
	if(TweetReplyHttp.readyState==4)
	{
		if(TweetReplyHttp.status == 200 || TweetReplyHttp.status == 0)
		{ 
			var result=TweetReplyHttp.responseText;
		}	
		else {};
	}
}



// FUNCTION TO CHANGE NUMBER OF TWEETS SHOWN
var TweetNumHttp;
function changetweetnum(db)
{
	TweetNumHttp=Browser_Check(TweetNumHttp);

	var tweetnum = document.getElementById('numtweets').value;
	var url="ajax_changetweetnum.php";
	var data="db="+db+"&tweetnum="+tweetnum;
	
	TweetNumHttp.open("POST",url,true);
	TweetNumHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	TweetNumHttp.setRequestHeader("Content-length", data.length);
	TweetNumHttp.setRequestHeader("Connection", "close");

	TweetNumHttp.onreadystatechange = changetweetnumresult;
	TweetNumHttp.send(data);
}

function changetweetnumresult()
{
	if(TweetNumHttp.readyState==4)
	{
		if(TweetNumHttp.status == 200 || TweetNumHttp.status == 0)
		{ 
			var result=TweetNumHttp.responseText;
			if(result!=0) {
				var IntSet = document.getElementById('twitterIntervalSet').value;
				if(IntSet=='1')
					clearInterval(intReloadTwFeed);
				n=document.getElementById('hiddentwittertag').value;
				searchtwitter('1','0',result,'1',n);
				intReloadTwFeed=setInterval("searchtwitter('0','0','"+result+"','1','"+n+"')",7000);
				document.getElementById('twitterIntervalSet').value='1';
			}
		}	
		else {};
	}
}
function searchtwitterfunction() {
	var tweetnum = document.getElementById('numtweets').value;
	searchtwitter('1','0',tweetnum,'1');
}
function searchtwitternew(q) {
	new TWTR.Widget({
	  version: 2,
	  type: 'search',
	  search: q,
	  interval: 30000,
	  title: '',
	  subject: '',
	  width: 250,
	  height: 300,
	  theme: {
		shell: {
		  background: '#8ec1da',
		  color: '#ffffff'
		},
		tweets: {
		  background: '#ffffff',
		  color: '#444444',
		  links: '#1985b5'
		}
	  },
	  features: {
		scrollbar: true,
		loop: true,
		live: true,
		behavior: 'default'
	  }
	}).render().start();
}