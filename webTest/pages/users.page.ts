import common = require("../common");
import homePage = require("./home.page")
export var url:string = common.urlSite + "/users";


export var usersList = element(by.repeater("user in vm.usersView"));

export function navigateTo(){
	homePage.navigateTo();
	homePage.showSideNav();
	homePage.usersSideNavLink.click();
	browser.waitForAngular(); 
}