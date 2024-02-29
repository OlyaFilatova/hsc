
const audio = new Audio(chrome.runtime.getURL("./found-sound.mp3"));
audio.loop = true;
audio.volume = 1;
audio.play();