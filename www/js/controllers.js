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

  $scope.schools = Schools.all();
  $scope.remove = function(chat) {
    Schools.remove(chat);
  };
})

.controller('SchoolSpheresCtrl', function($scope, $stateParams, Spheres) {

  $scope.spheres = []

  var set_spheres = function(spheres_data){

    spheres_data = [{
      id: "sphereId1",
      lat: '34.0569591',
      lng: '-117.8206354',
    }, {
      id: "sphereId2",
      lat: '34.0573394',
      lng: '-117.8198981',
    }]

    $scope.spheres = spheres_data

    console.log($scope.spheres)
  }

  Spheres.all($stateParams.schoolId).then(set_spheres, set_spheres);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SphereCtrl', function($scope, $stateParams, Spheres) {
  // $scope.sphere = Spheres.get($stateParams.sphereId);

  var sphereId = $stateParams.sphereId
  $scope.sphere = Spheres.get(sphereId)

  var map;
  var panorama;

  initMap(Number($scope.sphere.lat), Number($scope.sphere.lng) )

  function initMap(sphere_lat, sphere_lng) {
    console.log("INIT MAP")

    var coords = {lat: sphere_lat, lng: sphere_lng };
    var sv = new google.maps.StreetViewService();

    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

    // Set up the map.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coords,
      zoom: 16,
      streetViewControl: false
    });

    // Set the initial Street View camera to the center of the map
    sv.getPanorama({location: coords, radius: 50}, processSVData);

    // Look for a nearby Street View panorama when the map is clicked.
    // getPanoramaByLocation will return the nearest pano when the
    // given radius is 50 meters or less.
    map.addListener('click', function(event) {
      sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
    });
  }

  function processSVData(data, status) {
    if (status === 'OK') {
      var marker = new google.maps.Marker({
        position: data.location.latLng,
        map: map,
        title: data.location.description
      });

      panorama.setPano(data.location.pano);
      panorama.setPov({
        heading: 270,
        pitch: 0
      });
      panorama.setVisible(true);

      marker.addListener('click', function() {
        var markerPanoID = data.location.pano;
        // Set the Pano to use the passed panoID.
        panorama.setPano(markerPanoID);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);
      });
    } else {
      console.error('Street View data not found for this location.');
    }
  }

});
