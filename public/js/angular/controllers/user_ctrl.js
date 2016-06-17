hw_app.controller('UserCtrl',['$scope', 'User', '$location', '$rootScope',
function($scope, User, $location, $rootScope) {

    $scope.showError = false;

    $scope.tryLogin = function(){
        User.login({user: $scope.user},function(res){
            if(res.success){
                window.location.href='/orders/order_list';
            } else {
                $scope.showError = true;
            }
        });
    }

}]);