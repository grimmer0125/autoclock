//import Nightmare from 'nightmare';
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

var fs = require("fs");
const content = fs.readFileSync("config.json");
const jsonContent = JSON.parse(content);
const user = jsonContent.user;
const password = jsonContent.password;

console.log("user:", user);

let dateArray = ["2018-01-23", "2018-01-24"];
const clockInTime = "09:00";
const clockOutTime = "18:00";
const url = 'https://www.asiaa.sinica.edu.tw/internal_site/personnel_system/WorkHour.php';

// sometimes it requires a lot time to open, even timeout
let page = nightmare.authentication(user, password).goto(url);

for (const date of dateArray) {
  page = page
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockInTime)
  .click('input#bt_in')
  .wait(1500)
  .type('input#d', "")
  .type('input#d', date)
  .type('input#t', "")
  .type('input#t', clockOutTime)
  .click('input#bt_out')
  .wait(1500);
}

page
.end()
.then()
.catch((error) => {
    console.error('auto clock failed:', error);
});
