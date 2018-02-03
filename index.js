const notifier = require('node-notifier');

const Nightmare = require('nightmare');

// const nightmare = Nightmare({ show: true, typeInterval: 20, openDevTools:true });
const nightmare = Nightmare({ show: false, typeInterval: 20 });

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
page.on('console', (type, message)=> console.log(message));

for (const date of dateArray) {
  // console.log("fill date:", date);

  page
  .evaluate((text) => {
      console.log("start write date:"+ text)
  }, date)
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockInTime)
  .click('input#bt_in')
  .wait(2100)
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockOutTime)
  .click('input#bt_out')
  .wait(2100)
  .evaluate((text) => {
      console.log("end write date:"+ text)
  }, date)
}

page
.end()
.then(()=> {
  console.log("auto clock is finished !!!!!");
  notifier.notify('auto clock is finished !!')
})
.catch((error) => {
    console.error('auto clock failure:', error);
    notifier.notify('auto clock failure: !!' + error)
});
