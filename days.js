// todo
// x 1. 印出一年的時間, start, end
// x 2. ignore 週末
// x 3. ignore 國定 holiday, 2017, 2018
// x 4. ignore self holiday

const moment = require('moment');

function addAdjustedWorkdays(dates, start, end, data) {

  // "2017-06-03",
  // "2017-09-30"

  for (const day of data.adjusted2017Workdays) {
    // day -> date
    const work = moment(day).startOf('day');

    // const t1 = start.toDate().getTime();
    // const t2 = work.toDate().getTime();
    // const t3 = end.toDate().getTime();

//    if (start.toDate().getTime() <= work.toDate().getTime() && work.toDate().getTime() <= end.toDate().getTime()) {
    if (start <= work && work <= end) {
      // console.log("in this region");
      // alert("Yay");    // lastDate.add(1, 'days');
      dates.push(day);
    }
    // const start = currDate.toDate();

    //如果在startDate跟endDate中間
//
  }

  for (const day of data.adjusted2018Workdays) {
    const work = moment(day).startOf('day');

    if (start <= work && work <= end) {
      dates.push(day);
    }
  }
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


// moment().format('YYYY-MM-DD');

//ISO 8601 https://segmentfault.com/a/1190000007581722
// 0101 +8 = 2017-12-31T16:00:00.000Z +0, Z = UTC +0.
// 2017-12-31T16:00:00.000+01:00 -> UTC +1

// https://stackoverflow.com/a/23796069/7354486
function getDays(startDate, endDate, data) {

  const dates = [];
  //startDate <= date && date <= endDate

  let currDate = moment(startDate).startOf('day'); //use current timezone
  let lastDate = moment(endDate).startOf('day');

  addAdjustedWorkdays(dates, currDate, lastDate, data);

  // lastDate.add(1, 'days');
  const start = currDate.toDate();
  const end = lastDate.toDate();
  console.log(start); //1231
  console.log(end); //0130
  console.log("start add dates betwen these two");

  currDate.add(-1, 'days');
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

  return dates;
};

module.exports = {
  getDays
}
// const final = getDays("2018-01-01","2018-02-01");
// console.log(final);
