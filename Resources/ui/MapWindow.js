function MapWindow() {
	var win = Ti.UI.createWindow();
	var mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {
			latitude : 33.45,
			longitude : -84.23,
			latitudeDelta : 0.5,
			longitudeDelta : 0.5
		},
		animate : true,
		regionFit : true,
		userLocation : true
	});
	//win.add(mapview);
	return win;
}

module.exports = MapWindow;
