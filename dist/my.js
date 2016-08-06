/**
 * Created by Administrator on 2016/2/27.
 */
 var app = angular.module('myApp',['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/404');
    $urlRouterProvider.when('','/admin/page-one');
    $urlRouterProvider.when('/','/admin/page-one');
    //..省略代码
    $locationProvider.html5Mode(true);
 $stateProvider     //也可以自己写路由块
     .state('error',{
      url:'/404',
      template:'<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
     })
      .state('pageOne',{
         url:'/page-one',
         templateUrl:'./views/one/page.html',
          controller:'PageOneController',
     })
     .state('pageTwo',{
         url:'/page-two',
         templateUrl:'./two/page.html',
         controller:'PageTwoController',
     })
     .state('pageThree',{
         url:'/page-three',
         templateUrl:'./views/three/page.html',
         controller:'PageThreeController',
     })

}])

/**
 * Created by Administrator on 2016/6/7.
 */
app.controller('PageOneController',["$scope", function($scope){

}]);
app.controller('PageTwoController',["$scope", function($scope){

}]);
app.controller('PageThreeController',["$scope", function($scope){

}])