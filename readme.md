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

### Example to add 2019 holidays 

Follow https://github.com/grimmer0125/autoclock/pull/5/commits/d09b71fc933a9459a60ecd3542a8a7bef8bd2d1f.


## Notes:
1. ~do not disturb the automated browser~
2. asiaa clock allow duplicate record.
3. you can try to setup `Nightmare({ show: true });` to let the automated browser visible to debug.

## issues:
https://github.com/grimmer0125/autoclock/issues/1

Sometimes it may timeout/throw error due to wired asiaa server/network, then this script stops. Please check the result on the clock home page after the script is finished or terminated. If the record is not completed or something wrong (I can not guarantee 100% correct, there might be some bug), you need to adjust the startDate to restart again, or even delete wrong record first. 
