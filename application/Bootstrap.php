<?php

require_once 'Zend/Db.php';
require_once 'Zend/Config/Ini.php';

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initDoctype()
    {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');
    }
    protected function _initSession()
    {    	
    	$session = $this->getResource('session');
    	Zend_Session::start();
    }    
    protected function _initConfig()
    {  	
        try
    	{
    		$config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
    	}
    	catch(Exception $e)
    	{
    		echo $e->getMessage();die;
    	}    	
    	Zend_Registry::set('config',$config);
    }    
    protected function _initDB()
    {
    	try
    	{
    		$config = Zend_Registry::get('config');    		
    		$db = Zend_Db::factory('Pdo_Mysql', $config->resources->db->params);    		
    		Zend_Db_Table_Abstract::setDefaultAdapter($db);
    	}
    	catch(Exception $e)
    	{
    		echo $e->getMessage();die;
    	}    
    	Zend_Registry::set('db', $db);
    }



}

