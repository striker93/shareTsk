(function (angular) {
    angular
        .module('myApp.shared')
        .factory('restService', restService);

    restService.$inject = ['$http'];
    function restService($http) {
        return {
            get: get,
            put: put,
            delete: _delete,
            post: post
        };
        function get(url) {
            return $http.get(url);
        }
        function put(url, body) {
            return $http.put(url, body);
        }
        function _delete(url) {
            return $http.delete(url);
        }
        function post(url,body) {
            return $http.post(url,body);
        }
    }
})(angular);
