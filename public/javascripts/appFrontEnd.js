$(document).ready(function () {
    var socket = io();

    $('#light-1').change(function () {
        console.log($(this).is(":checked")) //console in the browser
        if ($(this).is(":checked")) {
            socket.emit('publish', { topic: "home/kitchen/light-1/state", message: "on" });
        }
        else {
            socket.emit('publish', { topic: "home/kitchen/light-1/state", message: "off" });
        }
    });
});
