<?php
/**
 * Server-side encode/decode methods that are compatible with
 * the encode/decode methods of planner object in the client 
 *
 */

// PHP class
class pfEncodeDecode {

  /**
   * Encode data and return result
   * 
   * @param {string} $str    Plain text
   * @param {string} $pword  A secret key that the length are more than 8 characters for
                             encryption, or an empty string if using the default setting
   * @return {string}        Encoded text
   */
  public function pfEncode($str, $pword = "") {
    try {
      $val = rawurlencode($str);				
      $val = $this->pfXor($val, $pword);
      $val = base64_encode($val);
      
      // encode special character "+", "/" and "=" in base64 result
      return rawurlencode($val);
      
    } catch (Exception $e) {
      echo 'Encryption failed, ',  $e->getMessage();
    }
  }
  
  /**
   * Deccode data and return result
   * 
   * @param {string}  $str    XOR encrypted data
   * @param {string}  $pword  A secret key that the length are more than 8 characters for
                              decryption, or an empty string if using the default setting
   * @return {string}         Decoded text      
   */
  public function pfDecode($str, $pword = "") {
    try {
      // encode special character "+", "/" and "=" in str
      $val = rawurldecode($str);
      $val = base64_decode($val);
      $val = $this->pfXor($val, $pword);
      
      return rawurldecode($val);
      
    } catch (Exception $e) {
      echo 'Decryption failed, ',  $e->getMessage();
    }
  }
  
  /**
   * Encode/decode ASCII string with XOR cipher and an optional secret key for PHP
   * 
   * @param {string} instr   	ASCII string to be encrypted/decrypted
   * @param {string=} pword  	Optional XOR secret key with 8 characters at least, 
   *							            default length of secret key is 256
   * @return {string}         Encrypt/decrypt string, return an empty string 
                              if instr is an empty string
   */
  protected function pfXor($instr, $pword = "") {
    if (!($instr && trim($instr))) {
      return "";
    }
    
    if (strlen($pword) < 8) {
      $pword = "8q2EXsYBCDZcK3hajFFnyzdGRTbnrYbjYJzkbMFfRJFdvhPfBmpNVw2YkBZtM9kLW6MRAst7Vb3yh8KZwq2dTNuVdq8acHYeavBaPz3MPsBGpAP3zaCDvZUTvNGaWvpNwqwnQ9D8nZ8T4K9D8HRyQ2XTapaAeDSUfanvkCkRFzh4vSs3C9qBWxTwx9PUTTrAaL5PfgvQRWaCtCAZng3P8S9aEYEST79w2Ryu5Vs4etvKz4xdM8K7uCn2yFZ5C2MJ";
    }
    
    $icnt = strlen($instr);
    $keys = str_split($pword);
    $kcnt = count($keys);	
    $output = "";
    
    for ($i = 0; $i < $icnt; $i++) {
      $index = $i % $kcnt;
      $output .= $instr[$i] ^ $keys[$index];
    }
    
    return $output;
  }
}

?>
