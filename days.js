// todo
// x 1. 印出一年的時間, start, end
// x 2. ignore 週末
// x 3. ignore 國定 holiday, 2017, 2018
// x 4. ignore self holiday

//TODO fill the remaining holidays
const year2018holidays = [
  "2018-01-01"
];

// ignore Jan ~ March
const year2017holidays = [
  "2017-04-03",
  "2017-04-04",
  "2017-05-01",
  "2017-05-29",
  "2017-05-30",
  "2017-10-04", //	Wed Moon Festival
  "2017-10-09",
  "2017-10-10"
];


//TODO: customize your leaves
const year2018leaves = [
  // 2018-01-05	Fri			09:00~12:00 Personal Leave
  "2018-01-10", //sick
  "2018-01-15"
];

//TODO: customize your leaves
const year2017leaves = [
  "2017-11-28", //sick
  "2017-12-08",
  "2017-12-11",
  "2017-12-12",
  "2017-12-13",
  "2017-12-14",
  "2017-12-15",
  "2017-12-18",
  "2017-12-19",
  "2017-12-20",
  "2017-12-21",
  "2017-12-22"
];

//TODO fill the remaining adjustedWorkdays
const adjusted2018Workdays = [

];

const adjusted2017Workdays = [
  "2017-06-03",
  "2017-09-30"
];

function addAdjustedWorkdays(dates) {

  for (const day of adjusted2017Workdays) {
    dates.push(day);
  }

  for (const day of adjusted2018Workdays) {
    dates.push(day);
  }
}

function checkIfHolidayOrLeave(date) {
  for (const holiday of year2018holidays) {
    if (date === holiday) {
      return true;
    }
  }

  for (const holiday of year2017holidays) {
    if (date === holiday) {
      return true;
    }
  }

  for (const leaveDay of year2018leaves) {
    if (date === leaveDay) {
      return true;
    }
  }

  for (const leaveDay of year2017leaves) {
    if (date === leaveDay) {
      return true;
    }
  }

  return false;
}

const moment = require('moment');

// moment().format('YYYY-MM-DD');

//ISO 8601 https://segmentfault.com/a/1190000007581722
// 0101 +8 = 2017-12-31T16:00:00.000Z +0, Z = UTC +0.
// 2017-12-31T16:00:00.000+01:00 -> UTC +1

// https://stackoverflow.com/a/23796069/7354486
function getDays(startDate, endDate) {
    const dates = [];

    let currDate = moment(startDate).startOf('day'); //use current timezone
    let lastDate = moment(endDate).startOf('day');
    currDate.add(-1, 'days');

    // lastDate.add(1, 'days');
    console.log(currDate.toDate()); //1231
    console.log(lastDate.toDate()); //0130
    console.log("xx");
    while(currDate.add(1, 'days').diff(lastDate) <= 0) {

        // console.log(currDate.toDate()); //print iso8601 format
        // console.log(currDate.toDate().getDate()); //current time zone, "d" part

        // isoWeekday uses currentTimeZone
        if (currDate.isoWeekday() !== 6 && currDate.isoWeekday() !== 7) {
          // console.log("is weekday");
          const date = currDate.format('YYYY-MM-DD');
          // dates.push(currDate.clone().toDate());

          if(!checkIfHolidayOrLeave(date)) {
            console.log(date); //current time zone
            dates.push(date);
          } else {
            console.log("holiday or leave");
          }

        } else {
          console.log("weekend");
        }
    }

    addAdjustedWorkdays(dates);

    return dates;
};

module.exports = {
  getDays
}
// const final = getDays("2018-01-01","2018-02-01");
// console.log(final);
