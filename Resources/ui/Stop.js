function TourStop(navigationController) {

	var backButton = Titanium.UI.createButton({
		title : 'Overview'
	});

	var win = Ti.UI.createWindow({
		leftNavButton : backButton,
		title : "Stop 1",
		backgroundColor : '#000'
	});

	var view = Ti.UI.createView({

	});

	var startStopButton = Titanium.UI.createButton({
		image : 'icons/button_play_red.png',
		top : 10,
		left : 40,
		zIndex : 100,
		backgroundImage : 'none',
		backgroundColor : 'transparent',
		borderColor : 'transparent'
	});

	var pauseResumeButton = Titanium.UI.createButton({
		image : 'icons/button_pause_red.png',
		top : 10,
		left : 90,
		enabled : false,
		zIndex : 100,
		backgroundImage : 'none',
		backgroundColor : 'transparent',
		borderColor : 'transparent'
	});

	var activeMovie = Titanium.Media.createVideoPlayer({
		url : '/video/movie.mp4',
		backgroundColor : '#111',
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_EMBEDDED, // See TIMOB-2802, which may change this property name
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		width : 100,
		height : 80,
		zIndex : 100,
		left : 180,
		top : 20,
		autoplay : false
	});

	activeMovie.addEventListener('load', function() {
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(3);
	});

	activeMovie.addEventListener('complete', function() {
		Ti.API.debug('Completed!');
		var dlg = Titanium.UI.createAlertDialog({
			title : 'Movie',
			message : 'Completed!'
		});
		if (Ti.Platform.name === "android") {
			// Gives a chance to see the dialog
			win.close();
			dlg.show();
		} else {
			activeMovie.setFullscreen(false);
			activeMovie.stop();
			dlg.show();
		}
	});

	view.add(activeMovie);

	var sound = Titanium.Media.createSound();
	sound.url = '/audio/stop1.mp3';

	startStopButton.addEventListener('click', function() {

		if (sound.playing || sound.paused) {
			sound.stop();
			startStopButton.setImage('icons/button_play_red.png');
			pauseResumeButton.enabled = false;
			if (Ti.Platform.name === 'android') {
				sound.release();
			}
		} else {
			startStopButton.setImage('icons/button_stop_red.png');
			sound.play();
			Ti.API.info("audio playing");
			pauseResumeButton.enabled = true;
		}
	});

	pauseResumeButton.addEventListener('click', function() {
		if (sound.paused) {
			sound.play();
		} else {
			sound.pause();
		}
	});

	sound.addEventListener('progress', function(e) {
		Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
	});

	sound.addEventListener('change', function(e) {
		Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
	});

	backButton.addEventListener('click', function() {
		activeMovie.stop();
		sound.stop();
		if (Ti.Platform.osname === 'android') {
			sound.release();
		}
		navigationController.close(win);
	});

	var CoverFlow = require('ui/CoverFlow');
	var coverFlowView = new CoverFlow();

	view.add(startStopButton);
	view.add(pauseResumeButton);
	view.add(coverFlowView);

	win.add(view);

	win.addEventListener('swipe', function() {
		activeMovie.stop();
		var TourStop = require('ui/Stop');
		var stopWindow = new TourStop(navigationController);
		nav.add(stopWindow, {
			animate : true
		});
		nav.open(stopWindow, {
			animate : true
		});
	});

	return win;

}

module.exports = TourStop;
