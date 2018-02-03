const notifier = require('node-notifier');

const Nightmare = require('nightmare');

// const nightmare = Nightmare({ show: true, typeInterval: 20, openDevTools:true });
// const nightmare = Nightmare({ show: true, typeInterval: 20, openDevTools:true });
// const nightmare = Nightmare({ show: true, openDevTools:true });
const nightmare = Nightmare({ show: false, typeInterval: 20 });

// const nightmare = Nightmare({ show: false, typeInterval: 20 });

const fs = require("fs");
const content = fs.readFileSync("config.json");
const jsonContent = JSON.parse(content);
const user = jsonContent.user;
const password = jsonContent.password;

const { startDate, endDate, data } = jsonContent;

console.log("user:", user);

const dayCal = require("./days");

let dateArray = dayCal.getDays(startDate, endDate, data);

const clockInTime = "09:00";
const clockOutTime = "18:00";
const url = 'https://www.asiaa.sinica.edu.tw/internal_site/personnel_system/WorkHour.php';

// sometimes it requires a lot time to open, even timeout
let page = nightmare.authentication(user, password).goto(url);

let handlingDate = "";
page.on('console', (type, message)=> {
  console.log(message);
  const strArray = message.split("::");
  if (strArray.length>1) {
    // this current scope: Node.js
    // tricky way to get info. from browser
    handlingDate = strArray[1];
  }
});

// https://github.com/segmentio/nightmare/issues/854#issuecomment-256658926
// not work,  for auto refresh from submiting

for (const date of dateArray) {
  // console.log("fill date:", date);

  page
  .evaluate((text) => {
      console.log("start write date::"+ text);
  }, date)
  .wait("input#d")
  .wait("input#t")
  .wait("input#bt_in")
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockInTime)
  .click('input#bt_in')

  // if we use wait, it is still possible that
  // 1. after clicking 1st clock in button, wait for auto-refresh, but not enough.
  // 2. input new clock out time
  // 3. auto-refresh due to form-submit
  // 4. click clock out button but using default date
  // .wait(1500) ->
  .refresh()
  // .evaluate(waitforunload)
  // .waitforunload()
  .wait("input#d")
  .wait("input#t")
  .wait("input#bt_out")
  .wait(300)
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockOutTime)
  .click('input#bt_out')
  // .wait(100)
  .refresh()
  .evaluate((text) => {
      console.log("end write date::"+ text)
  }, date)
   // 1. even without this wait, this script works. this is for lower server workload(too quick)
   // 2. this wait can let people know the changed result on page,
   // otherwise the webpage will not update immediately (send command works)
  .wait(1500); // even without this, this script works. this is for lower server workload(too quick)


  // .wait(30000);
}

page
.end()
.then(()=> {
  console.log("auto clock is finished !!!!!, " + handlingDate);
  notifier.notify('auto clock is finished, final:' + handlingDate +" !!");
})
.catch((error) => {
    console.error('auto clock failure:', error);
    notifier.notify('auto clock failure on:' + handlingDate +"!!error:" + error);
});
