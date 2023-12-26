let d = new Date();
hour = d.getHours();
min = d.getMinutes();
sec = d.getSeconds();

function logTime(hour, min, sec) {
    console.log(String(hour).padStart(2,'0') +":" + String(min).padStart(2,'0') + ":" + String(sec).padStart(2,'0'));
}

function incHour() {
    if(min%60 == 0) {
        hour = (hour + 1)%24;
    }
}

function incMinute(){
    if(sec == 0) {
        min = (min + 1)%60;
    }

}

function incSecond(){
    logTime(hour, min, sec);
    // if(min == 0 && sec != 0) {
        // console.log(String(hour).padStart(2,'0') +":" + String(min).padStart(2,'0') + ":" + String(sec).padStart(2,'0'));
    // }
    sec = (sec + 1)%60;
}

setInterval(incSecond, 1*1000);
setInterval(incMinute, 60*1000);
setInterval(incSecond, 60*60*1000);