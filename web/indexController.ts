/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="../typings/webApp.d.ts"/>
module mtg.views.index {
    "use strict";

    interface IIndexScope {
    }

    export class IndexController {
        public isAuthenticated: Function;

        static $inject = [
            "$scope",
            "$auth",
            "$mdSidenav",
            "$log"
        ];

        constructor(
            private $scope: angular.IScope,
            private $auth: satellizer.IAuthService,
            private $mdSidenav: angular.material.MDSidenavService,
            private $log: angular.ILogService) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            if( !this.$auth.isAuthenticated()) {
                this.$auth.removeToken();
            };

            this.$log.debug("IndexController: Constructor");
        }

        onSwipeRight = (): void => {
            this.$mdSidenav("left").open();
        };

        onSwipeLeft = (): void => {
            this.$mdSidenav("left").close();
        };

    }

    angular
        .module("app")
        .controller("mtg.views.index.IndexController", mtg.views.index.IndexController);
}