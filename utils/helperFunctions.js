// Date Formatters
const DateFormatter = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${months[date.getMonth()]},${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  } ${date.getFullYear()} ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:00`;

  return formattedDate;
};

// const DateTimeFormatter = ( date ) =>
// {
//   const formattedDateTime = `${
//     date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
//   }/${
//     date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
//   }/${date.getFullYear()}, ${
//     date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
//   }:00`;

//   return formattedDateTime;
// };



//Get last24hrstime, last one week and biweekly dates

// const get24HoursBeforeTime = () =>
// {
//   const hours = [];
//   const currentDate = new Date();
//   let yesterday = new Date(currentDate);
//   yesterday.setDate(currentDate.getDate() - 1);
//   yesterday.setHours(yesterday.getHours() + 1);
//   while (yesterday <= currentDate) {
//     hours.push(DateFormatter(yesterday));
//     yesterday.setHours(yesterday.getHours() + 1);
//   }
//   return hours;
// };
// const getWeekly = () => {
//   const days = [];
//   const currentDate = new Date();
//   let yesterday = new Date(currentDate);
//   yesterday.setDate(currentDate.getDate() - 7);
//   yesterday.setDate(yesterday.getDate() + 1);
//   while (yesterday <= currentDate) {
//     days.push(DateFormatter(yesterday));
//     yesterday.setDate(yesterday.getDate() + 1);
//   }
//   return days;
// };
// const getBiWeekly = () => {
//   const days = [];
//   const currentDate = new Date();
//   let yesterday = new Date(currentDate);
//   yesterday.setDate(currentDate.getDate() - 14);
//   yesterday.setDate(yesterday.getDate() + 1);
//   while (yesterday <= currentDate) {
//     days.push(DateFormatter(yesterday));
//     yesterday.setDate(yesterday.getDate() + 1);
//   }
//   return days;
// };


//Add hours
const addHours = (data) => {
  const xLabels = data.performanceData.xLabels;
  const prevHour = new Date(xLabels[xLabels.length - 1]);
  prevHour.setHours(prevHour.getHours() + 1);
  xLabels.push(DateFormatter(prevHour));
  return xLabels;
};


const getRandomValues = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

//Checking current date and prev date
const getPrevDate = ( data ) =>
{
  const prevData = data?.performanceData?.xLabels;
  // const prevDate = new Date( prevData[ prevData.length - 1 ] );
  const prevDate =  prevData[ prevData.length - 1 ] ; 
  return prevDate;
};






module.exports = {
  // get24HoursBeforeTime,
  // getWeekly,
  // DateTimeFormatter,
  // getBiWeekly,
  DateFormatter,
  getRandomValues,
  getPrevDate,
  addHours,
};
