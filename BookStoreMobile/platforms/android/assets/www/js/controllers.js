angular.module('dresser.controllers', [])

.controller('DresserCtrl', function ($scope, $state) {
	$scope.Login = function () {
		$state.go('dresser.login');
	}
})
.controller('ReservationsCtrl', function ($scope, $state) {
})
	.controller('ReservationsDetailCtrl', function ($scope, $stateParams,$state, Dressers) {
		$scope.dresser = Dressers.get($stateParams.dresserId);
	})
.controller('LoginCtrl', function ($scope) { })
.controller('DresserrsListCtrl', function ($scope, Dressers, $state) {
	$scope.dressers = Dressers.all();
	$scope.remove = function (dresser) {
		Dressers.remove(dresser);
	}
	$scope.CreateReservation = function () {
		$state.go('dresser.search');
	}
})

.controller('DressersDetailCtrl', function ($scope, $stateParams, Dressers) {
	$scope.dresser = Dressers.get($stateParams.dresserId);
})

.controller('SearchCtrl', function ($scope) {
});
