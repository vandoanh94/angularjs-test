(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;
        vm.user = null;
        vm.updateUserInfo = updateUserInfo;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username,$rootScope.globals.currentUser.authdata)
                .then(function (user) {
                    vm.user = user.resource["0"];
                });
        }

        function updateUserInfo() {
            vm.dataLoading = true;
            UserService.Update(vm.user.id,$rootScope.globals.currentUser.authdata,vm.useredit)
                .then(function (response) {
                    console.log(response);
                    loadCurrentUser();
                    vm.dataLoading = false;
                });
        }
    }

})();