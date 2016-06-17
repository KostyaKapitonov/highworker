angular.module('high_worker').config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/add', {
                    templateUrl: '/orders/add'
                }).
                when('/order_list', {
                    templateUrl: '/orders/order_list'
                }).
                otherwise('/', {template: ''});
        }
]);