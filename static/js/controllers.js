'use strict';


var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

myApp.controller('MainController', function ($scope, $http) {
  $scope.currentPage = 1;
  $scope.pageSize = 5;
  $scope.docs = [];
  $scope.search = {};
  $scope.search.searchString = "";

  $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
  };

  //console.log($scope.docs);
  //$scope.searchResults.unshift(JSON.parse(e.data));

  $scope.$watch('search.searchString', function(newVal, oldVal){
      console.log("Search was changed to:"+newVal);
      $scope.search.watch = newVal;
      $scope.docs = []
      for (var i = 1; i <= 50; i++) {
          var title = "Heading1 "+newVal;
          var text = "He was visiting the United States when Adolf Hitler came to power in 1933 and, being Jewish, did not"+
                     "go back to Germany, where he had been a professor at the Berlin Academy of Sciences. He settled in the"+
                     ".S., becoming an American citizen in 1940.[10] On the eve of World War II, he endorsed a letter to"+
                     "President Franklin D. Roosevelt alerting him to the potential development of extremely powerful bombs"+
                     "of a new type and";
          var doc = {'title': title, 'text': i + text};
          //$scope.docs.unshift(doc);
          $scope.docs.push(doc);
      }
      $scope.currentPage=1;
      console.log($scope.docs);
  });
});


myApp.controller('OtherController', function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
});


//Directives