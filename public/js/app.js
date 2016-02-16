angular.module('myApp', [
  'ui.router'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('category', {
      url:'/:category',
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
  })
  .state('admin', {
      url:'/admin',
      templateUrl: 'partials/list.html',
      controller: 'AdminController'
  })
  .state('admin/new', {
      url:'/admin/new',
      templateUrl: 'partials/new.html',
      controller: 'NewResourceController'
  })
  .state('admin/:id', {
      url:'/admin/:id',
      templateUrl: 'partials/list.html',
      controller: 'AdminController'
  });

  $locationProvider.html5Mode(true);

}]);


