ons.bootstrap(); // アプリの初期化

var map;
ons.ready(function() { // アプリ起動時の処理
  // モーダル画面を表示
  myModal.show();
  // 高精度の位置情報を要求(衛星による測位)
  var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
});

function onSuccess(position) {
   // 緯度経度
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  // 地図のズーム値、センター位置、タイプを指定
  var mapOption = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // 地図を表示
  map = new google.maps.Map($('#map')[0], mapOption);
  google.maps.event.addListener(map, "tilesloaded", function() {
    myModal.hide();
  });
  putMarker();
};

function putMarker() {
  if(map) {
    var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(function(position) {
      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var marker = new google.maps.Marker({position: latlng, map: map});
    }, onError, options);
  }
};

function onError(error) {
  myModal.hide();
  var code = error.code;
  switch(code) {
    case 1:
      errorMessage = '位置情報の取得がユーザーによって許可されていません。';
      breake;
    case 2:
      errorMessage = '位置情報の取得が行えません。';
      breake;
    case 3:
      errorMessage = '時間切れです。位置情報が利用できない可能性があります。';
      breake;
    default:
      errorMessage = 'エラーが発生しました。' + code;
  }
  ons.notification.alert({ message: errorMessage });
};
