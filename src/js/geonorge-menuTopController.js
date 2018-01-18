

(function () {
  var app = angular.module("geonorge");
  var baseurl = searchOption.geonorgeUrl;
  app.controller('menuTopController', [
    '$scope', '$http',
    function ($scope, $http) {
     
      function handleSuccess(respons) {

          $scope.menuItems = respons.data;
          
          // Show menu when loaded
          var menuElement = document.getElementById('top-menu');
          menuElement.firstChild.style.display = 'block';

      }

      function handleError() {
        $scope.getMenuError = true;
      }

      $scope.getMenuData = function getMenuData() {

          var language = "";
          if (cultureData.currentCulture == "en")
              language = '/en';
          var menuService = baseurl + language + '/api/menu';
          var request = $http({
            method: 'GET',
            url: menuService,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            data: {}
          });
          return request.then(handleSuccess, handleError);
      };
      
    }]);
}());
