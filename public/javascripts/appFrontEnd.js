//Once the DOM is ready, the JavaScript function is executed.
$(document).ready(function () {
    var socket = io();

    socket.on("connect", () => {
        console.log("Connected to server!!!");
    socket.emit("subscribe", { topic: "home/kitchen/light-1/state" });
    });

    //If client leaves the webpage call the disconnect func on the server
    socket.on('disconnectThatSoc', function(){
        socket.disconnect();
    });

    //Do the physical switch position (or last retrained on the mqtt from the back-end)
    socket.on('mqtt-message', function (data) {
        switch (data.topic) {

            case "home/kitchen/light-1/state":
                let light1_state = data.message;
                console.log("Topic: " + data.topic + ", Light-1 State: " + light1_state);

                if (light1_state === 'ON') {
                    $('#light-1').prop('checked', true);
                }
                else if (light1_state === 'OFF') {
                    $('#light-1').prop('checked', false);
                }
                break;
            case "future ops":
                break;
        }
    });


    //If checkbox changed emit to socket.on("publish" on the back-end
    $('#light-1').change(function () {
        console.log($(this).is(":checked")) //console in the browser
        if ($(this).is(":checked")) {
            socket.emit('publish', { topic: "home/kitchen/light-1/state", message: "on" });
        }
        else {
            socket.emit('publish', { topic: "home/kitchen/light-1/state", message: "off" });
        }
    });//func change
});//Once the DOM is ready, the JavaScript function is executed.
