hw_app.controller('OrderCtrl',['$scope', 'Order', '$location', '$rootScope',
function($scope, Order, $location, $rootScope){

    var SHOW_RECAPTCHA = false;

    $rootScope.$on('$locationChangeSuccess', function (event, newVal) {
        if(/\/add$/.test(newVal)){
            if(window.grecaptcha){
                SHOW_RECAPTCHA ? renderRecaptcha() :
                ($scope.isRecaptchaDone = true);
            } else $location.path('/');
        }
    });

    function renderRecaptcha(){
        if(!document.getElementById('grecaptchaContainer')) setTimeout(renderRecaptcha,10);
        else {
            window.grecaptcha.render('grecaptchaContainer',{
                sitekey:"6LeyWiETAAAAAI0ZUkQcnTCOb8YlaV-FPSBGe1VS",
                callback: function(){
                    console.log('SUCCESS !!!');
                    $scope.isRecaptchaDone = true;
                    $scope.recaptchaToken = document.getElementsByClassName('g-recaptcha-response')[0].value;
                    $scope.$apply();
                }
            });
        }
    }
    $scope.init = function(){
        $scope.showErrors = false;
        $scope.orderSuccess = false;
        $scope.isRecaptchaDone = false;
        $scope.isOrderModalVisible = false;
        $scope.order = {
            name: '',
            phone: ''
        };
    };
    $scope.newOrderClick = function(){
        $location.path('/add');
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
                $('.mfp-close').click(function(){
                    $scope.$apply(function(){
                        $scope.init();
                    });
                });
            } else {
                window.grecaptcha.reset();
                $scope.isRecaptchaDone = false;
            }
        });
    };

    function isInvalid(order){
        $scope.showErrors = true;
        if(!order.name) return true;
        if(!order.phone) return true;
        return false;
    }
}]);