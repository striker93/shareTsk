(function (angular) {
    angular
        .module('myApp', ['myApp.shared', 'myApp.home'])
        .run(start)
        .config(todoConfig);

    function start() {
        console.info("app initialized successfully");
    }

    todoConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function todoConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('base', {
                abstract: true,
                templateUrl: 'app/common/templates/base.tpl.html',
                controller: 'baseController'
            })
            .state('base.home', {
                url: '/home',
                templateUrl: 'app/home/templates/home.tpl.html',
                controller: 'homeController as Home'
            });
        $urlRouterProvider.when('', '/home');
    }
})(angular);
