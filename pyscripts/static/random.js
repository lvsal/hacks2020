let obj_everything = [];

function codeAddress() {
  fetch('/hello',{
      // Specify the method
      method: 'POST',
      // A JSON payload
      body: JSON.stringify({
          "greeting": "Hello from the browser!"
      })
  }).then(function (response) {
      return response.json();
  }).then(function (text) {
      //console.log('POST response: ' + text);
       var stringified_json = JSON.stringify(text);
       //console.log(stringified_json);
       var obj = JSON.parse(stringified_json);
       parsingThroughUniEvents(obj);

  });
}

function parsingThroughUniEvents(obj){
      // Find a <table> element with id="myTable":
    var table = document.getElementById("main_event_table");
    let current_row = 1;


  for (var i = 0; i < obj.length; i++){
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(current_row);

    var event_allinfo = obj[i];
    let eventname = event_allinfo["eventname"];
    let date = event_allinfo["date"];
    let starttime = event_allinfo["starttime"];
    let endtime = event_allinfo["endtime"];
    let location = event_allinfo["location"];
    let description = event_allinfo["description"];

    //console.log(eventname, date, starttime, endtime, location);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    //var cell5 = row.insertCell(5);

    // Add some text to the new cells:
    cell0.innerHTML = eventname;
    cell1.innerHTML = date;
    cell2.innerHTML = starttime;
    cell3.innerHTML = endtime;
    cell4.innerHTML = location;
    //cell5.innerHTML = description;

    current_row = current_row + 1;
  }
}


window.onload = codeAddress;