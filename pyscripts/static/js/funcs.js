
let succ = false;
let succ_create = false;
let err = "";
let err_create = "";

function info(){
    fetch('/login_success',{
        // Specify the method
        method: 'POST'
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log("info text:: " + text);
        if (text === ""){
            succ = true;
        }else{
            err = text;
        }
    });
}

function info_2(){
    fetch('/create_success',{
        // Specify the method
        method: 'POST'
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log("info text:: " + text);
        if (text === ""){
            succ_create = true;
        }else{
            err_create = text;
        }
    });
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function login(username, password){
    let n = {
        user: username,
        pass: password
    };
    $.post( "/postmethod", {
        javascript_data: JSON.stringify(n)
    });
    sleep(2000).then(() => {
      info();
      sleep(500).then(() => {
          console.log(succ);
          console.log(err);
      });
    });
}

function create(username, password, mail_add) {
    var userinfo = {
        user: username,
        pass: password,
        email: mail_add
    };

    $.post("/createnew", {
        javascript_data: JSON.stringify(userinfo)
    });

    sleep(2000).then(() => {
        info_2();
        sleep(500).then(() => {
            console.log(succ_create);
            console.log(err_create);
        });
    });
}


