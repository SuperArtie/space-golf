(function(){
  'use strict';
  angular.module('space-golf')
  .controller('MainCtrl', ['$scope', function($scope){
    var canvas  = document.getElementById('game'),
        ctx     = canvas.getContext('2d'),
        centerX = canvas.width/2,
        centerY = canvas.height/2,
        //centerX = Math.random() * (canvas.width - canvas.width/8),
        //centerY = Math.random() * (canvas.height- canvas.height/8),
        tiltX,
        tiltY,
        x = centerX,
        y = centerY,
        iT = Date.now(),
        T;
    $scope.title = 'cosmic chess- i mean golf. yes this is golf gaem';
    $scope.hideGame = true;
    $scope.start = function(){
      $scope.showGame = true;
      $scope.hideGame = false;

      window.requestAnimationFrame(draw);
    };
    window.addEventListener('deviceorientation', function(data){
      $scope.T = data.timeStamp - iT;
      T = (data.timeStamp - iT)/1000;
      tiltX = data.gamma;
      tiltY = data.beta;
      $scope.data = data;
      $scope.tiltX = data.gamma;
      $scope.tiltY = data.beta;
      if(tiltX < 1 && tiltX > -1 && tiltY < 1 && tiltY > -1){
        iT = Date.now();
      }
      x += tiltX * T;
      y += tiltY * T;
      if(x >= canvas.width){
        x = canvas.width;
      }else if(x <= 0){
        x = 0;
      }
      if(y >= canvas.height){
        y = canvas.height;
      }else if(y <= 0){
          y = 0;
      }
      if(x < 20 && x > 60 && y < 20 && y > 60){
        window.cancelAnimationFrame(draw);
      }
      $scope.$digest();
    });
    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(25,25,30,30);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
      ctx.stroke();
      window.requestAnimationFrame(draw);
    }
  }]);
})();
