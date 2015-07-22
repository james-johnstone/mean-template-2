angular.module('app').controller('userProfileController', function ($scope, authService, identity, appNotifier) {

    $scope.email = identity.currentUser.email;
    $scope.firstName = identity.currentUser.firstName;
    $scope.lastName = identity.currentUser.lastName;
    $scope.userName = identity.currentUser.userName;

    $scope.update = function () {
        var newUserData = {
            email: $scope.email,
            firstName: $scope.firstName || "",
            lastName: $scope.lastName || "",
            userName: $scope.userName
        };

        authService.updateUser(newUserData).then(function () {
            appNotifier.notify('Your profile has been successfully updated', true);
        }, function (reason) {
            appNotifier.notify(reason, false);
        });

    }
})