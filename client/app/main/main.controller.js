'use strict';

angular.module('toDoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

angular
  .module('toDoApp')
  .controller('tasks', function($scope) {
    $scope.task = [{
      title: 'hhhh',
      description: '',
      date: '',
      category: '',
      done: false
    }];
    $scope.categories = ('Personal,Shopping,Work,Errands,Movies to watch')
      .split(',').map(function(category) {
      return {abbrev: category};
    });
    $scope.addtask = function(){
      $scope.task.push({'title':$scope.newTask, description: '', date: '', category: '', 'done':false});
      $scope.newTask = '';
    };
    $scope.deleteCompleted = function(){};

  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-grey', 'default')
      .primaryPalette('blue')
      .accentPalette('indigo')
      .warnPalette('red')
      .backgroundPalette('grey',{'default':'200'});
  });



