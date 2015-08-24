import common = require('common')
import home = require("./pages/home.page");
import login = require ("./pages/login.page")
//access to login
//fields mandatory
//good login / wrong login

describe('Checks Home page', () => {
  describe('Navigate to home', ()=>{
    it('should have a title', () => {
      browser.get(home.url);
      expect(browser.getTitle()).toEqual('Corinne Païre-Lasjunies');
    });
  });
   
  describe("Should have 2 login links availables", ()=>{ 
      it('should have a login link available in header', () => {
        let headerLoginLink = home.loginHeaderLink;
        
        expect(headerLoginLink.isEnabled()).toBeTruthy();     
      });
    
      it('should Not have a login link available in the sideBar, when sidebar is not opened', () => {
        let loginSideNavLink = home.loginSideNavLink;
        expect(loginSideNavLink.isDisplayed()).toBeFalsy();     
      });
      
      it('should have a login link available in the sideBar when is opened', () => {
        let sideNavLink = home.sideNavLink;
        expect(sideNavLink.isDisplayed()).toBeTruthy();     

        home.showSideNav();
        let loginSideNavLink = home.loginSideNavLink;
        expect(loginSideNavLink.isDisplayed()).toBeTruthy();
      });
    });   
});


