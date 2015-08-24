// 
// Like integrator test:
// * not specific on a unit
// * not use of moch
// 	But this no access to DB like in integration SVGTests
// 
// Like end users test
// * interact with UI
// * Simulate user
// * tests workflow
// 	but not variable data, always the same
// 	
// 
// 
// 
// browser.get(common.urlSite);
// 
// 
// //locators 
// var myEl =  element(by.binding('name'));
// by.model("name")
// by.css('.primary.header')
// by.buttonText("save");
// by.repeater('u in users')
// 	by.repeater('u in users').column('name')
// 	
// 
// by.options('r for r in roles')
// by.id
// by.linkText
// by.name
// by.tagName("div").first
// by.xPath
// by.addLocator
// 
// 
// //Return several
// var myEls =  element.all(by.binding('name'));
// var myFirstEl =  element.all(by.binding('name')).first();
// 
// var name:string;
// myEl.getText().then(()=>{
// 	name = Text;
// });
// 
// browser.waitForAnguler();
// 
// 
// //except 
// except(myEl.getTest()).toMatch("something");
// 
// 
// browser.getCurrentUrl();
// 
// 
// 
// .sendKeys("ghjklm jklmù");
// var button = element(by.buttonText("Save"));
// var css = button.getAttribute('class');
// expect(css).not.toMatch("disabled");
// 
// 
// 
// var list = element.all(by.binding('name'));
// expect(list.getText()).toMatch('Module 3')
