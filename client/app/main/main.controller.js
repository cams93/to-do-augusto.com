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
  .controller('tasks', function($scope, $mdDialog, $timeout, $mdSidenav, $log) {

    $scope.task = [{
      title: 'Hacer tarea de web',
      description: 'Desarrollar una aplicacion web para la clase',
      date: '',
      category: 'Personal',
      done: true
    },{
      title: 'Jugar xbox',
      description: 'Jugr el miercoles por la tarde',
      date: '',
      category: 'Personal',
      done: false
      }
      ,{
        title: 'Jugar xbox',
        description: 'Jugr el miercoles por la tarde',
        date: '',
        category: 'None',
        done: false
      }
      ,{
        title: 'Jugar xbox',
        description: 'Jugr el miercoles por la tarde',
        date:  new Date(2015, 11, 10),
        category: 'None',
        done: false
      }
    ];

    $scope.filters = {done: false};
    $scope.filterCategory = {category: 'None'};
    $scope.section={sec:'Inbox'};

    $scope.categories = [
      {cat: 'Personal'},
      {cat: 'Shopping'},
      {cat: 'Work'},
      {cat: 'Errands'},
      {cat: 'Movies to watch'}
      ];

    $scope.repeatCategory = function(category)
    {
      for(var i = 0; i<$scope.categories.length; i++)
      {
        if($scope.categories[i].cat==category)
        {
          return true;
        }
      }
      return false;
    };

    $scope.addNewCategory = function() {
      if(!$scope.repeatCategory($scope.taskCategory))
      {
        if(!$scope.taskCategory=='' || !$scope.taskCategory==undefined)
        {
          $scope.categories.push({cat:$scope.taskCategory});
          $scope.taskCategory='';
          $scope.formAddCat.$setPristine();
          $scope.formAddCat.$setUntouched();
        }
      }
    };

    $scope.editTask = function (task) {
      $scope.editingTask = {  title: task.title,
                              description: task.description,
                              date: task.date,
                              category: task.category };
      $scope.originalTask = task;
    };

    $scope.updateTask = function (task) {
      $scope.originalTask.title = task.title;
      $scope.originalTask.description = task.description;
      $scope.originalTask.date = task.date;
      $scope.originalTask.category = task.category;
      $scope.originalTask = undefined;
      $scope.editingTask = undefined;
      $scope.formEditTask.$setPristine();
      $scope.formEditTask.$setUntouched();
    };

    $scope.editCategory = function (category) {
      $scope.editingCategory = {cat: category.cat};
      $scope.originalCategory = category;
    };

    $scope.updateCategory = function (category) {
      if(!$scope.repeatCategory(category.cat)) {
        for (var i = 0; i < $scope.task.length; i++) {
          if ($scope.task[i].category == $scope.originalCategory.cat) {
            $scope.task[i].category = category.cat;
          }
        }
        $scope.originalCategory.cat = category.cat;
        $scope.originalCategory = undefined;
        $scope.editingCategory = undefined;
        $scope.formCategory.$setPristine();
        $scope.formCategory.$setUntouched();
        $scope.close3()
      }
    };

    $scope.addtask = function(){
      if($scope.task.category=='' || $scope.task.category==undefined)
      {
        $scope.task.category='None';
      }
      $scope.task.push({title:$scope.task.title, description:$scope.task.description, date:$scope.task.date, category:$scope.task.category, done:false});
      $scope.task.title = '';
      $scope.task.description = '';
      $scope.task.date = '';
      $scope.task.category = '';
      $scope.formAddTask.$setPristine();
      $scope.formAddTask.$setUntouched();
    };

    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $scope.toggleRight2 = buildToggler('right2');
    $scope.isOpenRight2 = function(){
      return $mdSidenav('right2').isOpen();
    };

    $scope.toggleRight3 = buildToggler('right3');
    $scope.isOpenRight3 = function(){
      return $mdSidenav('right3').isOpen();
    };

    $scope.close = function () {
      $mdSidenav('right').close();
    };

    $scope.close2 = function () {
      $mdSidenav('right2').close();
      $scope.task.title = '';
      $scope.task.description = '';
      $scope.task.date = '';
      $scope.task.category = '';
      $scope.formAddTask.$setPristine();
      $scope.formAddTask.$setUntouched();
    };

    $scope.close3 = function () {
      $mdSidenav('right3').close();
    };

    $scope.toolTip = {
      showTooltip : false,
    };
    $scope.toolTip2 = {
      showTooltip : false,
    };
    $scope.toolTip3 = {
      showTooltip : false,
    };
    $scope.toolTip4 = {
      showTooltip : false,
    };

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle();
      }
    }
  });

