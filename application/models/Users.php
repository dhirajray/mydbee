<?php

class Application_Model_Users
{
    protected $_Username;
    protected $_Password;
    protected $_id;
	protected $_role;
	protected $_name; 
 
    public function __construct(array $options = null)
    {
       	if (is_array($options)) {
            $this->setOptions($options);
        }
    }
	
	public function setOptions(array $options)
    {
        $methods = get_class_methods($this);
		foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }
 
    public function __set($name, $value)
    {
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid guestbook property');
        }
        $this->$method($value);
    }
 
    public function __get($name)
    {
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid guestbook property');
        }
        return $this->$method();
    }
 
    
 
    public function setUsername($text)
    {
        $this->_Username = (string) $text;
        return $this;
    }
 
    public function getUsername()
    {
       
	    return $this->_Username;
    }
 
    public function setPassword($email)
    {
        $this->_Password = (string) $email;
        return $this;
    }
 
    public function getPassword()
    {
        return $this->_Password;
    }
 
    public function setRole($ts)
    {
        $this->_role = $ts;
        return $this;
    }
 
    public function getRole()
    {
        return $this->_role;
    }
	
	public function setName($ts)
    {
        $this->_name = $ts;
        return $this;
    }
 
    public function getName()
    {
        return $this->_name;
    }
 
    public function setId($id)
    {
        $this->_id = (int) $id;
        return $this;
    }
 
    public function getId()
    {
        return $this->_id;
    }

}

