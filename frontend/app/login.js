angular.module("app").controller("Login", function ($scope, $auth) {
    $scope.login = function () {
        console.log("try authenticating...");
        $auth.authenticate('twitter');
        console.log("done authenticating");
    }
});