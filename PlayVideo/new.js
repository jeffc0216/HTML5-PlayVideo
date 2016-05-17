function doFirst(){
	barSize = 584;
	//先跟HTML產生關聯
	myMovie = document.getElementById('myMovie');
	playButton = document.getElementById('playButton');
	defaultBar = document.getElementById('defaultBar');
	progressBar = document.getElementById('progressBar');
	stopButton = document.getElementById('stopButton');
	upButton = document.getElementById('upButton');
	downButton = document.getElementById('downButton');
	mutueButton = document.getElementById('mutueButton');

	//再建立事件聆聽的功能
	playButton.addEventListener('click', playOrPause, false);
	defaultBar.addEventListener('click', clicked, false);
	myMovie.addEventListener('click', playOrPause, false); //直接按影片
	stopButton.addEventListener('click', movieStop, false);
	upButton.addEventListener('click', voiceUp, false);
	downButton.addEventListener('click', voiceDown, false);
    mutueButton.addEventListener('click', voiceMutue, false);
}

function playOrPause(){
	//如果影片正在跑的時候，按按鈕會停
	if(!myMovie.paused && !myMovie.ended) {
		myMovie.pause(); //暫停
		playButton.innerHTML = 'Play';
	} else { //影片暫停中或結束
		myMovie.play();
		playButton.innerHTML = 'Pause';
		setInterval(update,500);
	}
}

function movieStop(){
	myMovie.load();
	progressBar.style.width = '0px';
	playButton.innerHTML = 'Play';
}

function voiceUp() {
	setVol(.1);
}

function voiceDown() {
	setVol(-.1);
}

// change volume
function setVol(value) {
    var vol = myMovie.volume;
    vol += value;
    if (vol >= 0 && vol <= 1) {
        myMovie.volume = vol;
    } else {
        myMovie.volume = (vol < 0) ? 0 : 1;                        
    }
}

function voiceMutue(evt){
	if (myMovie.muted) {
        myMovie.muted = false;
    } else {
        myMovie.muted = true;
    }
}

function update(){
	//影片沒結束捲軸增加
	if(!myMovie.ended) {
		var size = barSize / myMovie.duration * myMovie.currentTime;
		progressBar.style.width = size +'px';
	} else { //影片結束時歸零
		progressBar.style.width = '0px';
		playButton.innerHTML = 'Play';
	}
}

function clicked(e){
	var mouseX = e.clientX - defaultBar.offsetLeft;
	var newTime = mouseX  / (barSize / myMovie.duration);
	myMovie.currentTime = newTime;
	progressBar.style.width = mouseX +'px';
}

window.addEventListener('load', doFirst, false);