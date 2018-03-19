(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;

        return service;

        function GetById(id) {
            
        }

        function GetByUsername(username,authdata) {
            return $http.get('https://df.cetsolution.com/api/v2/system/user?filter=email%3D' + username,{
                headers: {
                    'Authorization': authdata,
                    'X-DreamFactory-Api-Key':'1c5f47e82c663486c6b495d7cf52b742b50fc17a2a134bd1c0714b443dcfd812'
                }
            }   
        ).then(handleSuccess, handleError('Error getting user by username'));
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

        function Update(id,authdata,useredit) {
            var parameter = JSON.stringify({
                resource: [
                   {
                      name: useredit.name,
                      username: useredit.username,
                      first_name: useredit.first_name,
                      last_name: useredit.last_name
                   }
                ]
             });

             var req = {
                method: 'PATCH',
                url: 'https://df.cetsolution.com/api/v2/system/user?ids=' + id,
                headers: {
                    'Authorization': 'Basic '+ authdata,
                    'Content-Type': 'application/json',
                    'X-DreamFactory-Api-Key':'1c5f47e82c663486c6b495d7cf52b742b50fc17a2a134bd1c0714b443dcfd812'
                },
                data: parameter
               }
               
            return $http(req).then(handleSuccess, handleError('Error'));
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
