// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'AppCtrl'
  })
    .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/login.html',
    controller: 'AppCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/signup.html',
    controller: 'AppCtrl'
  })
    .state('forgot', {
    url: '/forgot',
    templateUrl: 'templates/auth/forgot.html',
    controller: 'AppCtrl'
  })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard/riskAnalyzer.html',
        controller: 'riskAnalyzerCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/scheme.html',
          controller: 'SchemeCtrl'
        }
      }
    })
  
    .state('app.insurenceAgent', {
      url: '/insurenceAgent',
      views: {
        'menuContent': {
          templateUrl: 'templates/insurence.html',
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard/dashboard.html',
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.startAnalysis', {
      url: '/startAnalysis',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard/startAnalysis.html',
          controller: 'AnalysisCtrl'
        }
      }
    })  
     .state('app.showMeResult', {
      url: '/showMeResult',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard/showMeResult.html',
          controller: 'showMeResultCtrl'
        }
      }
    })
      .state('app.riskResult', {
      url: '/riskResult',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard/riskResult.html',
          controller: 'riskAnalyzerCtrl'
        }
      }
    })          
  .state('app.single', {
    url: '/playlists/:cropId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
