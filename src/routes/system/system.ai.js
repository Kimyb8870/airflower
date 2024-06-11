const tf = require("@tensorflow/tfjs");

// 모델 초기화
const model = tf.sequential();
model.add(
  tf.layers.dense({ units: 3, inputShape: [3], activation: "softmax" })
);
model.compile({ loss: "categoricalCrossentropy", optimizer: "adam" });

// 모델 업데이트 함수
async function updateModel(inputs, labels) {
  try {
    const inputShape = [inputs.length, 3];
    const labelShape = [labels.length, 3];
    const trainingData = tf.tensor2d(inputs, inputShape);
    const outputData = tf.tensor2d(labels, labelShape);
    await model.fit(trainingData, outputData, { epochs: 50 });
    console.log("Model updated with latest data.");
  } catch (error) {
    console.error("Error updating model:", error);
  }
}

// 예측 함수
async function predictAction(datetime, temperature, humidity) {
  const input = tf.tensor2d([
    [new Date(datetime).getTime(), temperature, humidity],
  ]);
  const prediction = model.predict(input);
  const predictedClass = prediction.argMax(-1).dataSync()[0];
  const actions = ["냉방", "제습", "난방"];
  return actions[predictedClass];
}

module.exports = {
  updateModel,
  predictAction,
};
