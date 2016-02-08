(function (angular) {
    angular
        .module('myApp.home')
        .factory('listService', mockListService);
        
    mockListService.$inject = ['restApis', 'restService', 'homeAPIs'];
    
    function mockListService(restApis, restService, homeAPIs) {
        function getList() {
            return restService.get(restApis.server + homeAPIs.getTodo);
        }
        function addList(data){
            return restService.put(restApis.server + homeAPIs.getTodo, data);
        }
        function deleteList(listID){
            return restService.delete([restApis.server,homeAPIs.getTodo,'/',listID].join(''));
        }
        function updateList(data){
            return restService.post(restApis.server + homeAPIs.getTodo, data);
        }
        return {
            getList: getList,
            addList: addList,
            deleteList: deleteList,
            updateList: updateList
        };
    }
})(angular);
