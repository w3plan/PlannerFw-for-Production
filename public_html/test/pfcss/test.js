// Test module
module("PFCSS Mechanisms of Plannerfw", {
setup: function() {
	/* Variable mechanism */
	// actual
	this.dcss10 =  function (pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
		var __pf19edb768 = '';
		__pf19edb768 += '';
		var clr = "#4D926F";
		var bg = "background-color";
		var h2 = "h2";
		__pf19edb768 += ' #header { color: ';
		__pf19edb768 += clr;
		__pf19edb768 += '; } ';
		__pf19edb768 += h2;
		__pf19edb768 += ' { ';
		__pf19edb768 += bg;
		__pf19edb768 += ': white; }';
		return __pf19edb768;
	};
	// expected
	this.scss10 =  `#header {
					  color: #4D926F;
					}
					h2 {
					  background-color: white;
					}`;	
	
	/* Mixins mechanism */
	// actual
	this.dcss20 =  function (pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
			var __pf19edb768 = '';
			__pf19edb768 += '';
			function mixin(radius) {
				radius = radius || "5px";
				return "-webkit-border-radius: " + radius + "; " + "-moz-border-radius: " + radius + "; " + "border-radius: "+ radius + "; ";
			}
			__pf19edb768 += ' #header { ';
			__pf19edb768 += mixin();
			__pf19edb768 += ' } ';
			/* Mixins with Arguments / Dynamic Mixins */;
			__pf19edb768 += ' #footer { ';
			__pf19edb768 += mixin("10px");
			__pf19edb768 += ' }';
			return __pf19edb768;
		};
	// expected
	this.scss20 =  `#header {
					  -webkit-border-radius: 5px;
					  -moz-border-radius: 5px;
					  border-radius: 5px;
					}
					#footer {
					  -webkit-border-radius: 10px;
					  -moz-border-radius: 10px;
					  border-radius: 10px;
					}`;

	/* Functions mechanism */
	// actual
	this.dcss40 = function pfTemp(pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
			var __pf19edb768 = '';
			__pf19edb768 += '';
			/* Arithmetic rules of CSS units calculation: 2em * 3in => Error 2em + 3em => 5em 2em + 3 => 5em 2in * 3in => 6in 2in * 3 => 6in (3cm / 2em) * 4em => Error 2in + 3cm + 2pc => Error 3in / 2in => 1.5in 3in / 2 => 1.5in */ 
			var fontSize = "50%";
			var lineHeight = "10px";
			__pf19edb768 += ' .content h3 { color: #000; font-size: ';
			__pf19edb768 += planner.addCssUnit(planner.stripCssUnit(fontSize) * 2 + 60 , "%");
			__pf19edb768 += '; margin: ';
			__pf19edb768 += planner.addCssUnit(planner.stripCssUnit(lineHeight) * 4);
			__pf19edb768 += ' 0; }';
			return __pf19edb768;
	};
	// expected
	this.scss40 =  `
					.content h3 {
						color: #000;
						font-size: 160%;
						margin: 40px 0;
					}`;
	
	/* Operations mechanism */
	// actual
	this.dcss50 = function pfTemp(pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
			var __pf19edb768 = '';
			__pf19edb768 += '';
			/* Looping operation */ 
			for (var i = 1; i < 6; i++) {
				__pf19edb768 += ".border-#" + i + "0 {" + " border: " + i + "px solid blue;" + "} ";
			}
			__pf19edb768 += ' ';
			return __pf19edb768;
		};
	// expected
	this.scss50 = `
					.border-#10 { 
						border: 1px solid blue; 
					} 
					.border-#20 {
						border: 2px solid blue;
					} 
					.border-#30 {
						border: 3px solid blue;
					} 
					.border-#40 {
						border: 4px solid blue;
					} 
					.border-#50 {
						border: 5px solid blue;
					}
				  `;
   	/* Nesting mechanism */
	// actual
	this.dcss60 = function pfTemp(pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
			var __pf19edb768 = "";
		    var pfvar_main_navigation = `
				.main-navigation {
				  .next, .prev {
				    background-color: #1a1a1a;
				    color: #fff;
				  }
				  p {
				    font-size: 12px;
				    a {
				      text-decoration: none;
				    }
				    a:hover {
				      border-width: 1px;
				    }
				  }
				  a {
				    display: block;
				    padding: 0.84375em 0;
				    
				    &:focus, &:hover {
				      background-color: transparent;
				      color: #007acc;
				    }
				  }
				  ul { 
				    ul {
				      display: none;
				      margin-left: 0.875em;
				    }
				  }
				}`;
            
		    __pf19edb768 += planner.parseNestedCss(pfvar_main_navigation);
		    
		    return __pf19edb768;
		  };
	// expected
	this.scss60 = `
					.main-navigation .next,.main-navigation .prev {
					  background-color: #1a1a1a;
					  color: #fff;
					} 
					.main-navigation p {
					  font-size: 12px;
					} 
					.main-navigation p a {
					  text-decoration: none;
					} 
					.main-navigation p a:hover {
					  border-width: 1px;
					} 
					.main-navigation a {
					  display: block;
					  padding: 0.84375em 0;
					} 
					.main-navigation a:focus,.main-navigation a:hover {
					  background-color: transparent;
					  color: #007acc;
					} 
					.main-navigation ul ul {
					  display: none;
					  margin-left: 0.875em;
					}`;
    /* prefixSelectors and suffixSelectors */
	// actual
	this.dcss70 = function pfTemp(pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
		    var __pf19edb768 = "";

		    __pf19edb768 += planner.prefixSelectors(".comment-content", "ol, ul") +  `{
			    margin: 0 0 1.5em 1.25em;
			  } `;
		    __pf19edb768 += planner.prefixSelectors("a", "&:focus, &:hover") + `{
			    background-color: transparent;
			    color: #007acc;
			  } `;

		    var pfvar_sa = ".comment-content, .entry-content, .post-thumbnail";

		    __pf19edb768 += planner.suffixSelectors("img", pfvar_sa) + `{
			    display: block;
			  } `;

		    return __pf19edb768;
		  };
	// expected
	this.scss70 = `
	                .comment-content ol,.comment-content ul{
					  margin: 0 0 1.5em 1.25em;
					}	
					a:focus,a:hover{
					  background-color: transparent;
					  color: #007acc;
					}
					.comment-content img,.entry-content img,.post-thumbnail img{
					  display: block;
					}`;
	/* Block Element Modifier */
	// actual
	this.dcss80 = function pfTemp(pfDataSet /* modeldata JSON */, planner /* PlannerFw library object */) {
          var __pf19edb768 = "";
          var pfvar_navigation = `
								.main-navigation {
								  .next, .prev {
								    background-color: #1a1a1a; 
								    color: #fff;
								  }
								  p {
								    font-size: 12px;
								    a {
								      text-decoration: none;
								    }
								    a:hover {
								      border-width: 1px;
								    }
								  }
								  a {
								    display: block;
								    padding: 0.84375em 0;
								    &:focus, &:hover {
								      background-color: transparent;
								      color: #007acc;
								    }
								  }
								  &__element { 
								    background-color: #1a1a1a;
								    color: #fff;
								    &--modifier {
								      display: none;
								      margin-left: 0.875em;
								    }
								  }
								}`;
            
		    __pf19edb768 += planner.parseNestedCss(pfvar_navigation);
		    function gridMedia(minMaxs) {
		      for (let i = 0, len = minMaxs.length; i < len; i++) {
		        var [minth, maxth] = minMaxs[i];

		        __pf19edb768 += " @media (" + minth.split(":")[0] + ":" + minth.split(":")[1] + ") { .container {" +  maxth.split(":")[0] + ":" + maxth.split(":")[1] +  "}}";
		      }
		    }

		    gridMedia([["min-width: 576px", "max-width: 540px;"], ["min-width: 768px", "max-width: 720px;"]]);
            
		    return __pf19edb768;
	    };
	// expected
	this.scss80 = `
					.main-navigation .next,.main-navigation .prev {
					  background-color: #1a1a1a;
					  color: #fff;
					}
					.main-navigation p {
					  font-size: 12px;
					}
					.main-navigation p a {
					  text-decoration: none;
					}
					.main-navigation p a:hover {
					  border-width: 1px;
					}
					.main-navigation a {
					  display: block;
					  padding: 0.84375em 0;
					}
					.main-navigation a:focus,.main-navigation a:hover {
					  background-color: transparent;
					  color: #007acc;
					} 
					.main-navigation__element {
					  background-color: #1a1a1a;
					  color: #fff;
					}
					.main-navigation__element--modifier {
					  display: none;
					  margin-left: 0.875em;
					} 
					@media (min-width: 576px) {
					  .container {
					    max-width: 540px;
					  }
					} 
					@media (min-width: 768px) {
					  .container {
					    max-width: 720px;
					  }
					}`;
}});

// Test cases
QUnit.test("Test PFCSS features", function(assert){
	var resultCode = this.dcss10({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss10), "PFCSS variable mechanism");
	
	resultCode = this.dcss20({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss20), "PFCSS mixins mechanism");
	
	resultCode = this.dcss40({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss40), "PFCSS functions mechanism");
	
	resultCode = this.dcss50({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss50), "PFCSS operations mechanism");

    resultCode = this.dcss60({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss60), "PFCSS nesting mechanism");

	resultCode = this.dcss70({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss70), "PFCSS prefixSelectors and suffixSelectors");
    
    resultCode = this.dcss80({}, planner);
	assert.strictEqual(planner.minimizeCode(resultCode), planner.minimizeCode(this.scss80), "PFCSS Block Element Modifier");

});
