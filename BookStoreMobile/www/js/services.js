<<<<<<< HEAD
angular.module('dresser.services', [])

.factory('Dressers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var dressers = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return dressers;
    },
    remove: function(dresser) {
    	dressers.splice(dressers.indexOf(dresser), 1);
    },
    get: function(dresserId) {
      for (var i = 0; i < dressers.length; i++) {
      	if (dressers[i].id === parseInt(dresserId)) {
      		return dressers[i];
        }
      }
      return null;
    }
  };
});
=======
var base = 'http://localhost/bookstore/api/values';

angular.module('BookStoreMobile.services', [])

.factory('Loader', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {

    var LOADERAPI = {

        showLoading: function (text) {
            text = text || 'Loading...';
            $ionicLoading.show({
                template: text
            });
        },

        hideLoading: function () {
            $ionicLoading.hide();
        },

        toggleLoadingWithMessage: function (text, timeout) {
            var self = this;

            self.showLoading(text);

            $timeout(function () {
                self.hideLoading();
            }, timeout || 3000);
        }

    };
    return LOADERAPI;
}])

.factory('BooksFactory', ['$http', function ($http) {

    var BooksFactory = {};
    BooksFactory.getBookList = function () {
        return $http.get(base + '/BookList');
    },
	BooksFactory.getBookListById = function (id) {
	    return $http({
	        method: 'GET',
	        url: base + '/BookListById?id=' + id,
	    })
	}
    return BooksFactory;
}])
.factory('ReservationFactory', ['$http', function ($http) {
    var ReservationFactory = {};
    ReservationFactory.addToReserv = function (reserv) {
        return $http({
            method: 'POST',
            url: base + '/AddToReservations',
            data: {
                BookID: reserv.bookId,
                CheckinDate: reserv.CheckinDate,
                CheckoutDate: reserv.CheckoutDate
            }
        })
    }
    return ReservationFactory;
}])
.factory('CartFactory', ['$http',
function ($http) {
    var CartFactory = {};
    CartFactory.addToCart = function (book) {
        return $http({
            method: 'POST',
            url: base + '/AddToCarts',
            data: {
                bookId: book.bookId,
                title: book.title,
                short_description: book.short_description,
                rating: book.rating,
                price: book.price
            }
        })
    },
	CartFactory.getCartItems = function () {
	    return $http.get(base + '/CartList');
	}
    return CartFactory;
}
])
.factory('RegisterFactory', ['$http',
function ($http) {
    var RegisterFactory = {};
    RegisterFactory.register = function (user) {
        return $http({
            method: 'POST',
            url: base + '/register',
            data: {
                email: user.email,
                name: user.name,
                password: user.password
            }
        })
    },
	RegisterFactory.login = function (user) {
	    return $http({
	        method: 'POST',
	        url: base + '/login',
	        data: {
	            email: user.email,
	            password: user.password
	        }
	    })
	}
    return RegisterFactory;
}
])
>>>>>>> df38c3c5b3dc6360483cee9cf9ece839685852d7
