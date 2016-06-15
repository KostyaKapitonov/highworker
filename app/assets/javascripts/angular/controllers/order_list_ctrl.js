hw_app.controller('OrderListCtrl',['$scope', 'Order', '$location',
function($scope, Order, $location){

    $scope.init = function(){
        $scope.header_buttons=[
            {styleClass: 'active', label: 'Новые'},
            {styleClass: '', label: 'Просмотренные'}
        ];
        $scope.header = $scope.header_buttons[0].label;
        loadOrders();
        $scope.showNewOrders = true;
    };

    function loadOrders(){
        $scope.newOrders = [];
        $scope.oldOrders = [];
        Order.all({},function(res){
            console.log('Order.all({},function(res)',res);
            for(var i in res){
                if(res[i].id){
                    res[i].created = moment(res[i].created_at).format('DD/MM/YY (HH:mm)');
                    res[i].created = res[i].created.split(' ');
                    res[i].is_new ? ($scope.newOrders.push(res[i])) :
                        ($scope.oldOrders.push(res[i]));
                }
            }
            console.log($scope.newOrders);
            console.log($scope.oldOrders);
        });
    }

    $scope.select = function(order){
        $scope.selected_order = order;
    };

    $scope.del_order = function(){
        Order.delete({id: $scope.selected_order.id},function(res){
            console.log('del res',res);
            loadOrders();
        });
        for(var i in $scope.newOrders){
            if($scope.oldOrders[i].id == $scope.selected_order.id){
                $scope.oldOrders.splice(i,1);
            }
        }
        $scope.selected_order = null;
    };

    $scope.onHeaderButtonClick = function(idx){
        if(idx==0){
            $scope.header_buttons[1].styleClass = '';
            $scope.header_buttons[0].styleClass = 'active';
            $scope.header = $scope.header_buttons[0].label;
            $scope.showNewOrders = true;
        } else {
            $scope.header_buttons[1].styleClass = 'active';
            $scope.header_buttons[0].styleClass = '';
            $scope.header = $scope.header_buttons[1].label;
            $scope.showNewOrders = false;
        }
    };

    $scope.refreshOrders = function(){
        var refreshImg = $('#refresh');
        var attributesToRotate = ['-webkit-transform','-moz-transform','-o-transform',
            '-ms-transform', 'transform'];
        rotate(refreshImg, attributesToRotate, 'rotate(*deg)');
        loadOrders();
    };

    $scope.viewed = function(order){
        for(var i in $scope.newOrders){
            if($scope.newOrders[i].id == order.id){
                $scope.newOrders[i].is_new = false;
                $scope.oldOrders.unshift($scope.newOrders.splice(i,1)[0]);
            }
        }
        Order.update({order: order},function(res){
            console.log(res);
        });
    };

    $scope.not_viewed = function(order){
        for(var i in $scope.oldOrders){
            if($scope.oldOrders[i].id == order.id){
                $scope.oldOrders[i].is_new = true;
                $scope.newOrders.unshift($scope.oldOrders.splice(i,1)[0]);
            }
        }
        order.is_new = true;
        Order.update({order: order},function(res){
            console.log(res);
        });
    };

    function rotate(img, attrs, rotateMask){
        var angle = 2;
        var makeRotate = function(newAngle, stop) {
            for (var i in attrs) {
                img.css(attrs[i], rotateMask.replace('*', newAngle));
            }
            newAngle+=2;
            setTimeout(function(){
                if(!stop){
                    if(newAngle < 360) makeRotate(newAngle);
                    else makeRotate(newAngle, true);
                }
            },2);
        };
        makeRotate(0);
    }

}]);