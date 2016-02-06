angular.module('myApp')
.factory('Resources', ['$resource', function($resource) {
  return $resource('/api/contact/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
        });
}]);

 
