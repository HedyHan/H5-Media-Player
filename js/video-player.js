var testVid = document.getElementById("video");

function addProgressMassage(massage){
    document.getElementById("massagesContainer").innerHTML += massage + '<br>';
}

function updateProgress() {
    var progress = document.getElementById("progress");
    var value = 0;
    if (testVid.currentTime > 0) {
        value = Math.floor((100 / testVid.duration) * testVid.currentTime);
    }
    progress.style.width = value + "%";
}

testVid.addEventListener("timeupdate", updateProgress, false);