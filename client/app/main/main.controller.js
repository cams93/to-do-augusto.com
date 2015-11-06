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
  .controller('tasks', function($scope, $mdDialog) {
    $scope.task = [{
      title: 'Hacer tarea de web',
      description: 'Desarrollar una aplicacion web para la clase',
      date: '',
      category: 'None',
      done: false
    },{
      title: 'Jugar xbox',
      description: 'Jugr el miercoles por la tarde',
      date: '',
      category: 'None',
      done: false
      },{
      title: 'Visitar a mi novia',
      description: 'Ir al parque y comer un helado',
      date: '',
      category: 'None',
      done: false
      }
    ];
    $scope.categories = ('None,Personal,Shopping,Work,Errands,Movies to watch')
      .split(',').map(function(category) {
      return {abbrev: category};
    });
    $scope.addtask = function(){
      if($scope.task.category=='' || $scope.task.category==undefined)
      {
        $scope.task.category='None';
      }
      $scope.task.push({title:$scope.newTask, description:$scope.task.description, date:$scope.task.date, category:$scope.task.category, done:false});
      $scope.newTask = '';
      $scope.task.description = '';
      $scope.task.date = '';
      $scope.task.category = '';
    };
    $scope.deleteCompleted = function(){};

    $scope.doSecondaryAction = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('')
          .content('')
          .ariaLabel('')
          .ok('Neat!')
          .targetEvent(event)
      );
    };

  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-grey', 'default')
      .primaryPalette('blue')
      .accentPalette('indigo')
      .warnPalette('red')
      .backgroundPalette('grey',{'default':'100'});
  });




