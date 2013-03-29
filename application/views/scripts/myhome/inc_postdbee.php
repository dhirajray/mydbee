<script language="javascript" type="text/javascript">
$(function() {
	$('.check').click(function(){
		$("#db-post-cat").val('');
		$(".check").each(function(){
			if($(this).attr('checked')){
				if($("#db-post-cat").val()!='')
					$("#db-post-cat").val($("#db-post-cat").val()+','+$(this).val());
				else
					$("#db-post-cat").val($(this).val());
			}
		});
	});

	loadQtipAbove('whyhashtagtext','add a hashtag and see what Twitter has to say');
	loadQtipAbove('whyhashtaglink','add a hashtag and see what Twitter has to say');
	loadQtipAbove('whyhashtagpix','add a hashtag and see what Twitter has to say');
	loadQtipAbove('whyhashtagvidz','add a hashtag and see what Twitter has to say');
	loadQtipAbove('howembedsc','click Share on a SoundCloud audio, copy the Embed Code and paste here');
	loadQtipAbove('changepolloptions','simply edit the poll options above to change');
	loadQtipAbove('whycat','add your db into a category to increase its chances of being seen in the filter search');
});
</script>
<div id="textdbtop"></div>
		<div style="margin-left:-2px">
			<div id="DbeeTextTab" class="dbee-post-tab-Text-close" onclick="javascript:showdbeepostoption('Text');"></div>
			<div id="DbeeLinkTab" class="dbee-post-tab-Link-close" onclick="javascript:showdbeepostoption('Link');"></div>
			<div id="DbeePixTab" class="dbee-post-tab-Pix-close" onclick="javascript:showdbeepostoption('Pix');"></div>
			<div id="DbeeVidzTab" class="dbee-post-tab-Vidz-close" style="margin-right:0px" onclick="javascript:showdbeepostoption('Vidz');"></div>
			<div id="DbeePollsTab" class="dbee-post-tab-Polls-close" style="margin-right:0px" onclick="javascript:showdbeepostoption('Polls');"></div>
			<div style="clear:both"></div>
		</div>
		<div class="next-line"></div>
		<div id="dbee-post-options-wrapper" class="dbee-post-options-wrapper noleftradius" style="display:none">

			<!-- DBEE-TEXT POST -->
			<div id="DbeeText" class="dbee-post" style="display:none">
				<div id="DbeeTextInfo" style="position:relative; margin-top:<? if(eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) echo '0px;'; else echo '2px;'; ?>"><div style="float:left; width:520px;"><div style="font-size:14px; margin:5px 0 0 5px;">1. add text</div><div><textarea id="PostText" class="roundedge-textbox fieldtext" style="width:500px; height:100px; margin-top:5px;" onKeyDown="limitText('PostText',500,'dbtextcountdown');" onKeyUp="limitText('PostText',500,'dbtextcountdown');" onfocus="if(this.value == 'what\'s on your mind?') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'what\'s on your mind?'; }">what's on your mind?</textarea></div><div class="next-line"></div><div id="dbtextcountdown" class="dbtextcountdown" style="margin:5px; color:#F9C10C; font-size:12px">500 limit</div></div><div style="float:right; width:350px; margin:5px 10px 0 0;"><div><div style="float:left; font-size:14px; margin-left:100px;">2. add hashtag</div><div style="float:right; margin-left:25px; display:inline; color:#999999; font-size:14px;">3. categorise db</div></div><div class="next-line"></div><div class="twitter-post-tag"><div style="float:right"><input type="text" id="twitter-tag-text" class="twitter-addtag" style="width:230px;" onfocus="if(this.value == '# hashtag/keyword') { this.value = ''; }" onblur="if(this.value == '') { this.value = '# hashtag/keyword'; }" value="# hashtag/keyword"><br /><span id="whyhashtagtext" style="float:right; cursor:pointer; color:#999999; margin-top:3px;">[why hashtag?]</span></div><div class="twitter-bird-dbpost" style="float:right"></div></div><div class="next-line"></div><div class="button-yellow" style="margin:20px 0 0 20px; float:right" onclick="javascript:showdbpostcat('Text')">next</div></div></div><br style="clear:both">
			</div>
			
			<!-- DBEE-LINK POST -->
			<div id="DbeeLink" class="dbee-post">
				<div id="DbeeLinkInfo" style="position:relative; margin-top:<? if(eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) echo '0px;'; else echo '2px;'; ?>"><div style="float:left; width:520px;"><div style="font-size:14px; margin:5px 0 0 5px;">1. add link</div><div style="float:left"><input type="text" id="PostLink" class="roundedge-textbox" style="width:420px; margin-top:5px;" onfocus="if(this.value == 'paste link here') { this.value = ''; }; document.getElementById('attachlinkerror').style.display='none';" onblur="if(this.value == '') { this.value = 'paste link here'; }" value="paste link here"></div><div class="button-yellow" style="margin:9px 0 0 10px" onclick="javascript:attachlinkdbee()">attach</div><div class="next-line"></div>
					<div align="center" id="attachlinkloader" style="display:none; padding-top:10px;"><img src="images/ajaxloader.gif" border="0" /></div>
					<div align="center" id="attachlinkerror" class="error-dbeelink" style="display:none; margin-left:5px;"><div class="link-post-error-arrow" style="margin-left:5px;"></div><div id="attachlinkerror-text" style="position:relative;">The website address was not found</div></div>
					<div class="next-line"></div>
					<div id="LinkInfoWrapper" style="margin-top:10px;">
						<div id="LinkInfo"></div>
						<div id="LinkDesc"><textarea id="PostLinkDesc" class="dbee-post-textarea" style="height:50px; width:490px;" onKeyDown="limitText('PostLinkDesc',500,'dblinkcountdown');" onKeyUp="limitText('PostLinkDesc',500,'dblinkcountdown');" onfocus="if(this.value == 'write something about this link...') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'write something about this link...'; }">write something about this link...</textarea><br /><div id="dblinkcountdown" class="dbtextcountdown">500 limit</div></div>
				<br style="clear:both"></div></div>
				<div style="float:right; width:350px; margin:5px 10px 0 0;"><div><div style="float:left; font-size:14px; margin-left:100px;">2. add hashtag</div><div style="float:right; margin-left:25px; display:inline; color:#999999; font-size:14px;">3. categorise db</div></div><div class="next-line"></div><div class="twitter-post-tag"><div style="float:right"><input type="text" id="twitter-tag-link" class="twitter-addtag" style="width:230px;" onfocus="if(this.value == '# hashtag/keyword') { this.value = ''; }" onblur="if(this.value == '') { this.value = '# hashtag/keyword'; }" value="# hashtag/keyword"><br /><span id="whyhashtaglink" style="float:right; cursor:pointer; color:#999999; margin-top:3px;">[why hashtag?]</span></div><div class="twitter-bird-dbpost" style="float:right"></div></div><div class="next-line"></div><div class="button-yellow" style="margin:20px 0 0 20px; float:right" onclick="javascript:showdbpostcat('Link')">next</div></div></div><br style="clear:both">
				</div>

			<!-- DBEE-PIX POST -->
			<div id="DbeePix" class="dbee-post">
				<div id="DbeePixInfo" style="position:relative; margin-top:<? if(eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) echo '0px;'; else echo '2px;'; ?>"><div style="float:left; width:520px;"><div style="font-size:14px; margin:5px 0 0 5px;">1. add image</div><div>
				<div style="margin:5px 0 0 5px;">
					<div style="float:left">
							<div>
								<form action="/dbupload/add" method="post" name="sleeker" id="sleeker" enctype="multipart/form-data">
									<input type="hidden" name="maxSize" value="9999999999" />
									<input type="hidden" name="maxW" value="600" />
									<input type="hidden" name="fullPath" value="<?php echo BASE_URL;?>/imageposts/" />
									<input type="hidden" name="relPath" value="imageposts" />
									<input type="hidden" name="colorR" value="255" />
									<input type="hidden" name="colorG" value="255" />
									<input type="hidden" name="colorB" value="255" />
									<input type="hidden" name="maxH" value="600" />
									<input type="hidden" name="filename" value="filename" />
									<p><input type="file" id="ajaxfilename" class="filefield-big" name="filename" onchange="ajaxUpload(this.form,'<?php echo BASE_URL;?>/myhome/dbupload','dbeePix_upload_area','Generating Preview...&lt;br /br /&gt;&lt;img src=\'images/ajaxloader.gif\' width=\'16\' height=\'16\' border=\'0\' /&gt;','&lt;img src=\'images/error.gif\' width=\'16\' height=\'16\' border=\'0\' /&gt; Error in Upload, check settings and path info in source code.'); return false;" /><br /><font color="#666666">(Only .jpeg/.gif allowed)</font></p>
								</form>
							</div>
						</div>
						<div id="dbeePix_upload_area" style="float:left; margin-left:20px;" align="center"><div style="margin-top:12px">Preview your picture</div></div>
					</div>
					<div class="next-line"></div>
					<div style="padding:5px;"><textarea id="PostPixDesc" class="dbee-post-textarea" style="height:50px; width:490px;" onKeyDown="limitText('PostPixDesc',500,'dbpixcountdown');" onKeyUp="limitText('PostPixDesc',500,'dbpixcountdown');" onfocus="if(this.value == 'write something about this picture...') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'write something about this picture...'; }">write something about this picture...</textarea></div>
				<div id="dbpixcountdown" class="dbtextcountdown" style="margin:5px; color:#F9C10C; font-size:12px">500 limit</div>
				</div></div><div style="float:right; width:350px; margin:5px 10px 0 0;"><div><div style="float:left; font-size:14px; margin-left:100px;">2. add hashtag</div><div style="float:right; margin-left:25px; display:inline; color:#999999; font-size:14px;">3. categorise db</div></div><div class="next-line"></div><div class="twitter-post-tag"><div style="float:right"><input type="text" id="twitter-tag-pix" class="twitter-addtag" style="width:230px;" onfocus="if(this.value == '# hashtag/keyword') { this.value = ''; }" onblur="if(this.value == '') { this.value = '# hashtag/keyword'; }" value="# hashtag/keyword"><br /><span id="whyhashtagpix" style="float:right; cursor:pointer; color:#999999; margin-top:3px;">[why hashtag?]</span></div><div class="twitter-bird-dbpost" style="float:right"></div></div><div class="next-line"></div><div class="button-yellow" style="margin:20px 0 0 20px; float:right" onclick="javascript:showdbpostcat('Pix')">next</div></div></div><br style="clear:both">
			</div>

			<!-- DBEE-VIDZ POST -->
			<div id="DbeeVidz" class="dbee-post">
				<div id="DbeeTextInfo" style="position:relative; margin-top:<? if(eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) echo '0px;'; else echo '2px;'; ?>"><div style="float:left; width:520px;"><div style="font-size:14px; margin:5px 0 0 5px; float:left; margin-right:10px;">1. add video or audio</div><div class="icon-youtube" title="click to add YouTube video" style="cursor:pointer" onclick="javascript:showhidedbav('vidz')"></div><div class="icon-soundcloud" title="click to add SoundCloud audio" style="cursor:pointer" onclick="javascript:showhidedbav('audio')"></div><div id="dbmedia-vidz"><input type="text" id="PostVidz" class="roundedge-textbox" style="width:490px; margin-top:5px;" onfocus="if(this.value == 'paste YouTube link here') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'paste YouTube link here'; }" value="paste YouTube link here"></div><div id="dbmedia-audio" style="display:none"><input type="text" id="PostAudio" class="roundedge-textbox" style="width:490px; margin-top:5px;" onfocus="if(this.value == 'paste SoundCloud embed code here') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'paste SoundCloud embed code here'; }" value="paste SoundCloud embed code here"><br /><span id="howembedsc" style="float:right; cursor:pointer; color:#999999; margin-top:3px;">[how do I embed from SoundCloud?]</span></div><div class="next-line"></div><div id="videoerror" class="error-dbeelink" style="display:none; margin-left:5px; float:left;"><div class="link-post-error-arrow" style="margin-left:5px;"></div><div style="position:relative;">The website address was not found</div></div><div class="next-line"></div>
				<div style="padding:5px;"><textarea id="PostVidzDesc" class="dbee-post-textarea" style="height:50px; width:490px;" onKeyDown="limitText('PostVidzDesc',500,'dbvidzcountdown');" onKeyUp="limitText('PostVidzDesc',500,'dbvidzcountdown');" onfocus="if(this.value == 'write something about this media...') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'write something about this media...'; }">write something about this media...</textarea></div>
				<div class="next-line"></div><div id="dbvidzcountdown" class="dbtextcountdown" style="margin:5px; color:#F9C10C; font-size:12px">500 limit</div></div><div style="float:right; width:350px; margin:5px 10px 0 0;"><div><div style="float:left; font-size:14px; margin-left:100px;">2. add hashtag</div><div style="float:right; margin-left:25px; display:inline; color:#999999; font-size:14px;">3. categorise db</div></div><div class="next-line"></div><div class="twitter-post-tag"><div style="float:right"><input type="text" id="twitter-tag-vidz" class="twitter-addtag" style="width:230px;" onfocus="if(this.value == '# hashtag/keyword') { this.value = ''; }" onblur="if(this.value == '') { this.value = '# hashtag/keyword'; }" value="# hashtag/keyword"><br /><span id="whyhashtagvidz" style="float:right; cursor:pointer; color:#999999; margin-top:3px;">[why hashtag?]</span></div><div class="twitter-bird-dbpost" style="float:right"></div></div><div class="next-line"></div><div class="button-yellow" style="margin:20px 0 0 20px; float:right" onclick="javascript:showdbpostcat('Vidz')">next</div></div></div><br style="clear:both"><input type="hidden" id="hiddenmediaposted" value="vidz">
			</div>

			<!-- DBEE-POLLS POST -->
			<div id="DbeePolls" class="dbee-post">
				<div id="DbeeTextInfo" style="position:relative; margin-top:<? if(eregi("chrome", $_SERVER['HTTP_USER_AGENT'])) echo '0px;'; else echo '2px;'; ?>"><div style="float:left; width:520px;"><div style="font-size:14px; margin:5px 0 0 5px;">1. add poll text</div><div><textarea id="PollText" class="roundedge-textbox fieldtext" style="width:500px; height:50px; margin-top:5px;" onKeyDown="limitText('PostText',300,'dbtextcountdown');" onKeyUp="limitText('PostText',300,'dbtextcountdown');" onfocus="if(this.value == 'write poll text here') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'write poll text here'; }">write poll text here</textarea></div><div class="next-line"></div><div id="dbtextcountdown" class="dbtextcountdown" style="margin:5px; color:#F9C10C; font-size:12px">300 limit</div></div><div style="float:right; width:350px; margin:5px 10px 0 0;"><div><div style="float:left; font-size:14px; margin-left:100px;">2. add options</div></div><div class="next-line"></div><div class="twitter-post-tag"><div><input type="text" id="poll-option-1" class="polloption-textbox" style="margin-left:95px;" value="Yes"><input type="text" id="poll-option-2" class="polloption-textbox" value="No"></div><div class="next-line"></div><div><input type="text" id="poll-option-3" class="polloption-textbox" style="margin-left:95px;" value="Maybe"><input type="text" id="poll-option-4" class="polloption-textbox-grey"  onfocus="if(this.value == 'optional') { this.value = ''; }" onblur="if(this.value == '') { this.value = 'optional'; }" value="optional"></div></div><span id="changepolloptions" style="float:right; cursor:pointer; color:#999999; margin-top:0px;">[want to change options?]</span><div class="next-line"></div><div class="button-yellow" style="margin:10px 0 0 20px; float:right" onclick="javascript:postdbee()">Post Poll</div></div></div><br style="clear:both">
			</div>
			
			<!-- DBEE CATEGORIES -->
			<div id="DbeeCat" class="dbee-post" style="display:none; font-size:14px;">
				<div style="float:left; margin:10px 0 10px 10px; color:#666;"><b>thanks, now choose a category</b><span id="whycat" style="color:#999999; margin-left:20px; font-size:12px; cursor:pointer">[why should I categorise?]</span></div>
				<div id="dbpostcat-return" style="float:right; margin:7px 10px 10px 0;"></div>
				<div class="next-line"></div>
			
			
				<div style="float:left; margin-left:10px;">
					<?
						$counter=1;					
						foreach($this->cat as $data){ if($counter!=3) $width="150px"; else $width="160px";
					?>
						<div style="float:left; width:auto; margin:0 20px 0 0; color:#666;">
							<?// for($i=1;$i<=4;$i++) { if($i!=1){ 
							
					?>
									<div style="margin-bottom:10px; width:<?=$width?>; font-size:12px;"><label><input type="checkbox" class="check" value="<?=$data['CatID'];?>"><?=$data['CatName'];?></label></div>
							<? //} ?>
						</div>
					<? if($counter=='5') { echo '<div style="clear:both"></div>'; $counter=0; } $counter++; } ?>
				</div>
			
				<div class="next-line"></div>
				<div id="cat-req-msg" style="float:left"></div>
				<div style="float:right"><div id="signuploader" style="display:none; float:left; padding-top:5px; padding-right:10px;"><img src="images/ajaxloader.gif" border="0" /></div><div class="button-yellow" style="margin:0 10px 0 0;" onclick="javascript:postdbee(<?=$group?>);">Post db</div></div>
				<input type="hidden" id="db-post-cat" value="10">
				<br style="clear:both">
					
			</div>
			<!-- DBEE CATEGORIES -->

			<input type="hidden" id="dbeeuser" value="<?=$this->dbeeuser;?>">
			<input type="hidden" id="dbeetype" value="Text">
			<input type="hidden" id="feedtype">
			<input type="hidden" id="reloadend">
			<input type="hidden" id="frompop" value="<?=$frompop;?>">
			<input type="hidden" id="startnewall" value="5">
			<input type="hidden" id="startnewfollowing" value="5">
			<input type="hidden" id="startnewfav" value="5">
			<input type="hidden" id="startnewmc" value="5">
			<input type="hidden" id="startnewcat" value="5">
			<input type="hidden" id="startnewtype" value="5">
			<input type="hidden" id="startnewfilter" value="5">
			<input type="hidden" id="startnewmydb" value="5">
			<input type="hidden" id="startnewmycomments" value="5">
			<input type="hidden" id="filterscore">
			<input type="hidden" id="filtertype">
			<input type="hidden" id="filtercat">
			<div class="next-line"></div>
			<? if($frompop!='1') { ?>
			<div style="margin-left:10px"><div class="icon-close"></div><div style="float:left"><a href="javascript:closedbeepostoption()">close</a></div></div>
			<div class="next-line"></div>
			<? } ?>
		</div>
		<div class="next-line"></div>
		<div id="dbpostmsg" style="width:auto; text-align:center; margin-top:25px; font-size:22px; color:#CC3300; display:none;">DB posted successfully.</div>
