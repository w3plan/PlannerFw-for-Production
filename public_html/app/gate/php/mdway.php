<?php
/**
 * PlannerFw server-side modeldata gateway
 * 
 * You have to set initial data and implementing ModeldataAccessControl
 * class in pfmac.php for production environment
 * 
 * If you can not find the gateway implementation from PlannerFw release for your specific
 * web server, you should create an own gateway with reference of these files in PHP
 *
 */

// load initial setting and modeldata access control
include "pfmac.php";

$mdmac = new ModeldataAccessControl();

// website root directory
$siteRoot = trim($_SERVER['DOCUMENT_ROOT']);
// public template directory
$templateRoot = $siteRoot . "/tmpl";

/* Private template directory in production environment
 *
 * If you didn't install private template director as a sibling directory 
 * to the site root directory, you need to assign private template directory
 * for your installation 
 */
$private_tmpl = dirname($siteRoot) . "/private_tmpl";

/**
 * Get modeldata content and error message array from development environment
 * 
 * @param {string} $site_root   	 website root directory
 * @param {string} $tmpath  	     template path
 * @param {string} $format         JSON or XML, the modaldata format
 * @param {string|array} $dataSet  the value type is either array or string, $pfDataSet defined by pfmac.php
 * @return {array}                 The first element is message, and the second is $pfDataSet
 */
function tmToMdDev($site_root, $tmpath, $format, $dataSet) {
  $message = "";
  $modelFile = "";
  $tmpath = "/" . trim($tmpath, "/");
  if (preg_match('/^\/(pf[a-f0-9]{8})\//', $tmpath, $matches)) {
    $tempval = $matches[1];
    $tmpath = substr($tmpath, 11);
    if (strtoupper($format) == "JSON") {
      $modelFile = "/fake" . preg_replace('/\\.[^.\\s]{2,5}$/', "", $tmpath) . ".json";
    } else {
      $modelFile = "/fake" . preg_replace('/\\.[^.\\s]{2,5}$/', "", $tmpath) . ".xml";
    }
    if (file_exists($site_root . $modelFile) && (filesize($site_root . $modelFile) > 5)) {
      $modelData = file_get_contents($site_root . $modelFile);
      if ($modelData) {
        if (strtoupper($format) == "JSON") {
          $dataSet[$tempval] = json_decode($modelData);
        } else {
          $dataSet .= "<" . $tempval . ">" . $modelData . "</" . $tempval . ">";
        }
      } else {
        $message = "Server can't read modeldata for " . $tmpath;
      }
    } else {
      $message = "Server can't find out " . $tmpath . " or no contents in the file";  
    }
  } else {
    $message = "Invalid template path " . $tmpath;
  }  
  return [$message, $dataSet];
}

/**
 * Get modeldata content and error message array from production environment
 * 
 * @param {string} $private_tm   	 private template directory
 * @param {string} $public_tm   	 public template directory
 * @param {string} $tmpath  	     template path
 * @param {string} $md             a value that sent by md query field for modeldata creation
 * @param {string} $format         JSON or XML, the modaldata format
 * @param {string|array} $dataSet  the value type is either array or string, $pfDataSet defined by pfmac.php
 * @param {string} $mdconn  	     the instance of modeldata access control class in pfmac.php
 * @return {array}                 The first element is message, and the second is $pfDataSet
 */
function tmToMd($private_tm, $public_tm, $tmpath, $md, $format, $dataSet, $mdconn) {
  $message = "";
  $tmpath = "/" . trim($tmpath, "/");
  if (preg_match('/^\/(pf[a-f0-9]{8})\//', $tmpath, $matches)) {
    $tempval = $matches[1];
    $tmpath = substr($tmpath, 11);
    if (substr(basename($tmpath), 0, 4) === "pvt-") {
      $role = "";
      if (!file_exists($private_tm . $tmpath)) {
        $message = "Server can't find out " . $tmpath;
      } elseif (preg_match('/^pvt-(r\d{2})-/', basename($tmpath), $matches)) {
        /**
         * If role code exists, getting it
         * the role code represents a user role accessing the private template
         */
        $role = $matches[1];
      }
      
      if ($mdconn->getPermission($private_tm, $tmpath, $role)) {
        $modelData = $mdconn->generateModelData("private", $private_tm, $tmpath, $md);
        if ($modelData) {
          if (strtoupper($format) == "JSON") {
            $dataSet[$tempval] = $modelData;
          } else {
            $dataSet .= "<" . $tempval . ">" . $modelData . "</" . $tempval . ">";
          }
        } else {
          $message = "Server can't create modeldata for " . $tmpath;
        }
      } else {
        $message = "You don't have permissions to access " . $tmpath;
      }
    } else {
      if (file_exists($public_tm . $tmpath)) {
        $modelData = $mdconn->generateModelData("public", $public_tm, $tmpath, $md);
        if ($modelData) {
          if (strtoupper($format) == "JSON") {
            $dataSet[$tempval] = $modelData;
          } else {
            $dataSet .= "<" . $tempval . ">" . $modelData . "</" . $tempval . ">";
          }
        } else {
          $message = "Server can't create modeldata for " . $tmpath;
        }
      } else {
        $message = "Server can't find out " . $tmpath;  
      }
    }
  } else {
    $message = "Invalid template path " . $tmpath;
  }
  return [$message, $dataSet];
}

/**
 * Main processing workflow
 * 
 */
if (isset($_REQUEST['___']) && !empty(trim($_REQUEST['___']))) {
  $tmpath = trim($_REQUEST['___']);
  $md = "";
  if (isset($_REQUEST['md']) && !empty(trim($_REQUEST['md']))) {
    $md = trim($_REQUEST['md']);
  }
  
  // parse $tmpath when it includes multiple template paths 
  if (strpos($tmpath, "~~") !== false) {
    $mds = explode("~~", $md);
    $tmpaths = explode("~~", $tmpath);
    foreach ($tmpaths as $index=>$tmpath) {
      $tmpath = trim($tmpath);
      if (strtolower($environment) == "development") {
        $result = tmToMdDev($siteRoot, $tmpath, $modelType, $pfDataSet);
      } else {
        $result = tmToMd($private_tmpl, $templateRoot, $tmpath, $mds[$index], $modelType, $pfDataSet, $mdmac);
      }
      $errorMassage = $result[0];
      $pfDataSet = $result[1];
      
      if (strlen($errorMassage) > 0) {
        break;
      }
    }
  } else {
    if (strtolower($environment) == "development") {
      $result = tmToMdDev($siteRoot, $tmpath, $modelType, $pfDataSet);
    } else {
      $result = tmToMd($private_tmpl, $templateRoot, $tmpath, $md, $modelType, $pfDataSet, $mdmac);
    }
    $errorMassage = $result[0];
    $pfDataSet = $result[1];
  }
} else {
  $errorMassage = "Invalid template gateway URL";
}

// output modeldata content or modeldata with error message
if ($modelType == "JSON") {
  $pfModelData = json_decode($pfModelData);
  
  if (strlen($errorMassage) > 0) {
    $pfModelData->modelDataFailed = $errorMassage;
  }
  $pfModelData->pfDataSet = $pfDataSet;
  
  // output modeldata JSON
  echo json_encode($pfModelData);
  
} else {
  // output modeldata XML  
  if (strlen($errorMassage) > 0) {
    // nothing in <pfDataSet></pfDataSet>
    echo getModelData('<modelDataFailed>' . $errorMassage . '</modelDataFailed><pfDataSet></pfDataSet>');
  } else {
    echo getModelData('<pfDataSet>' .$pfDataSet . '</pfDataSet>');
  }
}

exit();

?>
