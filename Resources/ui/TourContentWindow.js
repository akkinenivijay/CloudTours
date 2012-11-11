function TourContentWindow() {
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

	var send = Ti.UI.createButton({
		style : Ti.UI.iPhone.SystemButtonStyle.DONE,
		title : 'Send'
	});

	var camera = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CAMERA
	});

	var cancel = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CANCEL
	});

	var flexSpace = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var textarea = Ti.UI.createTextArea({
		borderColor : '#000',
		color : '#000',
		value : 'Focus to see keyboard with toolbar',
		top : 10,
		width : 300,
		height : 120,
		editable:false,
		font: {fontSize: 24, fontFamily: 'Baroque Script'}
	});
	
	view.add(textarea);

	win.add(view);

	backButton.addEventListener('click', function(e) {
		root.close();
	});

	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window : win
	});

	var root = Titanium.UI.createWindow();
	root.add(nav);

	return root;
}

module.exports = TourContentWindow;
