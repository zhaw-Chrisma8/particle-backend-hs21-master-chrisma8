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

// Array, in dem alle empfangenen Temp-Werte gespeichert werden.
var allMeasurements = [];

// Maximaler Temp Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
var maxLevel = 35;

// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

    if (data.eventName === "Temp:") {
        // Erhaltenen Wert in der Variable 'temp' speichern
        var temp = Number(data.eventData);
        
        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        allMeasurements.push(temp);

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("templevel-text").innerHTML = temp + "°C"

        // Wert im Chart hinzufügen
        addData(temp);
    }
}

//////////////////////////////////
/////   Code für das Chart   /////
//////////////////////////////////

// Chart und Variablen 
var chartData, chartOptions, chart;
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Chart initialisieren. Diese Funktion wird einmalig aufgerufen, wenn die Page geladen wurde.
function drawChart() {
    // Daten mit dem Dummy-Wert ["", 0] initialisieren. 
    // (Dieser Dummy-Wert ist nötig, damit wir das Chart schon anzeigen können, bevor 
    // wir Daten erhalten. Es können keine Charts ohne Daten gezeichnet werden.)
    chartData = google.visualization.arrayToDataTable([['Time', 'Temp'], ["", 0]]);
    // Chart Options festlegen
    chartOptions = {
        title: 'Temp Level',
        hAxis: { title: 'Time' },
        vAxis: { title: 'Temp' },
        animation: {
            duration: 300, // Dauer der Animation in Millisekunden
            easing: 'out',
        },
        curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
        legend: 'none',
        vAxis: {
            // Range der vertikalen Achse
            viewWindow: {
                min: 0,
                max: maxLevel
            },
        }
    };
    // LineChart initialisieren
    chart = new google.visualization.LineChart(document.getElementById('templevel-chart'));
    chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    chart.draw(chartData, chartOptions); // Chart zeichnen
}

// Eine neuen Wert ins Chart hinzufügen
function addData(temp) {

    if (allMeasurements.length > 10) {
        // Älteste Messung in den Chartdaten entfernen 
        chartData.removeRow(0);
    }

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, temp]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}