// todo
// x 1. 印出一年的時間, start, end
// x 2. ignore 週末
// x 3. ignore 國定 holiday, 2017, 2018
// x 4. ignore self holiday


//TODO fill manually now. only add when these days are between start and end dates,
function addAdjustedWorkdays(dates, start, end) {

  // for (const day of adjusted2017Workdays) {
  //   dates.push(day);
  // }
  //
  // for (const day of adjusted2018Workdays) {
  //   dates.push(day);
  // }
}

function checkIfHolidayOrLeave(date, data) {

  const {
    year2018holidays,
    year2017holidays,
    year2018leaves,
    year2017leaves,
    adjusted2018Workdays,
    adjusted2017Workdays
  } = data;

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
function getDays(startDate, endDate, data) {
  const dates = [];

  let currDate = moment(startDate).startOf('day'); //use current timezone
  let lastDate = moment(endDate).startOf('day');
  currDate.add(-1, 'days');

  // lastDate.add(1, 'days');
  console.log(currDate.toDate()); //1231
  console.log(lastDate.toDate()); //0130
  console.log("xx");
  while (currDate.add(1, 'days').diff(lastDate) <= 0) {

    // console.log(currDate.toDate()); print iso8601 format
    // console.log(currDate.toDate().getDate()); current time zone, "d" part

    // isoWeekday uses currentTimeZone
    if (currDate.isoWeekday() !== 6 && currDate.isoWeekday() !== 7) {
      // console.log("is weekday");
      const date = currDate.format('YYYY-MM-DD');
      // dates.push(currDate.clone().toDate());

      if (!checkIfHolidayOrLeave(date, data)) {
        console.log(date); //current time zone
        dates.push(date);
      } else {
        console.log("holiday or leave");
      }

    } else {
      console.log("weekend");
    }
  }

  // addAdjustedWorkdays(dates);

  return dates;
};

module.exports = {
  getDays
}
// const final = getDays("2018-01-01","2018-02-01");
// console.log(final);
