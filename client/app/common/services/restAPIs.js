(function (angular) {
    angular
        .module('myApp.shared')
        .factory('restApis', restAPIs);

    function restAPIs() {
        return {
            server: '',
            getTodo: '/todo'
        };
    }
})(angular);
