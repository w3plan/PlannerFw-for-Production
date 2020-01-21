<?php
/**
 * PlannerFw server-side template gateway
 * 
 * You have to implement ResourceAccessControl class in 
 * pfrac.php for production environment   
 *
 * If you can not find the gateway implementation from PlannerFw release for your specific
 * web server, you should create an own gateway with reference of these files in PHP
 *
 */

// load initial setting and template file read class
include "pftmr.php";

// load resource access control class
include "pfrac.php";

$tmfile = new TemplateFileRead();
$tmrac = new ResourceAccessControl();

// website root directory
$siteRoot = trim($_SERVER['DOCUMENT_ROOT']);
// public template directory
$templateRoot = $siteRoot . "/tmpl";

/**
 * Private template directory in production environment
 *
 * If you didn't install private template director as a sibling directory 
 * to the site root directory, you need to assign private template directory
 * for your installation 
 */
$private_tmpl = dirname($siteRoot) . "/private_tmpl";


/**
 * Get template content and error message array from development environment
 * 
 * @param {string} $public_tm   	public template directory
 * @param {string} $tmpath  	    template path
 * @param {string} $content       A string to store one template or multiple template contents
 * @param {string} $tmfile  	    the instance of template file read class in pftfr.php
 * @return {array}                The first element is message, and the second is message
 */
function getTemplatesDev($public_tm, $tmpath, $content, $tmfile) {
  $message = "";
  $tmval = "";
  $tmpath = "/" . trim($tmpath, "/");
  $tmcnt = "";
  if (substr($tmpath, 0, 6) === "/tmpl/") {
    $tmpath = substr($tmpath, 5);
  }
  
  $tm = strpos($tmpath, "?tm=");   //a extra data item that was sent with template path
  $gotTemplate = false;
  if ($tm !== false) {
    $tmval = trim(substr($tmpath, $tm + 4));
    $tmpath = substr($tmpath, 0, $tm);
    
    $fltval = filter_var($tmval, FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED);
    $components = parse_url ($tmval);
    if ($fltval && $components) {
      if (in_array($components["host"], $GLOBALS['trustedDomains'])) {
        $tmval = trim($tmval, "/");
        
        //cross-origin template access
        if (substr($tmval, -5) == "/tmpl") {
          $tmcnt = $tmfile->readTemplate($tmval . $tmpath);
        } else {
          $tmcnt = $tmfile->readTemplate($tmval . "/tmpl" . $tmpath);
        }
        
        if ($tmcnt) {
          $content .= $tmcnt;
          $gotTemplate = true;
        }
      }
    }
  }
  
  if (!$gotTemplate && file_exists($public_tm . $tmpath) && (filesize($public_tm . $tmpath) > 5)) {
    $tmcnt = $tmfile->readTemplate($public_tm . $tmpath, $tmval);
    if ($tmcnt) {
      $content .= $tmcnt;
    } else {
      $message = "Server failed to read template file";
    }
  } elseif (!$gotTemplate) {
    $message = "Server can't find out " . $tmpath . " or no contents in the file";
  }
  
  return [$message, $content];
}

/**
 * Get template content and error message array from production environment
 * 
 * @param {string} $private_tm   	private template directory
 * @param {string} $public_tm   	public template directory
 * @param {string} $tmpath  	    template path
 * @param {string} $content       A string to store one template or multiple template contents
 * @param {string} $tmconn  	    the instance of resource access control class in pfrac.php
 * @param {string} $tmfile  	    the instance of template file read class in pftfr.php
 * @return {array}                The first element is message, and the second is message
 */
function getTemplates($private_tm, $public_tm, $tmpath, $content, $tmconn, $tmfile) {
  $message = "";
  $tmval = "";
  $tm = "";
  $tmpath = "/" . trim($tmpath, "/");
  $tmcnt = "";
  if (substr($tmpath, 0, 6) === "/tmpl/") {
    $tmpath = substr($tmpath, 5);
  }
  
  //tm is a extra data item that sent with template path for web server
  $tm = strpos($tmpath, "?tm=");
  $gotTemplate = false;
  if ($tm !== false) {
    $tmval = substr($tmpath, $tm + 4);
    $tmpath = substr($tmpath, 0, $tm);
    
    $fltval = filter_var($tmval, FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED);
    $components = parse_url($tmval);
    if ($fltval && $components && substr(basename($tmpath), 0, 4) !== "pvt-") {
      if (in_array($components["host"], $GLOBALS['trustedDomains'])) {
        $tmval = trim($tmval, "/");
        
        //cross-origin template access
        if (substr($tmval, -5) == "/tmpl") {
          $tmcnt = $tmfile->readTemplate($tmval . $tmpath);
        } else {
          $tmcnt = $tmfile->readTemplate($tmval . "/tmpl" . $tmpath);
        }

        if ($tmcnt) {
          $content .= $tmcnt;
          $gotTemplate = true;
        }
      }
    }
  }
  
  // check that template is private 
  if (substr(basename($tmpath), 0, 4) === "pvt-") {
    $role = "";
    if (!file_exists($private_tm . $tmpath)) {
      
      $message = "Server can't find out " . $tmpath;
    } elseif (preg_match('/^pvt-(r\d{2})-/', basename($tmpath), $matches)) {      
      /**
       * If role code exists, getting it
       *
       * the role code represents a user role accessing the private template
       */
      $role = $matches[1];
    }
    
    if ($tmconn->getPermission($private_tm, $tmpath, $role)) {
      if (file_exists($private_tm . $tmpath) && (filesize($private_tm . $tmpath) > 5)) {
        $tmcnt = $tmfile->readTemplate($private_tm . $tmpath, $tmval);
        if ($tmcnt) {
          $content .= $tmcnt;
        } else {
          $message = "Server failed to read template file";
        }
      } else {
        $message = "Server can't find out " . $tmpath . " or no contents in the file";
      }
    } else {
      $message = "You don't have permissions to access " . $tmpath . " or no contents in the file";
    }
  } else {
    if (!$gotTemplate && file_exists($public_tm . $tmpath) && (filesize($public_tm . $tmpath) > 5)) {
      $tmcnt = $tmfile->readTemplate($public_tm . $tmpath, $tmval);
      if ($tmcnt) {
        $content .= $tmcnt;
      } else {
        $message = "Server failed to read template file";
      }
    } elseif (!$gotTemplate) {
      $message = "Server can't find out " . $tmpath . " or no contents in the file";
    }
  }
  
  return [$message, $content];
}


/**
 * Main processing workflows
 * 
 */
if (isset($_REQUEST['___']) && !empty(trim($_REQUEST['___']))) {
  $tmpath = trim($_REQUEST['___']);
  $tmContent = "";
  if (strpos($tmpath, "~~") !== false) {
    $tmpaths = explode("~~", $tmpath);
    foreach ($tmpaths as $tmpath) {
      $tmpath = trim($tmpath);
      if (strtolower($environment) == "development") {
        $result = getTemplatesDev($templateRoot, $tmpath, $tmContent, $tmfile);
      } else {
        $result = getTemplates($private_tmpl, $templateRoot, $tmpath, $tmContent, $tmrac, $tmfile);
      }
      $errorMassage = $result[0];
      $tmContent = $result[1];
      
      if (strlen($errorMassage) > 0) {
        break;
      }
    }
  } else {
    if (strtolower($environment) == "development") {
      $result = getTemplatesDev($templateRoot, $tmpath, $tmContent, $tmfile);
    } else {
      $result = getTemplates($private_tmpl, $templateRoot, $tmpath, $tmContent, $tmrac, $tmfile);
    }
    $errorMassage = $result[0];
    $tmContent = $result[1];
  }
} else {
  $errorMassage = "Invalid template gateway URL";
}

if (strlen($errorMassage) > 0) {
  // output error message
  echo 'var pfTemplateFailed = true; console.log("' . str_replace('"', '\"', $errorMassage)  . '");';
} else {
  // output template content
  echo $tmContent;
}

exit();

?>
