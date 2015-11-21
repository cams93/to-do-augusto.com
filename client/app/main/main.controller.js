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
  .controller('tasks', function($scope, $http, $mdDialog, $timeout, $mdSidenav, $log) {

    $scope.task = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.task = awesomeThings;
    });

    $scope.categories = [];

    $http.get('/api/categorys').success(function(awesomeThings) {
      $scope.categories = awesomeThings;
    });

    $scope.filters = {done: false};
    $scope.filterCategory = {category: 'None'};
    $scope.section={sec:'Inbox'};

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

    $scope.taskWithoutCategory = function(category)
    {
      var del = false;
      for(var i = 0; i<$scope.task.length; i++)
      {
        if($scope.task[i].category==category && !del)
        {
          $scope.deleteTask($scope.task[i]);
          del = true;
        }
      }
      if(del)
      {
        $scope.taskWithoutCategory(category);
      }
    };

    $scope.removeCompleted = function()
    {
      for (var i = 0; i < $scope.task.length; i++) {
        if($scope.task[i].done == true){
          $http.delete('/api/things/' + $scope.task[i]._id);
        }
      }
      $scope.task = $scope.task.filter(function(task){
        return !task.done;
      });
    };

    $scope.pressTrue = function(task){

      $http.put('/api/things/' + task._id, {
        done : true
      });
    };

    $scope.pressFalse = function(task){

      $http.put('/api/things/' + task._id, {
        done : false
      });
    };

    $scope.addNewCategory = function() {
      if(!$scope.repeatCategory($scope.taskCategory))
      {
        if(!$scope.taskCategory=='' || !$scope.taskCategory==undefined)
        {
          $http.post('/api/categorys', {
            cat:$scope.taskCategory
          });

          $http.get('/api/categorys').success(function(awesomeThings) {
            $scope.categories = awesomeThings;
          });

          $scope.taskCategory='';
          $scope.formAddCat.$setPristine();
          $scope.formAddCat.$setUntouched();
        }
      }
    };

    $scope.editTask = function (task) {

      if(task.date==undefined || task.date=='')
      {
        $scope.editingTask = {  title: task.title,
          description: task.description,
          date: task.date,
          category: task.category };
      }
      else{
        $scope.editingTask = {  title: task.title,
          description: task.description,
          date: new Date(task.date),
          category: task.category };
      }

      $scope.originalTask = task;
    };

    $scope.updateTask = function (task) {

      $http.put('/api/things/' + $scope.originalTask._id, {
        title: task.title,
        description: task.description,
        date: task.date,
        category: task.category
      });

      $scope.originalTask.title = task.title;
      $scope.originalTask.description = task.description;
      $scope.originalTask.date = task.date;
      $scope.originalTask.category = task.category;

      $scope.originalTask = undefined;
      $scope.editingTask = undefined;
      $scope.formEditTask.$setPristine();
      $scope.formEditTask.$setUntouched();
    };

    $scope.deleteTask = function(task){
      var index = $scope.task.indexOf(task);
      if (index != -1) {
        $http.delete('/api/things/' + task._id);
        $scope.task.splice(index, 1);
      }
    };

    $scope.editCategory = function (category) {
      $scope.editingCategory = {cat: category.cat};
      $scope.originalCategory = category;
    };

    $scope.updateCategory = function (category) {
      if(!$scope.repeatCategory(category.cat)) {
        for (var i = 0; i < $scope.task.length; i++) {
          if ($scope.task[i].category == $scope.originalCategory.cat) {

            $http.put('/api/things/' + $scope.task[i]._id, {
              category: category.cat
            });

            $scope.task[i].category = category.cat;
          }
        }

        $http.put('/api/categorys/' + $scope.originalCategory._id, {
          cat: category.cat
        });

        $scope.originalCategory.cat = category.cat;
        $scope.originalCategory = undefined;
        $scope.editingCategory = undefined;
        $scope.formCategory.$setPristine();
        $scope.formCategory.$setUntouched();
        $scope.close3()
      }
    };

    $scope.deleteCategory = function(category){
      var index = $scope.categories.indexOf(category);
      if (index != -1) {
        $http.delete('/api/categorys/' + category._id);
        $scope.taskWithoutCategory(category.cat);
        $scope.categories.splice(index, 1);
      }
    };

    $scope.addtask = function(){
      if(!$scope.task.title=='' || !$scope.task.title==undefined) {
        if ($scope.task.category == '' || $scope.task.category == undefined) {
          $scope.task.category = 'None';
        }

        $http.post('/api/things', {
          title: $scope.task.title,
          description: $scope.task.description,
          date: $scope.task.date,
          category: $scope.task.category,
          done: false
        });

        $http.get('/api/things').success(function(awesomeThings) {
          $scope.task = awesomeThings;
        });

        $scope.task.title = '';
        $scope.task.description = '';
        $scope.task.date = '';
        $scope.task.category = '';
        $scope.formAddTask.$setPristine();
        $scope.formAddTask.$setUntouched();
        $scope.close2()
      }
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

