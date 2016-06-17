angular.module('high_worker', ['ngResource', 'ngRoute', 'ngTouch']);
var hw_app = angular.module('high_worker');

hw_app.factory('Order', ['$resource', function($resource) {
    return $resource('/orders/:action', null,
        {
            'add': { method:'POST', params: {action: 'add'} },
            'update': { method:'POST', params: {action: 'update'}},
            'delete': { method:'DELETE', params: {action: 'delete'}},
            'all': { method:'GET', isArray: true, params: {action: 'all_orders'}}
        });
}]);

hw_app.factory('User', ['$resource', function($resource) {
    return $resource('/users/:action', null,
        {
            'login': { method:'POST', params: {action: 'login'}, is_array: false }
        });
}]);