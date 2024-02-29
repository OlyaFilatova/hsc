
const audio = new Audio(chrome.runtime.getURL("./gate.mp3"));
audio.loop = true;
audio.volume = .5;
audio.play();