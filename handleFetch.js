const maxHist = 30; 
var yTempData = [];
var xTempsLabels = [];
var yHumData = [];
var xHumLabels = [];


var graphTempData = {
    labels: xTempsLabels,
    datasets: [{
      label: 'Température',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: yTempData
    }]
  };

var graphHumData = {
    labels: xHumLabels,
    datasets: [{
      label: 'Humidité',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: yHumData
    }]
  };
  var configTempGraph = {
    type: 'line',
    data: graphTempData
  };

  var configHumGraph = {
      type: 'line',
      data: graphHumData
  }

// ################################# //
// TEMPERATURE FETCHERS AND HANDLERS //
// ################################# //

// Fetch the current temperature
setInterval(function() {
    fetch("/sensors/temperature").then(function(response) {
    if (response.status !== 200) {
        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {
        response.json().then(function(data) {
            removeError()
            updateTemperatureActuelle(data);
            
        }).catch(function(err) {

            sendError(err);
        });
    }
    });
}, 3000); 


// Fetch the average of 30 temperatures
setInterval(function() {
    fetch("/sensors/temperature/30/avg").then(function(response) {
    if (response.status !== 200) {
        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {
        response.json().then(function(data) {
            removeError()
            updateTemperatureMoyenne(data);
            
        }).catch(function(err) {
            // sendError state with the error, no data

            sendError(err);
        });
    }
    });
}, 3000); 

// Historique de la temperature ex: /sensors/temperature/5
setInterval(function() {
    fetch("/sensors/temperature/30").then(function(response) {
    if (response.status !== 200) {
        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {

        response.json().then(function(data) {
            removeError()
            updateTemperatureHistorique(data);
            
        }).catch(function(err) {

            sendError(err);
        });
    }
    });
}, 3000); 

// ------- TEMPERATURE UPDATE FUNCTIONS ---------- // 

function updateTemperatureActuelle(temp){
    var table = document.getElementById('myTable');
    var row = table.rows; 

    row[1].cells[1].innerHTML = parseFloat(temp);
}


function updateTemperatureMoyenne(temp){
    var table = document.getElementById('myTable');
    var row = table.rows; 

    row[2].cells[1].innerHTML = parseFloat(temp);
}

async function updateTemperatureHistorique(tempHist){
    emptyAndCreateTable('myTableHistoriqueTemp', tempHist)

    var targetCanvas = document.getElementById('tempChart');
    var canvasContainer = document.getElementById('tempCanvasContainer'); 

    targetCanvas.remove();

    canvasContainer.innerHTML = '<canvas id="tempChart"></canvas>'; 
    var targetCanvas = document.getElementById('tempChart');

    xTempsLabels = [];
    yTempData = [];
    
    var graphTempData = {
        labels: xTempsLabels,
        datasets: [{
          label: 'Température',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: yTempData
        }]
      };

    var configTempGraph = {
        type: 'line',
        data: graphTempData
      };
    

    // MAKES THE GRAPH
    for(var i = 0; i < tempHist.length; i++){
        var tempHistVal = tempHist[i];
        const entryDate = new Date(tempHistVal[0])
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const entryDateText = entryDate.toLocaleDateString("fr-CA", options).split(',')[1]
        xTempsLabels.push(entryDateText);
        yTempData.push(tempHistVal[1]);
    }
    

    tempChart = new Chart(targetCanvas, configTempGraph);
    


}

// ############################### //
// HUMIDITER FETCHERS AND HANDLERS //
// ############################### //

// Fetch the current humidity
setInterval(function() {
    fetch("/sensors/humidity").then(function(response) {
    if (response.status !== 200) {
        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {
        response.json().then(function(data) {
            removeError()
            updateHumiditerActuelle(data);
            
        }).catch(function(err) {

            sendError(err);
        });
    }
    });
}, 3000); 


// Fetch the average of 30 huimities
setInterval(function() {
    fetch("/sensors/humidity/30/avg").then(function(response) {
    if (response.status !== 200) {
        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {
        response.json().then(function(data) {
            removeError()
            updateHumiditerMoyenne(data);
            
        }).catch(function(err) {

            sendError(err);
        });
    }
    });
}, 3000); 

// Historique de l'humiditer ex: /sensors/humiditer/5
setInterval(function() {
    fetch("/sensors/humidity/30").then(function(response) {
    if (response.status !== 200) {

        sendError('Une erreur est survenue. Veuillez patienter pendant que nous recontactons le serveur');
    } else {
        response.json().then(function(data) {
            removeError()
            updateHumiditerHistorique(data);
            
        }).catch(function(err) {

            sendError(err);
        });
    }
    });
}, 3000); 


// ------- HUMIDITY UPDATE FUNCTIONS ---------- // 

function updateHumiditerActuelle(humid){
    var table = document.getElementById('myTable');
    var row = table.rows; 
    row[1].cells[2].innerHTML = humid;
}

function updateHumiditerMoyenne(humid){
    var table = document.getElementById('myTable');
    var row = table.rows; 
    row[2].cells[2].innerHTML = humid;
}

async function updateHumiditerHistorique(humidHist){
    emptyAndCreateTable('myTableHistoriqueHumid', humidHist);





    var targetHumidCanvas = document.getElementById('humChart');
    var canvasHumidContainer = document.getElementById('humidCanvasContainer'); 

    targetHumidCanvas.remove();

    canvasHumidContainer.innerHTML = '<canvas id="humChart"></canvas>'; 
    var targetHumidCanvas = document.getElementById('humChart');

    xHumLabels = [];
    yHumData = [];
    
    var graphHumData = {
        labels: xHumLabels,
        datasets: [{
          label: 'Humidité',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: yHumData
        }]
      };
    
    var configHumGraph = {
        type: 'line',
        data: graphHumData
    }
    

    // MAKES THE GRAPH
    for(var h = 0; h < humidHist.length; h++){
        var humidHistVal = humidHist[h];
        const entryDate = new Date(humidHistVal[0])
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const entryDateText = entryDate.toLocaleDateString("fr-CA", options).split(',')[1]
        xHumLabels.push(entryDateText);
        humidVal = humidHistVal[1]; 
        yHumData.push(humidVal);
    }
    

    humChart = new Chart(targetHumidCanvas, configHumGraph);
}



// ------- UPDATE HELPER FUNCTIONS ---------- // 

function emptyAndCreateTable(tableName, histData){ 
    
    var tableHeaderRowCount = 1;
    var table = document.getElementById(tableName);    
    var tableRows = table.rows;
    var rowCount = tableRows.length;
    
    // EMPTY TABLE
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }

    // Create Table
    for(var j = 0; j < histData.length; j++){
        var rowData = histData[j]

        var rowCount = tableRows.length;
        var row = table.insertRow(rowCount)

        const entryDate = new Date(rowData[0])
        console.log(entryDate)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const entryDateText = entryDate.toLocaleDateString("fr-CA", options)

        var cell1 = row.insertCell(0)
        cell1.innerHTML = entryDateText;

        var cell2 = row.insertCell(1)
        cell2.innerHTML = rowData[1];

    }


}

function sendError(message) {
    var errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = message
}

function removeError() {
    var errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = ''
}