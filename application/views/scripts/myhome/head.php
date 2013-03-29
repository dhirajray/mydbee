<link rel="icon" type="image/png" href="http://dbee.me/images/favicon.png">
<link rel="stylesheet" href="css/styles.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="<?=$siteloc;?>shadowbox/shadowbox.css">
<link rel="stylesheet" type="text/css" href="<?=$siteloc;?>css/ddcolortabs.css" />

<!--[if gte IE 7]>  
	<link rel="stylesheet" type="text/css" media="all" href="css/ie7.css" />
<![endif]--> 

<!--[if gte IE 8]>  
	<link rel="stylesheet" type="text/css" media="all" href="css/ie8.css" />
<![endif]-->

<script language="javascript" type="text/javascript">
var screenwidth = screen.width;
if (screenwidth == 1024) {
	document.write('<link rel="stylesheet" href="css/1024.css" type="text/css" media="all" />');
}
</script>

<?
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Safari') !== false) {
	// Chrome user agent string contains both 'Chrome' and 'Safari'
	if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false) {
?>
<link rel="stylesheet" type="text/css" href="css/chromestyles.css" />
<?
	}
}

if(eregi("Mac OS", $_SERVER['HTTP_USER_AGENT'])) {
?>
<link rel="stylesheet" type="text/css" href="css/macsafari.css" />
<?
}
?>

<script language="javascript" type="text/javascript" src="<?=$siteloc;?>js/functions.js?<?=rand()?>"></script>
<script type="text/javascript" src="<?=$siteloc;?>js/browser_check.js"></script>
<script type="text/javascript" src="<?=$siteloc;?>js/smooth.pack.js"></script>

<!-- BEGIN INCLUDE SCRIPTS TO CALL SHADOWBOX -->
<script type="text/javascript" src="<?=$siteloc;?>shadowbox/shadowbox.js"></script>
<script type="text/javascript" src="<?=$siteloc;?>shadowbox/show_shadowbox.js"></script>
<!-- END INCLUDE SCRIPTS TO CALL SHADOWBOX -->

<!-- DROPDOWN CONTENT FOR MY GROUP OPTIONS -->
<script type="text/javascript" src="<?=$siteloc;?>js/dropdowncontent/dropdowncontent.js"></script>
<!-- DROPDOWN CONTENT FOR MY GROUP OPTIONS -->

<!-- DROPDOWN TOP MENU -->
<script type="text/javascript" src="<?=$siteloc;?>js/dropdowntab/dropdowntabs.js"></script>
<!-- DROPDOWN TOP MENU -->

<!-- BEGIN INCLUDE SCRIPTS TO CALL DHTML TOOLTIP -->
<link rel="stylesheet" type="text/css" href="css/speechbubbles.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="<?=$siteloc;?>js/speechbubbles.js"></script>
<script type="text/javascript">
jQuery(function($){ //on document.ready
 $('.addspeech').speechbubble()
})
</script>
<!-- BEGIN INCLUDE SCRIPTS TO CALL DHTML TOOLTIP -->

<script type="text/javascript" src="scripts/ajaxupload.js"></script>

<script src="http://code.jquery.com/jquery-latest.js"></script>

<!-- SLIDING BACK TO TOP -->
<script language="javascript" type="text/javascript" src="<?=$siteloc;?>js/jquery.slideto.v1.1.js"></script>
<script language="javascript" type="text/javascript">
var jqnctop = jQuery.noConflict();
jqnctop(document).ready(function(){
	jqnctop('a[name=slidetotop]').slideto({
		target : '#pagetop',
		speed  : 700
	});
});

$(window).scroll(function(){
	if($(window).scrollTop() > 200 ){
		$('#backtotop').fadeIn("slow");
	} else if($(window).scrollTop() < 200 ){
		$('#backtotop').fadeOut("fast");
	}
});
</script>
<!-- SLIDING BACK TO TOP -->

<script language="javascript" type="text/javascript">
$(function() {
	// HIGHLIGHT TEXTBOX BORDER ON FOCUS AND HIDE ON BLUR
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

	$("select").focus(function() {
		$(this).addClass("curFocus");
	});
	$("select").blur(function() {
		$(this).removeClass("curFocus")
	});
	// HIGHLIGHT TEXTBOX BORDER ON FOCUS AND HIDE ON BLUR
	
	// MOVE LEFT SIDE ICONS ON HOVER
	$("div.sticky-left").hover(function(){
		$(this).animate({
			left: "4px"
		},"fast");
	},function(){
		$(this).animate({
			left: "2px"
		},"fast");
	});
	// MOVE LEFT SIDE ICONS ON HOVER
});
</script>



<!-- BEGIN INCLUDE SCRIPTS FOR TABBED CONTENT FOR INVITE TABS -->
<link rel="stylesheet" type="text/css" href="<?=$siteloc;?>css/tabcontent.css" />
<script type="text/javascript" src="<?=$siteloc;?>js/tabcontent.js"></script>
<!-- BEGIN INCLUDE SCRIPTS FOR TABBED CONTENT FOR INVITE TABS -->


<!-- SLIDING FOOTER FUNCTION -->
<script language="javascript" type="text/javascript">
$(function() {
	var open = false;
	$('#footerSlideButton').click(function() {
		if(open === false) {
			document.getElementById('footerSlideText').style.display='block';
			$('#footerSlideContent').animate({ height: '50px' });
			$(this).css('backgroundPosition', 'bottom left');
			open = true;
		} else {
			document.getElementById('footerSlideText').style.display='none';
			$('#footerSlideContent').animate({ height: '0px' });
			$(this).css('backgroundPosition', 'top left');
			open = false;
		}
	});
});
</script>
<!-- SLIDING FOOTER FUNCTION -->

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>