// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var LoginWindow = require('ui/LoginWindow');
var MapWindow = require('ui/MapWindow');
var LogoutWindow = require('ui/LogoutWindow');
var ScrollableView = require('ui/ScrollableView');
var CoverFlowWindow = require('ui/CoverFlowWindow');
var ViewFlowWindow = require('ui/ViewFlowWindow');

var _tabGroup = Titanium.UI.createTabGroup();

var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'Tour Search'
});

var win2 = new MapWindow();

var tab2 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Tour Info ',
	window : win2
});

var userDetails;

var logoutWindow = new LogoutWindow();

var scrollWindow = new ScrollableView();

var viewFlowWindow = new ViewFlowWindow();

var tab3 = Titanium.UI.createTab({
	icon : 'KS_nav_ui.png',
	title : 'Settings',
	window : viewFlowWindow
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

			userDetails = JSON.parse(e.result);

			var TourSearchWindow = require('ui/TourSearchWindow');
			var TourSearchWindow = new TourSearchWindow({
				tabGroup : _tabGroup,
				user : userDetails
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

Ti.App.addEventListener('navigateToTourPresentation', function(e) {

	Ti.API.info(Titanium.Facebook.uid);

	var MyClass = require('ui/MyClass');
	var test = new MyClass();
	Ti.API.info(test.publicInstanceMember);

	var TourContentWindow = require('ui/TourContentWindow');
	var root = new TourContentWindow(userDetails);
	Ti.API.info(TourContentWindow.publicStaticMember);
	TourContentWindow.publicStaticMethod();
	Ti.API.info('Hellooooooooooo');
	Ti.API.info('Hellooooooooooo2');
	root.open();

});
