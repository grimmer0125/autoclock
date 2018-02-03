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
2. sometimes it may timeout/throw error due to wired asiaa server/network and please check your record and adjust the startDate to restart again. Also, you can global replace `2100` with `2400` to try again for better timing tolerance. ref: issue list, https://github.com/grimmer0125/autoclock/issues/1
3. asiaa clock allow duplicate record.
4. you can try to setup `Nightmare({ show: true });` to let the automated browsr visible to debug.
