module Directives {

    export class Factory {

        static RoleDirective(): ng.IDirective {
            return {
                restrict: 'A',
                templateUrl: 'templates/directives/role.html'
            };
        }

    }

}

angular.module("app.directives", [])
    .directive('gbRole', Directives.Factory.RoleDirective);
