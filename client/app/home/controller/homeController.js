(function (angular) {
    angular
        .module('myApp.home')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'listService', 'Utility'];
    function homeController($scope, listService, Utility) {
        var vm = this;
        vm.listData = [];
        vm.title = '';
        vm.htmlVariable = '';
        vm.listId = '';
        vm.saveListitem = saveListitem;
        vm.openEdit = openEdit;
        vm.removeItem = removeItem;
        vm.resetCurrentvalues = resetCurrent;
        vm.getBlogURl = getBlogURl;

        getlist();
        
        function getlist() {
            listService
                .getList()
                .then(function (res) {
                    vm.listData = res.data;
                });
        }

        function createListItem() {
            listService
                .addList({ title: vm.title, content: vm.htmlVariable })
                .then(function (res) {
                    resetCurrent();
                    getlist();
                });
        }
        function updateItem() {
            listService
                .updateList({ listID: vm.listId, title: vm.title, content: vm.htmlVariable })
                .then(function (res) {
                    resetCurrent();
                    getlist();
                });
        }

        function removeItem(item) {
            listService
                .deleteList(item._id)
                .then(function (res) {
                    getlist();
                });
        }
        
        function openEdit(item) {
            $scope.showInput = true;
            vm.title = item.title;
            vm.htmlVariable = item.content;
            vm.listId = item._id;
        }
        function getBlogURl(item) {
            //todo remove hardcoding
            Utility.copyToclipBoard('http://localhost:8888/blog/' + item._id);
        }

        function resetCurrent() {
            $scope.showInput = false;
            vm.title = '';
            vm.htmlVariable = '';
            vm.listId = '';
        }

        function saveListitem() {
            if (vm.listId === '') {
                createListItem();
            } else {
                updateItem();
            }
        }
    }
})(angular);
