// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps";
    apiKey = "AIzaSyDAo_ggbQHx4jwSLbNyaaQ6hrocZ59UMWw"
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
    document.body.appendChild(script);


  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.schools', {
      url: '/schools',
      views: {
        'tab-schools': {
          templateUrl: 'templates/tab-schools.html',
          controller: 'SchoolsCtrl'
        }
      }
    })
    .state('tab.school-spheres', {
      url: '/school-spheres/:schoolId',
      views: {
        'tab-schools': {
          templateUrl: 'templates/school-spheres.html',
          controller: 'SchoolSpheresCtrl'
        }
      }
    })
    .state('tab.sphere', {
      url: '/sphere/:sphereId',
      views: {
        'tab-schools': {
          templateUrl: 'templates/sphere.html',
          controller: 'SphereCtrl'
        }
      }
    })
    .state('tab.favorites-sphere', {
      url: '/favorites-sphere/:sphereId',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/sphere.html',
          controller: 'FavoritesSphereCtrl'
        }
      }
    })
    .state('tab.featured-sphere', {
      url: '/featured-sphere/:sphereId',
      views: {
        'tab-home': {
          templateUrl: 'templates/sphere.html',
          controller: 'FeaturedSphereCtrl'
        }
      }
    })

  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

  $ionicConfigProvider.tabs.position('bottom'); // other values: top

  $ionicConfigProvider.navBar.alignTitle('center')

  $ionicConfigProvider.backButton.text('Back')

});
