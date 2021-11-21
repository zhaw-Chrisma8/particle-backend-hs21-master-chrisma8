const logger = require('./db/logger.js');
exports.sendEvent = null;
exports.registerEventHandlers = function (source) {
    //source.addEventListener('MyEvent', handleMyEvent);
    // Register more event handlers here
    source.addEventListener('Temp:', handletemp);
    source.addEventListener('Humidity:', handlehum);
    source.addEventListener('Status Temp', handlestattemp);
    source.addEventListener('Status Humidity', hadlestathum);
    //source.addEventListener('Durchschnittliche Hantelbewegungen pro Minute', handleKadenz);
}
// function handleMyEvent(event) {
//     // read variables from the event
//     var data = {
//         eventName: event.type,
//         eventData: JSON.parse(event.data).data, // the value of the event
//         deviceId: JSON.parse(event.data).coreid,
//         timestamp: JSON.parse(event.data).published_at
//     };
//     //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
//     try {        
//         // you can add more properties to your data object
//         data.myMessage = "Hello World";
//         // TODO: do something meaningful with the data
//         // Log the event in the database
//         logger.logOne("MyDB", "MyEvent", data);
//         // send data to all connected clients
//         exports.sendEvent(data);
//     } catch (error) {
//         console.log("Could not handle event: " + JSON.stringify(event) + "\n");
//         console.log(error)
//     }
// }
function handletemp(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };
    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";
        // TODO: do something meaningful with the data
        // Log the event in the database
        logger.logOne("MyDB", "Temperatur", data);
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
function handlehum(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };
    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";
        // TODO: do something meaningful with the data
        // Log the event in the database
        logger.logOne("MyDB", "Humidity", data);
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handlestattemp(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };
    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";
        // TODO: do something meaningful with the data
        // Log the event in the database
        logger.logOne("MyDB", "Status Temp", data);
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function hadlestathum(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };
    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object
    try {        
        // you can add more properties to your data object
        //data.myMessage = "Hello World";
        // TODO: do something meaningful with the data
        // Log the event in the database
        logger.logOne("MyDB", "Status Humidity", data);
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
