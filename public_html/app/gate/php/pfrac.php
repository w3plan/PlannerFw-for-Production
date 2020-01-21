<?php
/**
 * Resource access control class private template and related modeldata accessing
 * 
 * You have to implement this class for the specific production environment
 */
class ResourceAccessControl {
  
 /**
  * get user status in production environment
  * 
  * @return {string}   user status for visitor, new user, register user, login user, user role, and etc.
  */
  public function getUserStatus() {
    
    /**
     * Your code in specific production environment
     *
     */
    
  }
  
 /**
  * Get user permission to access the private template and 
  * collecting related modeldata from production server
  * 
  * @param {string} $temp_dir   private template directory in production environment
  * @param {string} $temp     	template path under $temp_dir
  * @param {string} $role       a user role code that starts with r and followed by two decimal digits
  * @return {boolean}           return true if use is able to access the private template and 
                                collecting related modeldata, otherwise false  
 */
  public function getPermission($temp_dir, $temp, $role) {
    
    // get user status
    $status = $this->getUserStatus();
    
    /**
     * Your code in specific production environment
     *
     */
    
  }
}

?>
