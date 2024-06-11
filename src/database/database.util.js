const moment = require("moment-timezone");

const formatUtcTimeOfKorea = (utcTime) => {
  return moment.utc(utcTime).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  formatUtcTimeOfKorea,
};
