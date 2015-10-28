/// <reference path="../typings/tsd.d.ts"/>
var app;
(function (app) {
    "use strict";
    angular
        .module("app", [
        "ngMaterial",
        "satellizer",
        "ui.router",
        "ngMessages",
        //TODO may be good to replace the loading bar control (ngControl), by the NGMD one
        "angular-loading-bar",
        "ngAnimate",
        "angularFileUpload"
    ]);
})(app || (app = {}));
/// <reference path="../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var constants;
    (function (constants) {
        "use strict";
        //angular
        //    .module("app")
        //    .constant("CST_URL", "")
        //    .constant("CST_API_URL", "/api")
        //    .constant("CST_AUTH_URL", "/login");
        //angular
        //    .module("app")
        //    .value("CST_URL", "")
        //    .value("CST_API_URL", "")
        //    .value("CST_AUTH_URL", "");
        //console.log("window.location@app.constant:" + window.location.protocol + "//" + window.location.host);
        //update the URL constant to be based on site URL
        angular
            .module("app")
            .constant("CST_URL", window.location.protocol + "//" + window.location.host + "/")
            .constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api")
            .constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");
    })(constants = mtg.constants || (mtg.constants = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
(function () {
    "use strict";
    angular
        .module("mtg.blocks", []);
})();
/// <reference path="../../typings/tsd.d.ts"/>
(function () {
    "use strict";
    angular
        .module("mtg.blocks")
        .config(config);
    config.$inject = ["mtg.blocks.ApiEndpointProvider"];
    function config(apiEndpointProvider) {
        apiEndpointProvider.configure("/api");
    }
})();
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var blocks;
    (function (blocks) {
        "use strict";
        var ApiEndpointProvider = (function () {
            function ApiEndpointProvider() {
            }
            ApiEndpointProvider.prototype.configure = function (baseUrl) {
                this.config = {
                    baseUrl: baseUrl
                };
            };
            ApiEndpointProvider.prototype.$get = function () {
                return this.config;
            };
            return ApiEndpointProvider;
        })();
        angular
            .module("mtg.blocks")
            .provider("mtg.blocks.ApiEndpoint", ApiEndpointProvider);
    })(blocks = mtg.blocks || (mtg.blocks = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
(function () {
    "use strict";
    angular
        .module("mtg.blocks")
        .config(config);
    config.$inject = ["$provide"];
    function config($provide) {
        $provide.decorator("$log", extendLog);
    }
    extendLog.$inject = ["$delegate"];
    function extendLog($delegate) {
        var debugFunction = $delegate.debug;
        $delegate.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var now = (new Date()).toLocaleTimeString();
            args[0] = now + " - " + args[0];
            debugFunction.apply(null, args);
        };
        return $delegate;
    }
})();
/// <reference path="../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var config;
    (function (config_1) {
        var auth;
        (function (auth) {
            "use strict";
            config.$inject = [
                "$authProvider",
                "$locationProvider"
            ];
            function config($authProvider, $locationProvider) {
                //I do not succeed to inject the CST_AUTH_URL :-(
                var urlAuth = window.location.protocol + "//" + window.location.host + "/auth";
                console.log("urlAuth" + urlAuth);
                $authProvider.google({
                    clientId: "149876745472-k3ubq3pbtll17pmuohdjfom0fpinklmc.apps.googleusercontent.com",
                    url: urlAuth + "/google",
                });
                $authProvider.facebook({
                    clientId: "1608138689408302",
                    url: urlAuth + "/facebook",
                });
                $authProvider.loginUrl = urlAuth + "/login";
                $authProvider.signupUrl = urlAuth + "/register";
            }
            angular
                .module("app")
                .config(config);
        })(auth = config_1.auth || (config_1.auth = {}));
    })(config = mtg.config || (mtg.config = {}));
})(mtg || (mtg = {}));
/// <reference path="../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var route;
    (function (route_1) {
        "use strict";
        route.$inject = [
            "$urlRouterProvider"
        ];
        // function route($urlRouterProvider, $httpProvider: ng.IHttpProvider) {
        function route($urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            // $httpProvider.interceptors.push("AuthInterceptor");
        }
        ;
        angular
            .module("app")
            .config(route);
    })(route = mtg.route || (mtg.route = {}));
})(mtg || (mtg = {}));
/// <reference path="../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var config;
    (function (config_2) {
        "use strict";
        config.$inject = ["$locationProvider"];
        function config($locationProvider) {
            $locationProvider.html5Mode(true);
            console.log("window.location@config:" + window.location.protocol + "//" + window.location.host);
            //update the URL constant to be based on site URL
            //TODO Not we are passing in
            angular
                .module("app")
                .constant("CST_URL", window.location.protocol + "//" + window.location.host + "/")
                .constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api")
                .constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");
        }
        angular
            .module("app")
            .config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeSpinner = false;
            }]);
        angular
            .module("app")
            .config(config);
    })(config = mtg.config || (mtg.config = {}));
})(mtg || (mtg = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var views;
    (function (views) {
        var index;
        (function (index) {
            "use strict";
            var IndexController = (function () {
                function IndexController($scope, $auth, $mdSidenav, $log) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$auth = $auth;
                    this.$mdSidenav = $mdSidenav;
                    this.$log = $log;
                    this.onSwipeRight = function () {
                        _this.$mdSidenav("left").open();
                    };
                    this.onSwipeLeft = function () {
                        _this.$mdSidenav("left").close();
                    };
                    this.isAuthenticated = this.$auth.isAuthenticated;
                    if (!this.$auth.isAuthenticated()) {
                        this.$auth.removeToken();
                    }
                    ;
                    this.$log.debug("IndexController: Constructor");
                }
                IndexController.$inject = [
                    "$scope",
                    "$auth",
                    "$mdSidenav",
                    "$log"
                ];
                return IndexController;
            })();
            index.IndexController = IndexController;
            angular
                .module("app")
                .controller("mtg.views.index.IndexController", mtg.views.index.IndexController);
        })(index = views.index || (views.index = {}));
    })(views = mtg.views || (mtg.views = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var authorization;
    (function (authorization) {
        "use strict";
        authorization.authorizatinServiceStringName = "AuthorizationService";
        var AuthorizationService = (function () {
            function AuthorizationService($http) {
                this.$http = $http;
            }
            AuthorizationService.prototype.getAllAccessRights = function () {
                return this.$http.get("/api/authorization/accessrights")
                    .then(function (response) {
                    return response.data;
                });
            };
            AuthorizationService.prototype.getAllRoles = function () {
                return this.$http.get("/api/authorization/roles")
                    .then(function (response) {
                    return response.data;
                });
            };
            AuthorizationService.prototype.addRole = function (roles, roleID) {
                if (roles[roleID] === undefined) {
                    roles.push(roleID);
                }
            };
            AuthorizationService.prototype.removeRole = function (roles, roleID) {
                var index = roles.indexOf(roleID);
                roles.splice(index, 1);
            };
            AuthorizationService.prototype.hasGotRole = function (roles, roleID) {
                return roles.indexOf(roleID) === -1 ? false : true;
            };
            AuthorizationService.$inject = ["$http"];
            return AuthorizationService;
        })();
        angular
            .module("app")
            .service(mtg.authorization.authorizatinServiceStringName, AuthorizationService);
    })(authorization = mtg.authorization || (mtg.authorization = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var authentication;
    (function (authentication) {
        "use strict";
    })(authentication = mtg.authentication || (mtg.authentication = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var authentication;
    (function (authentication) {
        "use strict";
        var AuthInterceptor = (function () {
            function AuthInterceptor($auth) {
                var _this = this;
                this.$auth = $auth;
                this.request = function (config) {
                    var token = _this.$auth.getToken();
                    if (token) {
                        config.headers.Authorization = "Bearer " + token;
                    }
                    return config;
                };
                this.response = function (response) {
                    return response;
                };
            }
            return AuthInterceptor;
        })();
        authentication.AuthInterceptor = AuthInterceptor;
        factory.$inject = [
            "$auth"
        ];
        function factory($auth) {
            return new mtg.authentication.AuthInterceptor($auth);
        }
        ;
    })(authentication = mtg.authentication || (mtg.authentication = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var authentication;
    (function (authentication) {
        "use strict";
        var CST_KEY = "TOKEN";
        var AuthToken = (function () {
            function AuthToken($window, $log) {
                var _this = this;
                this.$window = $window;
                this.$log = $log;
                this.setToken = function (token) {
                    _this.cachedToken = token;
                    _this.storage.setItem(CST_KEY, token);
                    _this.$log.debug("authToken: SetToken");
                };
                this.getToken = function () {
                    if (!_this.cachedToken) {
                        _this.cachedToken = _this.storage.getItem(CST_KEY);
                    }
                    return _this.cachedToken;
                };
                this.remove = function () {
                    _this.cachedToken = null;
                    _this.storage.removeItem(CST_KEY);
                    _this.$log.debug("remove token");
                };
                this.isAuthenticated = function () {
                    if (_this.getToken() === null) {
                        return false;
                    }
                    return true;
                };
                this.storage = $window.localStorage;
                this.$log.debug("authToken service ... loaded");
            }
            return AuthToken;
        })();
        authentication.AuthToken = AuthToken;
        factory.$inject = [
            "$window", "$log"
        ];
        function factory($window, $log) {
            return new mtg.authentication.AuthToken($window, $log);
        }
        angular
            .module("app")
            .factory("AuthToken", factory);
    })(authentication = mtg.authentication || (mtg.authentication = {}));
})(mtg || (mtg = {}));
// /// <reference path="core/core_pubsub.ts" />
// /// <reference path="core/core.ts" />
// /// <reference path="core/core_restAPI.ts" />
// /// <reference path="libs/typings/jquery/jquery.d.ts" />
// /// <reference path="libs/typings/jquery.RL.d.ts" />
// /// <reference path="carrousel.ts"/>     
// 
// //ajouter le caroussel sur labiographie
// //voir si on peut monter les boutons
// //voir si on peut changer les couleurs
//     // des boutons
//     // ou contranste du fond
// //mettre le détail en fixe
// //Vignette
//     //carré sans distorsion   
// 
// // class cmdLoadPaints implements core.pubsub.IPubSubMsg { };
// // class evtPaintsLoaded implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdLoadBiography implements core.pubsub.IPubSubMsg { };
// // //class evtBiographyLoaded implements core.pubsub.IPubSubMsg { };
// // 
// // 
// // class cmdLoadPaint implements core.pubsub.IPubSubMsg { constructor( public paintId: string ) { } };
// // class evtPaintLoaded implements core.pubsub.IPubSubMsg { constructor( public paint: models.paints.Paint ) { } };
// // 
// // class cmdUpdatePaint implements core.pubsub.IPubSubMsg { constructor( public paintId: string ) { } };
// // class evtPaintUpdated implements core.pubsub.IPubSubMsg { constructor( public paint: models.paints.Paint ) { } };
// // 
// // class cmdJumpToPage_AboutMe implements core.pubsub.IPubSubMsg { };
// // //class evtPageShowned_AboutMe implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdJumpToPage_Paints implements core.pubsub.IPubSubMsg { };
// // //class evtPageShowned_Paints implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdJumpToPage_News implements core.pubsub.IPubSubMsg { };
// // class cmdJumpToPage_ContactMe implements core.pubsub.IPubSubMsg { };
// // 
// // class cmdShowPaint implements core.pubsub.IPubSubMsg { constructor( public item: caroussel.IGalleryItem ) { } };
// // 
// // //class cmdImageDetailQuit implements core.pubsub.IPubSubMsg { };
// // 
// // 
// // var $imgScroller: JQuery;
// // gApp = new core.App();
// // 
// // window.onload = () => {
// //     
// //     gApp.PubSub.subscribe( new cmdLoadPaints, function ( cmdLoadPaint ) {
// //         var ps: models.paints.Paints;
// //         ps = new models.paints.Paints();
// //         $.mobile.loading( 'show' );
// //         ps.getAll();
// //     });
// 
// 
//     //gApp.PubSub.subscribe( new cmdShowPaint( null ), function ( evt: cmdShowPaint) {
//     //   //alert( "Paint clicked:" + evt.item.thumbnailUrl );
// 
//     //});
// 
//     //gApp.PubSub.subscribe( new models.paints.evtPaintsGetted( null, null, null ), function ( evt: models.paints.evtPaintsGetted ) {
//     //    if ( evt.error ) {
//     //        alert( "error: loading the paintings data!!:" + evt.error );
//     //    } else {
//     //        var items = [];
// 
//     //        $car.clearItems();
// 
//     //        jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
//     //            var strOnClick = [
//     //                "var $a = $( this );",
//     //                "var p = JSON.parse( $a.data(\"paint\"));",
//     //                "gApp.PubSub.publish( new cmdJumpToPage_ImageDetail( p ) );"
//     //            ].join( " " );
//     //            var strA = [
//     //                //ok mais background different de image"<a href='#' style=\"background-image:url('" + val.Thumbnail +"')\" onclick=' var $a = $(this); var p = JSON.parse($a.data(\"paint\")); gApp.PubSub.publish( new cmdJumpToPage_ImageDetail(p) );'>" +
//     //                "<a href='#' onclick='" + strOnClick + "'>",
//     //                "<img src ='" + val.Thumbnail + "' class='myThumb'/> ",
//     //                //"<div class= 'myThumb' style=\"background-image:url('" + val.Thumbnail +"')\"></div>" + 
//     //                "<h2>" + val.Name + "</h2>",
//     //                "<p class='ui-li-aside'>" + val.Description + "</p>",
//     //                "</a>"
//     //            ].join( " " );
//     //            var $a = $( strA );
//     //            $a.data( "paint", JSON.stringify( val ) );
//     //            var $li = $( "<li></li>" );
//     //            $li.prepend( $a );
//     //            items.push( $li );
// 
//     //            $car.addItem( {
//     //                thumbnailUrl: val.Thumbnail
//     //            });
// 
//     //        });
//     //        //$( "#listPaints" ).html( items ).listview( "refresh" );
//     //        //resizeMyThumb();
//     //    }
//     //    $.mobile.loading( 'hide' );
//     //});
// // 
// //     gApp.PubSub.subscribe( new models.paints.evtPaintsGetted( null, null, null ), function ( evt: models.paints.evtPaintsGetted ) {
// //         if ( evt.error ) {
// //             alert( "error: loading the paintings data!!:" + evt.error );
// //         } else {
// //             var items = [];
// // 
// //             gallery.clearItems();
// // 
// //             jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
// // 
// //                     gallery.addItem( {
// //                         thumbnailUrl: val.Thumbnail,
// //                         PaintId: val.PaintId,
// //                         Name: val.Name,
// //                         Description: val.Description,
// //                         Year: val.Year,
// //                         PictureUrl: val.Picture,
// //                         Size: val.Size    
// //                 });
// // 
// //             });
// // 
// //             gallery.selectFirstItem();      
// //         }
// //         $.mobile.loading( 'hide' );
// //     });
// 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_Paints, function ( cmdJumpToPage_Paints ) {
// //         //$.mobile.changePage( "#pagePaints" );
// //         $.mobile.changePage( "#pageImageDetail" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_AboutMe, function ( cmdJumpToPage_AboutMe ) {
// //         $.mobile.changePage( "#pageMe" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_News, function ( cmdJumpToPage_Events ) {
// //         $.mobile.changePage( "#pageNews" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdJumpToPage_ContactMe, function () {
// //         $.mobile.changePage( "#pageContactMe" );
// //     });
// // 
// //     gApp.PubSub.subscribe( new cmdLoadBiography, function ( cmdLoadBiography ) {
// //         var bio: models.aboutMes.AboutMes;
// //         bio = new models.aboutMes.AboutMes();
// //         $.mobile.loading( 'show' );
// //         bio.get();
// //     });
// 
// //     gApp.PubSub.subscribe( new models.aboutMes.evtBiographyGetted( null, null, null ), function ( evt: models.aboutMes.evtBiographyGetted ) {
// //         if ( evt.error ) {
// //             alert( "error: loading the paintings data!!:" + evt.error );
// //         } else {
// //             $( '#biography' ).html( evt.value.Biographie );
// //         }
// //         $.mobile.loading( 'hide' );
// //     });
// // 
// //     $( "#pagePaints" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// //         gApp.PubSub.publish( new cmdLoadPaints() );
// //         //alert( "paint shown" );
// //     });
// // 
// //     $( "#pageMe" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// //         gApp.PubSub.publish( new cmdLoadBiography() );
// //         //alert( "me shown" );
// //     });
// 
//     //$( "#pageMe" ).trigger( "pageshow" );// mobile.changePage( "#pageMe" );
//     //$( "#pageImageDetail" ).trigger( "pagebeforeshow" );
//     //$( "#pageImageDetail" ).trigger( "pageshow" );
// 
//     //The first page is already loaded, I manually trigger the load of the paints
// //     gApp.PubSub.publish( new cmdLoadPaints() );
// // 
// // }
// 
// 
// //    var infiniteLoopRunning: boolean = false;       
// 
// // var gallery: caroussel.Gallery;
// 
// $( "#pageImageDetail" ).on( "pageshow", function ( evt: JQueryEventObject ) {
// 
//     if ( gallery == undefined ) {
// 
//         //calculate the dimensions
//         var windowHeight = $( window ).height(); //Get available screen height, not including any browser chrome
//         var headerHeight = $( '#pageImageDetailHeader' ).outerHeight() + 1; //Get height of page header
//         var $footer = $( '#pageImageDetailFooter' );
//         var footerHeight = $footer.outerHeight(); // I do not know why 20 is mising Get height of page header
//         var $pageContent = $( '#pageImageDetailContent' );
//         var pageContentPaddingTop = parseInt( $( this ).css( "padding-top" ).replace( "px", "" ) );
//         var pageContentPaddingBottom = pageContentPaddingTop // ne retourne pas de valeur ?? parseInt( $pageContent.css( "padding-bottom" ).replace( "px", "" ) );
//         var winContentHeight = windowHeight - headerHeight - footerHeight - pageContentPaddingTop - pageContentPaddingBottom; //Calculate out new height (-2 if you have a 1px border on content container)
// 
//         // //define the place for the "graphical object
//         // $pageContent.width( $( window ).width() );
//         // $pageContent.height( winContentHeight );
//         // $pageContent.css( 'top', headerHeight + 'px' );
// 
//         //create the "dynamic object"
//         gallery = new caroussel.Gallery( $( '#gallery' ) );
// 
//         //define events on the objects
//         gallery.onItemClick.add( function ( item: caroussel.IGalleryItem ) {
//             gApp.PubSub.publish( new cmdShowPaint( item ) );
//         });
// 
//         //request load paintings
//         // if ( gApp != undefined ) gApp.PubSub.publish( new cmdLoadPaints() );
//         // else alert( "gApp undefined!" );
//     }
// });
// 
var core;
(function (core) {
    var image;
    (function (image) {
        (function (enumImageResizeMode) {
            enumImageResizeMode[enumImageResizeMode["fit_vertically"] = 0] = "fit_vertically";
            enumImageResizeMode[enumImageResizeMode["fit_horizontal"] = 1] = "fit_horizontal";
            enumImageResizeMode[enumImageResizeMode["fit_vh"] = 2] = "fit_vh";
            enumImageResizeMode[enumImageResizeMode["square"] = 3] = "square";
        })(image.enumImageResizeMode || (image.enumImageResizeMode = {}));
        var enumImageResizeMode = image.enumImageResizeMode;
        function fitImageInContainer($img, maxWidth, maxHeight, mode, centerInParent) {
            centerInParent = centerInParent == undefined ? false : centerInParent;
            var newImg = new Image();
            newImg.onload = function () {
                var coeffHeight = maxHeight / newImg.height;
                var coeffWidth = maxWidth / newImg.width;
                //var coeff = coeffHeight < coeffWidth ? coeffHeight : coeffWidth;
                var coeff = Math.min(coeffHeight, coeffWidth);
                if (mode == enumImageResizeMode.fit_vh) {
                    if (coeff < 1) {
                        $img.height($img.height() * coeff);
                    }
                    else {
                        $img.height(newImg.height);
                        $img.width(newImg.width);
                    }
                    ;
                }
                else if (mode == enumImageResizeMode.fit_vertically) {
                    $img.height($img.height() * coeffHeight);
                }
                else if (mode == enumImageResizeMode.fit_horizontal) {
                    $img.width($img.width() * coeffWidth);
                }
                if (centerInParent) {
                    $img.css("left", (maxWidth - $img.width()) / 2 + 'px');
                    $img.css("top", (maxHeight - $img.height()) / 2 + 'px');
                }
                $img.css("visibility", "visible");
            };
            newImg.src = $img.attr('src'); // this must be done AFTER setting onload
        }
        image.fitImageInContainer = fitImageInContainer;
    })(image = core.image || (core.image = {}));
})(core || (core = {}));
//// Exposing events
//interface IMessageEvent extends IEvent {
//    add( listener: ( message: string ) => void ): void;
//    remove( listener: ( message: string ) => void ): void;
//    trigger( message: string ): void;
//}
//class Foo {                                                      
//    // Events
//    public onMessage: IMessageEvent = new TypedEvent();
//    // Methods
//    public bar(): void {
//        this.onMessage.trigger( 'event fired' );
//    }
//}
//// Consuming events
//var foo = new Foo();
//foo.onMessage.add( ( message ) => {
//    alert( message );
//});
//foo.bar();
var core;
(function (core) {
    var event;
    (function (event) {
        var TypedEvent = (function () {
            function TypedEvent() {
                // Private member vars
                this._listeners = [];
            }
            TypedEvent.prototype.add = function (listener) {
                /// <summary>Registers a new listener for the event.</summary>
                /// <param name="listener">The callback function to register.</param>
                this._listeners.push(listener);
            };
            TypedEvent.prototype.remove = function (listener) {
                /// <summary>Unregisters a listener from the event.</summary>
                /// <param name="listener">The callback function that was registered. If missing then all listeners will be removed.</param>
                if (typeof listener === 'function') {
                    for (var i = 0, l = this._listeners.length; i < l; l++) {
                        if (this._listeners[i] === listener) {
                            this._listeners.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    this._listeners = [];
                }
            };
            TypedEvent.prototype.trigger = function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i - 0] = arguments[_i];
                }
                /// <summary>Invokes all of the listeners for this event.</summary>
                /// <param name="args">Optional set of arguments to pass to listners.</param>
                var context = {};
                var listeners = this._listeners.slice(0);
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(context, a || []);
                }
            };
            return TypedEvent;
        })();
        event.TypedEvent = TypedEvent;
    })(event = core.event || (core.event = {}));
})(core || (core = {}));
var core;
(function (core) {
    var misc;
    (function (misc) {
        (function (enumEntityStatus) {
            enumEntityStatus[enumEntityStatus["success"] = 0] = "success";
            enumEntityStatus[enumEntityStatus["failed"] = 1] = "failed";
        })(misc.enumEntityStatus || (misc.enumEntityStatus = {}));
        var enumEntityStatus = misc.enumEntityStatus;
        (function (eLogSeverity) {
            eLogSeverity[eLogSeverity["critical"] = 0] = "critical";
            eLogSeverity[eLogSeverity["warning"] = 1] = "warning";
            eLogSeverity[eLogSeverity["information"] = 2] = "information";
        })(misc.eLogSeverity || (misc.eLogSeverity = {}));
        var eLogSeverity = misc.eLogSeverity;
        /* Returns the class name of the argument or undefined if
       it's not a valid JavaScript object.
        */
        function getObjectClass(obj) {
            if (obj && obj.constructor && obj.constructor.toString) {
                var arr = obj.constructor.toString().match(/function\s*(\w+)/);
                if (arr && arr.length == 2) {
                    return arr[1];
                }
            }
            return undefined;
        }
        misc.getObjectClass = getObjectClass;
        function GUID_new() {
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return guid;
        }
        misc.GUID_new = GUID_new;
        ;
    })(misc = core.misc || (core.misc = {}));
})(core || (core = {}));
/// <reference path="./core/core_image.ts" />
/// <reference path="./core/core_event.ts" />
/// <reference path="./core/core_misc.ts" />
/// <reference path="../../typings/tsd.d.ts"/>
var caroussel;
(function (caroussel) {
    (function (enumViewerDetail_visibility) {
        enumViewerDetail_visibility[enumViewerDetail_visibility["show_always"] = 0] = "show_always";
        enumViewerDetail_visibility[enumViewerDetail_visibility["appears_adn_disappears"] = 1] = "appears_adn_disappears";
        enumViewerDetail_visibility[enumViewerDetail_visibility["hide"] = 2] = "hide";
    })(caroussel.enumViewerDetail_visibility || (caroussel.enumViewerDetail_visibility = {}));
    var enumViewerDetail_visibility = caroussel.enumViewerDetail_visibility;
    var ImageViewer = (function () {
        function ImageViewer(imageViewer, param) {
            this.$me = imageViewer;
            this.DEFAULT_SETTINGS = {
                top: parseInt(this.$me.parent().css('top').replace("px", "")),
                left: parseInt(this.$me.parent().css('left').replace("px", "")) + 150,
                height: this.$me.parent().height(),
                width: this.$me.parent().width() - 150,
                viewerDetail: {
                    visibility: enumViewerDetail_visibility.show_always,
                    height: this.$me.parent().height(),
                    width: 200,
                }
            };
            if (param != undefined && param.top != undefined)
                this.DEFAULT_SETTINGS.top = param.top;
            if (param != undefined && param.left != undefined)
                this.DEFAULT_SETTINGS.left = param.left;
            if (param != undefined && param.height != undefined)
                this.DEFAULT_SETTINGS.height = param.height;
            if (param != undefined && param.width != undefined)
                this.DEFAULT_SETTINGS.width = param.width;
            if (param != undefined && param.viewerDetail != undefined) {
                if (param != undefined && param.viewerDetail != undefined && param.viewerDetail.visibility != undefined)
                    this.DEFAULT_SETTINGS.viewerDetail.visibility = param.viewerDetail.visibility;
                if (param != undefined && param.viewerDetail != undefined && param.viewerDetail.height != undefined)
                    this.DEFAULT_SETTINGS.viewerDetail.height = param.viewerDetail.height;
                if (param != undefined && param.viewerDetail != undefined && param.viewerDetail.width != undefined)
                    this.DEFAULT_SETTINGS.viewerDetail.width = param.viewerDetail.width;
            }
            this.$me.css("top", this.DEFAULT_SETTINGS.top);
            this.$me.css("left", this.DEFAULT_SETTINGS.left);
            this.$me.width(this.DEFAULT_SETTINGS.width);
            this.$me.height(this.DEFAULT_SETTINGS.height);
            this.$img = $("<img id='carousselImageViewer' class='carousselImageViewer' style='position:absolute;background-color=pink'/>");
            this.$me.append(this.$img);
            //TODO Delegate the HTML creation to calling component
            var $imgDetailsHTML = $(["<div id='carousselImageViewerDetail' class='carousselImageViewerDetail flyout hidden' style='position:absolute;background-color=green'>",
                //"<div data - role='fieldcontain' class='ui-hide-label'>",
                //                            "<label for='name'>Nom:</label>",
                //"<input type='text' disabled='disabled' style='float: left' name='name' id='name' value='' placeholder='NomPlaceHolder'/>",
                //"<label for='description'>Description:</label>",
                //"<input type='text' disabled='disabled' style='float: left' name='description' id='description' value='' placeholder='DescriptionPLaceHolder'/>",
                "<p>Nom:</p><p id='name'></p>",
                "<p>Description:</p><p id='description'></p > ",
                //"</div>",
                "</div>"].join(""));
            this.$imgDetails = this.$me.append($imgDetailsHTML);
            $imgDetailsHTML.css("top", parseInt(this.$me.css("top").replace("px", "")));
            $imgDetailsHTML.css("left", parseInt(this.$me.css('left').replace('px', '')) + this.$me.width() - this.DEFAULT_SETTINGS.viewerDetail.width);
            $imgDetailsHTML.width(this.DEFAULT_SETTINGS.width);
            $imgDetailsHTML.height(this.DEFAULT_SETTINGS.height);
        }
        ImageViewer.prototype.source = function (url) {
            var _this = this;
            this.$img.fadeOut(250, function () {
                //this.$imgViewer.attr( "visibility", "hidden" );
                _this.$img.attr("src", url);
                core.image.fitImageInContainer(_this.$img, _this.$me.width(), _this.$me.height(), core.image.enumImageResizeMode.fit_vh, true);
                _this.$img.fadeIn(250);
                $('#carousselImageViewerDetail').removeClass('hidden');
                setTimeout(function () {
                    $('#carousselImageViewerDetail').addClass('hidden');
                }, 2000);
            });
        };
        return ImageViewer;
    })();
    caroussel.ImageViewer = ImageViewer;
    var Carrousel = (function () {
        function Carrousel($caroussel, param) {
            var _this = this;
            this.$me = $caroussel;
            this.$roller = $("<div id='roller' style='overflow:hidden; position:absolute; background-color:yellow'></div>");
            this.$me.append(this.$roller);
            this.DEFAULT_SETTINGS = {
                top: parseInt(this.$me.parent().css("top").replace("px", "")),
                left: parseInt(this.$me.parent().css("left").replace("px", "")),
                height: this.$me.parent().height(),
                width: 150,
                thumbnailWidth: 150,
                ArrowUP: {
                    text: 'GO UP',
                    height: 50,
                },
                ArrowDOWN: {
                    text: 'GO DOWN',
                    height: 50,
                },
            };
            if (param != undefined && param.top != undefined)
                this.DEFAULT_SETTINGS.top = param.top;
            if (param != undefined && param.left != undefined)
                this.DEFAULT_SETTINGS.left = param.left;
            //if ( param != undefined && param.thumbnailWidth != undefined ) this.DEFAULT_SETTINGS.thumbnailWidth = param.thumbnailWidth;
            if (param != undefined && param.height != undefined)
                this.DEFAULT_SETTINGS.height = param.height;
            if (param != undefined && param.width != undefined)
                this.DEFAULT_SETTINGS.width = param.width;
            if (param != undefined && param.ArrowUP != undefined) {
                if (param != undefined && param.ArrowUP != undefined && param.ArrowUP.text != undefined)
                    this.DEFAULT_SETTINGS.ArrowUP.text = param.ArrowUP.text;
                if (param != undefined && param.ArrowUP != undefined && param.ArrowUP.height != undefined)
                    this.DEFAULT_SETTINGS.ArrowUP.height = param.ArrowUP.height;
            }
            if (param != undefined && param.ArrowDOWN != undefined) {
                if (param != undefined && param.ArrowDOWN != undefined && param.ArrowDOWN.text != undefined)
                    this.DEFAULT_SETTINGS.ArrowDOWN.text = param.ArrowDOWN.text;
                if (param != undefined && param.ArrowDOWN != undefined && param.ArrowDOWN.height != undefined)
                    this.DEFAULT_SETTINGS.ArrowDOWN.height = param.ArrowDOWN.height;
            }
            this.$me.css("top", this.DEFAULT_SETTINGS.top);
            this.$me.css("left", this.DEFAULT_SETTINGS.left);
            this.$me.height(this.DEFAULT_SETTINGS.height);
            this.$me.width(this.DEFAULT_SETTINGS.width);
            var $ArrowUP = $("<div id='" + core.misc.GUID_new() + "' class='flyout hidden'><p align='center'>" + this.DEFAULT_SETTINGS.ArrowUP.text + "</p></div>");
            var $ArrowDOWN = $("<div id='" + core.misc.GUID_new() + "' class='flyout hidden'><p align='center'>" + this.DEFAULT_SETTINGS.ArrowDOWN.text + "</p></div>");
            //Add ArrowUP
            this.$me.parent().append($ArrowUP);
            $ArrowUP.css("top", this.DEFAULT_SETTINGS.top); // + this.DEFAULT_SETTINGS.padding);
            $ArrowUP.css("left", this.DEFAULT_SETTINGS.left); // + this.DEFAULT_SETTINGS.padding );
            $ArrowUP.height(this.DEFAULT_SETTINGS.ArrowUP.height);
            $ArrowUP.width(this.DEFAULT_SETTINGS.width); // + pageContentPaddingLeft + pageContentPaddingRight );
            //Add ArrowDOWN
            this.$me.parent().append($ArrowDOWN);
            $ArrowDOWN.css("top", this.DEFAULT_SETTINGS.height - this.DEFAULT_SETTINGS.ArrowDOWN.height); // + this.DEFAULT_SETTINGS.top + this.DEFAULT_SETTINGS.padding * 2);
            $ArrowDOWN.css("left", this.DEFAULT_SETTINGS.left); // + this.DEFAULT_SETTINGS.padding);
            $ArrowDOWN.height(this.DEFAULT_SETTINGS.ArrowDOWN.height);
            $ArrowDOWN.width(this.DEFAULT_SETTINGS.width); // + pageContentPaddingLeft + pageContentPaddingRight );
            this.$me.hover(function () {
                $ArrowUP.removeClass('hidden');
                $ArrowDOWN.removeClass('hidden');
            }, function () {
                $ArrowUP.addClass('hidden');
                $ArrowDOWN.addClass('hidden');
            });
            //important to do it after the ilgViewer creation because there are some .flyout classes
            $(".flyout").hover(function () {
                $(".flyout").removeClass('hidden');
            }, function () {
                $(".flyout").addClass('hidden');
            });
            this.$roller.kinetic();
            this.$roller.css("top", 0);
            this.$roller.css("left", 0);
            this.$roller.height(this.DEFAULT_SETTINGS.height);
            this.$roller.width(this.DEFAULT_SETTINGS.width);
            $ArrowUP.on('mousedown', function (evt) {
                _this.$roller.kinetic("start", { velocityY: -10 });
            });
            $ArrowUP.on('mouseup', function (evt) {
                _this.$roller.kinetic("end");
            });
            $ArrowDOWN.on('mousedown', function (evt) {
                _this.$roller.kinetic("start", { velocityY: 10 });
            });
            $ArrowDOWN.on('mouseup', function (evt) {
                _this.$roller.kinetic("end");
            });
        }
        return Carrousel;
    })();
    caroussel.Carrousel = Carrousel;
    var Gallery = (function () {
        function Gallery($gallery, param) {
            this.onItemClick = new core.event.TypedEvent();
            this.$me = $gallery;
            this.DEFAULT_SETTINGS = {
                top: 0,
                left: 0,
                height: this.$me.parent().height(),
                width: this.$me.parent().width(),
                padding: 10,
            };
            //if ( param != undefined ) {
            if (param != undefined && param.top != undefined)
                this.DEFAULT_SETTINGS.top = param.top;
            if (param != undefined && param.left != undefined)
                this.DEFAULT_SETTINGS.left = param.left;
            if (param != undefined && param.height != undefined)
                this.DEFAULT_SETTINGS.height = param.height;
            if (param != undefined && param.width != undefined)
                this.DEFAULT_SETTINGS.width = param.width;
            //if ( param.padding != undefined ) this.DEFAULT_SETTINGS.padding = param.padding;
            //}
            $gallery.attr('style', 'overflow:hidden; position:absolute; background-color:red;');
            $gallery.css("top", this.DEFAULT_SETTINGS.top);
            $gallery.css("left", this.DEFAULT_SETTINGS.left);
            $gallery.height(this.DEFAULT_SETTINGS.height);
            $gallery.width(this.DEFAULT_SETTINGS.width);
            var $caroussel = $("<div id='caroussel' style='background-color:blue'></div>");
            $gallery.append($caroussel);
            this.caroussel = new Carrousel($caroussel);
            var $imgViewer = $("<div></div>");
            $gallery.append($imgViewer);
            this.imageViewer = new ImageViewer($imgViewer);
        }
        Gallery.prototype.addItem = function (item) {
            //if ( item.thumbnailwidth == undefined ) item.thumbnailwidth = this.DEFAULT_SETTINGS.thumbnailWidth;
            var _this = this;
            var $img = $("<img id ='" + core.misc.GUID_new() + "' class ='carousselItem' style='visibility:hidden;' src='" + item.thumbnailUrl + "'/>");
            core.image.fitImageInContainer($img, 150, 150, core.image.enumImageResizeMode.fit_vh);
            $img.css("visibility", "visible");
            $img.on('click', function (evt) {
                _this.imageViewer.source(item.PictureUrl);
                //TODO delegate the feeding/rendering of the viewer detail
                $(".carousselImageViewerDetail #name").html("<b>" + item.Name + "</b>");
                $(".carousselImageViewerDetail #description").html("<b>" + item.Description + "</b>");
            });
            this.caroussel.$roller.append($img);
        };
        Gallery.prototype.clearItems = function () {
            //delete all the items in the roller
            this.caroussel.$roller.empty();
        };
        Gallery.prototype.selectFirstItem = function () {
            //console.log( "id img:" + this.$roller.find( ":first-child" ).attr( "id" ) );
            this.caroussel.$roller.find(":first-child").trigger('click');
        };
        return Gallery;
    })();
    caroussel.Gallery = Gallery;
})(caroussel || (caroussel = {}));
var mtg;
(function (mtg) {
    var header;
    (function (header) {
        header.headerTemplate = "<div class=\'md-toolbar-tools\'>      <md-button ng-show=\'headerConfiguration.headerButtonMenuActivated\'                class=\'md-icon-button\'                ng-click=\'vmIndex.toggleLeft()\'                aria-label=\'Settings\'                style=\'vertical-align:middle\'                id=\'sideNavLinkId\'>         <md-icon class=\'fa fa-bars fa-2x menu\'></md-icon>     </md-button>     <md-button ng-show=\'headerConfiguration.headerButtonBackActivated\'                ng-click=\'goBack()\'                aria-label=\'back\'                layout=\'column\'>         <md-icon class=\'fa fa-chevron-left fa-2x menu\'></md-icon>     </md-button>      <!-- Header -->     <span flex></span>      <!--<span>CORINNE PAIRE LASJUNIES</span>-->     <img ng-show=\'!headerTitle\' ng-src=\'/pictures/0logoBlanc.png\' style=\'height:64px;\' />     <span class=\'md-title\'>{{headerTitle}}</span>      <span flex></span>      <!-- login / logout button-->     <md-button ng-show=\'headerConfiguration.headerButtonLoginActivated\'                class=\'md-icon-button\'                ng-href=\'/login\'                ng-hide=\'vmIndex.isAuthenticated()\'                aria-label=\'login\'                id=\'loginHeaderId\'>         <md-icon class=\'fa fa-sign-in fa-2x\'></md-icon>     </md-button>     <!-- add button-->     <md-button ng-show=\'headerConfiguration.headerButtonAddActivated\'                class=\'md-icon-button\'                ng-click=\'addNew()\'                layout=\'column\'                aria-label=\'add\'>         <md-icon class=\'fa fa-plus fa-2x menu\'></md-icon>     </md-button>     <!-- delete button-->     <md-button ng-show=\'headerConfiguration.headerButtonDeleteActivated\'                class=\'md-icon-button\'                ng-click=\'delete()\'                layout=\'column\'                aria-label=\'delete\'>         <md-icon class=\'fa fa-trash-o fa-2x menu\'></md-icon>     </md-button>     <!-- save button-->     <md-button ng-show=\'headerConfiguration.headerButtonSaveActivated\'                class=\'md-icon-button\'                ng-click=\'save()\'                layout=\'column\'                aria-label=\'save\'                ng-disabled=\'vm.invalid\'>         <md-icon class=\'fa fa-check fa-2x menu\'></md-icon>     </md-button> </div> ";
    })(header = mtg.header || (mtg.header = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var header;
    (function (header) {
        "use strict";
        // export var headerTemplateStringName = "app/header/header.html";
        header.headerControllerStringName = "mtg.header.HeaderController";
        var HeaderConfiguration = (function () {
            function HeaderConfiguration(headerTitle, headerButtonMenuActivated, headerButtonBackActivated, headerButtonLoginActivated, headerButtonAddActivated, headerButtonSaveActivated, headerButtonDeleteActivated) {
                if (headerTitle === void 0) { headerTitle = ""; }
                if (headerButtonMenuActivated === void 0) { headerButtonMenuActivated = false; }
                if (headerButtonBackActivated === void 0) { headerButtonBackActivated = false; }
                if (headerButtonLoginActivated === void 0) { headerButtonLoginActivated = false; }
                if (headerButtonAddActivated === void 0) { headerButtonAddActivated = false; }
                if (headerButtonSaveActivated === void 0) { headerButtonSaveActivated = false; }
                if (headerButtonDeleteActivated === void 0) { headerButtonDeleteActivated = false; }
                this.headerTitle = headerTitle;
                this.headerButtonMenuActivated = headerButtonMenuActivated;
                this.headerButtonBackActivated = headerButtonBackActivated;
                this.headerButtonLoginActivated = headerButtonLoginActivated;
                this.headerButtonAddActivated = headerButtonAddActivated;
                this.headerButtonSaveActivated = headerButtonSaveActivated;
                this.headerButtonDeleteActivated = headerButtonDeleteActivated;
            }
            return HeaderConfiguration;
        })();
        header.HeaderConfiguration = HeaderConfiguration;
        var HeaderController = (function () {
            function HeaderController($rootScope, $scope, $log) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$log = $log;
                this.$log.debug(mtg.header.headerControllerStringName + "loaded!");
                //set and manage the save button valid state
                this.invalid = false;
                this.cleanUpFunc1 = this.$rootScope.$on(appRootScopeEvent.invalidForm, function () {
                    _this.invalid = true;
                });
                this.cleanUpFunc2 = this.$rootScope.$on(appRootScopeEvent.validForm, function () {
                    _this.invalid = false;
                });
                $scope.$on("$destroy", function (evt) {
                    _this.cleanUpFunc1();
                    _this.cleanUpFunc2();
                });
            }
            HeaderController.$inject = [
                "$rootScope",
                "$scope",
                "$log"
            ];
            return HeaderController;
        })();
        header.HeaderController = HeaderController;
        angular
            .module("app")
            .controller(header.headerControllerStringName, mtg.header.HeaderController);
    })(header = mtg.header || (mtg.header = {}));
})(mtg || (mtg = {}));
;
var mtg;
(function (mtg) {
    var login;
    (function (login) {
        login.loginTemplate = "<div layout=\'column\' layout-fill layout-align=\'end center\'>     <form name=\'loginForm\' ng-submit=\'vm.submit()\' layout=\'column\' layout-align=\'center center\' id=\'loginForm\'>          <div layout=\'row\' layout-fill layout-align=\'center end\'>             <h3>Login or <a href=\'/register\'>Sign up</a></h3>         </div>         <div layout=\'column\' layout-fill>             <md-input-container>                 <label>email</label>                 <input type=\'email\' ng-model=\'vm.email\' name=\'email\' id=\'emailField\' required autofocus>             </md-input-container>             <md-input-container>                 <label>Password</label>                 <input type=\'password\' ng-model=\'vm.password\' class=\'form-control\' id=\'passwordField\' required>             </md-input-container>              <md-button class=\'md-primary md-raised\' type=\'submit\' id=\'loginButton\'>Login</md-button>         </div>          <br />         <div class=\'strike\' style=\'width:100%\'>             <span>Or</span>         </div>         <br />         <div layout-fill layout=\'row\' layout-align=\'space-between center\'>             <md-button ng-click=\'vm.authenticate(\"google\")\' class=\'md-raised\' type=\'button\' style=\'background-color:#C23321;color:#FFF;margin-left:9px;margin-right:9px\'>                 <i class=\'fa fa-google-plus\'>                     Google                 </i>             </md-button>             <md-button ng-click=\'vm.authenticate(\"facebook\")\' class=\'md-raised\' type=\'button\' style=\'background-color:#2D4373;color:#FFF;margin-left:9px;margin-right:9px\'>                 <i class=\'fa fa-facebook\'> Facebook</i>             </md-button>         </div>     </form> </div>";
    })(login = mtg.login || (mtg.login = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var login;
    (function (login) {
        "use strict";
        login.loginControllerStringName = "mtg.login.LoginController";
        ;
        // interface ILoginRootScope extends ngmtg.IRootScopeService {
        // }
        var LoginController = (function () {
            function LoginController($rootScope, $scope, notificationService, $state, $auth, $log, userLoggedService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.notificationService = notificationService;
                this.$state = $state;
                this.$auth = $auth;
                this.$log = $log;
                this.userLoggedService = userLoggedService;
                this.myvalid = true;
                this.submit = function () {
                    _this.$auth.login({ email: _this.email, password: _this.password })
                        .then(function (response) {
                        //Initialize the logged user
                        _this.userLoggedService.login(response.data.user);
                        //Welcome back the user
                        var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                        _this.$log.debug(msg);
                        _this.notificationService.success(msg);
                        //Notify if the user is not activated
                        if (!_this.userLoggedService.active) {
                            msg = "Do not forget to active your account via the email sent!";
                            _this.notificationService.warning(msg);
                        }
                        //Navigate to the main page
                        _this.$state.go("main");
                    })
                        .catch(function (err) {
                        _this.$log.error("login:" + JSON.stringify(err));
                        _this.notificationService.error("Error registering!" + JSON.stringify(err));
                        //clean the user logged
                        _this.userLoggedService.logout();
                    });
                };
                this.authenticate = function (provider) {
                    _this.$auth.authenticate(provider).then(function (response) {
                        //initialize the user logged
                        _this.userLoggedService.login(response.data.user);
                        //Welcome back the user
                        var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                        _this.$log.debug(msg);
                        _this.notificationService.success(msg);
                        //Navigate to the main page
                        _this.$state.go("main");
                    }).catch(function (err) {
                        _this.$log.error("login:" + JSON.stringify(err));
                        _this.notificationService.error("Error registering!");
                        //clean the user logged
                        _this.userLoggedService.logout();
                    });
                };
                this.$log.debug("LoginController: Constructor");
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
            }
            LoginController.$inject = [
                "$rootScope",
                "$scope",
                "notificationService",
                "$state",
                "$auth",
                "$log",
                "userLoggedService"
            ];
            return LoginController;
        })();
        login.LoginController = LoginController;
        angular
            .module("app")
            .controller(mtg.login.loginControllerStringName, mtg.login.LoginController);
    })(login = mtg.login || (mtg.login = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.loginState = "login";
    appState.loginUrl = "/login";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var views;
    (function (views) {
        var login;
        (function (login) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider
                    .state(appState.loginState, {
                    url: appState.loginUrl,
                    views: {
                        "header": {
                            template: mtg.header.headerTemplate,
                            controller: mtg.header.headerControllerStringName,
                            controllerAs: "vm"
                        },
                        "container": {
                            template: mtg.login.loginTemplate,
                            controller: mtg.login.loginControllerStringName,
                            controllerAs: "vm"
                        },
                        "footer": {}
                    }
                });
            }
            ;
            angular
                .module("app")
                .config(route);
        })(login = views.login || (views.login = {}));
    })(views = mtg.views || (mtg.views = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var logout;
    (function (logout) {
        logout.logoutTemplate = "";
    })(logout = mtg.logout || (mtg.logout = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var logout;
    (function (logout) {
        "use strict";
        logout.logoutControllerStringName = "mtg.logout.LogoutController";
        var LogoutController = (function () {
            function LogoutController($rootScope, $auth, $state, notificationService, $log, userLoggedService) {
                this.$rootScope = $rootScope;
                this.$auth = $auth;
                this.$state = $state;
                this.notificationService = notificationService;
                this.$log = $log;
                this.userLoggedService = userLoggedService;
                //clean the sanitizer authentication and the app global service userLogged
                this.$auth.logout();
                this.userLoggedService.logout();
                this.notificationService.info("You are now logout!", "Authentication message");
                this.$log.debug(mtg.logout.logoutControllerStringName + "loaded!");
                this.$state.go(appState.mainState);
            }
            LogoutController.$inject = [
                "$rootScope",
                "$auth",
                "$state",
                "notificationService",
                "$log",
                "userLoggedService"
            ];
            return LogoutController;
        })();
        logout.LogoutController = LogoutController;
        angular
            .module("app")
            .controller(mtg.logout.logoutControllerStringName, mtg.logout.LogoutController);
    })(logout = mtg.logout || (mtg.logout = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.logoutState = "logout";
    appState.logoutUrl = "/logout";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var views;
    (function (views) {
        var logout;
        (function (logout) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider
                    .state(appState.logoutState, {
                    url: appState.logoutUrl,
                    views: {
                        "header": {},
                        "container": {
                            templateUrl: mtg.logout.logoutTemplate,
                            controller: mtg.logout.logoutControllerStringName,
                            controllerAs: "vm"
                        },
                        "footer": {}
                    }
                });
            }
            ;
            angular
                .module("app")
                .config(route);
        })(logout = views.logout || (views.logout = {}));
    })(views = mtg.views || (mtg.views = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var paints;
    (function (paints) {
        paints.paintsTemplate = "<div layout-fill layout=\'column\' layout-align=\'center center\'>     <h1>Paints</h1>     <div ng-repeat=\'paint in vm.paints\'>{{paint.title}}</div> </div>";
    })(paints = mtg.paints || (mtg.paints = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var paints;
    (function (paints_1) {
        "use strict";
        paints_1.paintsControllerStringName = "mtg.paints.PaintsController";
        var PaintsController = (function () {
            function PaintsController($rootScope, $scope, $http, CST_API_URL, notificationService, $log) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.notificationService = notificationService;
                this.$log = $log;
                this.paints = [];
                $http.get(this.CST_API_URL + "/paints")
                    .error(function (err) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                    _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                })
                    .success(function (paints) {
                    _this.paints = paints;
                    _this.$log.debug("paints loaded from backend!");
                });
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                this.$log.debug(paints_1.paintsControllerStringName + " loaded!");
            }
            PaintsController.$inject = [
                "$rootScope",
                "$scope",
                "$http",
                "CST_API_URL",
                "notificationService",
                "$log"
            ];
            return PaintsController;
        })();
        paints_1.PaintsController = PaintsController;
        angular
            .module("app")
            .controller(mtg.paints.paintsControllerStringName, mtg.paints.PaintsController);
    })(paints = mtg.paints || (mtg.paints = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.paintsState = "paints";
    appState.paintsUrl = "/paints";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var views;
    (function (views) {
        var paints;
        (function (paints) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider
                    .state(appState.paintsState, {
                    url: appState.paintsUrl,
                    views: {
                        "header": {
                            template: mtg.header.headerTemplate,
                            controller: mtg.header.headerControllerStringName,
                            controllerAs: "vm",
                        },
                        "container": {
                            template: mtg.paints.paintsTemplate,
                            controller: mtg.paints.paintsControllerStringName,
                            controllerAs: "vm",
                        },
                        "footer": {}
                    }
                });
            }
            ;
            angular
                .module("app")
                .config(route);
        })(paints = views.paints || (views.paints = {}));
    })(views = mtg.views || (mtg.views = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        pictures.pictureTemplate = "<form name=\'userForm\' ng-submit=\'vm.submit()\' layout=\'column\' layout-align=\'center center\' novalidate>     <img ng-src=\'/pictures/{{vm.pictureFileName}}\' style=\'width:100%;height:auto\' /> </form> ";
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.pictureControllerStringName = "mtg.pictures.PictureController";
        var PictureController = (function () {
            function PictureController($scope, $rootScope, notificationService, $log, $stateParams, picturesService, $mdDialog) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.notificationService = notificationService;
                this.$log = $log;
                this.$stateParams = $stateParams;
                this.picturesService = picturesService;
                this.$mdDialog = $mdDialog;
                ////header definition
                this.$rootScope.headerConfiguration =
                    new mtg.header.HeaderConfiguration("Picture detail", false, true, false, false, true, true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                //console.log("stateparam:" + JSON.stringify(this.$stateParams));
                if (!this.$stateParams.fileName) {
                    alert("fileName is missing to initialize the picture detail view!");
                    console.error("fileName is missing to initialize the user detail view!");
                }
                else {
                    this.pictureFileName = this.$stateParams.fileName;
                    //register event functions
                    //Save
                    //this.$scope.$on("save",() => {
                    //    //this.userService.update(this.user)
                    //    //    .then((user: mtg.services.IUser) => {
                    //    //    this.$log.debug("user saved!:" + JSON.stringify(user));
                    //    //    //this.NotificationService.info("User saved!");
                    //    //}).catch((err) => {
                    //    //    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                    //    //    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                    //    //});
                    //    this.$rootScope.goBack();
                    //});
                    //delete
                    this.$scope.$on("delete", function () {
                        var confirm = $mdDialog.confirm()
                            .title("Confirm deletion")
                            .content("You are going to delete the fileName:" + _this.pictureFileName)
                            .ok("Cancel")
                            .cancel("Delete");
                        //.targetEvent(ev);
                        $mdDialog.show(confirm).then(function () { return true; }, function () {
                            _this.picturesService.delete(_this.$stateParams.fileName)
                                .then(function (picture) {
                                _this.$log.debug("user deleted!:" + JSON.stringify(picture));
                                //this.NotificationService.info("User saved!");
                            }).catch(function (err) {
                                _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot delete picture resource!");
                                _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot delete resource!");
                            });
                            _this.$rootScope.goBack();
                        });
                    });
                }
                this.$log.debug(pictures.pictureControllerStringName + ": Constructor");
            }
            PictureController.$inject = [
                "$scope",
                "$rootScope",
                "notificationService",
                "$log",
                "$stateParams",
                "picturesService",
                "$mdDialog"
            ];
            return PictureController;
        })();
        pictures.PictureController = PictureController;
        angular
            .module("app")
            .controller(pictures.pictureControllerStringName, mtg.pictures.PictureController);
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        pictures.picturesTemplate = "<div layout-fill layout=\'column\' layout-align=\'center center\'>     <div layout-fill style=\'padding-left:5px;padding-right:5px\'>         <md-grid-list class=\'gridListdemoBasicUsage\' md-cols-sm=\'2\' md-cols-md=\'3\' md-cols-gt-md=\'5\' md-row-height-gt-md=\'1:1\' md-row-height=\'2:2\'                       md-gutter=\'5px\'>             <md-grid-tile ng-class=\'\'                           ng-repeat=\'picture in vm.pictures\'                           ng-click=\'vm.onClick(picture);\'>                 <img ng-src=\'/pictures/{{picture}}\' alt=\'{{picture}}\' style=\'max-width:100%;max-height:100%;\' />                 <md-grid-tile-footer>                     <h3>{{picture}}</h3>                 </md-grid-tile-footer>             </md-grid-tile>         </md-grid-list>     </div> </div>";
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.picturesControllerStringName = "mtg.pictures.PicturesController";
        var PicturesController = (function () {
            function PicturesController($rootScope, $scope, $http, CST_API_URL, notificationService, $log, $auth, $state, picturesService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.notificationService = notificationService;
                this.$log = $log;
                this.$auth = $auth;
                this.$state = $state;
                this.picturesService = picturesService;
                this.onClick = function (fileName) {
                    var picturesParams = new mtg.pictures.PictureRouteParams(fileName);
                    _this.$state.go(appState.picture, picturesParams);
                    //this.$state.go("user", picturesParams);
                };
                console.log(pictures.picturesControllerStringName + " loaded!");
                ////header definition
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("Pictures", true, false, false, true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                //add new pictures
                this.$scope.$on(appRootScopeEvent.addNew, function () {
                    _this.$state.go(appState.picturesLoad);
                });
                picturesService.getAll().then(function (picturesFromServer) {
                    _this.pictures = picturesFromServer.files;
                }).catch(function (reason) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
                    _this.notificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
                });
            }
            PicturesController.$inject = [
                "$rootScope",
                "$scope",
                "$http",
                "CST_API_URL",
                "notificationService",
                "$log",
                "$auth",
                "$state",
                mtg.pictures.picturesServiceStringName
            ];
            return PicturesController;
        })();
        pictures.PicturesController = PicturesController;
        angular
            .module("app")
            .controller(mtg.pictures.picturesControllerStringName, mtg.pictures.PicturesController);
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.picturesLoad = "PICTUREUPLOAD";
    appState.picturesLoadUrl = "/picturesupload";
    appState.picturesList = "PICTURES";
    appState.picturesListUrl = "/pictures";
    appState.picture = "PICTURE";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        "use strict";
        var PictureRouteParams = (function () {
            function PictureRouteParams(fileName) {
                this.fileName = fileName;
            }
            return PictureRouteParams;
        })();
        pictures.PictureRouteParams = PictureRouteParams;
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider
                .state(appState.picturesList, {
                url: appState.picturesListUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.pictures.picturesTemplate,
                        controller: mtg.pictures.picturesControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            }).state(appState.picture, {
                url: appState.picturesListUrl + "/{fileName}",
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.pictures.pictureTemplate,
                        controller: mtg.pictures.pictureControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            }).state(appState.picturesLoad, {
                url: appState.picturesLoadUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.pictures.picturesUploadTemplate,
                        controller: mtg.pictures.pictureUploadControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            });
        }
        ;
        angular
            .module("app")
            .config(route);
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.picturesServiceStringName = "picturesService";
        var PicturesService = (function () {
            function PicturesService($http) {
                this.$http = $http;
            }
            PicturesService.prototype.getAll = function () {
                return this.$http
                    .get("/api/pictures")
                    .then(function (response) {
                    return response.data;
                });
            };
            PicturesService.prototype.delete = function (fileNameToDelete) {
                return this.$http
                    .delete("/api/pictures/" + fileNameToDelete).
                    then(function (response) {
                    return response.data;
                });
            };
            PicturesService.$inject = ["$http"];
            return PicturesService;
        })();
        angular
            .module("app")
            .service(mtg.pictures.picturesServiceStringName, PicturesService);
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        pictures.picturesUploadTemplate = "<div layout-fill layout=\'column\' layout-align=\'center center\'>     <h1>Paints Upload</h1>     <input type=\'file\' nv-file-select uploader=\'vm.uploader\' value=\'{{vm.value}}\' /><br/>     <ul>         <li ng-repeat=\'item in vm.uploader.queue\'>             Name: <span ng-bind=\'item.file.name\'></span><br/>             <!--<button ng-click=\'item.upload()\'>upload</button>-->         </li>     </ul> </div>";
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.pictureUploadControllerStringName = "mtg.pictures.PicturesUploadController";
        var PicturesUploadController = (function () {
            function PicturesUploadController($scope, $rootScope, $http, CST_API_URL, notificationService, $log, fileUploader, $auth, $state) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.notificationService = notificationService;
                this.$log = $log;
                this.fileUploader = fileUploader;
                this.$auth = $auth;
                this.$state = $state;
                console.log(mtg.pictures.pictureUploadControllerStringName + " loaded!");
                //header definition
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("Upload pictures", false, true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                var fileUploadConfig;
                fileUploadConfig = {
                    url: "/api/pictures/upload",
                    autoUpload: true,
                    removeAfterUpload: true,
                    headers: {
                        "authorization": "Bearer " + this.$auth.getToken()
                    }
                };
                this.uploader = new this.fileUploader(fileUploadConfig);
                this.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info("onWhenAddingFileFailed", item, filter, options);
                };
                this.uploader.onAfterAddingFile = function (fileItem) {
                    //console.info("onAfterAddingFile", fileItem);
                };
                this.uploader.onAfterAddingAll = function (addedFileItems) {
                    //console.info("onAfterAddingAll", addedFileItems);
                };
                this.uploader.onBeforeUploadItem = function (item) {
                    //console.info("onBeforeUploadItem", item);
                };
                this.uploader.onProgressItem = function (fileItem, progress) {
                    //console.info("onProgressItem", fileItem, progress);
                };
                this.uploader.onProgressAll = function (progress) {
                    //console.info("onProgressAll", progress);
                };
                this.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    //console.info("onSuccessItem", fileItem, response, status, headers);
                };
                this.uploader.onErrorItem = function (fileItem, response, status, headers) {
                    //console.info("onErrorItem", fileItem, response, status, headers);
                };
                this.uploader.onCancelItem = function (fileItem, response, status, headers) {
                    //console.info("onCancelItem", fileItem, response, status, headers);
                };
                this.uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    //console.info("onCompleteItem", fileItem, response, status, headers);
                };
                this.uploader.onCompleteAll = function () {
                    //console.info("onCompleteAll");
                    _this.$rootScope.goBack();
                };
                //console.info("uploader", this.uploader);
            }
            PicturesUploadController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "notificationService",
                "$log",
                "FileUploader",
                "$auth",
                "$state"
            ];
            return PicturesUploadController;
        })();
        pictures.PicturesUploadController = PicturesUploadController;
        angular
            .module("app")
            .controller(mtg.pictures.pictureUploadControllerStringName, mtg.pictures.PicturesUploadController);
    })(pictures = mtg.pictures || (mtg.pictures = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var main;
    (function (main) {
        main.mainTemplate = "<div layout-fill layout=\'column\' layout-align=\'center center\'>     <md-tabs md-dynamic-height md-border-bottom md-stretch-tabs=\'always\'>         <md-tab label=\'Accueil\'>             <md-tab-body class=\'md-padding\' id=\'contentTab1Id\'>                 <div style=\'display:table\'>                     <div style=\'display:table-cell;width:40%;vertical-align:middle\'>                         <div style=\'text-align:center\' id=\'corinnepairelasjunies\'>CORINNE PAIRE LASJUNIES</div>                         <div style=\'text-align:center;color:red\' id=\'artistepeintre\'>ARTISTE PEINTRE</div>                     </div>                     <div style=\'display:table-cell;width:60%\'>                         <img ng-src=\'/pictures/f52234_a1f7f030a4c74bed8fea92e1c0baaefa.png_srb_p_600_450_75_22_0.50_1.20_0.00_png_srb.png\' style=\'max-height:100%;max-width:100%\' />                     </div>                 </div>             </md-tab-body>         </md-tab>         <md-tab label=\'Gallery\'>             <md-tab-body class=\' md-padding\' id=\'contentTab2Id\'>                  <!--1<h1 class=\'md-display-2\'>Tab Two</h1>-->                 <!--<p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>-->                 <div layout=\'row\'>                     <div layout=\'column\'>                         <!--<div ng-repeat=\'picture in vm.pictures\' style=\'width:250px;height:250px\'>                             <img ng-src=\'/pictures/{{picture}}\' alt=\'{{picture}}\' style=\'max-width:100%;max-height:100%;\' />                         </div>-->             <md-grid-list >                 <md-grid-tile ng-class=\'{\'green\':user.active,\'gray\':!user.active}\'                               ng-repeat=\'user in vm.usersView\'                               ng-click=\'vm.onClick(user._id);\'>                     {{user.email}}                     <md-grid-tile-footer>                         <h3>{{user.displayName}}</h3>                         <h3>{{user.role}}</h3>                     </md-grid-tile-footer>                 </md-grid-tile>             </md-grid-list>                     </div>                 </div>                 <!--<md-grid-list class=\'gridListdemoBasicUsage md-padding\' md-cols-sm=\'2\' md-cols-md=\'3\' md-cols-gt-md=\'5\' md-row-height-gt-md=\'1:1\' md-row-height=\'2:2\'                           md-gutter=\'5px\'>-->                 <!--</md-grid-tile>-->                 <!--</md-grid-list>-->             </md-tab-body>         </md-tab>         <md-tab label=\'Exposition/Presse\'>             <md-tab-body class=\'md-padding\' id=\'contentTab2Id\'>                 <h1 class=\'md-display-2\'>Tab Three</h1>                 <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>             </md-tab-body>         </md-tab>         <md-tab label=\'Biographie\'>             <md-tab-body class=\'md-padding\'>                 <h1 class=\'md-display-2\'>Tab Three</h1>                 <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>             </md-tab-body>         </md-tab>         <md-tab label=\'Contact\'>             <md-tab-body class=\'md-padding\'>                 <h1 class=\'md-display-2\'>Tab Three</h1>                 <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>             </md-tab-body>         </md-tab>     </md-tabs> </div>";
    })(main = mtg.main || (mtg.main = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var main;
    (function (main) {
        "use strict";
        main.mainControllerStringName = "mtg.main.MainController";
        var MainController = (function () {
            function MainController($rootScope, $scope, $log, $mdSidenav, picturesService, notificationService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$log = $log;
                this.$mdSidenav = $mdSidenav;
                this.picturesService = picturesService;
                this.notificationService = notificationService;
                this.$log.debug(mtg.main.mainControllerStringName + " loaded!");
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                picturesService.getAll().then(function (picturesFromServer) {
                    _this.pictures = picturesFromServer.files;
                    //////////
                    _this.gallery.clearItems();
                    //jQuery.each<cpla.models.Paints>( evt.value, function ( key: number, val: cpla.models.Paints ) {
                    _this.gallery.addItem({
                        thumbnailUrl: "",
                        PaintId: 0,
                        Name: "",
                        Description: "",
                        Year: "",
                        PictureUrl: "",
                        Size: "" //val.Size
                    });
                    //});
                    _this.gallery.selectFirstItem();
                    //////////
                }).catch(function (reason) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
                    _this.notificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
                });
            }
            MainController.$inject = [
                "$rootScope",
                "$scope",
                "$log",
                "$mdSidenav",
                "picturesService",
                "notificationService"
            ];
            return MainController;
        })();
        main.MainController = MainController;
        angular
            .module("app")
            .controller(mtg.main.mainControllerStringName, mtg.main.MainController);
    })(main = mtg.main || (mtg.main = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.mainState = "main";
    appState.mainUrl = "/";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var main;
    (function (main) {
        "use strict";
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider
                .state(appState.mainState, {
                url: appState.mainUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm",
                    },
                    "container": {
                        template: mtg.main.mainTemplate,
                        controller: mtg.main.mainControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            });
        }
        ;
        angular
            .module("app")
            .config(route);
    })(main = mtg.main || (mtg.main = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var register;
    (function (register) {
        register.registerTemplate = "<md-content class=\'md-padding\'>     <form name=\'register\' ng-submit=\'vm.submit()\' novalidate>         <h1>Create new account</h1>          <md-input-container>             <label>Email address</label>             <input type=\'email\' name=\'email\' ng-model=\'vm.email\' ng-required=\'\' autofocus ng-maxlength=\'30\' ng-minlength=\'4\'>             <div ng-messages=\'register.email.$error\'>                 <div ng-message=\'required\'>Email is required.</div>                 <div ng-message=\'minlength\'>The name has to be longer than 4.</div>                 <div ng-message=\'maxlength\'>The name has to be less than 30 characters long.</div>                 <div ng-message=\'email\'>Your email address is incorrect.</div>             </div>         </md-input-container>          <!--             <div ng-message=\'serverError\'>Request Failed Due to Server Error!</div>         <div ng-message=\'notFound\'>Not Found!</div>         <div ng-message=\'inProgress\'> Please Wait! </div>         <div ng-message=\'required\'> This field is required! </div>         <div ng-message=\'minlength\'> This field is too short!</div>         <div ng-message=\'maxlength\'> This field is too long!</div>         <div ng-message=\'email\'> Email is not valid!</div>             -->          <md-input-container>             <label>Password</label>             <input name=\'password\' type=\'password\' ng-model=\'vm.password\' ng-required>         </md-input-container>          <md-input-container>             <label>Confirm password</label>             <input name=\'password_confirm\' type=\'password\' ng-model=\'vm.passwordConfirm\' required>         </md-input-container>          <button ng-disabled=\'register.$invalid\' type=\'submit\'>             Submit         </button>     </form> </md-content> ";
    })(register = mtg.register || (mtg.register = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var register;
    (function (register) {
        "use strict";
        register.registerControllerStringName = "mtg.register.RegisterController";
        ;
        var RegisterController = (function () {
            function RegisterController($rootScope, $scope, notificationService, $auth, $state, $log) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.notificationService = notificationService;
                this.$auth = $auth;
                this.$state = $state;
                this.$log = $log;
                this.checkPasswords = function () {
                    _this.$scope["register"]["password_confirm"].$setValidity("equal", (_this.password === _this.passwordConfirm));
                };
                this.submit = function () {
                    _this.$auth.signup({ email: _this.email, password: _this.password })
                        .then(function (response) {
                        _this.$log.info("registration is fine!");
                        var msg = "Dear '" + response.data.user.email +
                            "' you are now registered!. Goes in your mailbox to confirm your email address " +
                            " within 12 hours.";
                        _this.notificationService.success(msg);
                        _this.$scope.$broadcast("userupdated");
                        _this.$state.go("main");
                    })
                        .catch(function (err) {
                        _this.$log.error("registration is wrong bad:" + JSON.stringify(err));
                        _this.notificationService.error("Error registering!" + JSON.stringify(err));
                        _this.$scope.$broadcast("userupdated");
                    });
                };
                this.password = "";
                this.passwordConfirm = "";
                this.$scope.$watch(function () { return _this.password; }, this.checkPasswords);
                this.$scope.$watch(function () { return _this.passwordConfirm; }, this.checkPasswords);
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("", false, true);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                this.$log.debug("RegisterController: Constructor");
            }
            RegisterController.$inject = [
                "$rootScope",
                "$scope",
                "notificationService",
                "$auth",
                "$state",
                "$log"
            ];
            return RegisterController;
        })();
        register.RegisterController = RegisterController;
        angular
            .module("app")
            .controller(mtg.register.registerControllerStringName, mtg.register.RegisterController);
    })(register = mtg.register || (mtg.register = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.registerState = "register";
    appState.registerUrl = "/register";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var register;
    (function (register) {
        "use strict";
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider
                .state(appState.registerState, {
                url: appState.registerUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.register.registerTemplate,
                        controller: mtg.register.registerControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            });
        }
        ;
        angular
            .module("app")
            .config(route);
    })(register = mtg.register || (mtg.register = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var register;
    (function (register) {
        "use strict";
        var ValidateEqualsDirective = (function () {
            function ValidateEqualsDirective() {
                this.require = "ngModel";
                this.link = function (scope, instanceElement, attrs, controller) {
                    function validateEqual(value) {
                        /*
                        * Take care setupping this directive between the named and other thing
                        * I think it should be easier/more maintainable to do directly in the controller itself
                        */
                        // console.log("validateEqual-value:" + value);
                        // console.log("validateEqual-attrs["validateEquals"]):" + attrs["validateEquals"]);
                        // console.log("validateEqual-scope.$eval(attrs['controllerValidateEquals'])):"
                        //    + scope.$eval(attrs["controllerValidateEquals"]));
                        // console.log("validateEqual-controller:" + controller.$name);
                        var valid = (value === scope.$eval(attrs["controllerValidateEquals"]));
                        // console.log("validateEqual-valid:" + valid);
                        // controller.$setValidity("equal", valid);
                        // console.log("isValid?:" + valid);
                        return valid ? value : undefined;
                    }
                    ;
                    controller.$parsers.push(validateEqual);
                    controller.$formatters.push(validateEqual);
                    scope.$watch(attrs["controllerValidateEquals"], function () {
                        // console.log("scope.$watch of:" + attrs["controllerValidateEquals"]);
                        // console.log("scope.$watch of - val of ctlr.password:" + scope.$eval(attrs["controllerValidateEquals"]));
                        // console.log("scope.$watch of - val of confirmPassword", controller.$viewValue);
                        // validateEqual(controller.$viewValue);
                        if (controller.$viewValue === scope.$eval(attrs["controllerValidateEquals"])) {
                            controller.$setValidity("equal", true);
                        }
                        else {
                            controller.$setValidity("equal", false);
                        }
                    });
                };
            }
            return ValidateEqualsDirective;
        })();
        register.ValidateEqualsDirective = ValidateEqualsDirective;
    })(register = mtg.register || (mtg.register = {}));
})(mtg || (mtg = {}));
angular
    .module("app")
    .directive("x", function () {
    return new mtg.register.ValidateEqualsDirective();
});
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var services;
    (function (services) {
        "use strict";
        var Config = (function () {
            function Config() {
            }
            return Config;
        })();
        var NotificationService = (function () {
            function NotificationService($mdToast, $log) {
                this.$mdToast = $mdToast;
                this.$log = $log;
                this.toastConfig = new Config();
                //this.toastConfig.position = new ngmd.toastPosition();
                this.toastConfig.hideDelay = 1000;
                //this.toastConfig.position.right = true;
                //this.toastConfig.position.bottom = true;
                //toastr.options = {
                //    "positionClass": "toast-bottom-right",
                //};
                this.$log.debug("notificationService ... loaded");
            }
            NotificationService.prototype.success = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                //toastr.success(message, title);
                //this.toastConfig.content = title;
                var toast = this.$mdToast.simple()
                    .content(message)
                    .hideDelay(1000);
                //.action('OK');
                //.highlightAction(false)
                //.position($scope.getToastPosition());
                this.$mdToast.show(toast);
                //this.$mdToast.show(toast).then(function () {
                //    alert('You clicked \'OK\'.');
                //});
            };
            NotificationService.prototype.error = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                //toastr.error(message, title);
                var toast = this.$mdToast.simple()
                    .content(message)
                    .hideDelay(1000);
                this.$mdToast.show(toast);
            };
            NotificationService.prototype.info = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                //toastr.info(message, title);
                var toast = this.$mdToast.simple()
                    .content(message)
                    .hideDelay(1000);
                this.$mdToast.show(toast);
            };
            NotificationService.prototype.warning = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                //toastr.warning(message, title);
                var toast = this.$mdToast.simple()
                    .content(message)
                    .hideDelay(1000);
                this.$mdToast.show(toast);
            };
            return NotificationService;
        })();
        services.NotificationService = NotificationService;
        factory.$inject = [
            "$mdToast",
            "$log"
        ];
        function factory($mdToast, $log) {
            return new mtg.services.NotificationService($mdToast, $log);
        }
        angular
            .module("app")
            .factory("notificationService", factory);
    })(services = mtg.services || (mtg.services = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var services;
    (function (services) {
        "use strict";
        var SiteSettingsService = (function () {
            function SiteSettingsService($http, CST_API_URL) {
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
            }
            SiteSettingsService.prototype.getSettings = function () {
                return this.$http.get(this.CST_API_URL + "/site")
                    .then(function (response) {
                    return response.data;
                });
            };
            SiteSettingsService.prototype.updateSettings = function (siteSettings) {
                throw new Error("not implemented yet!");
            };
            SiteSettingsService.prototype.getThemes = function () {
                return this.$http.get(this.CST_API_URL + "/themes")
                    .then(function (response) {
                    return response.data;
                });
            };
            return SiteSettingsService;
        })();
        services.SiteSettingsService = SiteSettingsService;
        factory.$inject = [
            "$http",
            "CST_API_URL"
        ];
        function factory($http, CST_API_URL) {
            return new SiteSettingsService($http, CST_API_URL);
        }
        angular
            .module("app")
            .factory("mtg.services.SiteSettingsService", factory);
    })(services = mtg.services || (mtg.services = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var services;
    (function (services) {
        "use strict";
        var UserLoggedService = (function () {
            function UserLoggedService($http, $auth) {
                var _this = this;
                this.$http = $http;
                this.$auth = $auth;
                this.login = function (userBackend) {
                    _this.email = userBackend.email;
                    _this.displayName = userBackend.displayName || "";
                    _this.isAuthenticated = true;
                    _this.active = userBackend.active;
                    _this.picture = userBackend.picture || "";
                };
                this.logout = function () {
                    _this.email = "";
                    _this.displayName = "";
                    _this.isAuthenticated = false;
                    _this.active = false;
                    _this.picture = "";
                };
                this.isAuthenticated = false;
                this.$auth.logout();
                this.$auth.removeToken();
                this.logout();
            }
            UserLoggedService.$inject = [
                "$http",
                "$auth"];
            return UserLoggedService;
        })();
        angular
            .module("app")
            .service("userLoggedService", UserLoggedService);
    })(services = mtg.services || (mtg.services = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../typings/webApp.d.ts"/>
var mtg;
(function (mtg) {
    var sidenav;
    (function (sidenav) {
        "use strict";
        sidenav.sidenavControllerStringName = "mtg.sidenav.SidenavController";
        var SidenavController = (function () {
            function SidenavController($scope, $auth, $mdSidenav, $log, userLoggedService) {
                this.$scope = $scope;
                this.$auth = $auth;
                this.$mdSidenav = $mdSidenav;
                this.$log = $log;
                this.userLoggedService = userLoggedService;
                this.$log.debug("SidenavController: Constructor");
            }
            SidenavController.prototype.close = function () {
                this.$mdSidenav("left").close().then(function () {
                    //this.$log.debug("toggle left is done@sideNavController");
                });
            };
            // public isAuthenticated: Function;
            // public $auth:  //any; //: services.AuthToken;
            SidenavController.$inject = [
                "$scope",
                "$auth",
                "$mdSidenav",
                "$log",
                "userLoggedService"
            ];
            return SidenavController;
        })();
        sidenav.SidenavController = SidenavController;
        angular
            .module("app")
            .controller(mtg.sidenav.sidenavControllerStringName, mtg.sidenav.SidenavController);
    })(sidenav = mtg.sidenav || (mtg.sidenav = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var users;
    (function (users) {
        users.userTemplate = "<form name=\'userForm\' ng-submit=\'vm.submit()\' layout=\'column\' layout-align=\'center center\' novalidate>     <md-input-container>         <label>email</label>         <input type=\'email\' ng-model=\'vm.user.email\' name=\'email\' required autofocus>         <div ng-messages=\'userForm.email.$error\'>             <div ng-message=\'required\'>Email is required.</div>             <div ng-message=\'email\'>Your email address is incorrect.</div>         </div>     </md-input-container>     <md-input-container>         <label>Display name</label>         <input type=\'text\' name=\'displayName\' ng-model=\'vm.user.displayName\' class=\'form-control\' required>         <div ng-messages=\'userForm.displayName.$error\'>             <div ng-message=\'required\'>Display name is required.</div>         </div>     </md-input-container>     <md-checkbox ng-model=\'vm.user.active\' aria-label=\'active user\'>         Activated     </md-checkbox>     <!--<md-input-container ng-model=\'vm.user.role\' aria-label=\'active role\'>         <label>role</label>         <input type=\'text\' ng-model=\'vm.user.role\' name=\'role\' autofocus>     </md-input-container>-->      <md-list>         <md-subheader class=\'md-no-saticky\'>Roles</md-subheader>         <md-list-item ng-repeat=\'UIRole in vm.uiRoles\'>             <div>                 <md-checkbox ng-model=\'UIRole.allowed\'                              ng-change=\'vm.allowRole(UIRole)\'>                     {{UIRole.code}}                 </md-checkbox>             </div>         </md-list-item>     </md-list> </form> ";
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var users;
    (function (users) {
        "use strict";
        users.userControllerStringName = "mtg.users.UserController";
        var UserController = (function () {
            function UserController($scope, $rootScope, $http, CST_API_URL, notificationService, $log, $stateParams, $mdBottomSheet, userService, authorizationService, $mdDialog, $q) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.notificationService = notificationService;
                this.$log = $log;
                this.$stateParams = $stateParams;
                this.$mdBottomSheet = $mdBottomSheet;
                this.userService = userService;
                this.authorizationService = authorizationService;
                this.$mdDialog = $mdDialog;
                this.$q = $q;
                this.uiRoles = [];
                this.allowRole = function (role) {
                    if (role.allowed) {
                        _this.authorizationService.addRole(_this.user.allowedRoles, role.code);
                        _this.$log.info("role:" + role.code + " selected: allowed");
                    }
                    else {
                        _this.authorizationService.removeRole(_this.user.allowedRoles, role.code);
                        _this.$log.info("role:" + role.code + " selected: NOT allowed");
                    }
                };
                this.saveUSer = function () {
                    _this.userService.update(_this.user)
                        .then(function (user) {
                        _this.$log.debug("user saved!:" + JSON.stringify(user));
                        //this.NotificationService.info("User saved!");
                    }).catch(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                        _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                    });
                    _this.$rootScope.goBack();
                };
                this.deleteUser = function () {
                    var confirm = _this.$mdDialog.confirm()
                        .title("Confirm deletion")
                        .content("You are going to delete the user:" + _this.user.displayName)
                        .ariaLabel("Lucky day")
                        .ok("Cancel")
                        .cancel("Delete");
                    //.targetEvent(ev);
                    _this.$mdDialog.show(confirm).then(function () { return true; }, function () {
                        //$scope.alert = 'You decided to get rid of your debt.';
                        _this.userService.delete(_this.$stateParams.userId)
                            .then(function (user) {
                            _this.$log.debug("user deleted!:" + JSON.stringify(user));
                            //this.NotificationService.info("User saved!");
                        }).catch(function (err) {
                            _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                            _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                        });
                        _this.$rootScope.goBack();
                    });
                };
                this.loadRoles = function () {
                    _this.authorizationService.getAllRoles().then(function (roles) {
                        _this.$log.debug("roles loaded!");
                        _this.user.allowedRoles = _this.user.allowedRoles === undefined ? [] : _this.user.allowedRoles;
                        for (var i = 0; i < roles.length; i++) {
                            _this.uiRoles.push({
                                allowed: _this.authorizationService.hasGotRole(_this.user.allowedRoles, roles[i].id),
                                code: roles[i].id,
                            });
                        }
                    }).catch(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
                        _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
                    });
                };
                //console.log("stateparam:" + JSON.stringify(this.$stateParams));
                if (!this.$stateParams.userId) {
                    var msg = "UserId is missing to initialize the user detail view!";
                    alert(msg);
                    console.error(msg);
                }
                else {
                    //userID exists
                    ////header definition
                    this.$rootScope.headerConfiguration =
                        new mtg.header.HeaderConfiguration("User detail", false, true, false, false, true, true);
                    this.$scope.$on("$destroy", function () {
                        //clean the header bar configuration
                        _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                        ;
                    });
                    //call the back end to retrieve the val
                    this.userService.getById(this.$stateParams.userId).then(function (user) {
                        _this.user = user;
                        _this.$log.debug("user loaded!:" + JSON.stringify(_this.user));
                    }).then(function () {
                        _this.loadRoles();
                    }).catch(function (err) {
                        var msg = "Error message: \n" + JSON.stringify(err) + "\nCannot load uers resources:";
                        _this.$log.error(msg);
                        _this.notificationService.error(msg);
                    });
                    //register event functions
                    //Save
                    this.$scope.$on("save", this.saveUSer);
                    //delete
                    this.$scope.$on("delete", this.deleteUser);
                    //Raise event to the app when the form is invalid
                    this.$scope.$watch(function () { return _this.$scope.userForm.$invalid; }, function (newValue, oldValue) {
                        //console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                        if (newValue) {
                            _this.$scope.$emit(appRootScopeEvent.invalidForm);
                        }
                        else {
                            _this.$scope.$emit(appRootScopeEvent.validForm);
                        }
                    });
                }
                this.$log.debug("UserController: Constructor");
            }
            UserController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "notificationService",
                "$log",
                "$stateParams",
                "$mdBottomSheet",
                "UserService",
                "AuthorizationService",
                "$mdDialog",
                "$q"
            ];
            return UserController;
        })();
        users.UserController = UserController;
        angular
            .module("app")
            .controller(mtg.users.userControllerStringName, mtg.users.UserController);
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
var mtg;
(function (mtg) {
    var users;
    (function (users) {
        users.usersTemplate = "<md-content>     <div layout-fill layout=\'column\' layout-align=\'center center\'>         <h1>Users</h1>         <div layout-fill style=\'padding-left:5px;padding-right:5px\'>             <md-grid-list class=\'gridListdemoBasicUsage\' md-cols-sm=\'2\' md-cols-md=\'3\' md-cols-gt-md=\'5\' md-row-height-gt-md=\'1:1\' md-row-height=\'2:2\'                           md-gutter=\'5px\'>                 <md-grid-tile ng-class=\'{\'green\':user.active,\'gray\':!user.active}\'                               ng-repeat=\'user in vm.usersView\'                               ng-click=\'vm.onClick(user._id);\'>                     {{user.email}}                     <md-grid-tile-footer>                         <h3>{{user.displayName}}</h3>                         <h3>{{user.role}}</h3>                     </md-grid-tile-footer>                 </md-grid-tile>             </md-grid-list>         </div>     </div> </md-content> ";
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
///< reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var users;
    (function (users_1) {
        "use strict";
        users_1.usersControllerStringName = "mtg.users.UsersController";
        //export interface IUser {
        //    _id: string;
        //    email: string;
        //    password: string;
        //    active: boolean;
        //    googleId: string;
        //    facebookId: string;
        //    displayName: string;
        //}
        var UsersController = (function () {
            function UsersController($scope, $rootScope, $http, CST_API_URL, notificationService, $log, $mdDialog, $filter, $state, userService) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.notificationService = notificationService;
                this.$log = $log;
                this.$mdDialog = $mdDialog;
                this.$filter = $filter;
                this.$state = $state;
                this.userService = userService;
                this.users = [];
                this.usersView = [];
                this.onClick = function (userID) {
                    var userParams = new mtg.users.UserRouteParams(userID);
                    _this.$state.go("user", userParams);
                };
                ////header definition
                this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration("Users", true, false, false, false, false, false);
                this.$scope.$on("$destroy", function () {
                    //clean the header bar configuration
                    _this.$rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
                    ;
                });
                this.userService.getAll().then(function (users) {
                    _this.users = users;
                    _this.usersView = [].concat(_this.users);
                    _this.$log.debug("users loaded!");
                }).catch(function (err) {
                    _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                    _this.notificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });
                this.$log.debug("UsersController: Constructor");
            }
            UsersController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "notificationService",
                "$log",
                "$mdDialog",
                "$filter",
                "$state",
                "UserService"
            ];
            return UsersController;
        })();
        users_1.UsersController = UsersController;
        angular
            .module("app")
            .controller(mtg.users.usersControllerStringName, mtg.users.UsersController);
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var appState;
(function (appState) {
    "use strict";
    appState.users = "users";
    appState.usersUrl = "/users";
    appState.user = "user";
})(appState || (appState = {}));
var mtg;
(function (mtg) {
    var users;
    (function (users) {
        "use strict";
        var UserRouteParams = (function () {
            function UserRouteParams(userId) {
                this.userId = userId;
            }
            return UserRouteParams;
        })();
        users.UserRouteParams = UserRouteParams;
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider
                .state(appState.users, {
                url: appState.usersUrl,
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.headerControllerStringName,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.users.usersTemplate,
                        controller: mtg.users.usersControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            })
                .state(appState.user, {
                url: appState.usersUrl + "/{userId}",
                views: {
                    "header": {
                        template: mtg.header.headerTemplate,
                        controller: mtg.header.HeaderController,
                        controllerAs: "vm"
                    },
                    "container": {
                        template: mtg.users.userTemplate,
                        controller: mtg.users.userControllerStringName,
                        controllerAs: "vm"
                    },
                    "footer": {}
                }
            });
        }
        ;
        angular
            .module("app")
            .config(route);
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
/// <reference path="../../typings/tsd.d.ts"/>
var mtg;
(function (mtg) {
    var users;
    (function (users) {
        "use strict";
        users.userServiceStringName = "UserService";
        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getMe = function () {
                return this.$http.get("/api/adm/users/me")
                    .then(function (response) {
                    return response.data[0];
                });
            };
            UserService.prototype.getById = function (uniqueId) {
                return this.$http.get("/api/adm/users/" + uniqueId)
                    .then(function (response) {
                    return response.data[0];
                });
            };
            UserService.prototype.getAll = function () {
                return this.$http.get("/api/adm/users/")
                    .then(function (response) {
                    return response.data;
                });
            };
            UserService.prototype.update = function (user) {
                return this.$http.put("/api/adm/users/" + user._id, user).then(function (response) {
                    return response.data;
                });
            };
            UserService.prototype.updateMe = function (user) {
                return this.$http.put("/api/adm/users/me", user).then(function (response) {
                    return response.data;
                });
            };
            UserService.prototype.delete = function (uniqueId) {
                return this.$http.delete("/api/adm/users/" + uniqueId).then(function (response) {
                    return response.data;
                });
            };
            UserService.$inject = ["$http"];
            return UserService;
        })();
        angular
            .module("app")
            .service(mtg.users.userServiceStringName, UserService);
    })(users = mtg.users || (mtg.users = {}));
})(mtg || (mtg = {}));
/// <reference path="./core_misc.ts" />
//# sourceMappingURL=/core/core_pubsub.js.map
//TODO:
// regarder ce que fait http://www.pubnub.com
// 1) Create a method to trigger 1 callback when 1 one the message is arriving
//      the method could be called raced
//      usefull when there is a timeout expected. 1 message is related to a timeout
// 2) Create a method to trigger 1 callback when all the message expected have been arrived
//      this could be called meetingPoint
// 3) Record all the message in a buffer
//      this could be used to have a 'replay' function. We record all the messages arriving and then it's possible
//      to 'replay' them. It could be very usefull for testing purpose / load analysis
// 4) Compare message using diffObject
//      To replay we should plan to change few values (objects/msg properties) in the test scenario
//      The concept behind objectdiff could help supporting this use case
// 5) improve usability/readability
//      the current pub/sub is not very readable and (too?) verbose
//          core.app.PubSub.subscribe( new MsgTestStart(), function ( MsgTestStart ) {
//              paintsTests.test_postPaint();
//          } );
// 6) shoudl we create 2 message interfaces:
//      - 1 for command : an action triggered by an actor, the message should a "verb"
//      - and another one for events: an reaction following an actor command, the message should be an event
// 7) identicate if the message will be used only once. If yes, then it will automatically unsubscribe after use.
//      is it really usefull in really application (currently the remark is posted related to the test framework)
//
var core;
(function (core) {
    var pubsub;
    (function (pubsub) {
        var Thread = (function () {
            function Thread() {
                this.callbacks = [];
            }
            return Thread;
        })();
        pubsub.Thread = Thread;
        var CallBackSubscribbed = (function () {
            function CallBackSubscribbed(callback, args) {
                this.once = false;
                this.guid = core.misc.GUID_new();
                this.callback = callback;
                //    if ( args ) { this.args = args; }
            }
            return CallBackSubscribbed;
        })();
        pubsub.CallBackSubscribbed = CallBackSubscribbed;
        var PubSubToken = (function () {
            //constructor( public thread: string, public callback: ( msg: IPubSubMsg ) => void ) {}
            function PubSubToken(thread, guid) {
                this.thread = thread;
                this.guid = guid;
            }
            return PubSubToken;
        })();
        pubsub.PubSubToken = PubSubToken;
        var PubSub = (function () {
            //        subscribe( msg: IPubSubMsg, callback: ( msg: IPubSubMsg, args?: any[] ) => void , args?: any[]  ): PubSubToken {
            function PubSub() {
                //private _journal: models.journal.Journal;
                this._threads = [];
                //this._journal = new models.journal.Journal();
            }
            /**
            * Regsiter a callback function to a IPubSubMsg. When the message will be published the function will be called by the framework
            *
            * @Param msg a IPubSubMsg class .... e.i.: new cmdLoadPagePaints()
            * @Param the function to callback ... e.i: function ( evt: evtTestFinished )
            * @Param PubSubToken ... unique number of the registration in order to unresgister
            */
            PubSub.prototype.subscribe = function (msg, callback) {
                //is a new thread?
                var thread = core.misc.getObjectClass(msg);
                if (!this._threads[thread]) {
                    this._threads[thread] = new Thread();
                }
                //Add the callback to the thread
                var t = this._threads[thread];
                //var cb = new CallBackSubscribbed( callback,args);
                var cb = new CallBackSubscribbed(callback);
                t.callbacks.push(cb);
                //this._threads[thread].subscribed.push( callback );
                return new PubSubToken(thread, cb.guid);
            };
            //subscribeOnce( msg: IPubSubMsg, callback: ( msg: IPubSubMsg, args?: any[] ) => void , args?: any[] ): void {
            PubSub.prototype.subscribeOnce = function (msg, callback) {
                //var token = this.subscribe( msg, callback, args );
                var token = this.subscribe(msg, callback);
                //Change the behavior of the callback
                if (this._threads[token.thread]) {
                    var thread = this._threads[token.thread];
                    var len = thread.callbacks.length;
                    while (len--) {
                        if (thread.callbacks[len].guid === token.guid) {
                            thread.callbacks[len].once = true;
                        }
                    }
                }
            };
            PubSub.prototype.unsubscribe = function (token) {
                //does the thread exists?
                if (this._threads[token.thread]) {
                    var thread = this._threads[token.thread];
                    var len = thread.callbacks.length;
                    while (len--) {
                        if (thread.callbacks[len].guid === token.guid) {
                            thread.callbacks.splice(len, 1);
                        }
                    }
                }
            };
            PubSub.prototype.publish = function (msg) {
                //journalize the message
                //this._journal.journalise( msg );
                //treat the message
                var sThread = core.misc.getObjectClass(msg);
                if (this._threads[sThread]) {
                    var oThread = this._threads[sThread];
                    var len = oThread.callbacks.length;
                    while (len--) {
                        //core.Logger.log( "PubSub.BeforeCall - " + JSON.stringify( oThread.callbacks[len].callback ) + "... args:" + JSON.stringify( oThread.callbacks[len].args ));
                        if (oThread.callbacks[len].args) {
                            oThread.callbacks[len].callback(msg, oThread.callbacks[len].args);
                        }
                        else {
                            oThread.callbacks[len].callback(msg);
                        }
                        if (oThread.callbacks[len].once) {
                            //core.Logger.log("PubSub.RemoveOnceMessages")
                            oThread.callbacks.splice(len, 1);
                        }
                    }
                }
            };
            return PubSub;
        })();
        pubsub.PubSub = PubSub;
    })(pubsub = core.pubsub || (core.pubsub = {}));
})(core || (core = {}));
//# sourceMappingURL=/core/core_pubsub.js.map
var mtg;
(function (mtg) {
    var core;
    (function (core) {
        core.testTemplate = "";
    })(core = mtg.core || (mtg.core = {}));
})(mtg || (mtg = {}));
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/webApp.d.ts"/>
var appRootScopeEvent;
(function (appRootScopeEvent) {
    "use strict";
    appRootScopeEvent.invalidForm = "invalid";
    appRootScopeEvent.validForm = "valid";
    appRootScopeEvent.deletex = "delete";
    appRootScopeEvent.addNew = "add";
    appRootScopeEvent.save = "save";
})(appRootScopeEvent || (appRootScopeEvent = {}));
var mtg;
(function (mtg) {
    var run;
    (function (run_1) {
        "use strict";
        angular
            .module("app")
            .run(run);
        run.$inject = [
            "$rootScope",
            "$location",
            "$window",
            "$state",
        ];
        function run($rootScope, $location, $window, $state) {
            $rootScope.headerConfiguration = new mtg.header.HeaderConfiguration();
            //$rootScope.$on("$routeChangeError",(): void => {
            //    alert("routeChangeError raised!");
            //});
            //// previous state handling
            //$rootScope.previousState = {name: "", params: {}};
            //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //    // store previous state in $rootScope
            //    $rootScope.previousState.name = fromState.name;
            //    $rootScope.previousState.params = fromParams;
            //});
            $rootScope.goBack = function () {
                $window.history.back();
            };
            $rootScope.save = function () {
                $rootScope.$broadcast(appRootScopeEvent.save);
            };
            $rootScope.delete = function () {
                $rootScope.$broadcast(appRootScopeEvent.deletex);
            };
            $rootScope.addNew = function () {
                $rootScope.$broadcast(appRootScopeEvent.addNew);
            };
        }
    })(run = mtg.run || (mtg.run = {}));
})(mtg || (mtg = {}));
//{
/// <reference path='../web/app.ts' />
/// <reference path='../web/app.constants.ts' />
/// <reference path='../web/blocks/blocks.module.ts' />
/// <reference path='../web/blocks/apiendpoint.config.ts' />
/// <reference path='../web/blocks/apiendpoint.provider.ts' />
/// <reference path='../web/blocks/logdecorator.config.ts' />/// <reference path='../web/app.config.ts' />
/// <reference path='../web/app.config.auth.ts' />
/// <reference path='../web/app.route.ts' />
/// <reference path='../web/app.run.ts' />
/// <reference path='../web/services/notificationService.ts' />
/// <reference path='../web/services/sitesettings.service.ts' />
/// <reference path='../web/services/userLogged.ts' />
/// <reference path='../web/authorization/authorizationService.ts' />
/// <reference path='../web/pictures/picturesService.ts' />
/// <reference path='../web/users/usersService.ts' />
/// <reference path='../web/authentication/auth.ts' />
/// <reference path='../web/authentication/authInterceptor.ts' />
/// <reference path='../web/authentication/authToken.ts' />
/// <reference path='../web/header/header.htm.ts' />
/// <reference path='../web/login/login.htm.ts' />
/// <reference path='../web/logout/logout.htm.ts' />
/// <reference path='../web/main/main.htm.ts' />
/// <reference path='../web/paints/paints.htm.ts' />
/// <reference path='../web/pictures/picture.htm.ts' />
/// <reference path='../web/pictures/pictures.htm.ts' />
/// <reference path='../web/pictures/picturesUpload.htm.ts' />
/// <reference path='../web/register/register.htm.ts' />
/// <reference path='../web/users/users.htm.ts' />
/// <reference path='../web/users/user.htm.ts' />
/// <reference path='../web/sidenav/sidenavController.ts' />
/// <reference path='../web/pictures/picturesUploadController.ts' />
/// <reference path='../web/register/registerController.ts' />
/// <reference path='../web/users/userController.ts' />
/// <reference path='../web/users/usersController.ts' />
/// <reference path='../web/indexController.ts' />
/// <reference path='../web/header/headerController.ts' />
/// <reference path='../web/login/loginController.ts' />
/// <reference path='../web/logout/logoutController.ts' />
/// <reference path='../web/main/mainController.ts' />
/// <reference path='../web/paints/paintsController.ts' />
/// <reference path='../web/pictures/pictureController.ts' />
/// <reference path='../web/pictures/picturesController.ts' />
/// <reference path='../web/login/loginRoute.ts' />
/// <reference path='../web/main/mainRoute.ts' />
/// <reference path='../web/logout/logoutRoute.ts' />
/// <reference path='../web/paints/paintsRoute.ts' />
/// <reference path='../web/pictures/picturesRoute.ts' />
/// <reference path='../web/register/registerRoute.ts' />
/// <reference path='../web/register/validateEqualsDirective.ts' />
/// <reference path='../web/users/usersRoute.ts' />
//} 

//# sourceMappingURL=app.js.map