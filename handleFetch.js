const maxHist = 30; 
const yTempData = [];
const xTempsLabels = [];
const yHumData = [];
const xHumLabels = [];


const graphTempData = {
    labels: xTempsLabels,
    datasets: [{
      label: 'Température',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: yTempData
    }]
  };

  const graphHumData = {
    labels: xHumLabels,
    datasets: [{
      label: 'Humidité',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: yHumData
    }]
  };
  const configTempGraph = {
    type: 'line',
    data: graphTempData
  };

  const configHumGraph = {
      type: 'line',
      data: graphHumData
  }

// ################################# //
// TEMPERATURE FETCHERS AND HANDLERS //
// ################################# //

setInterval(function() {
    fetch("/sensors/temperature").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateTemperatureActuelle(data.temperature);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 


// Historique de la temperature ex: /sensors/temperature/5
setInterval(function() {
    fetch("/sensors/temperature/6").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateTemperatureHistorique(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
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

async function updateTemperatureHistorique(tempHist){
    /*
    
    var tempHistTable = document.getElementById('myTableHistoriqueTemp');

    var tempHistRows = tempHistTable.rows;

    var dataRowCount = 0; // Used to iterate over the tempHist received from server

    if(tempHistRows.length == (maxHist+1)){
        for (var i = 0, row; row = tempHistRows[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop

            var histValue = tempHist[dataRowCount]
            tempHistTable.rows[i].cells[0] =  histValue[0] // Date is stored in subscript 0
            tempHistTable.rows[i].cells[1] =  histValue[1] // Temperature is stored in subscript 0

            dataRowCount++; 
         }

    }else if(tempHistRows.length == 0){
        for 





    } else{

    }


    
    */



    // MAKES THE GRAPH
    xTempsLabels.push(tempHist[0])
    yTempData.push(tempHist[1])
    // Logs 21.2

    console.log(tempHist[1][1])
}

// ############################### //
// HUMIDITER FETCHERS AND HANDLERS //
// ############################### //

setInterval(function() {
    fetch("/sensors/humidity").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateHumiditerActuelle(data.humidity);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 


// Historique de l'humiditer ex: /sensors/humiditer/5
setInterval(function() {
    fetch("/sensors/humidity/5").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateHumiditerHistorique(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
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

function updateHumiditerHistorique(humidHist){
    // Logs first humidity date
    console.log(humidHist[0])
}