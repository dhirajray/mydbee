<?
function show_thumbnail_image($filename,$img_loc,$thumbs_width,$thumbs_height)
{
	if(!is_file($img_loc.'/'.$filename)) {
		$filename = 'default-avatar.jpg';	
	}
		
	$tn_file = $filename;
	$file = $img_loc.'/'.$filename;
	
	$Max_Width=$FixedWidth=$thumbs_width;
	$Max_Height=$FixedHeight=$thumbs_height;

	if (list($img_width, $img_height, $img_type) = getimagesize($file)) 
	{
		if($img_type==1) $image_type = 'gif';
		if($img_type==2) $image_type = 'jpg';
		if($img_type==3) $image_type = 'png';
		
		if ($img_width>$img_height)
		{
			if ($img_width > $FixedWidth)
			{
				$percent_change=$FixedWidth/$img_width;
				$Max_Height=ceil($img_height*$percent_change);
				$Max_Width=$FixedWidth;
			}
		}
		if ($img_width<$img_height)
		{
			if ($img_height > $FixedHeight)
			{
				$percent_change=$FixedHeight/$img_height;
				$Max_Width=ceil($img_width*$percent_change);
				$Max_Height=$FixedHeight;
			}
		}
		
		if ($Max_Height > $FixedHeight) $Max_Height=$FixedHeight;
		if ($Max_Width > $FixedWidth) $Max_Width=$FixedWidth;

		if ($img_width < $Max_Width) $Max_Width=$img_width;
		if ($img_height < $Max_Height) $Max_Height=$img_height;
	}
		
	$tn = imagecreatetruecolor($Max_Width, $Max_Height) ;
	
	if($image_type == "jpg") $image = @imagecreatefromjpeg($file);
	if($image_type == "gif") $image = @imagecreatefromgif($file);
	if($image_type == "png") $image = @imagecreatefrompng($file);

	if(!$image) 
		echo 'could not create thumbnail for '.$file.'<br />';   
	else
		imagecopyresampled ($tn, $image, 0, 0, 0, 0, $Max_Width, $Max_Height, $img_width, $img_height) ;
	
	if($image_type == 'jpg') imagejpeg($tn, '', 100);
	if($image_type == 'gif') imagegif($tn, '', 100);
	if($image_type == 'png') imagepng($tn, '', 100);
	
	imagedestroy($tn);
	imagedestroy($image);
}

header("Content-type: image/jpeg");

$ImageName=$_GET['ImgName'];
$ImageLocation=$_GET['ImgLoc'];
$ThumbWidth=$_GET['Width'];
$ThumbHeight=$_GET['Height'];
show_thumbnail_image($ImageName,$ImageLocation,$ThumbWidth,$ThumbHeight);
?>