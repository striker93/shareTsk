(function (angular) {
    angular
        .module('myApp.shared')
        .run(runFunction)
        .controller('baseController', baseController);

    runFunction.$inject = ['$rootScope', '$state'];
    function runFunction($rootScope, $state) {
        $rootScope.$on('$stateChangeSuccess', logState);
        function logState(event, toState, toParams, fromState, fromParams) {
            console.log(fromState);
        }
    }

    function baseController() {
        console.info('baseController loaded');
    }
})(angular);