//                         Ashish Narayan Jha
//                         ashish.n.jha007@gmail.com
//                         9560633308



function solution(D) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = {};

  for (const day of days) {
    result[day] = 0;
  }

  for (const date in D) {
    var day = new Date(date).getDay(); 
    const value = D[date];
    if (day === 0) {
      day = 6;
    } else {
      day--;
    }
    result[days[day]] += value;
  }

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    let missingDays = 0;
    if (result[day] === 0) {
      let prevDay = i === 0 ? days[6] : days[i - 1]; 
      let nextDay = i === 6 ? days[0] : days[i + 1]; 
      let prevValue = result[prevDay];
      let nextValue = result[nextDay];
      missingDays = 1;
      for (let j = i + 1; j < days.length; j++) {
        const nextDay = days[j];
        if (result[nextDay] !== 0) {
          missingDays += j - i - 1;
          nextValue = result[nextDay];
          break;
        }
      }
      for (let j = i - 1; j >= 0; j--) {
        const prevDay = days[j];
        if (result[prevDay] !== 0) {
          missingDays += i - j - 1;
          prevValue = result[prevDay];
          break;
        }
      }
      const dif = Math.round((nextValue - prevValue) / (missingDays+1));
      result[day] = dif + prevValue;
    }
    for(let j=i+1; j<i+missingDays-1; j++){
        result[day] = result[j-1] + dif;
    }
  }

  return result;
}

const D = {
  "2020-01-01": 4,
  "2020-01-02": 4,
  "2020-01-03": 6,
  "2020-01-04": 8,
  "2020-01-05": 2,
  "2020-01-06": -6,
  "2020-01-07": 2,
  "2020-01-08": -2,
};

const output = solution(D);
console.log(output);
