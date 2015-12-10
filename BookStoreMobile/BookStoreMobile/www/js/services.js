
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

.factory('LSFactory', [function () {

	var LSAPI = {

		clear: function () {
			return localStorage.clear();
		},

		get: function (key) {
			if (typeof localStorage["fav"] !== "undefined" && localStorage["fav"] !== "undefined") {
				return JSON.parse(localStorage.getItem(key));
			}
		},

		set: function (key, data) {
			return localStorage.setItem(key, JSON.stringify(data));
		},

		delete: function (key) {
			return localStorage.removeItem(key);
		}
	};

	return LSAPI;

}])


.factory('AuthFactory', ['LSFactory', function (LSFactory) {

	var userKey = 'user';
	var tokenKey = 'token';

	var AuthAPI = {

		isLoggedIn: function () {
			return this.getUser() === null ? false : true;
		},

		getUser: function () {
			return LSFactory.get(userKey);
		},

		setUser: function (user) {
			return LSFactory.set(userKey, user);
		},

		getToken: function () {
			return LSFactory.get(tokenKey);
		},

		setToken: function (token) {
			return LSFactory.set(tokenKey, token);
		},

		deleteAuth: function () {
			LSFactory.delete(userKey);
			LSFactory.delete(tokenKey);
		}

	};

	return AuthAPI;

}])

.factory('TokenInterceptor', ['$q', 'AuthFactory', function ($q, AuthFactory) {

	return {
		request: function (config) {
			config.headers = config.headers || {};
			var token = AuthFactory.getToken();
			var user = AuthFactory.getUser();

			if (token && user) {
				config.headers['X-Access-Token'] = token.token;
				config.headers['X-Key'] = user.email;
				config.headers['Content-Type'] = "application/json";
			}
			return config || $q.when(config);
		},

		response: function (response) {
			return response || $q.when(response);
		}
	};

}])


.factory('BooksFactory', ['$http', function ($http) {
	var API = {
		get: function () {
			return $http.get(base + '/BookList');
		}
	};
	return API;
}])
.factory('CartFactory', ['$http', 'AuthFactory',
function ($http, AuthFactory) {
	var CartFactory = {};
	CartFactory.addToCart = function (bookId) {
		return $http({
			method: 'POST',
			url: base + '/AddToCarts',
			data: {
				bookId: bookId,
			}
		})
	},
	CartFactory.getCartItems = function () {
		return $http.get(base + '/CartList');
	}
	return CartFactory;
}
])
.factory('RegisterFactory', ['$http', 'AuthFactory',
function ($http, AuthFactory) {
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
	RegisterFactory.logout = function () {
		AuthFactory.deleteAuth();
	}

	return RegisterFactory;
}
])