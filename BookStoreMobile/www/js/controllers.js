angular.module('dresser.controllers', [])

<<<<<<< HEAD
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
=======


.controller('AppCtrl', ['$rootScope', '$ionicModal', '$location', 'RegisterFactory', '$scope', 'Loader',
	function ($rootScope, $ionicModal, $location, RegisterFactory, $scope, Loader) {
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
	                    localStorage.setItem("user", JSON.stringify(data));
	                    console.log(JSON.parse(localStorage.getItem("user")));
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
	                    localStorage.setItem("user", JSON.stringify(data));
	                    console.log(JSON.parse(localStorage.getItem("user")));
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
	        localStorage.removeItem("user");
	        $rootScope.isAuthenticated = false;
	        console.log(JSON.parse(localStorage.getItem("user")));
	        Loader.toggleLoadingWithMessage('Successfully Logged  Out!', 2000);
	    }
	    if (JSON.parse(localStorage.getItem("user")) == null) {
	        $rootScope.$broadcast('showLoginModal', $scope, null, function () {
	            // user is now logged in
	            $location.path('/app/browse');
	            $scope.$broadcast('login');
	        });
	    }
	}])
.controller('BrowseCtrl', ['$scope', 'BooksFactory', 'Loader',
    	function ($scope, BooksFactory, Loader) {
    	    Loader.showLoading();
    	    $scope.books = [];
    	    var books = [];
    	    if (books.length > 0) {
    	        $scope.books = books;
    	        Loader.hideLoading();
    	    } else {
    	        BooksFactory.getBookList().success(function (data) {
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
>>>>>>> df38c3c5b3dc6360483cee9cf9ece839685852d7

.controller('DressersDetailCtrl', function ($scope, $stateParams, Dressers) {
	$scope.dresser = Dressers.get($stateParams.dresserId);
})

<<<<<<< HEAD
.controller('SearchCtrl', function ($scope) {
});
=======
.controller('BookCtrl', ['$scope', '$state', '$rootScope', 'CartFactory', 'BooksFactory', 'ReservationFactory', 'Loader',
 function ($scope, $state, $rootScope, CartFactory, BooksFactory, ReservationFactory, Loader) {
     var bookId = $state.params.bookId;
     $scope.books = {};
     BooksFactory.getBookListById(bookId).success(function (data) {
         $scope.books = data;
     }).error(function (err, statusCode) {
         Loader.hideLoading();
         Loader.toggleLoadingWithMessage(err.message);
     });

     $scope.$on('addToCart', function () {
         Loader.showLoading('Adding to Cart..');
         CartFactory.addToCart($scope.books).success(function (data) {
             Loader.hideLoading();
             Loader.toggleLoadingWithMessage('Successfully added ' + $scope.books.title + ' with title book to your cart', 2000);
         }).error(function (err, statusCode) {
             Loader.hideLoading();
             Loader.toggleLoadingWithMessage(err.message);
         });
     });

     $scope.addToCart = function () {
         if (JSON.parse(localStorage.getItem("user")) == null) {
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
.controller('CartCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'CartFactory', 'Loader',
	function ($scope, $rootScope, $location, $timeout, CartFactory, Loader) {
	    $scope.$on('getCart', function () {
	        Loader.showLoading('Fetching Your Cart..');
	        CartFactory.getCartItems().success(function (data) {
	            $scope.books = data;
	            //	console.log(data);
	            Loader.hideLoading();
	        }).error(function (err, statusCode) {
	            Loader.hideLoading();
	            Loader.toggleLoadingWithMessage(err.message);
	        });
	    });
	    if (JSON.parse(localStorage.getItem("user")) == null) {
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
>>>>>>> df38c3c5b3dc6360483cee9cf9ece839685852d7
