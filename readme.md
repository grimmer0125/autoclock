## prepare:
1. install node.js, https://nodejs.org/en/
2. git clone this repo, terminal: `git clone https://github.com/grimmer0125/autoclock`
3. terminal: `cd autoclock && npm install`

## run:
1. edit `config.json` to customize, see below section
2. terminal: `npm start` or node index.js.

## Modify config.json to fit your need

1. account/password
2. startDate/endDate
4. year2017leaves (customized data)
3. year2018leaves (customized data)

## Notes:
1. ~do not disturb the automated browser~
2. asiaa clock allow duplicate record.
3. you can try to setup `Nightmare({ show: true });` to let the automated browsr visible to debug.

## issues:
https://github.com/grimmer0125/autoclock/issues/1

Please check the result after the script is finished or terminated.

### issue-1: sometimes you need to restart to continue:

sometimes it may timeout/throw error due to wired asiaa server/network and please check your record and adjust the startDate to restart again. Also, you can global replace `2100` with `2400` to try again for better timing tolerance.

### issue-2 [major]: input wrong date, very less possible:

it is possible to clock in/out with default date (usually today) instead of programming time if the network/server status is very bad. e.g.
clock in: 20170301 09:00 (in the past)
clock out: 20170301 18:00 (setup by this script) but somehow customized input fail, so it will use default value (today, e.g. 20180203 12:30) to clock in/out.
I have adjust some time interval to 2100ms to give this script a lot of time to get correct UI input field. But this issue is still possible to happen.

Before solving this issue completely, I'd suggest to auto clock in/out per 1~6 months, so you can easily **check the result from the homepage**.
