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
  var spheres = [];
  var spheres_cache = [];

  function upscale_thumbnail_urls(spheres){

    //cases
    //http://lh5.googleusercontent.com/proxy/she5o37T6q2JrCilL-TIgxp2Mlcg8N6PiNZ6-aepC9RpfKXpaX9SlJOx_XJyRWxQxOgGDnZYY__yLVLu1bk52TqS-DJ4MA=w203-h152
    //http://lh3.googleusercontent.com/-vZNFLhF7_s4/VxPGFwRTHbI/AAAAAAAAV3A/p7NuliC9tcYe9I_RQnbSngTE0dJO_1rWACJkC/w203-h100-k-no-pi-0-ya30.500006-ro-0-fo100/


    for (var i = 0; i < spheres_cache.length; i++) {
      sphere = spheres_cache[i];

      var origional = sphere.thumbnail_url;
      // console.log(origional)
      var upscaled = "";

      var index_of_size_params = origional.indexOf("&w=");

      if (index_of_size_params != -1){
        upscaled = origional.slice(0,index_of_size_params) + "&w=800&h=400" + origional.slice(index_of_size_params+12)
      }
      else {

        // split = sphere.thumbnail_url.split("/");
        //
        // params = split[split.length - 2];
        // params = params.split("-");
        // params[0] = "w800";
        // params[1] = "h400";
        //
        // split[split.length - 2] = params.join("-");
        // upscaled = split.join("/")

        index_of_size_params = origional.indexOf("w203")
        upscaled = origional.slice(0,index_of_size_params) + "w800-h400" + origional.slice(index_of_size_params+9)

      }

      sphere.thumbnail_url = upscaled;
      // console.log(upscaled)
      // console.log()

      spheres_cache[i] = sphere
    }
  }

  return {
    all: function(schoolId) {

      spheres = $http({
        method: 'GET',
        url: BASE_SERVER_URL + '/get_spheres',
        params: { school_id: schoolId }
      }).then(function(data){
        // console.log(data)
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
})

.factory('Favorites', function($http) {
  // Some fake testing data
  var spheres = []
  var spheres_cache = []

  function upscale_thumbnail_urls(spheres){
    for (var i = 0; i < spheres_cache.length; i++) {
      sphere = spheres_cache[i];

      var origional = sphere.thumbnail_url;
      var upscaled = "";

      var index_of_size_params = origional.indexOf("&w=");

      if (index_of_size_params != -1){
        upscaled = origional.slice(0,index_of_size_params) + "&w=800&h=400" + origional.slice(index_of_size_params+12)
      }
      else {

        split = sphere.thumbnail_url.split("/");

        params = split[split.length - 2];
        params = params.split("-");
        params[0] = "w800";
        params[1] = "h400";

        split[split.length - 2] = params.join("-");
        upscaled = split.join("/")
      }

      sphere.thumbnail_url = upscaled;
      spheres_cache[i] = sphere
    }
  }

  return {
    all: function(sphere_ids) {

      spheres = $http({
        method: 'GET',
        url: BASE_SERVER_URL + '/get_favorites',
        params: { sphere_ids: sphere_ids }
      }).then(function(data){
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
})

.factory('SavedFavorites', function() {
  return {
    all: function() {
      var saved_favorites_string = window.localStorage['saved_favorites'];
      if(saved_favorites_string) {
        return angular.fromJson(saved_favorites_string);
      }
      return [];
    },
    save: function(favorites) {
      window.localStorage['saved_favorites'] = angular.toJson(favorites);
    }
  }
})

.factory('Featured', function($http) {
  var spheres = []
  var spheres_cache = []

  function upscale_thumbnail_urls(spheres){
    for (var i = 0; i < spheres_cache.length; i++) {
      sphere = spheres_cache[i];

      var origional = sphere.thumbnail_url;
      var upscaled = "";

      var index_of_size_params = origional.indexOf("&w=");

      if (index_of_size_params != -1){
        upscaled = origional.slice(0,index_of_size_params) + "&w=800&h=400" + origional.slice(index_of_size_params+12)
      }
      else {

        split = sphere.thumbnail_url.split("/");

        params = split[split.length - 2];
        params = params.split("-");
        params[0] = "w800";
        params[1] = "h400";

        split[split.length - 2] = params.join("-");
        upscaled = split.join("/")
      }

      sphere.thumbnail_url = upscaled;
      spheres_cache[i] = sphere
    }
  }

  return {
    all: function() {

      spheres = $http({
        method: 'GET',
        url: BASE_SERVER_URL + '/get_featured'
      }).then(function(data){
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




