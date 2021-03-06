var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();

function updateVariables(data) {
    // update the html elements
    document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    // if (data.eventname === "MyEvent"){
    //     document.getElementById("counterevent").innerHTML = data.eventData;
    // }
    if (data.eventName === "Temp:"){
        document.getElementById("Tempevent").innerHTML = data.eventData;
    }
    if (data.eventName === "Humidity:"){
        document.getElementById("Humevent").innerHTML = data.eventData;
    }
    if (data.eventName === "Status Temp"){
        document.getElementById("StatTemp").innerHTML = data.eventData;
    }
    if (data.eventName === "Status Humidity"){
        document.getElementById("StatHum").innerHTML = data.eventData;
    }
}

async function setCounter() {
    // read the value from the input field
    var counter = document.getElementById("counterinput").value;

    // call the function
    var response = await axios.post(rootUrl + "/api/device/0/function/setCounter", { arg: counter });

    // Handle the response from the server
    alert("Response: " + response.data.result); // we could to something meaningful with the return value here ... 
}

// async function getCounter() {
//     // request the variable "counter"
//     var response = await axios.get(rootUrl + "/api/device/0/variable/counter");
//     var counter = response.data.result;

//     // update the html element
//     document.getElementById("counter").innerHTML = counter;
// }

async function gettemperature() {
    // request the variable "counter"
    var response = await axios.get(rootUrl + "/api/device/0/variable/temperature");
    var counter = response.data.result;

    // update the html element
    document.getElementById("temperature").innerHTML = counter;
}

async function gethumidity() {
    // request the variable "counter"
    var response = await axios.get(rootUrl + "/api/device/0/variable/humidity");
    var counter = response.data.result;

    // update the html element
    document.getElementById("humidity").innerHTML = counter;
}