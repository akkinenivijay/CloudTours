function CoverFlowWindow() {

	var win = Titanium.UI.createWindow({
		title:'CoverFlow'
	});

	var view1 = Ti.UI.createView({
		backgroundColor : 'red'
	});
	var l1 = Ti.UI.createLabel({
		text : 'View 1',
		color : '#fff',
		width : 'auto',
		height : 'auto'
	});
	view1.add(l1);

	var view2 = Ti.UI.createView({
		backgroundColor : 'blue'
	});
	var l2 = Ti.UI.createLabel({
		text : 'Click Me (View 2 - see log)',
		color : '#fff',
		width : 'auto',
		height : 'auto'
	});
	view2.add(l2);

	var view3 = Ti.UI.createView({
		backgroundColor : 'green'
	});
	var l3 = Ti.UI.createLabel({
		text : 'View 3',
		color : '#fff',
		width : 'auto',
		height : 'auto'
	});
	view3.add(l3);

	// create coverflow view with images
	var view = Titanium.UI.iOS.createCoverFlowView({
		children : [view1, view2, view3],
		backgroundColor : '#000'
	});

	view.addEventListener('click', function(e) {
		Titanium.API.info("image clicked: " + e.index + ', selected is ' + view.selected);
	});

	// change listener when active image changes
	view.addEventListener('change', function(e) {
		Titanium.API.info("image changed: " + e.index + ', selected is ' + view.selected);
	});

	win.add(view);

	// change button to dynamically change the image
	var change = Titanium.UI.createButton({
		title : 'Change Image',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	change.addEventListener('click', function() {
		Titanium.API.info("selected is = " + view.selected);
		view.setImage(view.selected, '../images/imageview/28.jpg');
	});

	// move scroll view left
	var left = Titanium.UI.createButton({
		text:'Left'
	});
	
	left.addEventListener('click', function(e) {
		var i = view.selected - 1;
		if (i < 0) {
			i = 0;
		}
		view.selected = i;
	});

	// move scroll view right
	var right = Titanium.UI.createButton({
		text:'right'
	});
	
	right.addEventListener('click', function(e) {
		var i = view.selected + 1;
		if (i >= images.length) {
			i = images.length - 1;
		}
		view.selected = i;
	});
	
	var flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	win.setToolbar([flexSpace, left, change, right, flexSpace]);
	return win;
}

module.exports = CoverFlowWindow;
