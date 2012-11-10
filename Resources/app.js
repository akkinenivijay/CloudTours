// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var LoginWindow = require('ui/LoginWindow');
var _tabGroup = Titanium.UI.createTabGroup();

var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'Tab 1'
});

var win2 = Titanium.UI.createWindow({
	title : 'Tab 2',
	backgroundColor : '#fff'
});

var label2 = Titanium.UI.createLabel({
	color : '#999',
	text : 'I am Window 2',
	font : {
		fontSize : 20,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : 'center',
	width : 'auto'
});

win2.add(label2);

var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Tab 2',
	window : win2
});

_tabGroup.addTab(tab1);
_tabGroup.addTab(tab2);

var facebookLoginWindow = new LoginWindow();

Ti.Facebook.addEventListener('login', function(e) {
	if (e.success) {
		tabGroup.open();
	} else if (e.error) {
		alert(e.error);
	} else if (e.cancelled) {
		alert("Canceled");
	}
});

Ti.Facebook.addEventListener('logout', function(e) {
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
			alert(e.error);
		} else {
			alert('Oops No Doughnut for you!!');
		}
	});

} else {
	facebookLoginWindow.open();
}