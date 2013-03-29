<div id="rss-icons" style="text-align:center; margin:-18px 0 5px 8px;">
<div style="text-align:center; margin:-18px 0 5px 8px;" id="rss-icons">
<div onclick="javascript:loadrss('twitter',0,0)" class="rsstwitter rss-icon-styles" id="rss0"></div>
<?php 
foreach($this->rssurl as $link):?>
<div onclick="javascript:myfeeds('<?php echo $link['Site']; ?>','<?php echo $link['Logo']; ?>',1)" class="rss1 rss-icon-styles" id="rss1"></div>
<?php endforeach; ?>
</div>
</div>
<div class="next-line"></div> 
<div id="twitter-search-box" class="twitter-search-box" style="margin: 1px 0px 0px 10px; display: block;">
	<div class="twitterfeed-header-home"></div>
	<div class="next-line"></div>
	<div style="width:210px; margin-left:2px;">
		<div style="margin-bottom:5px;"><form name="twitterform" id="twitterform" method="post" onsubmit="javascript:searchtwitter(1,0,4,0); return false;"><input type="text" name="q" id="q" class="twitter-search-field-grey" onfocus="if(this.value == '#hashtag or keyword') { this.value = ''; }; toggletwsearchclass('q');" onblur="if(this.value == '') { this.value = '#hashtag or keyword'; }; toggletwsearchclass('q');" value="#hashtag or keyword"><input type="hidden" id="hiddentwittertag"><input type="hidden" id="from" value="1"><input type="hidden" id="hiddentwittertagtosend"><input type="hidden" id="twitterIntervalSet"><div class="next-line"></div><div class="slidingTwitterSearch" style="margin-top:5px;"><input type="text" name="uname" id="uname" class="twitter-search-field-grey" onfocus="if(this.value == 'add Twitter username') { this.value = ''; };  toggletwsearchclass('uname');" onblur="if(this.value == '') { this.value = 'add Twitter username'; }; toggletwsearchclass('uname');" value="add Twitter username"></div><div class="next-line"></div><input type="image" src="images/btn-go-blue.png" style="float:right"></form></div>
		<div style="clear:both"></div>
		<? if($TwitterTag!='') { ?>
		<div class="twitter-tag-links"><a href="javascript:void(0)" onclick="javascript:searchtwitter('1',<?=$SendWithSearch?>,<?=$ShowTweetsNum?>,<?=$ProfileHolderTwitter?>,'<?=urlencode($TwitterTag);?>')"><?= $TwitterTag ?></a></div>
		<div style="clear:both"></div>
		<? } ?>
		<div id="twitter-results" class="twitter-results" style="display:none; margin-top:5px;"></div>
		<div id="twitter-results-hidden"></div>
	</div>
</div>
<div id="rssfeed-logo" style="margin:20px 0 0 10px"></div>
<div id="rssfeed-wrapper"></div>
<div class="next-line"></div>
