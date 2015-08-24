
exports.config = {
    seleniumAddress: (process.env.SELENIUM_URL || "http://localhost:4444/wd/hub"),
    specs: ["users-spec.js"],
    framework: "jasmine2",
    mochaOpts: {
        reporter: "spec",
        timeout: 4000,
    },
    jasmineNodeOpts: {
          // If true, print colors to the terminal.
          showColors: true,
          // Default time to wait in ms before a test fails.
          defaultTimeoutInterval: 50000,
          // Function called to print jasmine results.
          //print: function() {},
          // If set, only execute specs whose names match the pattern, which is
          // internally compiled to a RegExp.
          //grep: 'pattern',
          // Inverts 'grep' matches
          //invertGrep: false
    },
    multiCapabilities: [
        {
           browserName: "chrome",
           version: "ANY"
        },
        // {
        //     browserName: "firefox",
        //     version: "ANY"
        // },
        //{
        //    browserName: "internet explorer",
        //    version: "ANY"
        //},

    ],
    baseUrl: "http://" + (process.env.HTTP_HOST || "localhost") + ":" + (process.env.HTTP_PORT || 3000),
    onPrepare : () =>{
        // run some function prior to run the tests
        //browser.driver.manage.window().setPosition(0,0);
        //browser.driver.manage.window().setSize(500,500);
    }

    //params: {
    //    login: {
    //        user: "Jane",
    //        password: "1234"
    //    }
    //}
}