(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            var parameter = JSON.stringify({
                resource: [
                   {
                      name: user.name,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      password: user.password
                   }
                ]
             });

             var req = {
                method: 'POST',
                url: 'https://df.cetsolution.com/api/v2/system/user',
                headers: {
                  'Content-Type': 'application/json',
                  'X-DreamFactory-Api-Key':'1c5f47e82c663486c6b495d7cf52b742b50fc17a2a134bd1c0714b443dcfd812'
                },
                data: parameter
               }
               
            return $http(req).then(handleSuccess, handleError('Error deleting user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
