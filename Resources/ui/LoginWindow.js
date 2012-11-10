function LoginWindow() {

	var loginWindow = Ti.UI.createWindow({
		title : 'Cloud Tours',
		exitOnClose : true
	});

	var loginView = Ti.UI.createView({
		title : 'Cloud Tours',
		backgroundColor : '#000'
	});

	Ti.Facebook.appid = '300595040051770';
	Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

	loginView.add(Ti.Facebook.createLoginButton({
		top : 105,
		zIndex : 100,
		style : Ti.Facebook.BUTTON_STYLE_WIDE
	}));
	
	loginWindow.add(loginView);

	return loginWindow;
};

module.exports = LoginWindow;