/**
 * 
 * Global configuration of PlannerFw library
 * 
 * This file is covered by the GNU GPLv3 license <http://www.gnu.org/licenses/gpl.html>
 * 
 * (c) Copyright 2015-2020 W3plan Technologies, https://www.w3plan.net/
 */

var pfConfig = {
  /**
   * Sets application environment either development or production
   * default value is development
   */
  environment : "development",
  
  /**
   * Assigns the template accessing gateway path
   */
  templateGateway : "/app/gate/php/tmway.php",
  
  /**
   *  Assigns the modeldata accessing gateway path
   */
  modeldataGateway : "/app/gate/php/mdway.php",
  
  /**
   * Default template path for page mount 
   * if assigned template path failed
   */
  defaultTemplate : "/main/pub/index.js",
  
  /**
   * Default modeldata to the value of defaultTemplate
   *
   * If the template from defaultTemplate doesn't use any modeldata
   * the value would be an empty string 
   */
  defaultModeldata : "",
  
  /**
   * Sets timeout for loading template from server in milliseconds
   */
  templateTimeout : 3000,
  
  /**
   * Sets timeout for loading modeldata from server in milliseconds
   */
  modeldataTimeout : 3000,
  
  /**
   * Sets that tracks elapsed time 
   */
  trackExecutedTime : true
};
