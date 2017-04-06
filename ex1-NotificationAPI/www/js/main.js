document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    showConfirmation();
}

function showConfirmation() {
    // init dialog
    navigator.notification.confirm("Please confirm!", confirm, "Ring bell or vibrate ?", "Ring,Vibrate");
}

function confirm(result) {
    // ring = 1 and vibrate = 2
    if (result == 1)
        ringBell();
    else if (result == 2)
        viberate();
}

function ringBell() {
    // not support broswer
    navigator.notification.beep(1);
}

function viberate() {
    // not support broswer
    navigator.vibrate(1000)
}

