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