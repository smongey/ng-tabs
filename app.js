var app = angular.module('demo', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	    .state('home', {
	        url: '/home',
	        templateUrl: '_home.html'
	    })

	    .state('services', {
	        url: '/services',
	        templateUrl: '_services.html'
	    })

	    .state('service', {
	        url: '/services/:slug',
	        views: {
	        	'nav' : {
			        templateUrl: '_single.html',
			        controller: function($scope, $stateParams, services) {
			            
						services.success(function(data){

							$scope.single = getSingle(data, $stateParams);
						
						});
		   				
			        }
		    	}
		    }
	    })

	    .state('service.tab', {
	        url: '/:tab',
	        views: {
	        	'tab' : {
			        templateUrl: '_tab.html',
	        		controller: function($scope, $stateParams, services) {
						
						services.success(function(data){
							
							$scope.single = getSingle(data, $stateParams);
							var tabs = $scope.single.tabs;

							$scope.individual = getTab(tabs, $stateParams);

						});
				    }
	        	}
	        }
	    });    

});


app.controller('ServiceCtrl', function($scope, services){

	$scope.name = "Tab Demo";

	services.success(function(data){
		$scope.services = data;
	});
});




app.factory('services', function($http) {
	return $http.get('services.json').
	  success(function(data) {
	    return data
	  }).
	  error(function(data, status, headers, config) {
	    console.log('nope');
	  });	
});


function getSingle(data, $stateParams) {
	
	var current;

	for (var i = 0; i < data.length; i++) {
		if (data[i].slug === $stateParams.slug) {
			current = data[i];
		}
	}
	return current;
}


function getTab(tabs, $stateParams) {
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		if(tabs[i].slug === $stateParams.tab) {
			tab = tabs[i];
		}
	};
	return tab;
}
