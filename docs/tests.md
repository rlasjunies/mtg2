## Tests

### Mocha

    at the root of the project run the 'mocha' command it will launch the tests
    
    
### Debug Mocha tests

C:\Users\Richard\AppData\Roaming\npm\node_modules\mocha\bin\mocha "C:\Dev\seedTS\seedTSServer\test-api\**\*-specs.js"



### Karma

    at the root of the project: 'webdriver-manager install --dev'

    start selenium by: 'webdriver-manager start'
    in another cmd line, move to the folder 'test-app' and start the file 'run.bat' (it's doing 'protractor _config.js')

Issues installing protractor:

webdriver-manager --ie update
install IE 11 webdriver .... 
	http://www.microsoft.com/en-us/download/details.aspx?id=44069
	http://msdn.microsoft.com/en-us/library/ie/dn800898%28v=vs.85%29.aspx

	Required Configuration

    The IEDriverServer exectuable must be downloaded and placed in your PATH.
    On IE 7 or higher on Windows Vista or Windows 7, you must set the Protected Mode settings for each zone to be the same value. The value can be on or off, as long as it is the same for every zone. To set the Protected Mode settings, choose "Internet Options..." from the Tools menu, and click on the Security tab. For each zone, there will be a check box at the bottom of the tab labeled "Enable Protected Mode".
    Additionally, "Enhanced Protected Mode" must be disabled for IE 10 and higher. This option is found in the Advanced tab of the Internet Options dialog.
    The browser zoom level must be set to 100% so that the native mouse events can be set to the correct coordinates.
    For IE 11 only, you will need to set a registry entry on the target computer so that the driver can maintain a connection to the instance of Internet Explorer it creates. For 32-bit Windows installations, the key you must examine in the registry editor is HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE. For 64-bit Windows installations, the key is HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE. Please note that the FEATURE_BFCACHE subkey may or may not be present, and should be created if it is not present. Important: Inside this key, create a DWORD value named iexplore.exe with the value of 0. 
