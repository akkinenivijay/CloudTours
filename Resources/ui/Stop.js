function TourStop(navigationController) {

	var backButton = Titanium.UI.createButton({
		title : 'Back',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var win = Ti.UI.createWindow({
		leftNavButton : backButton,
		title : "Stop 1",
		backgroundColor : '#000'
	});

	var view = Ti.UI.createView({

	});

	var startStopButton = Titanium.UI.createButton({
		title : 'Start/Stop Streaming',
		top : 10,
		width : 200,
		height : 40
	});

	var pauseResumeButton = Titanium.UI.createButton({
		title : 'Pause/Resume Streaming',
		top : 40,
		width : 200,
		height : 40,
		enabled : false
	});

	//view.add(startStopButton);
	//view.add(pauseResumeButton);

	var audioPlayer = Ti.Media.createAudioPlayer({
		url : 'audio/stop1.mp3',
		allowBackground : true
	});

	startStopButton.addEventListener('click', function() {
		// When paused, playing returns false.
		// If both are false, playback is stopped.
		if (audioPlayer.playing || audioPlayer.paused) {
			audioPlayer.stop();
			pauseResumeButton.enabled = false;
			if (Ti.Platform.name === 'android') {
				audioPlayer.release();
			}
		} else {
			audioPlayer.start();
			pauseResumeButton.enabled = true;
		}
	});

	pauseResumeButton.addEventListener('click', function() {
		if (audioPlayer.paused) {
			audioPlayer.start();
		} else {
			audioPlayer.pause();
		}
	});

	audioPlayer.addEventListener('progress', function(e) {
		Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
	});

	audioPlayer.addEventListener('change', function(e) {
		Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
	});

	backButton.addEventListener('click', function() {
		audioPlayer.stop();
		if (Ti.Platform.osname === 'android') {
			audioPlayer.release();
		}
		navigationController.close(win);
	});

	/*
	 var coverFlowView = Titanium.UI.iOS.createCoverFlowView({
	 backgroundColor : '#000',
	 images : ['coverflow/stop1/IMG_1910.jpg', 'coverflow/stop1/IMG_1913.jpg', 'coverflow/stop1/IMG_1914.jpg', 'coverflow/stop1/IMG_1915.jpg'],
	 selected : 3,
	 height : 240,
	 width : 240
	 });
	 */
	
	var CoverFlow = require('ui/CoverFlow');
	var coverFlowView = new CoverFlow();
	
	view.add(coverFlowView);

	win.add(view);

	return win;

}

module.exports = TourStop;
