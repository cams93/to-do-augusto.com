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
      date: '2015-11-02T06:00:00.000Z',
      category: 'None',
      done: false
    },{
      title: 'Jugar xbox',
      description: 'Jugr el miercoles por la tarde',
      date: '2015-11-02T06:00:00.000Z',
      category: 'None',
      done: false
      }
      ,{
        title: 'Jugar xbox',
        description: 'Jugr el miercoles por la tarde',
        date: '2015-11-02T06:00:00.000Z',
        category: 'None',
        done: false
      }
      ,{
        title: 'Jugar xbox',
        description: 'Jugr el miercoles por la tarde',
        date: '',
        category: 'None',
        done: false
      }
    ];

    $scope.categories = [
      {cat: 'Personal'},
      {cat: 'Shopping'},
      {cat: 'Work'},
      {cat: 'Errands'},
      {cat: 'Movies to watch'}
      ];

    $scope.addNewCategory = function() {
      $scope.categories.push({cat:$scope.taskCategory});
      $scope.taskCategory='';
    };

    //$scope.removeChoice = function() {
    //  var lastItem = $scope.choices.length-1;
    //  $scope.choices.splice(lastItem);
    //};

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
    };
    $scope.deleteCompleted = function(){};

    /*$scope.doSecondaryAction = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('')
          .content('')
          .ariaLabel('')
          .ok('Done!')
          .targetEvent(event)
      );
    };*/

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $scope.toggleLeft2 = buildDelayedToggler('left2');
    $scope.toggleRight2 = buildToggler('right2');
    $scope.isOpenRight2 = function(){
      return $mdSidenav('right2').isOpen();
    };

    $scope.toggleLeft3 = buildDelayedToggler('left3');
    $scope.toggleRight3 = buildToggler('right3');
    $scope.isOpenRight3 = function(){
      return $mdSidenav('right3').isOpen();
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

    /*$scope.showTabDialog = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/main/taskCreator.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
            $scope.task.push({title:answer[0], description:answer[1], date:answer[2], category:answer[3], done:false});
        });
    };*/

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
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
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  /*.config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-grey', 'default')
      .primaryPalette('blue')
      .accentPalette('indigo')
      .warnPalette('red')
      .backgroundPalette('grey',{'default':'100'});
  })*/
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          //$log.debug("close RIGHT is done");
        });
    };
  })
  .controller('LeftCtrl2', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left2').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl2', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right2').close()
        .then(function () {
          //$log.debug("close RIGHT is done");
        });
    };
  })
  .controller('LeftCtrl3', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left3').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl3', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right3').close()
        .then(function () {
          //$log.debug("close RIGHT is done");
        });
    };
  });

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    if(!answer[0]=='' || !answer[0]==undefined) {
      $mdDialog.hide(answer);
    }
  };
}

//ng-click="showTabDialog($event)"


