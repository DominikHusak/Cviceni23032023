$(document).ready(function() {
    serverStatus();
});

function showReloadButton(show) {
    if (show) {
        $('#retry-button').show();
    } else {
        $('#retry-button').hide();
    }
}

$('#retry-button').click(function() {
    $(this).hide(); 
    serverStatus(); 
});

function serverStatus() {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/ping',
        method: 'GET',
        success: function(data, status) {
            $('#connectionStatus').html("Server is running");
            console.log('Server is running: ' + data + status);
            showReloadButton(false); 
            getCryptoData(); 
        },
        error: function(data, status) {
            $('#connectionStatus').html("Error");
            alert('Error: ' + data); 
            showReloadButton(true); 
            console.log('Error: ' + data + status);
        }
    });
}

function getCryptoData() {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        method: 'GET',
        data: {
            ids: 'bitcoin,ethereum,litecoin',
            vs_currency: 'usd'
        },
        success: function(data, status) {
            console.log('Data received: ' + data + status);
            createTable(data);
            setInterval(getCryptoData, 10000); 
        },
        error: function(data) {
            alert('Error: ' + data);
        }
    });
}

function createTable(data) {
  var table = $('#cryptoCurrencyTable tbody'); 
  table.empty(); 
  data.forEach(function(crypto, index) { 
    var row = $('<tr>'); 
    row.append($('<th scope="row">').text(index + 1)); 
    row.append($('<td>').text(crypto.name)); 
    row.append($('<td>').text(crypto.current_price)); 
    var currentDate = new Date(); 
    var currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
    row.append($('<td>').text(currentTime)); 
    table.append(row); 
  });
}