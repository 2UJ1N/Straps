const fs = require('fs');
const data = require('./f_user.json');

function a(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const names = ['Seoul', 'Daejeon', 'Daegu', 'Busan', 'Ulsan', 'Jeju', 'Incheon', 'Gwangju'];

tempData = data.map(item => {
  const number = `010-${a(1, 9)}${a(1, 9)}${a(1, 9)}${a(1, 9)}-${a(1, 9)}${a(1, 9)}${a(1, 9)}${a(
    1,
    9,
  )}`;
  const city = names[Math.floor(Math.random() * names.length)];

  return { ...item, phones: number, address: city };
});

//console.log(tempData);

const user_json = JSON.stringify(tempData);
// console.log(user_json);
fs.writeFileSync('f_user_convert.json', user_json);
