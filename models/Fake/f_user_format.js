const data = require('./f_user.json');

function a(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

tempData = data.map(item => {
  const number = `010-${a(1, 9)}${a(1, 9)}${a(1, 9)}${a(1, 9)}-${a(1, 9)}${a(1, 9)}${a(1, 9)}${a(
    1,
    9,
  )}`;
  return { ...item, phones: number };
});

console.log(tempData);
module.exports = data;
