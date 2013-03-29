<?php
class Zend_View_Helper_Commentagohelper{
	
	protected $request;
	
	/* public function __construct($request)
	{
		$this->request = $request;
	} */
	public function Commentagohelper($date)
	{
		$commentago='';
			
				$commentago='last ';
				$diff=($this->_date_diff(time(), strtotime($date)));				
				if($diff[y]!=0) $commentago.=($diff[y]>1) ? $diff[y].' years ' : $diff[y].' year ';
				elseif($diff[m]!=0) $commentago.=($diff[m]>1) ? $diff[m].' months ' : $diff[m].' month ';
				elseif($diff[d]!=0) $commentago.=($diff[d]>1) ? $diff[d].' days ' : $diff[d].' day ';
				elseif($diff[h]!=0) $commentago.=($diff[h]>1) ? $diff[h].' hrs ' : $diff[h].' hr ';
				elseif($diff[i]!=0) $commentago.=($diff[i]>1) ? $diff[i].' mins ' : $diff[i].' min ';
				elseif($diff[s]!=0) $commentago.=($diff[s]>1) ? $diff[s].' secs ' : $diff[s].' sec ';
				$commentago.=' ago';
				
				return $commentago;
			
	
	
	}
	
		
	function _date_diff($one, $two)
	{
	    $invert = false;
	    if ($one > $two) {
	        list($one, $two) = array($two, $one);
	        $invert = true;
	    }
	
	    $key = array("y", "m", "d", "h", "i", "s");
	    $a = array_combine($key, array_map("intval", explode(" ", date("Y m d H i s", $one))));
	    $b = array_combine($key, array_map("intval", explode(" ", date("Y m d H i s", $two))));
	
	    $result = array();
	    $result["y"] = $b["y"] - $a["y"];
	    $result["m"] = $b["m"] - $a["m"];
	    $result["d"] = $b["d"] - $a["d"];
	    $result["h"] = $b["h"] - $a["h"];
	    $result["i"] = $b["i"] - $a["i"];
	    $result["s"] = $b["s"] - $a["s"];
	    $result["invert"] = $invert ? 1 : 0;
	    $result["days"] = intval(abs(($one - $two)/86400));
	
	    if ($invert) {
	       $this-> _date_normalize(&$a, &$result);
	    } else {
	       $this-> _date_normalize(&$b, &$result);
	    }
	
	    return $result;
	}
	
	function _date_normalize($base, $result)
	{
		$result =$this->_date_range_limit(0, 60, 60, "s", "i", $result);
		$result = $this->_date_range_limit(0, 60, 60, "i", "h", $result);
		$result = $this->_date_range_limit(0, 24, 24, "h", "d", $result);
		$result = $this->_date_range_limit(0, 12, 12, "m", "y", $result);
	
		$result = $this->_date_range_limit_days(&$base, &$result);
	
		$result =$this->_date_range_limit(0, 12, 12, "m", "y", $result);
	
		return $result;
	}
	
	function _date_range_limit($start, $end, $adj, $a, $b, $result)
	{
		if ($result[$a] < $start) {
			$result[$b] -= intval(($start - $result[$a] - 1) / $adj) + 1;
			$result[$a] += $adj * intval(($start - $result[$a] - 1) / $adj + 1);
		}
	
		if ($result[$a] >= $end) {
			$result[$b] += intval($result[$a] / $adj);
			$result[$a] -= $adj * intval($result[$a] / $adj);
		}
	
		return $result;
	}
	
	function _date_range_limit_days($base, $result)
	{
		$days_in_month_leap = array(31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		$days_in_month = array(31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	
		$this->_date_range_limit(1, 13, 12, "m", "y", &$base);
	
		$year = $base["y"];
		$month = $base["m"];
	
		if (!$result["invert"]) {
			while ($result["d"] < 0) {
				$month--;
				if ($month < 1) {
					$month += 12;
					$year--;
				}
	
				$leapyear = $year % 400 == 0 || ($year % 100 != 0 && $year % 4 == 0);
				$days = $leapyear ? $days_in_month_leap[$month] : $days_in_month[$month];
	
				$result["d"] += $days;
				$result["m"]--;
			}
		} else {
			while ($result["d"] < 0) {
				$leapyear = $year % 400 == 0 || ($year % 100 != 0 && $year % 4 == 0);
				$days = $leapyear ? $days_in_month_leap[$month] : $days_in_month[$month];
	
				$result["d"] += $days;
				$result["m"]--;
	
				$month++;
				if ($month > 12) {
					$month -= 12;
					$year++;
				}
			}
		}
	
		return $result;
	}
	
		

}


?>