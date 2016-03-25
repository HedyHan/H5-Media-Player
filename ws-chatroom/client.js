var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer('ws://localhost:3003');
var output, handleInput, messageInput, sendButton, closeButton;

function init() {
    output = document.getElementById("output");
    handleInput = document.getElementById("handleInput");
    messageInput = document.getElementById("messageInput");
    sendButton = document.getElementById("sendButton");
    closeButton = document.getElementById("closeButton");
    handleInput.value = "user-" + (new Date()).getMilliseconds();
    messageInput.onkeyup = function (evt) { if (evt.keyCode == 13) sendChatMessage(evt) };
    sendButton.onclick = function (evt) { sendChatMessage(evt) };
    closeButton.onclick = function (evt) { closeChat(evt) };
    testWebSocket();
}

function testWebSocket() {
    writeToScreen('ws://localhost:3003');
    wss.onopen = function(evt) { onOpen(evt) };
    wss.onclose = function(evt) { onClose(evt) };
    wss.onmessage = function(evt) { onMessage(evt) };
    wss.onerror = function(evt) { onError(evt) };
}

function onOpen(evt) {
    writeToScreen("CONNECTED");
    doSend("Hi there !");
}

function onClose(evt) {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    writeToScreen(evt.data);
}

function onError(evt) {
    writeToScreen("<span style='color: red'>ERROR:</span> " + evt.data);
}

function doSend(message) {
    websocket.send(handleInput.value + ">>" + message);
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

function sendChatMessage(evt) {
    doSend(messageInput.value);
    messageInput.value = "";
}

function closeChat(evt) {
    doSend("Bye!");
    websocket.close();
}

window.addEventListener("load", init, false);