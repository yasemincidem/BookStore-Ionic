// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('dresser', ['ionic', 'dresser.controllers', 'dresser.services'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
		var div = document.getElementById("map_canvas");
		var map = plugin.google.maps.Map.getMap(div);
	});
})

.config(function ($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	  .state('dresser', {
	  	url: "/dresser",
	  	cache: false,
	  	abstract: true,
	  	templateUrl: "templates/tabs.html",
	  	controller: "DresserCtrl"
	  })
	   .state('dresser.login', {
	   	url: "/login",
	   	cache: false,
	   	views: {
	   		'tabContent': {
	   			templateUrl: 'templates/login.html',
	   			controller: 'LoginCtrl'
	   		}
	   	}
	   })
	.state('dresser.reservations', {
		url: '/reservations',
		cache: false,
		views: {
			'tabContent': {
				templateUrl: 'templates/reservations.html',
				controller: 'ReservationsCtrl'
			}
		}
	})
 .state('dresser.reservationsDetail', {
 	url: '/reservations/:dresserId',
 	cache: false,
 	views: {
 		'tabContent': {
 			templateUrl: 'templates/reservationsDetail.html',
 			controller: 'ReservationsDetailCtrl'
 		}
 	}
 })
	.state('dresser.dresserList', {
		url: '/dressersList',
		cache: false,
		views: {
			'tabContent': {
				templateUrl: 'templates/dressersList.html',
				controller: 'DresserrsListCtrl'
			}
		}
	})
	  .state('dresser.dressersDetail', {
	  	url: '/dresserList/:dresserId',
	  	cache: false,
	  	views: {
	  		'tabContent': {
	  			templateUrl: 'templates/dressersDetail.html',
	  			controller: 'DressersDetailCtrl'
	  		}
	  	}
	  })
   
	.state('dresser.search', {
		url: '/search',
		cache: false,
		views: {
			'tabContent': {
				templateUrl: 'templates/search.html',
				controller: 'SearchCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/dresser/dressersList');

});
