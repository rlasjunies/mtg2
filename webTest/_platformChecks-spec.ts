// Use the external Chai As Promised to deal with resolving promises in expectations.
// import chai = require("chai");
// import chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
// var expect = chai.expect;

// Chai"s expect().to.exist style makes default jshint unhappy.
// jshint expr:true
describe("simple Mocha test, without protractor instanciated", function () {
    it("should still do normal tests", function () {
        expect(true).toBe(true);
    });
}); 
describe("test protractor library", function () {
    // it.skip("should be able to skip tests", function () {
    //     expect(true).toBe(false);
    // });
    it("should expose the correct global variables", function () {
        expect(protractor).toBeDefined;
        expect(browser).toBeDefined;
        expect(by).toBeDefined;
        expect(element).toBeDefined;
        expect($).toBeDefined;
    });
    it("should wrap webdriver", function () {
        browser.get("/");
        expect(browser.getTitle()).toContain("pluralsight-ci");
    });
}); 
 