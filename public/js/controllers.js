angular.module('myApp')

.controller('WelcomeController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.path = 'hi.';
}])
.controller('HomeController', ['$scope', '$rootScope', '$location', '$http', '$route', '$sanitize', function($scope, $rootScope, $location, $http, $route, $sanitize) {
  $rootScope.path = $location.path().slice(9);
  $scope.animateToggle = false;
  $http.get('api' + '?category=' + $rootScope.path).success(function(data) {
    $scope.resources = data;
  });
}])
.controller('AdminController', ['$scope', '$location', '$http', '$route', function($scope, $location, $http, $route) {
  $http.get('api').success(function(data) {
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
      console.log('ResourceController' + data);
      $location.url('/admin');
    })};
  }])
.controller('NewResourceController', ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
  $scope.resource = {};

  $scope.save = function (resource) {
    $http.post('api/', resource).success(function(data) {
      $location.url('/admin');

    });
    console.log(resource);
  }
  }])
.controller('AboutController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.path = 'about';
  }])
.controller('SubmitController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.path = 'submit';
  }])
.controller('ColophonController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $rootScope.path = 'colophon';
  }])
;
