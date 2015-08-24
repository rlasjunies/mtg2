import common = require("../common");
import homePage = require("./home.page")
export var url:string = common.urlSite + "/login";


export var loginButton = element(by.id("loginButton"));
export var loginForm = element(by.id("loginForm"));
export var emailField = element(by.id("emailField"));
export var passwordField =element(by.id("passwordField"));
export function isValid(){
	return loginForm.evaluate("loginForm.$valid");
}
export function navigateTo(){
	browser.get(homePage.url);      
	let headerLoginLink = homePage.loginHeaderLink;
	headerLoginLink.click();
	browser.waitForAngular();
}