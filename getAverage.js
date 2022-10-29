const csv = require('csv-parser')
const fs = require('fs');
const resultData = {};
fs.createReadStream('C:/Indian_Bay_Ecosystem_Corporation.csv')
  .pipe(csv())
  .on('data', (data) => {
        if (data.CharacteristicName==="Temperature, water"){
            let key = data.MonitoringLocationID;
            if(resultData[key]){
                let nextDeg = parseFloat(resultData[key].deg) + parseFloat(data.ResultValue);
                resultData[key].deg = nextDeg;
                resultData[key].count += 1;
                resultData[key].average = parseFloat(nextDeg/resultData[key].count);
            }else{
                var information = {}
                information.deg=parseFloat(data.ResultValue);
                information.count=1;
                information.average=parseFloat(data.ResultValue);
                resultData[key] = information;
            }
        };

  })
  .on('end', () => {
    console.log(resultData);
  });