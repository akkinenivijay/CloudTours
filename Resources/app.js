// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var LoginWindow = require('ui/LoginWindow');
var MapWindow = require('ui/MapWindow');
var LogoutWindow = require('ui/LogoutWindow');

var _tabGroup = Titanium.UI.createTabGroup();

var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'User Details'
});

var win2 = new MapWindow();

var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Map',
	window : win2
});


var logoutWindow = new LogoutWindow();

var tab3 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Settings',
	window : logoutWindow
});

_tabGroup.addTab(tab1);
_tabGroup.addTab(tab2);
_tabGroup.addTab(tab3);

var facebookLoginWindow = new LoginWindow();

Ti.Facebook.addEventListener('login', function(e) {
	if (e.success) {
		_tabGroup.open();
	} else if (e.error) {
		alert(e.error);
	} else if (e.cancelled) {
		alert("Canceled");
	}
});

Ti.Facebook.addEventListener('logout', function(e) {
	_tabGroup.close();
	facebookLoginWindow.open();
});

if (Ti.Facebook.loggedIn) {
	Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		if (e.success) {
			var UserDetailsWindow = require('ui/UserDetailsWindow');
			var userDetailsWindow = new UserDetailsWindow({
				tabGroup : _tabGroup,
				user : e.result
			});
			_tabGroup.open();
		} else if (e.error) {
			alert('Error Login to APP' + e.error);
		} else {
			alert('Oops No Doughnut for you!!');
		}
	});

} else {
	facebookLoginWindow.open();
}