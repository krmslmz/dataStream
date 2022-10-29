const csv = require('csv-parser')
const fs = require('fs');
const resultData = {};
fs.createReadStream('C:/Indian_Bay_Ecosystem_Corporation.csv')
  .pipe(csv())
  .on('data', (data) => {
        if (data.CharacteristicName==="Temperature, water"){
            let locationID = data.MonitoringLocationID;
            if(resultData[locationID]){
                let nextDeg = parseFloat(resultData[locationID].toDeg) + parseFloat(data.ResultValue);
                resultData[locationID].toDeg = nextDeg;
                resultData[locationID].count += 1;
                resultData[locationID].avrDeg = parseFloat(nextDeg/resultData[locationID].count);
            }else{
                var information = {}
                information.toDeg=parseFloat(data.ResultValue);
                information.count=1;
                information.avrDeg=parseFloat(data.ResultValue);
                resultData[locationID] = information;
            }
        };
  })
  .on('end', () => {
    console.log(resultData);
  });