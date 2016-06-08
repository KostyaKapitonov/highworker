angular.module('high_worker', ['ngResource', 'ngRoute']);
var hw_app = angular.module('high_worker');

hw_app.factory('Order', ['$resource', function($resource) {
    return $resource('/orders/:action', null,
        {
            'add': { method:'POST', params: {action: 'add'} },
            'update': { method:'POST', params: {action: 'update'}},
            'all': { method:'GET', is_array: true, params: {action: 'update'}}
        });
}]);