/**
 * PlannerFw inlet that connects modeldata provider and server-side processes like MVC controller
 * 
 * Web server receives and processes HTTP request, generating modeldata assigning template path
 * then run this function to activate Plannerfw
 */

/**
 * Output PlannerFw inlet code
 * 
 * @param {string}  pfTemplatePath   a template path for modeldata
 * @param {string}  pfModelData      modeldata
 * @param {string=} delimiter        an empty string if pfModelData is a JSON literal, 
                                     a double quote " if pfModelData is empty string, otherwise, 
                                     a escaped back quote \` or 
                                     a single quote ' character if ' characters were replaced
                                     by \u0027 and newline characters were removed from pfModelData                    
 */
module.exports = function (pfTemplatePath, pfModelData, delimiter = '\`') {
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="/app/lib/planner-setting.js"></script>
  <script src="/app/lib/planner.js"></script>
  <script type="text/javascript">
    /**
     * assign template path
     */
    var pfTemplatePath = "${pfTemplatePath}";
  </script>
  
  <script type="text/javascript">
    /**
     * assign modeldata
     */
    var pfModelData = ${delimiter + pfModelData + delimiter};
  </script>
  
  <script src="/app/index.js"></script>
  <title>PlannerFw Front-end controller</title>
</head>
<body></body>
</html>`;
}
