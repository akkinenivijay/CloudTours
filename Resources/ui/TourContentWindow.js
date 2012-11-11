function TourContentWindow(userDetails) {

	this.getAlbumCovers = function() {

		Ti.API.info(Titanium.Facebook.accessToken);

		Titanium.Facebook.requestWithGraphPath('me/albums', {
		}, 'GET', function(e) {
			if (e.success) {
				Ti.API.info(JSON.parse(e.result));
				if (e.result) {
					var data = JSON.parse(e.result);
					Ti.API.info(data);
				}

			} else if (e.cancelled) {
				Ti.API.info("user cancelled");
			} else {
				Ti.API.info(e.result);
			}
		});
	};

	var backButton = Titanium.UI.createButton({
		title : 'Back',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var win = Titanium.UI.createWindow({
		title : "Tour Info",
		backgroundColor : '#000',
		leftNavButton : backButton
	});

	var view = Titanium.UI.createView({
	});

	var textarea = Ti.UI.createTextArea({
		borderColor : '#000',
		color : '#000',
		value : 'Focus to see keyboard with toolbar',
		top : 10,
		width : 300,
		height : 250,
		editable : false,
		font : {
			fontSize : 16,
			fontFamily : 'Baroque Script'
		},
		opacity : 0.8,
		borderRadius : 5
	});

	view.add(textarea);

	win.add(view);

	backButton.addEventListener('click', function(e) {
		root.close();
	});

	nav = Titanium.UI.iPhone.createNavigationGroup({
		window : win
	});

	var img = Titanium.UI.createImageView({
		url : 'https://graph.facebook.com/' + userDetails.id + '/picture?height=125&width=125',
		top : 270,
		right : 10
	})

	win.add(img);

	var userName = Titanium.UI.createLabel({
		color : '#fff',
		text : userDetails.name,
		font : {
			fontSize : 16,
			fontFamily : 'Helvetica Neue'
		},
		width : 'auto',
		left : 5,
		top : 270
	});

	var userLocation = Titanium.UI.createLabel({
		color : '#fff',
		text : userDetails.location.name,
		font : {
			fontSize : 16,
			fontFamily : 'Helvetica Neue'
		},
		left : 5,
		top : 310
	});


	win.add(userName);
	win.add(userLocation);

	root = Titanium.UI.createWindow();
	root.add(nav);

	return root;
}

TourContentWindow.publicStaticMethod = function() {
	Ti.API.info('Hello all invoked properly');
}

TourContentWindow.publicStaticMember = 'PuSM';

module.exports = TourContentWindow;
