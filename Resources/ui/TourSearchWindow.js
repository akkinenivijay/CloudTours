function TourSearchWindow(_args) {

	var _ = require('underscore')._;

	var flipButton = Titanium.UI.createButton({
		top : 5,
		left : 285,
		image : 'icons/flip_icon.png',
		zIndex : 100
	});

	var win1 = Titanium.UI.createWindow({
		title : 'Tour Search',
		backgroundColor : '#000',
		navBarHidden : true
	});

	var linearGradient = Ti.UI.createView({
		top : 0,
		width : 320,
		height : 43,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '0%',
				y : '50%'
			},
			endPoint : {
				x : '100%',
				y : '50%'
			},
			colors : [{
				color : '#eee',
				offset : 0.5
			}, {
				color : '#000',
				offset : 1.0
			}],
		}
	});

	var searchView = Titanium.UI.createView({
		top : 0,
		backgroundColor : '#000',
		height : 43,
		width : 320
	});

	searchView.add(linearGradient);

	var search = Titanium.UI.createSearchBar({
		barColor : '#000',
		showCancel : false,
		height : 43,
		top : 0,
		left : 0,
		width : 280
	});

	searchView.add(search);
	win1.add(searchView);

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

	var tourSearchTableView = Titanium.UI.createTableView({
		top : 43
	});

	search.addEventListener('change', function(e) {
		Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
	});

	search.addEventListener('cancel', function(e) {
		Titanium.API.info('search bar cancel fired');
		search.blur();
	});

	search.addEventListener('return', function(e) {
		searchView.add(flipButton);

		/*Titanium.UI.createAlertDialog({
		 title : 'Search Bar',
		 message : 'You typed ' + e.value
		 }).show();*/
		search.blur();

		var tourSearchData = [{
			title : 'Inman Park Tour'
		}, {
			title : 'Georgia Tech Tour'
		}, {
			title : 'ATL Downtown Tour'
		}, {
			title : 'Stone Mountain Tour'
		}];

		setDataToTourSearchTableView(tourSearchData);
		addAnnotationsToMapView(tourSearchData);
	});

	search.addEventListener('focus', function(e) {
		Titanium.API.info('search bar: focus received');
	});

	search.addEventListener('blur', function(e) {
		Titanium.API.info('search bar:blur received');
	});

	var currentIndex = 1;

	flipButton.addEventListener('click', function() {
		Titanium.API.info('Button Clicked');

		var m_front_to_back = Ti.UI.create3DMatrix();
		m_front_to_back = m_front_to_back.rotate(-90, 0, 1, 0);

		// animate the front of the menu item to the back
		var a_front_to_back = Ti.UI.createAnimation({
			transform : m_front_to_back,
			duration : 200
		});

		win1.animate(a_front_to_back);

		a_front_to_back.addEventListener('complete', function() {
			Ti.API.info('showFront: Animating the back to the front.');
			if (currentIndex === 1) {
				win1.remove(mapview);
				win1.add(tourSearchTableView);
				currentIndex = 2;
			} else {
				win1.remove(tourSearchTableView);
				win1.add(mapview);
				currentIndex = 1;
			}

			var m_back_to_front = Ti.UI.create3DMatrix();
			m_back_to_front = m_back_to_front.rotate(0, 0, 1, 0);

			var a_back_to_front = Ti.UI.createAnimation({
				transform : m_back_to_front,
				duration : 200,
				curve : Ti.UI.ANIMATION_CURVE_EASE_OUT
			});

			win1.animate(a_back_to_front);
		});
	});

	var setDataToTourSearchTableView = function(tourSearchData) {
		tourSearchTableView.data = tourSearchData;
		var tourRow = Titanium.UI.createTableViewRow({
			title : 'GA Tech'
		});
		tourSearchTableView.appendRow(tourRow);
	}
	var addAnnotationsToMapView = function(tourSearchData) {
		var gaTechAnnotation = Titanium.Map.createAnnotation({
			latitude : 33.778463,
			longitude : -84.408881,
			title : "Georgia Tech",
			subtitle : 'Atlanta, GA',
			pincolor : Titanium.Map.ANNOTATION_GREEN,
			animate : true,
			myid : 1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		mapview.removeAllAnnotations();
		mapview.addAnnotation(gaTechAnnotation);
	}

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

module.exports = TourSearchWindow;