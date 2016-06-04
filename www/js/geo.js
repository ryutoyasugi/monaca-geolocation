ons.bootstrap(); // アプリの初期化

ons.ready(function() { // アプリ起動時の処理
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

function onSuccess(position) {
  $('#speed').text(position.coords.speed); // 速度
  $('#latitude').text(position.coords.latitude); // 緯度
  $('#longitude').text(position.coords.longitude); // 経度
  $('#altitude').text(position.coords.altitude); // 高度
  $('#accuracy').text(position.coords.accuracy); // 位置精度
  $('#altitudeAccuracy').text(position.coords.altitudeAccuracy); // 高度精度
  $('#heading').text(position.coords.heading); // 方位
  $('#timestamp').text(position.timestamp); // タイムスタンプ
};
function onError(error) {
  ons.notification.alert({
    message: error.code + ' ' + error.message
  });
};

var watchId = null;
// 監視の開始
$('#start').click(function () {
  var options = {
    enableHighAccuracy: true
  };
  watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
  $('#start').prop("disabled", true);
  $('#stop').prop("disabled", false);
});
// 監視の停止
$('#stop').click(function () {
  navigator.geolocation.clearWatch(watchId);
  $('#start').prop("disabled", false);
  $('#stop').prop("disabled", true);
});