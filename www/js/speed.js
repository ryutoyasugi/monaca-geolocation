ons.bootstrap(); // アプリの初期化

ons.ready(function() { // アプリ起動時の処理
  setInterval(getSpeed, 2000);
});

function getSpeed(position) {
  var options = {
    enableHighAccuracy: true
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
};

function onSuccess(position) {
  var speed = position.coords.speed;
  if(speed === -1) {
    $('#speed').text(0.0);
  } else {
    $('#speed').text((speed * 3.6).toFixed(1));
  }
};
function onError(error) {
  ons.notification.alert({
    message: error.code + ' ' + error.message
  });
};
