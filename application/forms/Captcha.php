
<?php 
class Application_Form_Captcha extends Zend_Form
{
	   public function init()
    {       
		$publickey  = '6LeAAd4SAAAAAJ3BeWLfc2mmYZW75ImFYjAZK029'; 
		$privatekey = '6LeAAd4SAAAAANXcScRJ7eHz4j_cuLWZZuHzEMs8';
        $recaptcha = new Zend_Service_ReCaptcha($publickey, $privatekey);

        $captcha = new Zend_Form_Element_Captcha('captcha',
            array(
                'captcha'       => 'ReCaptcha',
                'captchaOptions' => array('captcha' => 'ReCaptcha', 'service' => $recaptcha),
                'ignore' => true
                )
        );

        $this->addElement($captcha);
   }
	
}


