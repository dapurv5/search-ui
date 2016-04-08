'use strict';


var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'angularPromiseButtons'])
.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

myApp.controller('MainController', function ($scope, $http) {
  $scope.currentPage = 1;
  $scope.pageSize = 4;
  $scope.docs = [];
  $scope.search = {};
  $scope.search.searchString = "";

  $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
  };

  //console.log($scope.docs);
  //$scope.searchResults.unshift(JSON.parse(e.data));


  //Get search results on button click or Enter key on search box
  $scope.buttonClick = function(searchString) {
        console.log('clucked button ' + searchString);
        $scope.docs = [];

        $scope.yourPromise = $http({
          method: 'GET',
          url: 'http://localhost:5000/search/'+searchString
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("got results for " + searchString);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        for (var i = 1; i <= 1000; i++) {
            var title = "Heading1 "+searchString;
            var text = "He was visiting the United States when Adolf Hitler came to power in 1933 and, being Jewish, did not"+
                       "go back to Germany, where he had been a professor at the Berlin Academy of Sciences. He settled in the"+
                       ".S., becoming an American citizen in 1940.[10] On the eve of World War II, he endorsed a letter to"+
                       "President Franklin D. Roosevelt alerting him to the potential development of extremely powerful bombs"+
                       "of a new type and";
            var doc = {'title': title, 'text': i + text};
            //$scope.docs.unshift(doc);
            $scope.docs.push(doc);
        }
  };

  //This is a listener for autosuggest kind of feature
  $scope.$watch('search.searchString', function(newVal, oldVal){
      console.log("Search was changed to:"+newVal+" from " + oldVal);
      //clean docs if necessary
      //$scope.docs = [];
      $scope.search.watch = newVal;
      $scope.currentPage=1;
      //console.log($scope.docs);
  });
});


myApp.controller('OtherController', function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
});


//Directives