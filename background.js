console.log('page loaded', new Date());
function getPane() {
    const panes = document.querySelectorAll('.leaflet-marker-pane img');
    const el = [...panes].find(el => /translate3d(.*, 203px, 0px)/.test(el.style.transform))
    return el;
}



function planReload() {
    const moment = new Date();
    const minutes = moment.getMinutes()%10;

    const mapping = {
        "0": 4,
        "1": 3,
        "2": 2,
        "3": 1,
        "4": 5,
        "5": 4,
        "6": 3,
        "7": 2,
        "8": 1,
        "9": 5
    };

    const seconds = moment.getSeconds();
    console.log('RELOAD in:', mapping[minutes], 'minutes, -', seconds, 'seconds');

    setTimeout(() => {
        bookAppointment();

        setTimeout(() => {
            console.log('reloading ...')
            window.location.reload();
        }, 300);
    }, 1000*60*mapping[minutes] - seconds*1000);
}

function bookAppointment() {
    const pane = getPane();

    pane?.click();
    setTimeout(() => {
        if (!document.getElementById('email')) {
            console.log('NOTHING FOUND');
            return;
        }

        const options = [...document.getElementById('id_chtime').querySelectorAll('option')].map(el => el.innerText);
        console.log('FOUND: ', options.join(', '));
        const earliest = +document.getElementById('id_chtime').querySelector('option:first-child').innerText.split(':')[0];

        if (earliest < 12) {
            console.log('Filling');
            document.getElementById('email').value = 'olyafilatov@gmail.com';
            document.getElementById('submit').click();
        }
    }, 100);
}

function soundNothing() {
    const audio = new Audio(chrome.runtime.getURL("./sound.mp3"));
    audio.volume = .01;
    audio.play();
}

function soundMachine() {
    const audio = new Audio(chrome.runtime.getURL("./found-sound.mp3"));
    audio.loop = true;
    audio.volume = .01;
    audio.play();
}

function isNight() {
    const hours = new Date().getHours();
    return hours >= 18 || hours < 7;
}

setTimeout(() => {
    try {
        const pane = getPane();

        const src = pane.getAttribute('src');

        console.log('SRC', src);

        const MACHINE_ONLY = '/images/hsc_t.png';
        const NOTHING_FOUND = '/images/hsc_s.png';
        if (src === NOTHING_FOUND) {
            console.log('NOTHING FOUND');
            soundNothing();
        } else if (src === MACHINE_ONLY) {
            console.log('FOUND: centre')
            if (isNight()) {
                soundMachine();
            }
        } else {
            bookAppointment();

        }
    } catch(e) {
        console.error(e);
    }

    planReload();
}, 100);
// document.body.classList.remove('time');

// function playSound() {
//     document.getElementById('sound').play();
// }

// let interval;
// let timeout;

// function start() {
//     document.body.classList.add('time');
//     setTimeout(() => {
//         document.body.classList.remove('time');
//     }, 1000*3)

//     if (interval) {
//         clearInterval(interval);
//     }

//     if (timeout) {
//         clearTimeout(timeout);
//     }

//     const timeMinutes = +(document.getElementById('timeout').value) || 0;
//     const intervalMinutes = +(document.getElementById('interval').value) || 10;

//     timeout = setTimeout(() => {
//         console.log('on')
//         interval = setInterval(() => {
//             document.body.classList.add('time');
//             playSound();

//             setTimeout(() => {
//                 document.body.classList.remove('time');
//             }, 1000*60)


//         }, 1000*60*intervalMinutes);
//     }, 1000*60*timeMinutes)
// }