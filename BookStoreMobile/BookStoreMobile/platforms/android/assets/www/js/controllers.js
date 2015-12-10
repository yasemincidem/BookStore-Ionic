angular.module('BookStoreMobile.controllers', [])

.controller('AppCtrl', ['$rootScope', '$ionicModal', 'AuthFactory', '$location', 'RegisterFactory', '$scope', 'Loader',
    function ($rootScope, $ionicModal, AuthFactory, $location, RegisterFactory, $scope, Loader) {

    	$rootScope.$on('showLoginModal', function ($event, scope, cancelCallback, callback) {
    		$scope.user = {
    			email: '',
    			password: ''
    		};

    		$scope = scope || $scope;

    		$scope.viewLogin = true;

    		$ionicModal.fromTemplateUrl('templates/login.html', {
    			scope: $scope
    		}).then(function (modal) {
    			$scope.modal = modal;
    			$scope.modal.show();

    			$scope.switchTab = function (tab) {
    				if (tab === 'login') {
    					$scope.viewLogin = true;
    				} else {
    					$scope.viewLogin = false;
    				}
    			}

    			$scope.hide = function () {
    				$scope.modal.hide();
    				if (typeof cancelCallback === 'function') {
    					cancelCallback();
    				}
    			}

    			$scope.login = function () {
    				Loader.showLoading('Authenticating...');

    				RegisterFactory.login($scope.user).success(function (data) {

    					data = data;
    					AuthFactory.setUser(data.user);

    					$rootScope.isAuthenticated = true;
    					$scope.modal.hide();
    					Loader.hideLoading();
    					if (typeof callback === 'function') {
    						callback();
    					}
    				}).error(function (err, statusCode) {
    					Loader.hideLoading();
    					Loader.toggleLoadingWithMessage(err.message);
    				});
    			}

    			$scope.register = function () {
    				Loader.showLoading('Registering...');

    				RegisterFactory.register($scope.user).success(function (data) {

    					data = data;
    					AuthFactory.setUser(data.user);

    					$rootScope.isAuthenticated = true;
    					Loader.hideLoading();
    					$scope.modal.hide();
    					if (typeof callback === 'function') {
    						callback();
    					}
    				}).error(function (err, statusCode) {
    					Loader.hideLoading();
    					Loader.toggleLoadingWithMessage(err.message);
    				});
    			}
    		});
    	});

    	$rootScope.loginFromMenu = function () {
    		$rootScope.$broadcast('showLoginModal', $scope, null, null);
    	}

    	$rootScope.logout = function () {
    		RegisterFactory.logout();
    		$rootScope.isAuthenticated = false;
    		$location.path('/app/browse');
    		Loader.toggleLoadingWithMessage('Successfully Logged Out!', 2000);
    	}


    }
])

.controller('BrowseCtrl', ['$scope', 'BooksFactory', 'Loader',
    	function ($scope, BooksFactory, Loader) {
    		Loader.showLoading();
    		$scope.books = [];
    		var books = [];
    		if (books.length > 0) {
    			$scope.books = books;
    			Loader.hideLoading();
    		} else {
    			BooksFactory.get().success(function (data) {
    				$scope.books = data;
    				$scope.$broadcast('scroll.infiniteScrollComplete');
    				Loader.hideLoading();
    			}).error(function (err, statusCode) {
    				Loader.hideLoading();
    				Loader.toggleLoadingWithMessage(err.message);
    			});
    		}
    	}
])


.controller('BookCtrl', ['$scope', '$state', 'LSFactory', 'AuthFactory', '$rootScope', 'CartFactory', 'Loader',
 function ($scope, $state, LSFactory, AuthFactory, $rootScope, CartFactory, Loader) {
 	var bookId = $state.params.bookId;
 	$scope.book = LSFactory.get(bookId);
 	$scope.$on('addToCart', function () {
 		Loader.showLoading('Adding to Cart..');
 		CartFactory.addToCart(bookId).success(function (data) {
 			Loader.hideLoading();
 			Loader.toggleLoadingWithMessage('Successfully added ' + bookId + 'with number book to your cart', 2000);
 		}).error(function (err, statusCode) {
 			Loader.hideLoading();
 			Loader.toggleLoadingWithMessage(err.message);
 		});

 	});

 	$scope.addToCart = function () {
 		if (!AuthFactory.isLoggedIn()) {
 			$rootScope.$broadcast('showLoginModal', $scope, null, function () {
 				// user is now logged in
 				$scope.$broadcast('addToCart');
 			});
 			return;
 		}
 		$scope.$broadcast('addToCart');
 	}
 }
])
.controller('CartCtrl', ['$scope', 'AuthFactory', '$rootScope', '$location', '$timeout', 'CartFactory', 'Loader',
	function ($scope, AuthFactory, $rootScope, $location, $timeout, CartFactory, Loader) {
		$scope.$on('getCart', function () {
			Loader.showLoading('Fetching Your Cart..');
			CartFactory.getCartItems().success(function (data) {
				$scope.books = data;
				console.log(data);
				Loader.hideLoading();
			}).error(function (err, statusCode) {
				Loader.hideLoading();
				Loader.toggleLoadingWithMessage(err.message);
			});
		});
		if (!AuthFactory.isLoggedIn()) {
			$rootScope.$broadcast('showLoginModal', $scope, function () {
				// cancel auth callback            
				$timeout(function () {
					$location.path('/app/browse');
				}, 200);
			}, function () {
				// user is now logged in           
				$scope.$broadcast('getCart');
			}); return;
		}
		$scope.$broadcast('getCart');
	}])

