function CoverFlow(index) {

	var coverView = Ti.UI.createView({

	});

	var images = [];
	for (var c = 0; c < 4; c++) {
		images[c] = '/coverflow/stop' + index + '/IMG_191' + c + '.jpg';
	}

	// create coverflow view with images
	var view = Titanium.UI.iOS.createCoverFlowView({
		images : images,
		backgroundColor : '#000'
	});

	coverView.add(view);

	return coverView;
};

module.exports = CoverFlow;
