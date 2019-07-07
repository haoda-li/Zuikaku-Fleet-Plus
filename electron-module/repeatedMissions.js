const moment = require('moment');
const fs = require('fs');

const refreshMissions = () => {
  let status;
  let missions;
  try {
    status = JSON.parse(fs.readFileSync('settings/status.json'));
    missions = JSON.parse(fs.readFileSync('data/missions.json'));
  } catch (e) {
    console.log(e);
  }

  const newTime = moment.utc();
  for (let i = 0; i < missions.length; i++) {
    if (newTime.isAfter(status.nextDaily) && missions[i].interval == "filter_1") {
      missions[i].status = 'f'
    } else if (newTime.isAfter(status.nextWeekly) && missions[i].interval == "filter_7") {
      missions[i].status = 'f'
    } else if (newTime.isAfter(status.nextMonthly) && missions[i].interval == "replay_30") {
      missions[i].status = 'f'
    } else if (newTime.isAfter(status.nextQuaterly) && missions[i].interval == "looks_4") {
      missions[i].status = 'f'
    }
  }
  fs.writeFileSync('data/missions.json', JSON.stringify(missions, null, '\t'))
}

const updateTime = () => {
  let newTime = moment.utc()
  if (newTime.hour() >= 20) {
    newTime.add(1, 'day')
  }

  const status = {
    updated: moment.utc(),
    nextDaily: moment(newTime).hour(20).minute(0).second(0).millisecond(0),
    nextWeekly: moment(newTime).endOf('week')
                .hour(20).minute(0).second(0).millisecond(0).add(1, 'day'),
    nextMonthly: moment(newTime).endOf('month').hour(20).minute(0).second(0).millisecond(0),
    nextQuaterly: moment(newTime).month((Math.floor((newTime.month() + 2) / 3) + 1) * 3 - 2).endOf('month')
                .hour(20).minute(0).second(0).millisecond(0)
  }
  if (newTime.day() == 0) {
    status.nextWeekly = moment(newTime).hour(20).minute(0).second(0).millisecond(0)
  }
  fs.writeFileSync('settings/status.json', JSON.stringify(status, null, '\t'))
}

module.exports = {
  updateTime,
  refreshMissions
}
