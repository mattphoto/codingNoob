angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate'
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
  .when('/about', {
    templateUrl: 'partials/about.html',
    controller: 'AboutController'
  })
  .when('/submit', {
    templateUrl: 'partials/submit.html',
    controller: 'SubmitController'
  })
  .when('/colophon', {
    templateUrl: 'partials/colophon.html',
    controller: 'ColophonController'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);
