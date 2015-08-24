import common = require("../common");

export var url:string = common.urlSite;
export function navigateTo(){
	browser.get(url);      
	browser.waitForAngular(); 
}

export var loginHeaderLink = element(by.id("loginHeaderId"));

export var sideNavLink = element(by.id("sideNavLinkId"));
	export var loginSideNavLink = element(by.id("loginSideNavId"));
	export var usersSideNavLink = element(by.id("usersLinkId"));
	export var picturesSideNavLink = element(by.id("picturesLinkId"));
	export var paintsSideNavLink = element(by.id("paintsLinkId"));

export function showSideNav() {
	sideNavLink.click();
}



