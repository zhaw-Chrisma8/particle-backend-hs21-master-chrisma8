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


// Array, in dem alle empfangenen Lux-Werte gespeichert werden.
var allMeasurements = [];

// Maximaler Lux Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
var maxLevel = 50;

// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

    if (data.eventName === "Humidity:") {
        // Erhaltenen Wert in der Variable 'lux' speichern
        var hum = Number(data.eventData);
        //console.log(lux);

        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
        allMeasurements.push(hum);

        // Wert in Prozent umrechnen und in 'level' speichern
        var level = hum * (100 / maxLevel);

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        if (hum < 23) {
            color = "Blue";
        } else {
            color = "Orange";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + level + "%;"

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
        document.getElementById("humlevel-bar").style = colorStyle + widthStyle;

        // Text unterhalb des Balkens aktualisieren
        document.getElementById("humlevel-text").innerHTML = hum + "°C"

        // Durchschnitt aller bisherigen Messungen berechnen und in 'luxAverage' speichern
        var luxSum = 0;
        for (var measurement of allMeasurements) {
            luxSum = luxSum + measurement;
        }
        var luxAverage = luxSum / allMeasurements.length;
        //console.log(luxAverage);

        // Durchschnittlichen Lux-Wert in Prozent umrechnen und als Balken und Text anzeigen
        var levelAverage = luxAverage * (100 / maxLevel);
        var widthStyleAverage = "width: " + levelAverage + "%;"
        document.getElementById("luxlevel-average-bar").style = widthStyleAverage;
        document.getElementById("luxlevel-average-text").innerHTML = luxAverage.toFixed(2) + "°C"; // Auf 2 Nachkommastellen reduzieren

        // Wert im Chart hinzufügen
        addData(hum);
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
    chartData = google.visualization.arrayToDataTable([['Time', 'Hum'], ["", 0]]);
    // Chart Options festlegen
    chartOptions = {
        title: 'Hum Level',
        hAxis: { title: 'Time' },
        vAxis: { title: 'Hum' },
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
    chart = new google.visualization.LineChart(document.getElementById('humlevel-chart'));
    chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    chart.draw(chartData, chartOptions); // Chart zeichnen
}

// Eine neuen Wert ins Chart hinzufügen
function addData(hum) {

    if (allMeasurements.length > 10) {
        // Älteste Messung in den Chartdaten entfernen 
        chartData.removeRow(0);
    }

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, hum]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}