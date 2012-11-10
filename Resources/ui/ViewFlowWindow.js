function ViewFlowWindow() {

	var win = Ti.UI.createWindow({
		title : 'Cover Flow'
	});

	var animate = Ti.UI.createAnimation({
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 1500
	});

	var vWindow = Ti.UI.createView({
		left : 0,
		width : 640,
		backgroundColor : 'yellow'
	});

	animate.addEventListener('complete', function() {
		vWindow.myIndex = (vWindow.myIndex ? 0 : 1);

		var vThis = vWindow.myViews[vWindow.myIndex], vPrevious = vWindow.myViews[vWindow.myIndex ? 0 : 1];

		vWindow.myIsType = '';

		vWindow.right = null;
		vWindow.left = 0;

		vPrevious.right = null;
		vPrevious.left = 320;

		vThis.right = null;
		vThis.left = 0;

	});

	vWindow.myViews = [Ti.UI.createView({
		left : 0,
		width : 320,
		backgroundColor : 'white',
		borderColor : 'green',
		borderWidth : 5,
		zIndex : 100
	}), Ti.UI.createView({
		left : 260,
		width : 320,
		backgroundColor : 'red',
		borderColor : 'white',
		borderWidth : 5
	})];

	vWindow.add(vWindow.myViews);
	vWindow.myIndex = 0;
	vWindow.myIsType = '';

	vWindow.addEventListener('swipe', doShow);

	win.add(vWindow);

	function doShow(e) {
		var direction = e.direction, index = (vWindow.myIndex ? 0 : 1), views = vWindow.myViews, toView = views[index];
		Ti.API.info(e.direction + index + views + toView);

		if (vWindow.myIsType == '') {
			vWindow.myIsType = e.type;

			if (direction == 'left' || direction == 'right') {
				if (direction == 'left') {
					animate.left = null;

					animate.right = 320;
					toView.left = 320;
				} else {
					animate.right = null;

					animate.left = 320;
					toView.left = -320;
				}

				vWindow.animate(animate);
			}
		}
		//vWindow.animate(animate);
	}

	return win;
}

module.exports = ViewFlowWindow;
