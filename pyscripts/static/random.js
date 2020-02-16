let obj_everything = [];

function codeAddress_2() {
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


// commenttest.addComment(600, 500, "comment", "rating", "username");
// clearComments();

let current_row = 1;

const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
};


function parseThrough_Comments(obj){
        // Find a <table> element with id="myTable":
      var table = document.getElementById("comments_table");




    for (var i = 0; i < obj.length; i++){
      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(current_row);

      var comment_allinfo = obj[i];

      let postid = comment_allinfo["postid"];
      let coord_x = comment_allinfo["coord_x"];
      let coord_y = comment_allinfo["coord_y"];
      let comment = comment_allinfo["comments"];
      let rating = comment_allinfo["rating"];
      let username = comment_allinfo["username"];

      commenttest.addComment(parseInt(coord_x), parseInt(coord_y), comment, rating, username);

      //console.log(eventname, date, starttime, endtime, location);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      //var cell5 = row.insertCell(5);

      // Add some text to the new cells:
      var button = document.createElement("button");
      button.innerHTML = "&#128077;";
      // button.className = "coolbutton";


      // 3. Add event handler
      button.addEventListener ("click", function() {
        var userinfo = {
          postid:postid
        };

        $.post("/upvote_post", {
            javascript_data: JSON.stringify(userinfo)
        });

        // sleep(1500).then(() => {
        //     sleep(500).then(() => {
        //       window.location.reload();
        //       //button.parentNode.removeC
        //     });
        // });
        //setTimeout(window.location.reload(),2000);
        //button.parentNode.removeChild(button);

      });

      cell0.innerHTML;
      cell0.append(button);
      cell1.innerHTML = rating;
      cell2.innerHTML = comment;
      cell3.innerHTML = username;

      var button_location = document.createElement("button");
      button_location.innerHTML = "Location";
      // button_location.className = "cool2";

      // 3. Add event handler
      button_location.addEventListener ("click", function() {
        map.setView( [coord_x, coord_y], 3);
      });

      cell4.innerHTML;
      cell4.append(button_location);


      //cell5.innerHTML = description;

      current_row = current_row + 1;
    }

    console.log("HEY: " + commenttest.comments);
    console.log("num of rows is " + current_row);
    clearComments();
    drawComment(commenttest);
}

function cleartable(){
  console.log(current_row);
  $("#comments_table tr").remove();
  // for (var i = current_row; i == 1; i--) {
  //   document.getElementById("comments_table").deleteRow(i);
  // }
  current_row = 0;
}

function codeAddress() {
  fetch('/fetch_comments',{
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
       console.log(obj);
       parseThrough_Comments(obj)

  });
}


window.onload = function(){
    codeAddress();


    sleep(2500).then(() => {
      codeAddress_2();
    });
}
//window.onload = codeAddress_2;

let succ = false;
   let err = "";

function create_posts(coord_x, coord_y, comments, rating, username) {
        var userinfo = {
          coord_x: coord_x,
          coord_y: coord_y,
          comments: comments,
          rating: rating,
          username: username
        };

        $.post("/create_post", {
            javascript_data: JSON.stringify(userinfo)
        });

        sleep(1000).then(() => {
            sleep(500).then(() => {
                console.log(succ);
                console.log(err);
            });
        });
}
