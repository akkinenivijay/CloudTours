function UserDetailsWindow(_args) {

	var _ = require('underscore')._;

	var flipButton = Titanium.UI.createButton({
		top : 44,
		left : 280,
		image : 'icons/flip_icon.png',
		zIndex : 100
	});

	var win1 = Titanium.UI.createWindow({
		title : 'Tour Search',
		backgroundColor : '#fff'
	});

	var search = Titanium.UI.createSearchBar({
		barColor : '#000',
		showCancel : true,
		height : 43,
		top : 0
	});

	win1.add(search);
	win1.add(flipButton);

	var mapview = Titanium.Map.createView({
		top : 44,
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {
			latitude : 33.778463,
			longitude : -84.398881,
			latitudeDelta : 0.2,
			longitudeDelta : 0.2
		},
		animate : true,
		regionFit : true,
		userLocation : true
	});

	win1.add(mapview);

	search.addEventListener('change', function(e) {
		Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);

	});

	search.addEventListener('cancel', function(e) {
		Titanium.API.info('search bar cancel fired');
		search.blur();
	});

	search.addEventListener('return', function(e) {
		Titanium.UI.createAlertDialog({
			title : 'Search Bar',
			message : 'You typed ' + e.value
		}).show();
		search.blur();
	});

	search.addEventListener('focus', function(e) {
		Titanium.API.info('search bar: focus received');
	});

	search.addEventListener('blur', function(e) {
		Titanium.API.info('search bar:blur received');
	});

	search.value = 'GA Tech';

	var test = _.clone(_args.user);

	//Please fix this somehow test.name is not retrieving the name from the json object, i dont understand this :)
	Ti.API.info("**************************************");
	Ti.API.info(test);
	Ti.API.info(test.name);
	Ti.API.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

	Ti.API.info(_args.user);
	Ti.API.info(_args.user.name);

	var userName = Titanium.UI.createLabel({
		color : '#ccc',
		text : _args.user.name,
		font : {
			fontSize : 20,
			fontFamily : 'Helvetica Neue'
		},
		textAlign : 'center',
		width : 'auto',
		height : '100'
	});

	Ti.API.info("**************************************");
	Ti.API.info(_args.user.name);
	Ti.API.info("**************************************");

	var userLocation = Titanium.UI.createLabel({
		color : '#ddd',
		text : _args.user.location,
		font : {
			fontSize : 20,
			fontFamily : 'Helvetica Neue'
		},
		textAlign : 'center',
		width : 'auto',
		height : '150'
	});

	Ti.API.info("**************************************");
	Ti.API.info(_args.user.location);
	Ti.API.info("**************************************");

	var userQuotes = Titanium.UI.createLabel({
		color : '#999',
		text : _args.user.quotes,
		font : {
			fontSize : 20,
			fontFamily : 'Helvetica Neue'
		},
		textAlign : 'center',
		width : 'auto',
		top : '20'
	});

	win1.add(userName);
	win1.add(userLocation);
	win1.add(userQuotes);

	_args.tabGroup.getTabs()[0].window = win1;

}

module.exports = UserDetailsWindow;
