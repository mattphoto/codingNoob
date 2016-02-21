angular.module('myApp', [
  'ngRoute',
  'ngSanitize'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/welcome.html',
    controller: 'WelcomeController'
  })
  .when('/subject/:category', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  })
  .when('/admin', {
    templateUrl: 'partials/list.html',
    controller: 'AdminController'
  })
  .when('/admin/new', {
    templateUrl: 'partials/new.html',
    controller: 'NewResourceController'
  })
  .when('/admin/:id', {
    templateUrl: 'partials/resource.html',
    controller: 'ResourceController'
  })

  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);


