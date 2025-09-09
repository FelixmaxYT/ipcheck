const nodemailer = require('nodemailer');
const credentials = require('./credentials.json');
const axios = require('axios');

var currentip = "";

const transporter = nodemailer.createTransport({
    host: credentials.host,
    port: credentials.port,
    secure: true,
    auth: {
        user: credentials.auth.user,
        pass: credentials.auth.pass
    }
});

async function sendMail(ip) {
  try {
    let info = await transporter.sendMail({
      from: '"Ip Notifier" <' + credentials.auth.user + '>',
      to: credentials.recipient,
      subject: "Your new IP address is " + ip,
      text: "Your new IP address is: " + ip,
      html: "hi there! <br> <br> <b>Your new IP address is: " + ip + "</b> <br> <br> have a nice day :3",
    });

    console.log("OK:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}

//sendMail("192.168.1.1");
setInterval(checkip, credentials.interval * 1000);

function checkip() {
  axios.get('https://api.ipify.org?format=json')
    .then(response => {
      
      if (currentip == "") {
        currentip = response.data.ip;
        console.log("Initial ip set to " + currentip);
      }
      else if (currentip != response.data.ip) {
        console.log("IP chaneged from " + currentip + " to " + response.data.ip);
        currentip = response.data.ip;
        sendMail(currentip);
      }
      else {
        console.log("IP unchanged: " + currentip);
      }
    })
}