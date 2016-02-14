angular.module('myApp')
  .controller('HomeController', ['$scope', '$location', '$http', '$route', function($scope, $location, $http, $route) {
    $http.get('api').success(function(data) {
      $scope.resources = data;
    });
  }]);

angular.module('myApp')
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
}]);

angular.module('myApp')
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

}]);

angular.module('myApp')
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
