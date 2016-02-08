(function (angular) {
    angular
        .module('myApp.home')
        .factory('homeAPIs', homeAPIs);
        
    function homeAPIs() {
        return {
            server : '',
            getTodo :'/todo',
            sharingUrl:'http://localhost:8888/blog/'
        };
    }
})(angular);
