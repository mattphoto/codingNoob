angular.module('myApp')
  .controller('HomeController', ['$scope', '$rootScope', '$stateParams', '$state', '$http', function($scope, $rootScope, $stateParams, $state, $http) {
    $http.get('api').success(function(data) {
      $scope.resources = data;
        // $rootScope.path = $location.path().slice(1);
    console.log($rootScope.path);
});
  }]);

angular.module('myApp')
.controller('AdminController', ['$scope', '$rootScope', '$stateParams', '$state', '$http', function($scope, $rootScope, $stateParams, $state, $http) {
  $http.get('api').success(function(data) {
    console.log(data[0].title);
    $scope.resources = data;
    $scope.gotoDetailView = function (id) {
      $state.go('admin/'+id);
    }
    $scope.delete = function (id) {
      $http.delete('api/' + id).success(function () {
        console.log('deleted');
        $route.reload();
      })
    }
    $scope.newResource = function () {
      $state.go('admin/new');
    }
  });
}]);

angular.module('myApp')
.controller('ResourceController', ['$scope', '$rootScope', '$stateParams', '$state', '$http', function($scope, $rootScope, $stateParams, $state, $http) {
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
.controller('NewResourceController', ['$scope', '$rootScope', '$stateParams', '$state', '$http', function($scope, $rootScope, $stateParams, $state, $http) {
  $scope.resource = {};
  $scope.save = function (resource) {
    $http.post('api/', resource).success(function(data) {
    console.log(data);
    $location.url('/admin');

  });
    console.log(resource);
  }
}]);
