var socket = io.connect('http://apiv2.gn7logistic.com:8089/');
//var socket = io.connect('http://localhost:8089/');
var contMsgsHeight  = 0;
var sound_status = false;
var sound = {};

sound = new Audio();
sound.src = "../sound/ring.mp3";

socket.on('messages',function(data){
	if(!window.focus()){
		document.title = "(1)SuperChat";
		playAudio(sound);
	}

	$('p.msgs').remove();
	$("#messages").animate({
			scrollTop: contMsgsHeight
	}, 300);
	addMsgs($('#contMsgs'),data);
})

socket.on('validate',function(data){
	stopAudio(sound);
	changeTitleOff();
})

$(function(){
	$(window).focus(function(){
		stopAudio(sound);
		changeTitleOff();
	})

	$('#name,#msg').on('keypress',function(){
		stopAudio(sound);
		changeTitleOff();
	})

	$('#formChat').submit(function(e){
		e.preventDefault();

		contMsgsHeight = $('#contMsgs').height();
		var msg = {};
		msg = {
			name:$('#name').val(),
			msg:$('#msg').val()
		}

		socket.emit('msg',msg);

		$('#msg').val('');
		$('#msg').focus();

		return false;
	})
})

function addMsgs(cont,data){
	data.map(function(d){
		cont.append(`<p class="msgs"><b>${d.name}:</b> ${d.msg}</p>`)
	})
}

function changeTitleOff(){
		document.title = "SuperChat";
}

function playAudio(sound){
			sound.play();
}

function stopAudio(sound){
	if(!!sound){
		sound.pause();
	}
}














		console.log("Hugo Valenza M.");
						//WEB DEVELOPER
