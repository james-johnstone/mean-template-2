angular.module('app').controller('mainController', function ($scope) {
    $scope.updates = [
        { published: new Date(), update: 'created main page layout', released : true },
        { published: new Date(), update: 'added some placeholder data', released: false }];


    $scope.comments = [
        {user: 'some guy', submitted: new Date(), comment: 'lorum ipsum', removed: false },
        { user: 'some other guy', submitted: new Date(2014,04,12), comment: 'lorum ipsum', removed: false }];
});