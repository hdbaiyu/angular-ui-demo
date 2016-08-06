/**
 * Created by Administrator on 2016/10.1.
 */
 var app = angular.module('myApp',['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/index.html');
    $urlRouterProvider.when('/','one');
    $urlRouterProvider.when('/one/','one');
    $urlRouterProvider.when('/two/','two');
    $urlRouterProvider.when('/three/','three');
    //..省略代码
    $locationProvider.html5Mode(true);
    $stateProvider     //也可以自己写路由块
     .state('error',{
      url:'/404',
      template:'<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
     })
    .state('index.html',{
        url:'/index.html',
         template:'<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
     })
      .state('one',{
         url:'/one',
         templateUrl:'/one/page.html',
         controller:'Home'
     })
     .state('two',{
         url:'/two',
         templateUrl:'/two/page.html',
          controller:'twoCtol',
         resolve: {

        //这个函数的值会被直接返回，因为它不是数据保证

        person: function() {
            console.log('come in to  two page ....')
          return {

            name: "Ari",

            email: "ari@fullstack.io"

          }

        }

      }
     })
     .state('three',{
         url:'/three',
         templateUrl:'/three/page.html',
         controller:'threeCtor'
     })

}])

/**
 * Created by Administrator on 2016/6/7.
 */

app.controller('Home',function($scope,$http,$state){
    $http({
        url:'/indexPage',
        method:'GET'
    }).then(function mySuccess(response){
        console.log(JSON.stringify(response.data,null,2))
        $scope.data = response.data;
    })

});
app.controller('twoCtol',function($scope,$http,$state){
    // $http({
    //     url:'/indexPage',
    //     method:'GET'
    // }).then(function mySuccess(response){
    //     console.log(JSON.stringify(response.data,null,2))
    // })
    console.log('get tow page')


});
app.controller('threeCtor',function($scope,$http,$state){
    console.log('three page')

});