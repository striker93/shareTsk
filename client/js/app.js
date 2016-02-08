angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("app/common/templates/base.tpl.html",
    "<div id=page-wrapper><header><div id=header-main><div class=\"container-fluid header-wrapper\"><nav class=\"header-main-navbar col-sm-12 col-xs-12 col-md-6 col-lg-6 text-right\"><div class=navbar-header><a class=navbar-brand href=#>shareTsk</a></div><ul class=\"main-navbar-list text-center\"></ul></nav></div></div></header><section><div id=body-main><div ui-view></div></div></section><footer><div id=footer-main><div class=footer-wrapper><p class=\"footer-info text-center\">Site constructed by <a href=mailto:gabriel.shyam93@gmail.com>S.Shyam</a></p></div></div></footer></div>");
  $templateCache.put("app/home/templates/home.tpl.html",
    "<div class=\"page-wrapper home-page\"><div class=home-wrapper><div class=\"col-xs-12 col-lg-4 col-sm-4\"><div><input class=form-control id=focusedInput ng-model=search.title></div><p ng-if=\"Home.listData.length < 1\">no content</p><ul class=list-group><li class=list-group-item data-ng-repeat=\"item in Home.listData | filter: {title:search.title}\"><div class=row ng-mouseenter=\"item.showEdit=true\" ng-mouseleave=\"item.showEdit=false\"><div class=\"col-xs-5 hideOverflow\"><span ng-bind=item.title></span></div><div class=col-xs-3><span ng-bind=item.updated_at|date></span></div><div class=col-xs-4 ng-show=item.showEdit><div class=btn-group role=group aria-label=\"edit and deletes\"><button type=button class=\"btn btn-default\" ng-click=Home.openEdit(item)><span class=\"fa fa-pencil-square-o\"></span></button> <button type=button class=\"btn btn-default\" ng-click=Home.removeItem(item)><span class=\"fa fa-times\"></span></button> <button type=button class=\"btn btn-default\" ng-click=Home.getBlogURl(item)><span class=\"fa fa-link\"></span></button></div></div></div></li></ul></div><div class=\"col-xs-12 col-lg-8 col-sm-8\" ng-init=\"showInput=false\"><div class=row ng-hide=showInput><button type=button class=\"btn btn-default\" ng-click=\"showInput=true\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=true></span></button></div><div class=row ng-hide=!showInput><button type=button class=\"btn btn-default\" ng-click=Home.saveListitem()>Save</button> <button type=button class=\"btn btn-default\" ng-click=Home.resetCurrentvalues()>cancel</button></div><div class=row ng-show=!showInput><h1>hello there</h1><div ng-if=\"Home.listData.length < 1\"><p>you dont seem to have any items yet start creating content by pressing the + icon on top</p></div><div ng-if=\"Home.listData.length > 0\"><p>select an item from left to start editing or create a new one by pressing + icon on top</p></div></div><div class=row ng-if=showInput><div class=\"col-xs-12 col-lg-12 col-sm-12\"><h3>Title</h3><div class=input-group><input class=form-control placeholder=Title ng-model=Home.title></div></div><div class=\"col-xs-12 col-lg-12 col-sm-12\"><h3>content</h3><div text-angular ng-model=Home.htmlVariable></div></div></div></div></div></div>");
}]);

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

(function (angular) {
    angular
        .module('myApp.shared')
        .factory('Utility', stateFactory);
    stateFactory.$inject = ['$state','clipboard'];
    function stateFactory($state, clipboard) {
        return {
            gotoState: gotoState,
            gotoHome: gotoHome,
            isCurrentState: isCurrentState,
            isEmptyString: isEmptyString,
            copyToclipBoard: copyToclipBoard
        };

        function gotoState(state) {
            $state.go(state);
        }
        function gotoHome() {
            this.gotoState('base.home');
        }
        function isCurrentState(state) {
            return (state == $state.$current.name);
        }
        function isEmptyString(string) {
            return (string.length === 0 || !string.trim());
        }
        function copyToclipBoard(value){
            clipboard.copyText(value);
        }
    }
})(angular);
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
