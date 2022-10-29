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
                resultData[key].deg = nextDeg.toFixed(5);
                resultData[key].count += 1;
                resultData[key].average = parseFloat(nextDeg/resultData[key].count).toFixed(5);
            }else{
                var information = {}
                information.deg=parseFloat(data.ResultValue).toFixed(5);
                information.count=1;
                information.average=parseFloat(data.ResultValue).toFixed(5);
                resultData[key] = information;
            }

        };
   



  })
  .on('end', () => {
 
    console.log(resultData);
    //console.log(resultValueSum);
    //console.log(resultValueSumCount);
    //console.log((resultValueSum / resultValueSumCount).toFixed(2));
   // console.log(results[0]['Lowest Selling Price'])
  });