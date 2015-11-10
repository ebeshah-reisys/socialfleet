angular.module('app', ['satellizer'])
.config(function ($authProvider) {
    console.log("setting authentication provider");
    $authProvider.twitter({
        url: '/api/user/login'
    });
   console.log("set authentication provider successfully!");
});