// Test module
module("PlannerFw Template and Modeldata", {

setup: function() {
  /* PlannerFw Template */
  this.pf7e53c287 = {
  run: function(pfDataSet) {
    var __pf19edb768 = "";
    __pf19edb768 += '<table border="1" cellpadding="1" cellspacing="1" width="86%">\n <caption class="dcap"><strong>User data grid</strong></caption>\n  <tr>\n <th rowspan="2">City</th>\n <th colspan="3">Users</th>\n </tr>\n <tr> \n <th>Name</th>\n <th>Age</th>\n <th>Education</th>\n </tr>\n';
    
    for (var key in pfDataSet.grid) {
      if (pfDataSet.grid.hasOwnProperty(key)) {
        __pf19edb768 += "\n <tr>\n <td>";
        __pf19edb768 += pfDataSet.grid[key].city;
        __pf19edb768 += "</td>\n <td>";
        __pf19edb768 += pfDataSet.grid[key].name;
        __pf19edb768 += "</td>\n <td>";
        __pf19edb768 += pfDataSet.grid[key].age;
        __pf19edb768 += '</td>\n <td>\n <select name="Education" style="cursor:pointer">\n';

        var educations = [ "No College", "Some College",  "Graduate School",  "College" ];
        for (var i = 0, len = educations.length; i < len; i++) {
          if ( pfDataSet.grid[key].education.toLowerCase() == educations[i].toLowerCase()
          ) {
            __pf19edb768 += '<option value="' + educations[i] + '"' + " selected>" + educations[i] +  "</option>";
          } else {
            __pf19edb768 += '<option value="' + educations[i] + '"' + ">" + educations[i] + "</option>";
          }
        }
        __pf19edb768 += "\n </select>\n </td>\n </tr>\n";
      }
    }
    
    __pf19edb768 += '\n </table>';
    return __pf19edb768.replace(/\\'/g, "'").replace(/\\v/g, "\\'");
  }
};
  
  // Assign modeldata JSON to variable pfDataSet
  this.pfDataSet = 
    {"grid": 
       {
        "gridRow1": {
          "city": "New York",
          "name": "Jonesy Band",
          "age": 16,
          "education": "No College"
        },
        "gridRow2": {
          "city": "Chicago",
          "name": "Mary Kay",
          "age": 35,
          "education": "Graduate School"
        },
        "gridRow3": {
          "city": "Los Angeles",
          "name": "James Franco",
          "age": 28,
          "education": "College"
        },
        "gridRow4": {
          "city": "San Diego",
          "name": "Ellen Compell",
          "age": 20,
          "education": "Some College"
        }
      }
    };
  
  /* Expected */
  this.results = `
  <table border="1" cellpadding="1" cellspacing="1" width="86%">
    <caption class="dcap"><strong>User data grid</strong></caption>
    <tr>
      <th rowspan="2">City</th>
      <th colspan="3">Users</th>
    </tr>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Education</th>
    </tr>
    <tr>
      <td>New York</td>
      <td>Jonesy Band</td>
      <td>16</td>
      <td>
        <select name="Education" style="cursor:pointer">
          <option value="No College" selected>No College</option>
          <option value="Some College">Some College</option>
          <option value="Graduate School">Graduate School</option>
          <option value="College">College</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>Chicago</td>
      <td>Mary Kay</td>
      <td>35</td>
      <td>
        <select name="Education" style="cursor:pointer">
          <option value="No College">No College</option>
          <option value="Some College">Some College</option>
          <option value="Graduate School" selected>Graduate School</option>
          <option value="College">College</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>Los Angeles</td>
      <td>James Franco</td>
      <td>28</td>
      <td>
        <select name="Education" style="cursor:pointer">
          <option value="No College">No College</option>
          <option value="Some College">Some College</option>
          <option value="Graduate School">Graduate School</option>
          <option value="College" selected>College</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>San Diego</td>
      <td>Ellen Compell</td>
      <td>20</td>
      <td>
        <select name="Education" style="cursor:pointer">
          <option value="No College">No College</option>
          <option value="Some College" selected>Some College</option>
          <option value="Graduate School">Graduate School</option>
          <option value="College">College</option>
        </select>
      </td>
    </tr>
  </table>`;
}});

// Test cases
QUnit.test("Test presentation HTML code generation", function(assert){
  // Applying global variable pfDataSet to template	
  var actualResult = this.pf7e53c287.run(this.pfDataSet);
  
  actualResult = planner.minimizeCode(actualResult);
  
  var expectedResult = planner.minimizeCode(this.results);
  
  assert.strictEqual(actualResult, expectedResult, "Generating presentation HTML code from template and dynamic data");	
});
