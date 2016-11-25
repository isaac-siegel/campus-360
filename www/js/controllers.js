angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('SchoolsCtrl', function($scope, Schools) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Schools.all().then(function(data){$scope.schools = data.data;});

  // $scope.schools.then(function(data){console.log(data)},function(data){console.log(data)})

  $scope.remove = function(chat) {
    Schools.remove(chat);
  };
})

.controller('SchoolSpheresCtrl', function($scope, $stateParams, $window, Spheres, SavedFavorites) {

  Spheres.all($stateParams.schoolId).then(function(data){
    $scope.spheres = data
    $scope.school_name = data[0].school_name
  });

  $scope.$on('$ionicView.enter', function(e) {
    var saved_favorites = SavedFavorites.all();

    $scope.save_favorite = function (sphere_id) {
      saved_favorites = SavedFavorites.all();
      saved_favorites.push(sphere_id);
      SavedFavorites.save(saved_favorites);
      saved_favorites = SavedFavorites.all();
    };

    $scope.unsave_favorite = function (sphere_id) {
      saved_favorites = SavedFavorites.all();

      var index = saved_favorites.indexOf(sphere_id);
      if (index !== -1) {
        saved_favorites.splice(index, 1);
      }

      SavedFavorites.save(saved_favorites);
      saved_favorites = SavedFavorites.all();
    };

    $scope.is_favorited = function (sphere_id) {
      return saved_favorites.indexOf(sphere_id) != -1
    };
  });

})

.controller('FavoritesCtrl', function($scope, Favorites, SavedFavorites) {
  $scope.$on('$ionicView.enter', function(e) {
    var saved_favorites = SavedFavorites.all();

    Favorites.all(saved_favorites).then(function(data){$scope.spheres = data; })

    var saved_favorites = SavedFavorites.all();

    $scope.save_favorite = function(sphere_id){
      saved_favorites = SavedFavorites.all();
      saved_favorites.push(sphere_id);
      SavedFavorites.save(saved_favorites);
      saved_favorites = SavedFavorites.all();
    };

    $scope.unsave_favorite = function(sphere_id){
      saved_favorites = SavedFavorites.all();

      var index = saved_favorites.indexOf(sphere_id);
      if (index !== -1) {
        saved_favorites.splice(index, 1);
      }

      SavedFavorites.save(saved_favorites);
      saved_favorites = SavedFavorites.all();

      Favorites.all(saved_favorites).then(function(data){$scope.spheres = data; })
    };

    $scope.is_favorited = function(sphere_id) {
      return saved_favorites.indexOf(sphere_id) != -1
    };

  });
})

.controller('SphereCtrl', function($scope, $stateParams, Spheres) {

  $scope.$on('$ionicView.enter', function(e) {

    var sphereId = $stateParams.sphereId;

    console.log(sphereId);

    $scope.sphere = Spheres.get(sphereId);

    var map;
    var panorama;

    initMap(Number($scope.sphere.lat), Number($scope.sphere.lng) )
  });

})

.controller('FavoritesSphereCtrl', function($scope, $stateParams, Favorites) {
  $scope.$on('$ionicView.enter', function(e) {
    console.log("hi")

    var sphereId = $stateParams.sphereId;

    console.log(sphereId);

    $scope.sphere = Favorites.get(sphereId);

    var map;
    var panorama;

    initMap(Number($scope.sphere.lat), Number($scope.sphere.lng) )
  });

});


function initMap(sphere_lat, sphere_lng) {
  console.log("INIT MAP")

  var coords = {lat: sphere_lat, lng: sphere_lng };
  var sv = new google.maps.StreetViewService();

  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

  // umbrella_pano = "F:-EvM02VL6Jlw/VxPGGPeiyFI/AAAAAAAAV3Q/eSYacYrZWaEAXvUziqwo46glV9EhfJ8NQCJkC"
  // panorama.setPano(umbrella_pano)

  // Set the initial Street View camera to the center of the map
  sv.getPanorama({location: coords, radius: 50}, processSVData);

  // Look for a nearby Street View panorama when the map is clicked.
  // getPanoramaByLocation will return the nearest pano when the
  // given radius is 50 meters or less.
}

function processSVData(data, status) {
  if (status === 'OK') {
    // var marker = new google.maps.Marker({
    //   position: data.location.latLng,
    //   map: map,
    //   title: data.location.description
    // });

    panorama.setPano(data.location.pano);

    panorama.setPano()
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);

    // marker.addListener('click', function() {
    //   var markerPanoID = data.location.pano;
    //   // Set the Pano to use the passed panoID.
    //   panorama.setPano(markerPanoID);
    //   panorama.setPov({
    //     heading: 270,
    //     pitch: 0
    //   });
    //   panorama.setVisible(true);
    // });
  } else {
    console.error('Street View data not found for this location.');
  }
}
