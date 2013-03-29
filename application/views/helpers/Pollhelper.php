<?php
class Zend_View_Helper_Pollhelper{	 
	
	public function Pollhelper($dbeeid)
	{
		$poloption = new Application_Model_Polloption();		
			$stats='<div>';				
				$totalvotesobj = $poloption->getpollvote($dbeeid);						
				  $totalvotes = $totalvotesobj[0]['cnt'];			
				$pres = $poloption->getpolloption($dbeeid);			
				foreach($pres as $prow):
					if($totalvotes>0) {					
					 $psrid = $prow['ID'];
					$totalobj = $poloption->getpolloptionvote($dbeeid,$psrid);
					 $total = $totalobj[0]['cnt'];
					 //$totalvotes;
					//$total =1;
						$percent=($total/$totalvotes)*100;
						$width=round($percent,1);
						$stats.='<div><div class="pollstatsbar-wrapper"><div class="pollstatsbar" style="width:'.$width.'px;">';
						if(round($percent)>0) $stats.='<span style="margin-left:0px;">'.round($percent,1).'%</span>'; else $stats.='';
						$stats.='</div></div><div style="float:left; margin-bottom:8px;">'.$prow['OptionText'].'</div></div><div class="next-line"></div>';
					} else {
						$stats.='<div><div class="pollstatsbar-wrapper"></div><div style="float:left; margin-bottom:8px;">'.$prow['OptionText'].'</div></div><div class="next-line"></div>';
					}
				endforeach;
				$stats.='</div>';
			
			return $stats;	
	
	}
	

}
?>