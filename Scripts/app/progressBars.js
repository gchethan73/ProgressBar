
var appModule = angular.module('progressBars', ['ngAnimate', 'ui.bootstrap']);

appModule.controller('ProgressBarCtrl', function ($scope, $http) {
    
    init = function () {
        $http({
            method: 'GET',
            url: 'https://pb-api.herokuapp.com/bars'
        }).then(function(response) {
            $scope.buttons = response.data.buttons;
            $scope.bars = response.data.bars;
            $scope.limit = response.data.limit;

            initValues();

        }, function(response) {
            alert('An error occurred while getting the values.');
        });
    }
    
    function initValues() {
        $scope.barArray = [];
        angular.forEach($scope.bars, function (value, key) {
            $scope.barArray.push({ dropDownText: 'Progress-' + key, dropDownValue: value, index: key });
        });

        $scope.selectedProgressBar = $scope.barArray[0];
    }

    $scope.ChangeValue = function (value) {
        var currentValue = $scope.bars[$scope.selectedProgressBar.index];
        if ((currentValue + value) > 0)
        {
            $scope.bars[$scope.selectedProgressBar.index] += value;
        }
        else
        {
            $scope.bars[$scope.selectedProgressBar.index] = 0;
        }
    }

    init();


});