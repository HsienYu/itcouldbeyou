const { Server, Client, Message } = require('node-osc');
const { PythonShell } = require('python-shell');
const axios = require('axios')

const oscServer = new Server(3333, '0.0.0.0');


let pyshell = new PythonShell('./main.py');
let msg_arr = [];
let profile_arr = [];

function printer_a_request() {
    axios
        .get('http://192.168.168.87:8090/print')
        .then(res => {
            console.log(res.data)
            update_profile(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function printer_b_request() {
    axios
        .get('http://192.168.168.91:8090/print')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function printer_c_request() {
    axios
        .get('http://192.168.168.92:8090/print')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function update_profile(data) {
    profile_arr.push(data);
    //console.log(profile_arr);
    if (profile_arr.length > 3) {
        profile_arr.shift();
    }
}

function update_msg(msg) {
    msg_arr.push(msg);
    //console.log(msg_arr);
    if (msg_arr.length > 15) {
        msg_arr.shift();
    }
    document.getElementsByClassName('msg1')[0].innerHTML = msg_arr[0];
    document.getElementsByClassName('msg2')[0].innerHTML = msg_arr[1];
    document.getElementsByClassName('msg3')[0].innerHTML = msg_arr[2];
    document.getElementsByClassName('msg4')[0].innerHTML = msg_arr[3];
    document.getElementsByClassName('msg5')[0].innerHTML = msg_arr[4];
    document.getElementsByClassName('msg6')[0].innerHTML = msg_arr[5];
    document.getElementsByClassName('msg7')[0].innerHTML = msg_arr[6];
    document.getElementsByClassName('msg8')[0].innerHTML = msg_arr[7];
    document.getElementsByClassName('msg9')[0].innerHTML = msg_arr[8];
    document.getElementsByClassName('msg10')[0].innerHTML = msg_arr[9];
    document.getElementsByClassName('msg11')[0].innerHTML = msg_arr[10];
    document.getElementsByClassName('msg12')[0].innerHTML = msg_arr[11];
    document.getElementsByClassName('msg13')[0].innerHTML = msg_arr[12];
    document.getElementsByClassName('msg14')[0].innerHTML = msg_arr[13];
    document.getElementsByClassName('msg15')[0].innerHTML = msg_arr[14];
}


function update_ui_a() {
    let file_path_a = profile_arr[0].file_path;
    let temp_arr_a = file_path_a.split('/');
    let final_path_a = 'view' + '/' + temp_arr_a[4] + '/' + temp_arr_a[5];
    document.getElementsByClassName('pic_a')[0].innerHTML = `<img width="100" height="100" src=${final_path_a}>`;
    document.getElementsByClassName('ip_address_a')[0].innerHTML = profile_arr[0].ip_address;
    document.getElementsByClassName('name_a')[0].innerHTML = profile_arr[0].name;
    document.getElementsByClassName('phone_a')[0].innerHTML = profile_arr[0].phone;
    document.getElementsByClassName('email_a')[0].innerHTML = profile_arr[0].email;

    let file_path_b = profile_arr[1].file_path;
    let temp_arr_b = file_path_b.split('/');
    let final_path_b = 'view' + '/' + temp_arr_b[4] + '/' + temp_arr_b[5];
    document.getElementsByClassName('pic_b')[0].innerHTML = `<img width="100" height="100" src=${final_path_b}>`;
    document.getElementsByClassName('ip_address_b')[0].innerHTML = profile_arr[1].ip_address;
    document.getElementsByClassName('name_b')[0].innerHTML = profile_arr[1].name;
    document.getElementsByClassName('phone_b')[0].innerHTML = profile_arr[1].phone;
    document.getElementsByClassName('email_b')[0].innerHTML = profile_arr[1].email;

    let file_path_c = profile_arr[2].file_path;
    let temp_arr_c = file_path_c.split('/');
    let final_path_c = 'view' + '/' + temp_arr_c[4] + '/' + temp_arr_c[5];
    document.getElementsByClassName('pic_c')[0].innerHTML = `<img width="100" height="100" src=${final_path_c}>`;
    document.getElementsByClassName('ip_address_c')[0].innerHTML = profile_arr[2].ip_address;
    document.getElementsByClassName('name_c')[0].innerHTML = profile_arr[2].name;
    document.getElementsByClassName('phone_c')[0].innerHTML = profile_arr[2].phone;
    document.getElementsByClassName('email_c')[0].innerHTML = profile_arr[2].email;
}

oscServer.on('message', function (msg) {
    console.log(`Message: ${msg}`);
    printer_a_request();
    update_ui_a();
});

pyshell.on('message', function (message) {
    console.log(message);
    update_msg(message);
});
