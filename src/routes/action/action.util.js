const minToMilisecond = (min) => min * 60 * 1000;

const requestActionToController = async (
  actionId,
  actionType,
  controllerIp
) => {
  console.log(`action Id: ${actionId}`);
  console.log(`action: ${actionType}`);
  console.log(`controller: ${controllerIp}`);

  console.log("get response from controller");
  console.log("delete in TB_ACTION_QUEUE");
  console.log("insert in TB_ACTION_LOG");
};

const makeUniqueActionId = () => {
  let randomNumber = "";

  for (let i = 0; i < 10; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomNumber += randomDigit.toString();
  }

  return randomNumber;
};

module.exports = {
  minToMilisecond,
  requestActionToController,
  makeUniqueActionId,
};
