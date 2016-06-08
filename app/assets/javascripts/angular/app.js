angular.module('high_worker', ['ngResource', 'ngRoute']);
var hw_app = angular.module('high_worker');

hw_app.factory('Order', ['$resource', function($resource) {
    return $resource('/orders/addOrder', null,
        {
            'add': { method:'PUT' }
        });
}]);