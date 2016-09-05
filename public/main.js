/**
 * Created by Administrator on 2016/8/6.
 * author Baiyu
 */
var app = angular.module('myApp', ['ui.router', 'ngMaterial']);
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/index.html');
  $urlRouterProvider.when('/home/', 'home');
  $urlRouterProvider.when('/two/', 'two');
  $urlRouterProvider.when('/three/', 'three');
  $urlRouterProvider.when('/register/', 'register');
  $urlRouterProvider.when('/login/', 'login');
  //..省略代码
  $locationProvider.html5Mode(true);
  $stateProvider     //也可以自己写路由块
    .state('error', {
      url: '/404',
      template: '<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
    })
    .state('index.html', {
      url: '/index.html',
      template: '<div class="text-center"><h1>页面不存在404！</h1>' +
      '<div class="text-center"><a ui-sref="pageOne">跳转到首页</a></div></div>'
    })
    .state('home', {
      url: '/',
      templateUrl: '/one/page.html',
      controller: 'Home',
    })
    .state('two', {
      url: '/two',
      templateUrl: '/two/page.html',
      controller: 'twoCtol',
      resolve: {
        //这个函数的值会被直接返回，因为它不是数据保证
        person: function () {
          console.log('come in to  two page ....')
        }
      }
    })
    .state('three', {
      url: '/three',
      templateUrl: '/three/page.html',
      controller: 'threeCtor'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/registers/page.html',
      controller: 'regCtor'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/login/page.html',
      controller: 'loginCtor'
    })

}])

/**
 * Created by Administrator on 2016/6/7.
 */

app.controller('Home', function ($scope, $http) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://baidu.com';
  $scope.title = '雨滴';
  $http({
    url: '/home',
    method: 'GET',
    params: { type: 'ajax' }
  }).then(function mySuccess(response) {
    console.dir(JSON.stringify(response.data, null, 2))
    console.log(response.data)
    $scope.data = response.data;
  })

});
app.controller('twoCtol', function ($scope, $http) {
  console.log('get tow page')
  $scope.title = '雨神'

});
app.controller('threeCtor', function ($scope, $http) {
  console.log('three page')

});
app.controller('regCtor', function ($scope, $http) {
  $scope.title = '注册';
  $scope.goRegister = function() {
    if ($scope.user == undefined || $scope.user.length < 5) {
      $scope.errText = '用户名不能为空，或不能少于5个长度';
      return;
    }
    if ($scope.password =='' || $scope.password.length < 6) {
      $scope.errText = '密码不能为空，或不能少于6个长度';
      return;
    }
    var data = {
      user: $scope.user,
      password: $scope.password
    }
    console.log(data)
    $http({
      url:'/register',
      method: 'POST',
      data: data,
      contentType: 'application/json',
      dataType: 'json'
    }).then(function mySucces(success){
      $scope.errText = '注册成功';
      console.log(JSON.stringify(success,null,2))
      
    }, function myError(){
       $scope.errText = '注册失败！';
    })
    
  }
});
app.controller('loginCtor', function ($scope, $http) {
  $scope.title = '登录';
  $scope.goLogin = function() {
    if ($scope.user =='' || $scope.user.length < 5) {
      $scope.errText = '用户名不能为空，或不能少于5个长度';
      return;
    }
    if ($scope.password =='' || $scope.user.length < 6) {
      $scope.errText = '密码不能为空，或不能少于6个长度';
      return;
    }
    var data = {
      user: $scope.user,
      password: $scope.password
    }
    $http({
      url:'/login',
      method: 'post',
      data: data
    }).then(function mySuccess(success){
      $scope.errText = '登录成功';
      console.log(JSON.stringify(success,null,2))
      
    }, function myError(){
       $scope.errText = '账号或密码不正确！';
    })
  }
});