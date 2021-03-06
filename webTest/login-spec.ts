import common = require('common')
import home = require("./pages/home.page");
import login = require ("./pages/login.page")
//access to login
//fields mandatory
//good login / wrong login

describe('check login page', () => {
  
  describe('Navigate to login page',()=>{
    beforeEach(()=>{
      browser.get(home.url);      
    });
    
    it('should navigate from home page - header', () => {
      let headerLoginLink = home.loginHeaderLink;
      headerLoginLink.click();
      browser.waitForAngular();
      expect(browser.getCurrentUrl()).toEqual(login.url);      
    });
    
    it('should navigate from home page - sidenav', () => {
      let sideNavLink = home.sideNavLink;
      sideNavLink.click();
      browser.waitForAngular();
      
      let loginSideNavLink = home.loginSideNavLink;
      loginSideNavLink.click();
      browser.waitForAngular();
            
      expect(browser.getCurrentUrl()).toEqual(login.url);
    }); 
  });

  describe("form is not \"$valid\" until all fields are filled with good values",()=>{
    beforeEach(()=>{
      login.navigateTo();      
    });
    
    it("should not accept login when fields are empty", ()=>{
      expect(browser.getCurrentUrl()).toEqual(login.url);

      var form = login.loginForm;
      
      expect(form.getAttribute("$valid")).toBeFalsy();
    })
    
    it("should not accept login when password is empty", ()=>{
      login.emailField.sendKeys("fake@g.com")

      var form = login.loginForm;
      
      expect(form.getAttribute("$valid")).toBeFalsy();
    })
    
    it("should not accept login when email is empty", ()=>{
      login.passwordField.sendKeys("password")

      var form = login.loginForm;
      
      expect(form.getAttribute("$valid")).toBeFalsy();
    })
    
    it("should not accept login when email does not look like email", ()=>{
      login.emailField.sendKeys("isnotanemail")

      var form = login.loginForm;
      browser.waitForAngular();

      expect(login.isValid()).toBeFalsy();
    })
    
    it("should accept login when email andpassword as filled", ()=>{
      login.emailField.sendKeys("likeanemail@autotest.com")
      login.passwordField.sendKeys("likepassword")

      var form = login.loginForm;

      expect(login.isValid()).toBeTruthy(); 
    })
  });
   
});
