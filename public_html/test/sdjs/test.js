// Test module
module("PlannerFw Self-Description JSON Schema", {

setup: function() {
  this.pfModelData =   
    {
      "description": "PlannerFw model sample",
      "author": "W3plan",
      "company": "W3plan Technologies",
      "copyright_default": "Copyright 2015-2018 W3plan Technologies, https://www.w3plan.net/",
      "copyright_pfsch": {"presence": "implied", "type": "string"},
      "licenses": "GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>",
      "pfDataSet": {
        "_pfGlobal": {
          "age_fieldspace": {"type": "positiveInteger", "constraint": {"maxExclusive": 100}}
        },
        "title": "NASA satellite spots a weakening Karina, now a tropical storm",
        "caption": "NASA's Terra satellite passed over Karina in the eastern Pacific  Ocean on Aug. 14 at 2:40 pm. EDT when it was still a hurricane",
        "grid": {
          "gridRow1": {
            "city": "New York",
            "name": "Jonesy Band",
            "education": "No College",
            "age": 16,
            "age_pfsch": "fieldspace"
          },
          "gridRow2": {
            "city": "Chicago",
            "name": "Mary Kay",
            "education": "Graduate School",
            "age": 35,
            "age_pfsch": "fieldspace"
          },
          "gridRow3": {
            "city": "Los Angeles",
            "name": "James Franco",
            "education": "College",
            "age": 28,
            "age_pfsch": "fieldspace"
          },
          "gridRow4": {
            "city": "San Diego",
            "name": "Ellen Compell",
            "education": "Some College",
            "age": 20,
            "age_pfsch": "fieldspace"
          }
        },
        "imageType": ["gif", "jpg", "jpeg", "png", "tif"],
        "imageType_pfidx": {
                            "i1": {"type": "string"},
                            "i3": {"type": "string"}
        },
        "image": {
          "src": "/img/pf/karina_storm1.jpg",
          "altSrc": "http://media.eurekalert.org/multimedia_prod/pub/web/77823_web.jpg",
          "altSrc_pfsch": {"type": "url"}
        }
      }
    };
}});

// Test cases
QUnit.test("Validate JSON with PFSDJS", function(assert){
  try {
    planner.validateSdjs(this.pfModelData);
    assert.ok( true, "The JSON is valid Self-Description-JSON-Schema data" );
  } catch(er) {
    assert.ok( false, "The JSON is not valid Self-Description-JSON-Schema data" );
    console.log(er.message);
  }
});
