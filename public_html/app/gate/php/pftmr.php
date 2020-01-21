<?php
/**
 * Template file read class for template gateway
 * 
 * You main customize this class for your specific production environment
 *
 * Note: Crossing domains access for private templates must be disabled.
 *
 */

/**
 * sets development to variable if website works in development  
 * environment otherwise sets production to variable
 */
$environment = "development";

/**
 * Add all trusted domains that store public templates for cross-origin template access  
 * 
 * Leave the array empty if there is no cross-origin template accesses, don't add the current domain to the array.
 */
$trustedDomains = [];

// TemplateFileRead class
class TemplateFileRead {
  
  /**
   * Get the content of template file which is existing and readable   
   * 
   * @param {string} $path     An absolute directory of template path
   * @param {string} $tm       A value that sent by tm query field from browser or 
                               an empty string if no tm field was sent
   * @return {string|false}    The contents of template file or false on failure.
   */
  function readTemplate($path, $tm = "") {
    return file_get_contents($path);
  }
}

?>
