angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, AuthService, DataService, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.authData = {};
  $scope.loggedUser = {};
  $scope.CityInfo = {};
  $scope.cropData = {};

  $scope.loggedUser = localStorage.getItem('loggedUser');
  if ($scope.loggedUser != null || $scope.loggedUser != undefined ) {
    console.log("user already logged in ")
    console.log($scope.loggedUser);
    $state.go('app.dashboard');
  }

  $scope.CityInfo = DataService.getCity();
  console.log($scope.CityInfo);
  $scope.showAlert = function(title, message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });

   alertPopup.then(function(res) {
     console.log('Redirecting the user');
   });
 }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.authData);
    var ret = AuthService.loginAuth($scope.authData);
    console.log("return object ");
    console.log(ret);

    if (ret) {
      $scope.showAlert("Login successfull", "Now ready to use the app :)!!");
      localStorage.setItem('loggedUser', JSON.stringify(ret));
      $scope.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      console.log('Logged user info');
      console.log($scope.loggedUser);
      $state.go('app.dashboard');
    } else {
      $scope.showAlert("Login Failed", "Please give correction login details :(");
    } 


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      //$scope.closeLogin();
    }, 1000);
  };

  $scope.showIntro = function() {
    $state.go('intro');
  }
  $scope.getin = function() {
    console.log("Exit from Intro screen");
   $scope.loggedUser = localStorage.getItem('loggedUser');
   if ($scope.loggedUser != null || $scope.loggedUser != undefined ) {
    console.log("user already logged in ")
    console.log($scope.loggedUser);
    $state.go('app.playlists');
  }  else { 
    $state.go('login');
   }
  }

  $scope.doLogout = function() {
    console.log("logging out");
    localStorage.setItem('loggedUser', JSON.stringify([]));
    $scope.loggedUser = {};
    console.log("cleared data loggeduser ", localStorage.getItem('loggedUser'));
    $state.go('login');
  }
  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {
    console.log('Doing Signup', $scope.authData);
    var ret = AuthService.signupAuth($scope.authData);

    if (ret) {
        $scope.showAlert("Signup successfull", "Now you can login to use the app!!");
        $state.go('login');
    } else {
      $scope.showAlert("Signup Failed", "Try again, next time!!");
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      //$scope.closeLogin();
    }, 1000);
  };
  $scope.resetPassword = function() {
    console.log('Doing resetPassword', $scope.authData);

    var ret = AuthService.forgotPassword($scope.authData);
    console.log("forgot password return object");
    console.log(ret);
        if (ret) {
          console.log("reset password ", ret.password);
          $scope.showAlert("Reset successfull", "your temp password : " + ret.password);
          $state.go('login');
        } else {
          $scope.showAlert("Invalid mobile ", "Try again, next time!!");
        }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      //$scope.closeLogin();
    }, 1000);
  }

    $scope.startAnalysis = function() {
    console.log("start Analysis", $scope.cropData);
    $state.go('app.startAnalysis');
  };

})

.controller('AnalysisCtrl', function($scope, $stateParams, $state, $ionicLoading, $timeout) {


  console.log('landed in analysis');
  $scope.showMeData = function() {
    console.log("showing the result");

      // Setup the loader
      $ionicLoading.show({
        content: 'Analysing your Risk',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      
      // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
      $timeout(function () {
        $ionicLoading.hide();
        $state.go('app.showMeResult');
      }, 2000);
      
  }    

})
.controller('showMeResultCtrl', function($scope, DataService, $state) {

    console.log("Inside showMeResultCtrl");

$scope.showCropDetails = function() {
  console.log("Showing list of crops");
  $state.go('app.playlists');
}
 /*   onPageLoad();
    
    function onPageLoad() {
      $('.loading').show();
      ta = loadTradeoffAnalytics('ta', onTAReady);
    }
    
    function loadTradeoffAnalytics(node, callback) {
      var taClient = new TradeoffAnalytics({
          dilemmaServiceUrl: '/demo/dilemmas',
      }, node);
      taClient.start(callback);
      return taClient;
    }

    function onTAReady() {
      $.getJSON(problemPath, function(problem) {
        ta.show(problem, function () {
          $('.loading', ta.node).hide();
          ta.resize();
        });
      });
    }
}
*/
    //$(document).ready(onPageLoad);
})
.controller('PlaylistsCtrl', function($scope, DataService, $state) {
  $scope.playlists = DataService.getCropDetails();

  $scope.showCropDetails = function() {
  console.log("Showing list of crops");
  $state.go('app.search');
}



})

.controller('SchemeCtrl', function($scope, DataService, $state, $ionicPopup) {
  $scope.scheme = DataService.getSchemeDetails();
  console.log("scheme", $scope.scheme);

  $scope.takeScheme = function() {
  console.log("Showing list of crops");

   var alertPopup = $ionicPopup.alert({
     title: "Confirmation",
     template: "You have taken "+ $scope.scheme.title + " scheme"
   });

   alertPopup.then(function(res) {
     console.log('Redirecting the user');
     $state.go('app.insurenceAgent');
   });
  
}
})
.controller('riskAnalyzerCtrl', function($scope, DataService, $ionicLoading, $timeout, $state) {
  console.log("riskAnalyzerCtrl");

    $scope.showScheme = function() {
        console.log("Showing scheme");
      $state.go('app.browse');
    }

  $scope.analysRisk = function() {
    console.log("Analysing your risk");


      // Setup the loader
      $ionicLoading.show({
        content: 'Analysing your Risk',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      
      // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
      $timeout(function () {
        $ionicLoading.hide();
        $state.go('app.riskResult');
      }, 2000);
      
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams, DataService) {
  console.log('showing crop details');
  $scope.cropDetails = DataService.getCropById($stateParams);
  console.log("Got the info from service", $scope.cropDetails);
});
