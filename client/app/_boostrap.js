(function (angular) {
    angular
        .module('myApp.shared', [
            'ui.router',
            'ngTouch',
            'myApp.templates',
            'textAngular',
            'angular-clipboard'
        ]);
    angular
        .module('myApp.home', [
            'myApp.shared'
        ]);
})(angular);

