// BASE_SERVER_URL = "http://127.0.0.1:5000"
BASE_SERVER_URL = "http://siegelhorn.pythonanywhere.com"



angular.module('starter.services', [])

.factory('Schools', function($http) {
  // Might use a resource here that returns a JSON array


  // schools.then(function(data){console.log(data)},function(data){console.log(data)})

  return {
    all: function() {
      return $http({
        method: 'GET',
        url: BASE_SERVER_URL + '/get_schools/'
      });

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
  var spheres = []
  var spheres_cache = []

  function upscale_thumbnail_urls(spheres){
    for (var i = 0; i < spheres_cache.length; i++) {
      sphere = spheres_cache[i]
      split = sphere.thumbnail_url.split("/")

      params = split[split.length - 2]
      params = params.split("-")
      params[0] = "w800"
      params[1] = "h400"

      split[split.length - 2] = params.join("-")
      upscaled = split.join("/")
      sphere.thumbnail_url = upscaled

      spheres_cache[i] = sphere
    }
  }

  return {
    all: function(schoolId) {
      console.log(schoolId)

      spheres = $http({
        method: 'GET',
        url: BASE_SERVER_URL + '/get_spheres',
        params: { school_id: schoolId }
      }).then(function(data){
        console.log(data)
        spheres_cache = data.data

        upscale_thumbnail_urls(spheres_cache)

        return spheres_cache
      });

      return spheres
    },
    remove: function(sphere) {
      spheres.splice(spheres.indexOf(sphere), 1);
    },
    get: function(sphereId) {
      console.log(spheres_cache)

      for (var i = 0; i < spheres_cache.length; i++) {
        if (spheres_cache[i]._id.$oid == sphereId) {
          return spheres_cache[i];
        }
      }
      return null;
    }

  };
});


