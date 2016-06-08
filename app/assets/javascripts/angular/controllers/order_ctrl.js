hw_app.controller('OrderCtrl',['$scope', 'Order', '$location', '$rootScope',
function($scope, Order, $location, $rootScope){

    window.onReCaptchaLoad = function(){
        console.log('r loaded!');
        console.log('-2-', window.grecaptcha);
    };
    console.log('-1-', window.grecaptcha);

    $rootScope.$on('$locationChangeSuccess', function (event, newVal) {
        if(/\/addOrder$/.test(newVal)){
            if(window.grecaptcha){
                setTimeout(function(){
                    window.grecaptcha.render('grecaptchaContainer',{
                        sitekey:"6LeyWiETAAAAAI0ZUkQcnTCOb8YlaV-FPSBGe1VS",
                        callback: function(){
                            console.log('SUCCESS !!!');
                            $scope.isRecaptchaDone = true;
                            $scope.recaptchaToken = document.getElementsByClassName('g-recaptcha-response')[0].value;
                            $scope.$apply();
                        }
                    });
                },50)

            } else $location.path('/');
        }
        console.log('$locationChangeSuccess changed!', arguments);
    });

    $scope.init = function(){
        $scope.orderSuccess = false;
        $scope.isRecaptchaDone = false;
        $scope.isOrderModalVisible = false;
        $scope.order = {
            name: '',
            phone: ''
        }
    };
    $scope.newOrderClick = function(){
        console.log('newOrderClick');
        $location.path('/addOrder');
    };

    $scope.hideModal = function(){
        $scope.init();
        $location.path('/');
    };

    $scope.addOrderClick = function(){
        if(isInvalid($scope.order)) return;
        Order.add({order: $scope.order, recaptcha_token: $scope.recaptchaToken},function(res){
            if(res.success){
                $scope.orderSuccess = true;
            } else {
                window.grecaptcha.reset();
                $scope.isRecaptchaDone = false;
            }
        });
        $scope.init();
    };

    function isInvalid(order){
        //if(order.name)
        return false;
    }
}]);