function LogoutWindow() {
	var logoutView = Ti.UI.createView({
		title : 'settings',
		backgroundColor : '#000'
	});

	var logoutWindow = Ti.UI.createWindow({
		title : 'Cloud Tours'
	});

	logoutView.add(Ti.Facebook.createLoginButton({
		top : 105,
		zIndex : 100,
		style : Ti.Facebook.BUTTON_STYLE_WIDE
	}));

	logoutWindow.add(logoutView);
	
	return logoutWindow;
}

module.exports = LogoutWindow;