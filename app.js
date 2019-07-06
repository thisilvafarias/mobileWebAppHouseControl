var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mqtt = require('mqtt');
var mqtt_client = mqtt.connect('mqtt://localhost');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//====================== Socket.IO ====================================


//Start connection to Socket.io
io.on("connection", (socket) => {

    //Once the webpage is open the function "subscribe" on frontend calls that function
    socket.on("subscribe", (data) => {
    console.log("Subscribe > topic: " + data.topic);
    // mqtt_client.on("message"subscribe topic light-1/state
    mqtt_client.subscribe(data.topic);
    });

    // Listen message from MQTT broker
    mqtt_client.on("message", (topic, message) => {
        //Start with the last one kept in the mqqt-retain
        let light1_state = undefined;
    console.log('Received message %s %s', topic, message)
        switch (topic) {
            case "home/kitchen/light-1/state":
                if (light1_state !== "ON" && message.toString().toLowerCase() === "on") {
                    light1_state = "ON";
                }
                else if (light1_state !== "OFF" && message.toString().toLowerCase() === "off") {
                    light1_state = "OFF";
                }

                // Send to WebSocket (change the button position to On/off)
                socket.emit("mqtt-message", { topic: "home/kitchen/light-1/state", message: light1_state });
                break;
            case "future ops":
                break;
        }

    });


    //Listening socket.emit('publish' from the front-end app.js
    socket.on("publish", (data) => {
    console.log("Publish > topic: " + data.topic + ", message: " + data.message);
    // mqtt_client publish to broker
    mqtt_client.publish(data.topic, data.message, { qos: 1, retain: true });
    }); //subscribe to checked button



}); //socket.io connection

//=======================================================================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
