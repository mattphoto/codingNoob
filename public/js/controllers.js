angular.module('myApp')

.controller('WelcomeController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.path = 'Welcome!';
}])
.controller('HomeController', ['$scope', '$rootScope', '$location', '$http', '$route', function($scope, $rootScope, $location, $http, $route) {
  $rootScope.path = $location.path().slice(9);
  $http.get('api' + '?category=' + $rootScope.path).success(function(data) {
    $scope.resources = data;
  });
}])
.controller('AdminController', ['$scope', '$location', '$http', '$route', function($scope, $location, $http, $route) {
  $http.get('api').success(function(data) {
    console.log(data[0].title);
    $scope.resources = data;
    $scope.gotoDetailView = function (resource) {
      $location.url('/admin/' + resource._id);
    }
    $scope.delete = function (id) {
      $http.delete('api/' + id).success(function () {
        console.log('deleted');
        $route.reload();
      })
    }
    $scope.newResource = function () {
      $location.url('/admin/new');
    }
  });
}])
.controller('ResourceController', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
  item = $routeParams.id ;

  $http.get('api/' + item).success(function(data) {
    $scope.resource = data;
    $scope.gotoDetailView = function (resource) {
      console.log(resource._id, resource.title);    
      $location.url('/resource/' + resource._id);
    }
  });
  $scope.update = function(resource) {
    $http.put('api/' + item, resource).success(function(data) {
      console.log(data);
      $location.url('/admin');
    })};
  }])
.controller('NewResourceController', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
  $scope.resource = {};
  $scope.save = function (resource) {
    $http.post('api/', resource).success(function(data) {
      console.log(data);
      $location.url('/admin');

    });
    console.log(resource);
  }
}]);
