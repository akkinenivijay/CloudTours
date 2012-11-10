function UserDetailsWindow(_args) {

	var _ = require('underscore')._;

	var win1 = Titanium.UI.createWindow({
		title : 'Tab 1',
		backgroundColor : '#fff'
	});

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