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

// Fetch the current temperature
setInterval(function() {
    fetch("/sensors/temperature").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateTemperatureActuelle(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 


// Fetch the average of 30 temperatures
setInterval(function() {
    fetch("/sensors/temperature/30/avg").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateTemperatureMoyenne(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 

// Historique de la temperature ex: /sensors/temperature/5
setInterval(function() {
    fetch("/sensors/temperature/30").then(function(response) {
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


function updateTemperatureMoyenne(temp){
    var table = document.getElementById('myTable');
    var row = table.rows; 

    row[2].cells[1].innerHTML = parseFloat(temp);
}

async function updateTemperatureHistorique(tempHist){
    emptyAndCreateTable('myTableHistoriqueTemp', tempHist)


    // MAKES THE GRAPH
    xTempsLabels.push(tempHist[0])
    yTempData.push(tempHist[1])

}

// ############################### //
// HUMIDITER FETCHERS AND HANDLERS //
// ############################### //

// Fetch the current humidity
setInterval(function() {
    fetch("/sensors/humidity").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateHumiditerActuelle(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 


// Fetch the average of 30 huimities
setInterval(function() {
    fetch("/sensors/humidity/30/avg").then(function(response) {
    if (response.status !== 200) {
        // Update app state with the error, no data
        alert('Failed to fetch ' + response.status);
    } else {
        // Examine the text in the response
        response.json().then(function(data) {

            // Update app state with the new data, no error
            updateHumiditerMoyenne(data);
            
        }).catch(function(err) {
            // Update app state with the error, no data

            alert(err);
        });
    }
    });
}, 3000); 

// Historique de l'humiditer ex: /sensors/humiditer/5
setInterval(function() {
    fetch("/sensors/humidity/30").then(function(response) {
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

function updateHumiditerMoyenne(humid){
    var table = document.getElementById('myTable');
    var row = table.rows; 
    row[2].cells[2].innerHTML = humid;
}

async function updateHumiditerHistorique(humidHist){
    emptyAndCreateTable('myTableHistoriqueHumid', humidHist)
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
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const entryDateText = entryDate.toLocaleDateString("fr-CA", options)

        var cell1 = row.insertCell(0)
        cell1.innerHTML = entryDateText;

        var cell2 = row.insertCell(1)
        cell2.innerHTML = rowData[1];

    }


}