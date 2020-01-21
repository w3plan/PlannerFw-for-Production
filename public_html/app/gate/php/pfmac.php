<?php
/**
 * Initial data setting and modeldata access control class for modeldata server-side gateway
 * 
 * You have to add initial data and implement ModeldataAccessControl class for
 * your specific production environment
 */

// loading resource access control class
include "pfrac.php";
 
/**
 * sets development to variable if website works in development  
 * environment otherwise sets production to variable
 */
$environment = "development";

/**
 * sets JSON to output modeldata in JSON or XML in XML string   
 */
$modelType = "JSON";

/**
 * adds your initial data to $pfModelData for modeldata in JSON and
 * adds your initial data to getModelData($pfDataSet) for modeldata in XML string
 */
if ($modelType == "JSON") {
  // define an array
  $pfDataSet = array();
  
  $pfModelData = '{
    "name" : "PlannerFw Modeldata",
    "description" : "",
    "version" : "",
    "author" : "",
    "company" : "",
    "copyright" : "",
    "licenses" : ""
  }';
} else {
$pfDataSet = "";

/**
 * Add optional elements to modeldata
 * 
 * @param {string} $pfDataSet   	a string that stores modeldata XML contents
 * @return {string}               modeldata in XML string
 */
function getModelData($pfDataSet) {
  return '<?xml version="1.0" encoding="UTF-8" ?>
<root xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xsi:noNamespaceSchemaLocation="schema1.xsd" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <name>PlannerFw Modeldata</name>
  <description></description>
  <version></version>
  <author></author>
  <company></company>
  <copyright></copyright>
  <licenses></licenses>
  ' . $pfDataSet .
'</root>';
  }
}


/**
 * Derived class of ResourceAccessControl  
 *
 */
class ModeldataAccessControl extends ResourceAccessControl {
  
   /**
    * Get modeldata for the public template and private template
    * 
    * @param {string} $type           "public" or "private"        
    * @param {string} $temp_dir       public template or private template directory in production environment
    * @param {string} $temp     	    subdirectory of $temp_dir
    * @param {string} $md             a value that sent by md query field from browser or 
                                      an empty string if no md field was sent
    * @return {string|array|boolean}  return an associative array or object if $modelType is JSON, 
                                      return a string if $modelType is XML, otherwise return false
   */
  public function generateModelData($type, $temp_dir, $temp, $md = "") {
    
    /**
     * Write your code for web server in specific production environment 
     * to generate modeldata for public template or private template
     *
     */
    
    /**
     * PlannerFw allows accessing modeldata that is related to the public template crossing domains via webserver
     * 
     * If $md include a cross-origin URL that provides modeldata to the public template
     * the cross-origin URL is safe and trust, you can write your server-side code to get 
     * modeldata from the remote then output it.
     * 
     * Note: Crossing domains modeldata for private templates must be disabled.
     *
     */
    
  }
}

?>
