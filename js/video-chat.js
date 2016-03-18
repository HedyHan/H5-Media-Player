var mediaList = document.querySelector('#media-list');

function displayVideo(url){
    var videoPlayer = document.createElement('video');
    videoPlayer.setAttribute('src',url);
    videoPlayer.setAttribute('controls',true);
    videoPlayer.setAttribute('class','video-player');

    mediaList.appendChild(videoPlayer);
}
