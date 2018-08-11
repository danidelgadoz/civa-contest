var videoElement = document.getElementById("civa47");
var chronometerElement = document.getElementById("chronometer");
var currentDate;
var hours = 14;
var minutes = 27;
var seconds = 54;

var showChronometer = false;
var changeChronometer = false;
var hideChronometer = false;

updateDOM(hours, minutes, seconds);

var  waitingForShowChonometer = function(){
    console.log(this.currentTime);
    
    var minutesTimeSpan = (this.duration - this.currentTime - 42) * 1000;
    currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + minutesTimeSpan);
    countDownDate = currentDate.getTime();
    refreshTime();

    if( this.currentTime < 161 ) {
        showChronometer = false;
        chronometerElement.classList.add("hidden"); 
    }

    if( (this.currentTime >= 161) && (showChronometer == false) ) {
        console.log("SHOWCHRONOMETER");
        showChronometer = true;
        chronometerElement.classList.remove("hidden"); 
    }

    if ( (this.currentTime >= 5567) && (changeChronometer == false) ) {
        console.log("CHANGECHRONOMETER");
        changeChronometer = true;
        chronometerElement.classList.add("ending");
    }

    if ( (this.currentTime >= 5572) && (hideChronometer == false) ) {
        console.log("HIDECHRONOMETER");
        hideChronometer = true;
        this.removeEventListener("timeupdate", waitingForShowChonometer);
    }
};

videoElement.addEventListener("timeupdate",  waitingForShowChonometer);

setInterval(function(){
    console.log("je");
    waitingForShowChonometer();
}, 1000);

function refreshTime() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDOM(hours, minutes, seconds);

    if (hours==0 && minutes==0 && seconds==0) {
        setTimeout(function(){
            chronometerElement.classList.add("hidden");
        }, 500);
    }
}

function updateDOM(hours, minutes, seconds) {
    if ( hours.toString().length == 2 ) {
        document.getElementById("hour-first-digit").innerHTML = hours.toString().split("")[0];
        document.getElementById("hour-second-digit").innerHTML = hours.toString().split("")[1];
    } else {
        document.getElementById("hour-first-digit").innerHTML = "0";
        document.getElementById("hour-second-digit").innerHTML = hours.toString();
    }

    if ( minutes.toString().length == 2 ) {
        document.getElementById("minute-first-digit").innerHTML = minutes.toString().split("")[0];
        document.getElementById("minute-second-digit").innerHTML = minutes.toString().split("")[1];
    } else {
        document.getElementById("minute-first-digit").innerHTML = "0";
        document.getElementById("minute-second-digit").innerHTML = minutes.toString();
    }

    if ( seconds.toString().length == 2 ) {
        document.getElementById("second-first-digit").innerHTML = seconds.toString().split("")[0];
        document.getElementById("second-second-digit").innerHTML = seconds.toString().split("")[1];
    } else {
        document.getElementById("second-first-digit").innerHTML = "0";
        document.getElementById("second-second-digit").innerHTML = seconds.toString();
    }
}