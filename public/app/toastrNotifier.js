angular.module('app').value('toastrNotifier', toastr);

angular.module('app').factory('appNotifier', function (toastrNotifier) {
    return {
        notify: function (message, success) {
            if (success) {
                toastrNotifier.success(message);
            }
            else
            {
                toastrNotifier.error(message);
            }
            console.log(message);
        }
    };
});