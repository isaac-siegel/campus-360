angular.module('starter.services', [])

.factory('Schools', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var schools = [{
    id: 0,
    schoolId: "someSchoolId",
    name: 'UCLA',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    schoolId: "anotherSchoolId1",
    name: 'USC',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    schoolId: "anotherSchoolId2",
    name: 'Cal Poly Pomona',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    schoolId: "anotherSchoolId3",
    name: 'Cal Poly SLO',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }];

  return {
    all: function() {
      return schools;
    },
    remove: function(school) {
      schools.splice(schools.indexOf(school), 1);
    },
    get: function(schoolId) {
      for (var i = 0; i < schools.length; i++) {
        if (schools[i].schoolId == schoolId) {
          return schools[i];
        }
      }
      return null;
    }
  };
})

.factory('Spheres', function($http) {
  // Some fake testing data

  var spheres = [];

  return {
    all: function(schoolId) {

      var set_spheres = function(spheres_data){

        // spheres = spheres_data;
        spheres = [{
          id: "sphereId1",
          lat: '34.0569591',
          lng: '-117.8206354',
        }, {
          id: "sphereId2",
          lat: '34.0573394',
          lng: '-117.8198981',
        }]
      }

      var data = $http({
        method: 'GET',
        url: '/get_spheres/schoolId'
      })

      data.then(set_spheres,set_spheres)

      return data
    },
    remove: function(sphere) {
      spheres.splice(spheres.indexOf(sphere), 1);
    },
    get: function(sphereId) {
      for (var i = 0; i < spheres.length; i++) {
        if (spheres[i].id == sphereId) {
          return spheres[i];
        }
      }
      return null;
    }

  };
});


