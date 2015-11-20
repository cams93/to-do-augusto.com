/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');

Thing.find({}).remove(function() {
  Thing.create({
      title: 'Hacer tarea de web 1',
      description: 'Desarrollar una aplicacion web para la clase',
      date: '',
      category: 'Personal',
      done: false
    },
    {
      title: 'Jugar xbox 2',
      description: 'Jugr el miercoles por la tarde',
      date: '',
      category: 'Personal',
      done: false
    },
    {
      title: 'Jugar xbox 3',
      description: 'Jugr el miercoles por la tarde',
      date: '',
      category: 'None',
      done: false
    },
    {
      title: 'Jugar xbox 4',
      description: 'Jugr el miercoles por la tarde',
      date: new Date(2015, 11, 10),
      category: 'None',
      done: false
    });
});

Category.find({}).remove(function() {
  Category.create(
    {cat: 'Personal'},
    {cat: 'Shopping'},
    {cat: 'Work'},
    {cat: 'Errands'},
    {cat: 'Movies to watch'}
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
