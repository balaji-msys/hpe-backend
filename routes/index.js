var express = require("express");
const {
  // get24HoursBeforeTime,
  // getWeekly,
  // getBiWeekly,
  // data,
  getRandomValues,
  getPrevDate,
  DateFormatter,
  addHours,
} = require("../utils/helperFunctions");
var router = express.Router();
const {
  last24hrsData,
  lastWeeklyData,
  lastBiWeeklyData,
  timeRangeData,
} = require("../model/PerformanceModel");
const RecommendationData = require("../model/RecommendationModel");
const VmData = require("../model/VmModel");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// } );

router.get("/", async (req, res, next) => {
  try {
    // const get24hrsData = await last24hrsData.findOne({});
    // const getWeeklyData = await lastWeeklyData.findOne({});
    // const getBiweeklyData = await lastBiWeeklyData.findOne({});
    const recommendationData = await RecommendationData.find({});
    const vmData = await VmData.find({});
    const getTimeRangeData = await timeRangeData.findOne({});
    res.send({
      // get24hrsData,
      // getWeeklyData,
      // getBiweeklyData,
      recommendationData,
      vmData,
      getTimeRangeData,
    });
  } catch (err) {
    console.log(err, "error in getting data");
    next(err);
  }
});

router.get("/timeRangeData", async (req, res, next) => {
  try {
    const existingData = await timeRangeData.findOne({});
    let prevDate = getPrevDate(existingData);
    if (DateFormatter(new Date()) > prevDate) {
      console.log("main if");
      let getTimeRangeData;
      while (DateFormatter(new Date()) > prevDate) {
        console.log("while",prevDate);
        const xLabels = addHours(existingData);

        // if (existingData?.performanceData) {
        //   console.log("performanceData if");

          existingData.performanceData.uData.push(getRandomValues());
          existingData.performanceData.pData.push(getRandomValues());

           existingData.networkData.uData.push(getRandomValues());
           existingData.networkData.pData.push(getRandomValues());

          existingData.memoryData.uData.push(getRandomValues());
          existingData.memoryData.pData.push(getRandomValues());
          getTimeRangeData = await timeRangeData.findOneAndUpdate(
            {},
            {
              $set: {
                "performanceData.uData": existingData.performanceData.uData,
                "performanceData.pData": existingData.performanceData.pData,
                "performanceData.xLabels": xLabels,
              },
            },
            { new: true }
          );
        // }
        // if (existingData?.networkData) {
        //   console.log("networkData if");

          // existingData.networkData.uData.push(getRandomValues());
          // existingData.networkData.pData.push(getRandomValues());

          getTimeRangeData = await timeRangeData.findOneAndUpdate(
            {},
            {
              $set: {
                "networkData.uData": existingData.networkData.uData,
                "networkData.pData": existingData.networkData.pData,
                "networkData.xLabels": xLabels,
              },
            },
            { new: true }
          );
        // }
        // if (existingData?.memoryData) {
        //   console.log("memory if");
          // existingData.memoryData.uData.push(getRandomValues());
          // existingData.memoryData.pData.push(getRandomValues());
          // existingData.memoryData.xLabels = xLabels;

          getTimeRangeData = await timeRangeData.findOneAndUpdate(
            {},
            {
              $set: {
                "memoryData.uData": existingData.memoryData.uData,
                "memoryData.pData": existingData.memoryData.pData,
                "memoryData.xLabels": xLabels,
              },
            },
            { new: true }
          );
        // }


        // if (existingData?.performanceData) {
        //   console.log("performanceData if");

        //   existingData.performanceData.uData.push(getRandomValues());
        //   existingData.performanceData.pData.push(getRandomValues());

        //   getTimeRangeData = await timeRangeData.findOneAndUpdate(
        //     {},
        //     {
        //       $set: {
        //         "performanceData.uData": existingData.performanceData.uData,
        //         "performanceData.pData": existingData.performanceData.pData,
        //         "performanceData.xLabels": xLabels,
        //       },
        //     },
        //     { new: true }
        //   );
        // }
        // if (existingData?.networkData) {
        //   console.log("networkData if");

        //   existingData.networkData.uData.push(getRandomValues());
        //   existingData.networkData.pData.push(getRandomValues());

        //   getTimeRangeData = await timeRangeData.findOneAndUpdate(
        //     {},
        //     {
        //       $set: {
        //         "networkData.uData": existingData.networkData.uData,
        //         "networkData.pData": existingData.networkData.pData,
        //         "networkData.xLabels": xLabels,
        //       },
        //     },
        //     { new: true }
        //   );
        // }
        // if (existingData?.memoryData) {
        //   console.log("memory if");
        //   existingData.memoryData.uData.push(getRandomValues());
        //   existingData.memoryData.pData.push(getRandomValues());
        //   // existingData.memoryData.xLabels = xLabels;

        //   getTimeRangeData = await timeRangeData.findOneAndUpdate(
        //     {},
        //     {
        //       $set: {
        //         "memoryData.uData": existingData.memoryData.uData,
        //         "memoryData.pData": existingData.memoryData.pData,
        //         "memoryData.xLabels": xLabels,
        //       },
        //     },
        //     { new: true }
        //   );
        // }
        prevDate = getPrevDate(getTimeRangeData);
      }
      res.send(getTimeRangeData);
    } else {
      console.log("else");
      const existingData = await timeRangeData.findOne({});
      res.send(existingData);
    }
  } catch (err) {
    console.log(err, "err in getting timeperiod data");
    next(err);
  }
});
router.get("/last24hrsdata", async (req, res, next) => {
  try {
    console.log("last24hrsdata");
    const get24hrsData = {
      performanceData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      networkData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      memoryData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
    };
    const getData = await timeRangeData.find({});
    const filteredData = getData.map((data) => {
      const endHour = new Date(
        data.performanceData.xLabels[data.performanceData.xLabels.length - 1]
      );
      const startHour = new Date(endHour);
      startHour.setDate(startHour.getDate() - 1);
      data.performanceData.xLabels.filter((value, index) => {
        if (new Date(value) > startHour && new Date(value) <= endHour) {
          // console.log( value, index, "value" );
          get24hrsData.performanceData.uData.push(
            data.performanceData.uData[index]
          );
          get24hrsData.performanceData.pData.push(
            data.performanceData.pData[index]
          );
          get24hrsData.performanceData.xLabels.push(value);
          //Network Data
          get24hrsData.networkData.uData.push(data.networkData.uData[index]);
          get24hrsData.networkData.pData.push(data.networkData.pData[index]);
          get24hrsData.networkData.xLabels.push(value);
          //Memory Data
          get24hrsData.memoryData.uData.push(data.memoryData.uData[index]);
          get24hrsData.memoryData.pData.push(data.memoryData.pData[index]);
          get24hrsData.memoryData.xLabels.push(value);

          startHour.setHours(startHour.getHours() + 1);
        }
      });
    });
    // console.log(get24hrsData);
    res.send(get24hrsData);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/lastWeeklyData", async (req, res, next) => {
  try {
    console.log("lastWeeklyData");

    const getWeeklyData = {
      performanceData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      networkData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      memoryData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
    };
    const getData = await timeRangeData.find({});
    const filteredData = getData.map((data) => {
      const endDate = new Date(
        data.performanceData.xLabels[data.performanceData.xLabels.length - 1]
      );
      // console.log(endDate.getHours(),"end date");
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);
      // console.log(startDate, "start date");

      data.performanceData.xLabels.filter((value, index) => {
        // console.log(firstDate, "i");
        if (new Date(value) >= startDate && new Date(value) <= endDate) {
          // console.log(index, "value");
          getWeeklyData.performanceData.uData.push(
            data.performanceData.uData[index]
          );
          getWeeklyData.performanceData.pData.push(
            data.performanceData.pData[index]
          );
          getWeeklyData.performanceData.xLabels.push(value);
          //Network Data
          getWeeklyData.networkData.uData.push(data.networkData.uData[index]);
          getWeeklyData.networkData.pData.push(data.networkData.pData[index]);
          getWeeklyData.networkData.xLabels.push(value);
          //Memory Data
          getWeeklyData.memoryData.uData.push(data.memoryData.uData[index]);
          getWeeklyData.memoryData.pData.push(data.memoryData.pData[index]);
          getWeeklyData.memoryData.xLabels.push(value);

          startDate.setDate(startDate.getDate() + 1);
        }
      });
    });
    // console.log(getWeeklyData);
    res.send(getWeeklyData);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/lastBiWeeklyData", async (req, res, next) => {
  try {
    console.log("lastBiWeeklyData");

    const getBiweeklyData = {
      performanceData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      networkData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      memoryData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
    };
    const getData = await timeRangeData.find({});
    const filteredData = getData.map((data) => {
      const endDate = new Date(
        data.performanceData.xLabels[data.performanceData.xLabels.length - 1]
      );
      // console.log(endDate.getHours(),"end date");
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 13);
      // console.log(startDate, "start date");

      data.performanceData.xLabels.filter((value, index) => {
        // console.log(firstDate, "i");
        if (new Date(value) >= startDate && new Date(value) <= endDate) {
          // console.log(index, "value");
          getBiweeklyData.performanceData.uData.push(
            data.performanceData.uData[index]
          );
          getBiweeklyData.performanceData.pData.push(
            data.performanceData.pData[index]
          );
          getBiweeklyData.performanceData.xLabels.push(value);
          //Network Data
          getBiweeklyData.networkData.uData.push(data.networkData.uData[index]);
          getBiweeklyData.networkData.pData.push(data.networkData.pData[index]);
          getBiweeklyData.networkData.xLabels.push(value);
          //Memory Data
          getBiweeklyData.memoryData.uData.push(data.memoryData.uData[index]);
          getBiweeklyData.memoryData.pData.push(data.memoryData.pData[index]);
          getBiweeklyData.memoryData.xLabels.push(value);

          startDate.setDate(startDate.getDate() + 1);
        }
      });
    });
    // console.log(getBiweeklyData);
    res.send(getBiweeklyData);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/:range", async (req, res, next) => {
  try {
    const range = req.params.range;
    switch (range) {
      // case "last24hrs":
      //   const get24hrsData = await last24hrsData.findOne({});
      //   res.send(get24hrsData);
      //   break;
      // case "weekly":
      //   const getWeeklyData = await lastWeeklyData.findOne({});

      //   res.send(getWeeklyData);
      //   break;
      // case "biweekly":
      //   const getBiweeklyData = await lastBiWeeklyData.findOne({});
      //   res.send(getBiweeklyData);
      //   break;
      case "vm":
        const vmData = await VmData.find({});

        res.send(vmData);
        break;
      case "recommendation":
        const recommendationData = await RecommendationData.find({});

        res.send(recommendationData);
        break;
      case "timeRange":
        const getTimeRangeData = await timeRangeData.find({});

        res.send(getTimeRangeData);
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err, "error in getting data");
    next(err);
  }
});

router.post("/time-range", async (req, res, next) => {
  try {
    console.log("time-range");
    const getTimeRangeData = {
      performanceData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      networkData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
      memoryData: {
        uData: [],
        pData: [],
        xLabels: [],
      },
    };
    const { startDate, endDate } = req.body;
    // console.log(startDate, endDate, "startDate, endDate");
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const getData = await timeRangeData.find({});
    const filteredData = getData.map((data) => {
      data.performanceData.xLabels.filter((value, index) => {
        if (value >= DateFormatter(sDate) && value <= DateFormatter(eDate)) {
          //Performance Data
          getTimeRangeData.performanceData.uData.push(
            data.performanceData.uData[index]
          );
          getTimeRangeData.performanceData.pData.push(
            data.performanceData.pData[index]
          );
          getTimeRangeData.performanceData.xLabels.push(value);
          //Network Data
          getTimeRangeData.networkData.uData.push(
            data.networkData.uData[index]
          );
          getTimeRangeData.networkData.pData.push(
            data.networkData.pData[index]
          );
          getTimeRangeData.networkData.xLabels.push(value);
          //Memory Data
          getTimeRangeData.memoryData.uData.push(data.memoryData.uData[index]);
          getTimeRangeData.memoryData.pData.push(data.memoryData.pData[index]);
          getTimeRangeData.memoryData.xLabels.push(value);

          sDate.setDate(sDate.getDate() + 1);
        }
      });
      // Check if endDate itself exists in the data
      if (
        getTimeRangeData.performanceData.xLabels.includes(DateFormatter(eDate))
      ) {
        console.log("if");
        return getTimeRangeData;
      } else {
        console.log("else");
        const endDateIndex = data.performanceData.xLabels.indexOf(
          DateFormatter(eDate)
        );
        if (endDateIndex !== -1) {
          console.log("endDate index if");
          //performanceData

          getTimeRangeData.performanceData.uData.push(
            data.performanceData.uData[endDateIndex]
          );
          getTimeRangeData.performanceData.pData.push(
            data.performanceData.pData[endDateIndex]
          );
          getTimeRangeData.performanceData.xLabels.push(
            data.performanceData.xLabels[endDateIndex]
          );
          //networkData

          getTimeRangeData.networkData.uData.push(
            data.networkData.uData[endDateIndex]
          );
          getTimeRangeData.networkData.pData.push(
            data.networkData.pData[endDateIndex]
          );
          getTimeRangeData.networkData.xLabels.push(
            data.networkData.xLabels[endDateIndex]
          );
          //memoryData

          getTimeRangeData.memoryData.uData.push(
            data.memoryData.uData[endDateIndex]
          );
          getTimeRangeData.memoryData.pData.push(
            data.memoryData.pData[endDateIndex]
          );
          getTimeRangeData.memoryData.xLabels.push(
            data.memoryData.xLabels[endDateIndex]
          );
        }
      }
    });

    res.send(getTimeRangeData);
  } catch (err) {
    console.log(err, "err in time-range filtering");
    next(err);
  }
});

module.exports = router;

//filtered data

// router.post("/last24hrsdata", async (req, res, next) => {
//   try {
//     const existingData = await last24hrsData.findOne({});
//     let prevDate = getPrevDate(existingData);
//     // console.log(
//     //   DateFormatter(new Date()),
//     //   prevDate,
//     //   DateFormatter(new Date()) > prevDate,
//     //   "checking"
//     // );
//     if (DateFormatter(new Date()) > prevDate) {
//       console.log("if");
//       let get24hrsData;

//       // while (new Date() > new Date(prevDate)) {
//       // console.log("while");
//       // const xLabels = get24HoursBeforeTime(existingData);
//       if (existingData?.performanceData) {
//         existingData.performanceData.uData.shift();
//         existingData.performanceData.uData.push(getRandomValues());
//         existingData.performanceData.pData.shift();
//         existingData.performanceData.pData.push(getRandomValues());

//         get24hrsData = await last24hrsData.findOneAndUpdate(
//           {},
//           {
//             $set: {
//               "performanceData.uData": existingData.performanceData.uData,
//               "performanceData.pData": existingData.performanceData.pData,
//               "performanceData.xLabels": get24HoursBeforeTime(),
//             },
//           },
//           { new: true }
//         );
//       }
//       if (existingData?.networkData) {
//         existingData.networkData.uData.shift();
//         existingData.networkData.uData.push(getRandomValues());
//         existingData.networkData.pData.shift();
//         existingData.networkData.pData.push(getRandomValues());

//         get24hrsData = await last24hrsData.findOneAndUpdate(
//           {},
//           {
//             $set: {
//               "networkData.uData": existingData.networkData.uData,
//               "networkData.pData": existingData.networkData.pData,
//               "networkData.xLabels": get24HoursBeforeTime(),
//             },
//           },
//           { new: true }
//         );
//       }
//       if (existingData?.memoryData) {
//         existingData.memoryData.uData.shift();
//         existingData.memoryData.uData.push(getRandomValues());
//         existingData.memoryData.pData.shift();
//         existingData.memoryData.pData.push(getRandomValues());
//         // existingData.memoryData.xLabels.shift();
//         // existingData.memoryData.xLabels.push(xLabels);

//         get24hrsData = await last24hrsData.findOneAndUpdate(
//           {},
//           {
//             $set: {
//               "memoryData.uData": existingData.memoryData.uData,
//               "memoryData.pData": existingData.memoryData.pData,
//               "memoryData.xLabels": get24HoursBeforeTime(),
//             },
//           },
//           { new: true }
//         );
//       }
//       // console.log(existingData.performanceData,"xlabels");
//       // prevDate = getPrevDate(get24hrsData);
//       // }
//       res.send(get24hrsData);
//     } else {
//       console.log("else");
//       const existingData = await last24hrsData.findOne({});
//       res.send(existingData);
//     }
//   } catch (err) {
//     console.log(err, "err");
//     next(err);
//   }
//   // let get24hrsData;
//   // const prevHour = getPrevHour(existingData);
//   // if (new Date().getHours() > prevHour) {
//   //   console.log("time if");
//   // const addeddata = await new last24hrsData({
//   //   performanceData: {
//   //     uData: [
//   //       3607, 5324, 8101, 6099, 7596, 2916, 5264, 6563, 3774, 7814, 9318,
//   //       9409, 3705, 8300, 1862, 8347, 8544, 2973, 1257, 6684, 4680, 4777,
//   //       4608, 8291,
//   //     ],
//   //     pData: [
//   //       9398, 6672, 8363, 8711, 2630, 5944, 2021, 8404, 5351, 9843, 8462,
//   //       3760, 5955, 1594, 2168, 9188, 2355, 3194, 9396, 8591, 5657, 5367,
//   //       8776, 1972,
//   //     ],
//   //     xLabels: [
//   //       "14/04/2024, 18:00",
//   //       "14/04/2024, 19:00",
//   //       "14/04/2024, 20:00",
//   //       "14/04/2024, 21:00",
//   //       "14/04/2024, 22:00",
//   //       "14/04/2024, 23:00",
//   //       "15/04/2024, 00:00",
//   //       "15/04/2024, 01:00",
//   //       "15/04/2024, 02:00",
//   //       "15/04/2024, 03:00",
//   //       "15/04/2024, 04:00",
//   //       "15/04/2024, 05:00",
//   //       "15/04/2024, 06:00",
//   //       "15/04/2024, 07:00",
//   //       "15/04/2024, 08:00",
//   //       "15/04/2024, 09:00",
//   //       "15/04/2024, 10:00",
//   //       "15/04/2024, 11:00",
//   //       "15/04/2024, 12:00",
//   //       "15/04/2024, 13:00",
//   //       "15/04/2024, 14:00",
//   //       "15/04/2024, 15:00",
//   //       "15/04/2024, 16:00",
//   //       "15/04/2024, 17:00",
//   //     ],
//   //   },
//   //   networkData: {
//   //     uData: [
//   //       7927, 7170, 9923, 7906, 2448, 7294, 3870, 6578, 7959, 7301, 2651,
//   //       7871, 7856, 2337, 6728, 2394, 3564, 706, 5682, 3272, 279, 9072, 7762,
//   //       3193,
//   //     ],
//   //     pData: [
//   //       4514, 1506, 3910, 7581, 4042, 9494, 982, 9371, 1574, 8361, 7168, 2015,
//   //       2682, 6240, 7646, 9205, 9487, 5577, 6785, 6373, 3717, 8948, 3485,
//   //       1286,
//   //     ],
//   //     xLabels: [
//   //       "14/04/2024, 17:00",
//   //       "14/04/2024, 18:00",
//   //       "14/04/2024, 19:00",
//   //       "14/04/2024, 20:00",
//   //       "14/04/2024, 21:00",
//   //       "14/04/2024, 22:00",
//   //       "14/04/2024, 23:00",
//   //       "14/04/2024, 00:00",
//   //       "15/04/2024, 01:00",
//   //       "15/04/2024, 02:00",
//   //       "15/04/2024, 03:00",
//   //       "15/04/2024, 04:00",
//   //       "15/04/2024, 05:00",
//   //       "15/04/2024, 06:00",
//   //       "15/04/2024, 07:00",
//   //       "15/04/2024, 08:00",
//   //       "15/04/2024, 09:00",
//   //       "15/04/2024, 10:00",
//   //       "15/04/2024, 11:00",
//   //       "15/04/2024, 12:00",
//   //       "15/04/2024, 14:00",
//   //       "15/04/2024, 15:00",
//   //       "15/04/2024, 16:00",
//   //       "15/04/2024, 17:00",
//   //     ],
//   //   },
//   //   memoryData: {
//   //     uData: [
//   //       4270, 2468, 8751, 794, 4239, 5221, 9210, 643, 2199, 2018, 7977, 2268,
//   //       6248, 8293, 4258, 9775, 264, 9910, 72, 9377, 7362, 1906, 9317, 9954,
//   //     ],
//   //     pData: [
//   //       5435, 1937, 5758, 1203, 1899, 6926, 5627, 9787, 4542, 150, 5247, 5368,
//   //       4088, 486, 7297, 8638, 17, 9598, 6335, 4562, 8787, 2454, 5642, 3269,
//   //     ],
//   //     xLabels: [
//   //       "14/04/2024, 17:00",
//   //       "14/04/2024, 18:00",
//   //       "14/04/2024, 19:00",
//   //       "14/04/2024, 20:00",
//   //       "14/04/2024, 21:00",
//   //       "14/04/2024, 22:00",
//   //       "14/04/2024, 23:00",
//   //       "14/04/2024, 00:00",
//   //       "15/04/2024, 01:00",
//   //       "15/04/2024, 02:00",
//   //       "15/04/2024, 03:00",
//   //       "15/04/2024, 04:00",
//   //       "15/04/2024, 05:00",
//   //       "15/04/2024, 06:00",
//   //       "15/04/2024, 07:00",
//   //       "15/04/2024, 08:00",
//   //       "15/04/2024, 09:00",
//   //       "15/04/2024, 10:00",
//   //       "15/04/2024, 11:00",
//   //       "15/04/2024, 12:00",
//   //       "15/04/2024, 14:00",
//   //       "15/04/2024, 15:00",
//   //       "15/04/2024, 16:00",
//   //       "15/04/2024, 17:00",
//   //     ],
//   //   },
//   // });
//   // const add = addeddata.save();
//   // const data=await last24hrsData.find({})
//   // res.send(data);
//   //     if ( existingData?.performanceData )
//   //     {
//   // console.log("if");
//   //       const
//   //       existingData.performanceData.uData.shift();
//   //       existingData.performanceData.uData.push(getRandomValues());
//   //       existingData.performanceData.pData.shift();
//   //       existingData.performanceData.pData.push(getRandomValues());
//   // // console.log("if",existingData.performanceData);
//   //       // get24hrsData = await last24hrsData.findOneAndUpdate(
//   //       //   {}, // Empty query to find the first document
//   //       //   {
//   //       //     $set: {
//   //       //       "performanceData.uData": existingData.performanceData.uData,
//   //       //       "performanceData.pData": existingData.performanceData.pData,
//   //       //       "performanceData.xLabels": get24HoursBeforeTime(),
//   //       //     },
//   //       //   },
//   //       //   { new: true }
//   //       // );

//   //       // res.send(get24hrsData.performanceData);
//   //     } else if ( existingData?.networkData )
//   //     {
//   // console.log("else if")

//   //       existingData.networkData.uData.shift();
//   //       existingData.networkData.uData.push(getRandomValues());
//   //       existingData.networkData.pData.shift();
//   //       existingData.networkData.pData.push(getRandomValues());
//   // // console.log("else if", existingData.networkData);

//   //       // get24hrsData = await last24hrsData.findOneAndUpdate(
//   //       //   {}, // Empty query to find the first document
//   //       //   {
//   //       //     $set: {
//   //       //       "networkData.uData": existingData.networkData.uData,
//   //       //       "networkData.pData": existingData.networkData.pData,
//   //       //       "networkData.xLabels": get24HoursBeforeTime(),
//   //       //     },
//   //       //   },
//   //       //   { new: true }
//   //       // );
//   //     } else
//   //     {
//   //       console.log("else");
//   //       existingData.memoryData.uData.shift();
//   //       existingData.memoryData.uData.push(getRandomValues());
//   //       existingData.memoryData.pData.shift();
//   //       existingData.memoryData.pData.push(getRandomValues());
//   // // console.log("else", existingData.memoryData);

//   //       // console.log("time else");
//   //       // const existingData = await last24hrsData.findOne({});
//   //       // res.send(existingData);
//   //     }
//   // res.send(existingData,"updated")
//   //  console.log(existingData,"updated");
//   // const get24hrsData = await last24hrsData.findByIdAndUpdate(
//   //   { _id: existingData._id }, {

//   //     }
//   //   },{new:true}
//   // )
//   // try {
//   //   const existingData = await PerformanceData.findOne({});
//   //   const prevHour = getPrevHour(existingData);
//   //   if (
//   //     new Date().getHours() > prevHour
//   //   ) {
//   //     console.log("time if");
//   //     if (existingData.get24hrsData) {
//   //       existingData.get24hrsData.uData.shift();
//   //       existingData.get24hrsData.uData.push(getRandomValues());
//   //       existingData.get24hrsData.pData.shift();
//   //       existingData.get24hrsData.pData.push(getRandomValues());
//   //     }
//   //     const get24hrsPerformanceData = await PerformanceData.findOneAndUpdate(
//   //       {}, // Empty query to find the first document
//   //       {
//   //         $set: {
//   //           "get24hrsData.uData": existingData.get24hrsData.uData,
//   //           "get24hrsData.pData": existingData.get24hrsData.pData,
//   //           "get24hrsData.xLabels": get24HoursBeforeTime(),
//   //         },
//   //       },
//   //       { new: true }
//   //     );
//   //     res.send(get24hrsPerformanceData.get24hrsData);
//   //   } else {
//   //     console.log("time else");
//   //     const existingData = await PerformanceData.findOne({});
//   //     res.send(existingData);
//   //   }
//   // } catch (err) {
//   //   console.log(err, "err");
//   // }
// });
// router.post("/lastWeeklyData", async (req, res, next) => {
//   // const prevHour = getPrevHour(existingData);
//   // if (new Date().getHours() > prevHour) {
//   //   console.log("time if");
//   // const addeddata = await new lastWeeklyData({
//   //   performanceData: {
//   //     uData: [9388, 4847, 4507, 2549, 6927, 2108, 1921],
//   //     pData: [5747, 6650, 6637, 5076, 6163, 1305, 6988],
//   //     xLabels: getWeekly(),
//   //   },
//   //   networkData: {
//   //     uData: [7072, 7198, 1010, 7159, 6893, 9505, 5674],
//   //     pData: [8120, 4609, 9769, 3228, 9666, 5102, 8606],
//   //     xLabels: getWeekly(),
//   //   },
//   //   memoryData: {
//   //     uData: [1353, 8001, 6610, 7238, 8790, 1303, 9559],
//   //     pData: [9227, 3194, 4570, 3752, 9359, 3642, 5219],
//   //     xLabels: getWeekly(),
//   //   },
//   // });
//   // const add = addeddata.save();
//   // const data = await lastWeeklyData.find({});
//   // console.log(data);
//   // res.send(data);
//   try {
//     const existingData = await lastWeeklyData.findOne({});
//     const prevDate = getPrevDate(existingData);
//     if (DateFormatter(new Date()) > prevDate) {
//       console.log("if");
//       let getWeeklyData;

//       if (existingData?.performanceData) {
//         existingData.performanceData.uData.shift();
//         existingData.performanceData.uData.push(getRandomValues());
//         existingData.performanceData.pData.shift();
//         existingData.performanceData.pData.push(getRandomValues());

//         getWeeklyData = await lastWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "performanceData.uData": existingData.performanceData.uData,
//               "performanceData.pData": existingData.performanceData.pData,
//               "performanceData.xLabels": getWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }

//       if (existingData?.networkData) {
//         existingData.networkData.uData.shift();
//         existingData.networkData.uData.push(getRandomValues());
//         existingData.networkData.pData.shift();
//         existingData.networkData.pData.push(getRandomValues());

//         getWeeklyData = await lastWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "networkData.uData": existingData.networkData.uData,
//               "networkData.pData": existingData.networkData.pData,
//               "networkData.xLabels": getWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }
//       if (existingData.memoryData) {
//         existingData.memoryData.uData.shift();
//         existingData.memoryData.uData.push(getRandomValues());
//         existingData.memoryData.pData.shift();
//         existingData.memoryData.pData.push(getRandomValues());

//         getWeeklyData = await lastWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "memoryData.uData": existingData.memoryData.uData,
//               "memoryData.pData": existingData.memoryData.pData,
//               "memoryData.xLabels": getWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }
//       // console.log( getWeeklyData, "updated" );
//       res.send(getWeeklyData);
//     } else {
//       console.log("else");
//       const existingData = await lastWeeklyData.findOne({});
//       res.send(existingData);
//     }
//   } catch (err) {
//     console.log(err, "err");
//     next(err);
//   }
// });
// router.post("/lastBiWeeklyData", async (req, res, next) => {
//   try {
//     const existingData = await lastBiWeeklyData.findOne({});
//     const prevDate = getPrevDate(existingData);
//     if (DateFormatter(new Date()) > prevDate) {
//       console.log("if");
//       let getBiWeeklyData;

//       if (existingData?.performanceData) {
//         existingData.performanceData.uData.shift();
//         existingData.performanceData.uData.push(getRandomValues());
//         existingData.performanceData.pData.shift();
//         existingData.performanceData.pData.push(getRandomValues());

//         getBiWeeklyData = await lastBiWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "performanceData.uData": existingData.performanceData.uData,
//               "performanceData.pData": existingData.performanceData.pData,
//               "performanceData.xLabels": getBiWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }

//       if (existingData?.networkData) {
//         existingData.networkData.uData.shift();
//         existingData.networkData.uData.push(getRandomValues());
//         existingData.networkData.pData.shift();
//         existingData.networkData.pData.push(getRandomValues());

//         getBiWeeklyData = await lastBiWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "networkData.uData": existingData.networkData.uData,
//               "networkData.pData": existingData.networkData.pData,
//               "networkData.xLabels": getBiWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }
//       if (existingData.memoryData) {
//         existingData.memoryData.uData.shift();
//         existingData.memoryData.uData.push(getRandomValues());
//         existingData.memoryData.pData.shift();
//         existingData.memoryData.pData.push(getRandomValues());

//         getBiWeeklyData = await lastBiWeeklyData.findOneAndUpdate(
//           {}, // Empty query to find the first document
//           {
//             $set: {
//               "memoryData.uData": existingData.memoryData.uData,
//               "memoryData.pData": existingData.memoryData.pData,
//               "memoryData.xLabels": getBiWeekly(),
//             },
//           },
//           { new: true }
//         );
//       }
//       // console.log( getBiWeeklyData, "updated" );
//       res.send(getBiWeeklyData);
//     } else {
//       console.log("else");
//       const existingData = await lastBiWeeklyData.findOne({});
//       res.send(existingData);
//     }
//   } catch (err) {
//     console.log(err, "err");
//     next(err);
//   }
//   //  const prevHour = getPrevHour(existingData);
//   // if (new Date().getHours() > prevHour) {
//   //   console.log("time if");
//   // const addeddata = await new lastBiWeeklyData({
//   //   performanceData: {
//   //     uData: [
//   //       4734, 3363, 8964, 4986, 5470, 2807, 3570, 7533, 1951, 1221, 9482, 5009,
//   //       9651, 8511,
//   //     ],
//   //     pData: [
//   //       5597, 7109, 4107, 1747, 6039, 9206, 2523, 1254, 9507, 2293, 7216, 2625,
//   //       4970, 5565,
//   //     ],
//   //     xLabels: getBiWeekly(),
//   //   },
//   //   networkData: {
//   //     uData: [
//   //       7026, 4814, 1649, 6999, 4415, 5448, 3995, 3291, 1375, 1702, 2182, 4094,
//   //       6468, 9896,
//   //     ],
//   //     pData: [
//   //       9348, 1473, 1905, 7887, 2736, 5339, 8333, 5253, 9547, 2040, 2990, 6822,
//   //       9408, 2437,
//   //     ],
//   //     xLabels: getBiWeekly(),
//   //   },
//   //   memoryData: {
//   //     uData: [
//   //       7042, 6931, 3860, 8958, 9301, 2666, 2213, 2025, 1519, 4066, 2973, 7538,
//   //       1815, 4722,
//   //     ],
//   //     pData: [
//   //       5649, 4091, 4124, 1683, 9728, 6930, 2231, 7364, 5668, 4888, 5138, 4427,
//   //       4430, 3661,
//   //     ],
//   //     xLabels: getBiWeekly(),
//   //   },
//   // });
//   // const add = addeddata.save();
//   // const data = await lastWeeklyData.find( {} );
//   // console.log( data );
//   // res.send( data );
// });

// const filteredData = performanceData.xLabels.reduce((acc, label, index) => {
//   const currentDateObj = new Date(label);
//   if (currentDateObj >= startDateObj && currentDateObj <= endDateObj) {
//     acc.push({
//       time: label,
//       uData: performanceData.uData[index],
//       pData: performanceData.pData[index]
//     });
//   }
//   return acc;
// const [ hours, uData, pData ] = getCustomizedDate();
// res.send({uData,pData,hours})
// const addedData = await new timeRangeData({
//   performanceData: {
//     uData: [
//       7629, 5314, 3084, 4991, 7679, 3934, 2320, 2832, 2109, 8772, 7195,
//       2073, 2085, 7881, 4704, 4056, 7192, 7770, 5885, 4261, 6648, 1267,
//       2613, 5440, 4929, 4692, 9939, 7763, 9291, 9997, 8376, 4084, 3685,
//       4665, 8334, 8245, 9249, 9958, 7243, 3176, 2418, 9243, 6017, 7455,
//       7223, 8127, 4402, 3937, 3925, 9348, 2906, 4917, 4966, 1390, 7599,
//       6342, 8077, 3589, 5575, 6055, 9093, 9921, 1031, 5111, 7357, 7426,
//       9316, 5168, 4910, 7547, 6282, 6592, 6368, 5805, 6645, 4719, 1451,
//       8348, 7327, 5632, 1183, 1168, 5380, 7877, 8332, 4019, 6501, 6195,
//       5355, 6293, 6361, 8249, 9502, 8365, 2250, 8342, 7359, 7680, 8785,
//       6933, 1566, 4233, 2059, 1675, 4223, 9564, 4278, 2052, 6869, 9006,
//       5218, 9955, 8655, 7663, 9871, 1630, 9708, 8385, 6120, 4318, 8023,
//       7468, 3830, 3976, 8578, 7791, 4744, 7807, 6970, 4405, 7801, 5398,
//       4711, 3637, 8292, 2219, 7298, 4741, 2586, 2227, 6074, 3399, 1558,
//       2302, 8562, 6063, 9665, 4192, 9448, 2641, 5680, 8649, 2161, 2867,
//       1752, 7548, 9742, 8923, 6105, 4072, 6611, 8344, 1352, 2500, 2403,
//       7590, 4801, 6235, 8564, 9075, 5728, 7226, 7522, 2351, 8624, 9182,
//       3781, 7319, 9172, 5794, 8564, 2901, 1366, 6422, 4087, 3855, 2681,
//       8983, 4074, 1220, 2673, 7104, 5657, 6489, 9902, 6789, 4029, 6565,
//       9136, 2394, 3544, 8502, 1724, 9990, 1301, 1109, 5593, 3542, 7398,
//       7816, 3242, 6826, 3964, 7217, 4309, 4794, 4462, 8289, 9784, 5398,
//       4381, 5003, 2626, 2659, 6561, 5233, 3854, 7991, 8068, 4790, 1678,
//       3013, 3250, 2681, 9663, 2655, 9747, 7154, 4261, 2010,
//     ],
//     pData: [
//       7841, 9685, 5717, 9542, 2158, 2356, 2570, 6965, 6924, 2962, 4446,
//       9180, 1627, 8113, 9036, 7888, 3626, 6471, 4046, 4733, 4716, 2711,
//       8037, 8166, 8820, 9966, 6285, 7836, 4369, 7944, 7540, 6283, 6558,
//       7625, 4728, 3922, 9447, 9229, 2009, 1550, 5881, 2817, 6260, 6224,
//       7419, 3617, 8644, 5385, 5270, 1671, 9531, 6964, 3463, 5581, 9793,
//       7941, 2213, 7064, 8932, 1756, 1656, 8388, 5318, 3509, 9796, 7122,
//       6297, 5718, 7357, 6973, 3899, 9236, 3168, 7612, 7519, 3264, 2548,
//       5900, 7853, 5037, 8392, 8033, 4189, 9689, 5049, 4301, 1526, 2904,
//       2047, 5208, 5070, 4353, 4352, 9414, 7044, 2356, 8071, 6995, 7103,
//       9083, 9200, 5941, 8646, 2834, 8864, 2371, 1343, 6495, 6274, 8009,
//       7429, 2935, 2137, 8310, 5728, 9555, 3992, 9145, 9272, 5129, 2160,
//       6578, 8141, 6044, 1097, 4433, 9879, 3028, 4784, 3068, 6348, 3979,
//       9359, 6456, 8676, 3903, 3126, 2382, 8138, 6767, 2241, 9319, 3284,
//       7289, 6013, 9450, 6499, 9627, 9358, 4685, 8260, 6401, 1725, 2698,
//       9715, 2569, 8521, 8193, 8902, 2760, 5582, 4000, 4354, 6699, 5444,
//       2751, 5665, 7313, 7351, 7301, 1134, 5973, 6940, 5324, 6591, 8685,
//       1420, 8775, 6998, 4598, 5524, 9369, 3740, 5150, 4597, 2708, 6884,
//       1804, 8396, 7219, 8008, 1411, 3941, 8048, 2643, 7944, 7416, 7355,
//       2496, 8898, 1823, 1867, 9074, 5422, 8990, 3213, 4392, 6581, 8657,
//       7554, 1568, 3541, 7136, 7112, 3086, 9501, 5188, 8766, 3435, 9921,
//       2366, 7191, 1719, 6878, 8434, 9386, 5647, 4154, 2935, 5432, 8188,
//       3190, 8083, 8559, 2452, 7931, 3215, 1139, 4440, 5263,
//     ],
//     xLabels: hours,
//   },
//   networkData: {
//     uData: [
//       1848, 7754, 1979, 5157, 4682, 8358, 3916, 5065, 4242, 3805, 9014,
//       2123, 1164, 6906, 2719, 9415, 2508, 6869, 7652, 6864, 7440, 2018,
//       9970, 9053, 2715, 6440, 8233, 2488, 7676, 1252, 2823, 7923, 9060,
//       8085, 3207, 6823, 8247, 2425, 1341, 2053, 8657, 2545, 5261, 5773,
//       1942, 6681, 1460, 8136, 8254, 5999, 7901, 5045, 5937, 1430, 6365,
//       6428, 9318, 2241, 2683, 3522, 9447, 3684, 8302, 7527, 3879, 2937,
//       2564, 8108, 4906, 6179, 1794, 2955, 1326, 3795, 7032, 9600, 8270,
//       7431, 4474, 2746, 5994, 4518, 6058, 6720, 8347, 2523, 6742, 3264,
//       7400, 6767, 9526, 6530, 4724, 3095, 2532, 9580, 8704, 5330, 9601,
//       9482, 4344, 6755, 2099, 4294, 8671, 6738, 4070, 5532, 3463, 8449,
//       6956, 3264, 6188, 2770, 9304, 8596, 4612, 1401, 8363, 1967, 7167,
//       4038, 7215, 7106, 8412, 1976, 2154, 8384, 4763, 3787, 7252, 7056,
//       7113, 2436, 5496, 1562, 6558, 2977, 1050, 3000, 1159, 1774, 6590,
//       8322, 4149, 3207, 2356, 5848, 8666, 4837, 3287, 8687, 4952, 8618,
//       3175, 2795, 3228, 5977, 9958, 8616, 7350, 1391, 7304, 6488, 4811,
//       5830, 1451, 4634, 9562, 4976, 9796, 9109, 3767, 8385, 8929, 4457,
//       4445, 9808, 8603, 7833, 8664, 5940, 5297, 7844, 8815, 7217, 2812,
//       1847, 8217, 6542, 6454, 4111, 4465, 2297, 9095, 8281, 2588, 4880,
//       3852, 3510, 9729, 1370, 2010, 4755, 5025, 3115, 9400, 6710, 5955,
//       9441, 3129, 8531, 3961, 1207, 6635, 4612, 8766, 7977, 7250, 9598,
//       6085, 8384, 6826, 7378, 5667, 2625, 8670, 4266, 9331, 9053, 2425,
//       1198, 1311, 4213, 4309, 3558, 7938, 7383, 8332, 7825,
//     ],
//     pData: [
//       1427, 7444, 6287, 5994, 8930, 3352, 6446, 5682, 3744, 3717, 6828,
//       5369, 8414, 7201, 5094, 1370, 4772, 5204, 2679, 5164, 4373, 5430,
//       8085, 4871, 7723, 3490, 9819, 5431, 5655, 1248, 2994, 1255, 9344,
//       1500, 7503, 7299, 6843, 7683, 3002, 6288, 5030, 9060, 7770, 7408,
//       8344, 3754, 6425, 6378, 4877, 8327, 8480, 2155, 9365, 7400, 7943,
//       2063, 8156, 8767, 9255, 1189, 9795, 4315, 7163, 7647, 6109, 1810,
//       6376, 4824, 9717, 2248, 9763, 2761, 1856, 2264, 3983, 3747, 7930,
//       6080, 8383, 1035, 9356, 4271, 9585, 4992, 1077, 3737, 3189, 2201,
//       8522, 9915, 2530, 1992, 8767, 9889, 3763, 3902, 3976, 1269, 4950,
//       8255, 2391, 5100, 5065, 8316, 8112, 8034, 7115, 3392, 5054, 7961,
//       8096, 1914, 1805, 3427, 2171, 9505, 9211, 5667, 9587, 1236, 8426,
//       8735, 9484, 6397, 4266, 9770, 3500, 4119, 2427, 6471, 9413, 7923,
//       8775, 7470, 1243, 1137, 5181, 1986, 1053, 8990, 2300, 9432, 8255,
//       9668, 4308, 1580, 6346, 9131, 4282, 5811, 3547, 6687, 7179, 4898,
//       1952, 2197, 6334, 9441, 1391, 4497, 5563, 5982, 7812, 3977, 7592,
//       7954, 1972, 4607, 1033, 5919, 6934, 7615, 3412, 8212, 7914, 5296,
//       3922, 7311, 9663, 3375, 2573, 7246, 3467, 9889, 2309, 3117, 7908,
//       7739, 1541, 6622, 1008, 3002, 5065, 4074, 5184, 2326, 5557, 8620,
//       7351, 8889, 6826, 2400, 7192, 2377, 4007, 4549, 5444, 2560, 2425,
//       4847, 8997, 4241, 3299, 9435, 3071, 1827, 2851, 9109, 5666, 1533,
//       3762, 5956, 4289, 1141, 8797, 6166, 9900, 3222, 4740, 2033, 9193,
//       4519, 9370, 6159, 9205, 3819, 3959, 6530, 1909, 1071,
//     ],
//     xLabels: hours,
//   },
//   memoryData: {
//     uData: [
//       1545, 3312, 2204, 6263, 3536, 4810, 9891, 2801, 8599, 1812, 5841,
//       9539, 3025, 8434, 8660, 9879, 7816, 8499, 2795, 9162, 3024, 2996,
//       7628, 8144, 5482, 9008, 7685, 1388, 3739, 8721, 9951, 5907, 2567,
//       9239, 8969, 1490, 1145, 4389, 3305, 5831, 3634, 1306, 8704, 4976,
//       9995, 8241, 9615, 5656, 8976, 5309, 9470, 5164, 8576, 4159, 8807,
//       3924, 2303, 1517, 6095, 2903, 1136, 8069, 8759, 9237, 4341, 9946,
//       4805, 2667, 2620, 9603, 4888, 5105, 8444, 3956, 4473, 1626, 5728,
//       5356, 4068, 3978, 3947, 4584, 5657, 3864, 7662, 1851, 1953, 1075,
//       5780, 3247, 6685, 4878, 3282, 3129, 7343, 7806, 9422, 9284, 6143,
//       5891, 1872, 3698, 4816, 3814, 4611, 1495, 7613, 1059, 7624, 8090,
//       8245, 2934, 2308, 1934, 3776, 9941, 4293, 2320, 7159, 2362, 2737,
//       6912, 1977, 1043, 7811, 8826, 1903, 7590, 3367, 1900, 8301, 5733,
//       2045, 2080, 5799, 9982, 3417, 3604, 8721, 4196, 9018, 7259, 4577,
//       9051, 3247, 5623, 2767, 8455, 8337, 5789, 1557, 2727, 9955, 6000,
//       6511, 8535, 9172, 6755, 2193, 9291, 6504, 8014, 1562, 7980, 6414,
//       2048, 5434, 2763, 1306, 7259, 7478, 8924, 4060, 3372, 7812, 6239,
//       3010, 9108, 6383, 6236, 5105, 7819, 3112, 5908, 6076, 5638, 6891,
//       7829, 1031, 7009, 7083, 1487, 7888, 6063, 6805, 2709, 3577, 7942,
//       4318, 1974, 5890, 5237, 9093, 9473, 3445, 6188, 5672, 4997, 1156,
//       7421, 2969, 5902, 5629, 5126, 2315, 7309, 2314, 7037, 7103, 8831,
//       8413, 1171, 9166, 4576, 3104, 6987, 6009, 6952, 7114, 3112, 2345,
//       2791, 4973, 5546, 7761, 2567, 9203, 2587, 7448, 3236,
//     ],
//     pData: [
//       8722, 1954, 6285, 3353, 4836, 5896, 1073, 6786, 7388, 9908, 9545,
//       6439, 2764, 2726, 5499, 6386, 5350, 1776, 5795, 1406, 9219, 3127,
//       4103, 4191, 7223, 5733, 5221, 3513, 9919, 8529, 6467, 6509, 1035,
//       2615, 7197, 8664, 8600, 1069, 3288, 6830, 7002, 4233, 3266, 6330,
//       4226, 8689, 1607, 5848, 2021, 1370, 9900, 2544, 6868, 7690, 3476,
//       3787, 4654, 7464, 4090, 3622, 2333, 5741, 1117, 7872, 7183, 6816,
//       1673, 9663, 5516, 8997, 8757, 9857, 9041, 1158, 1741, 4852, 3771,
//       8071, 5905, 2697, 9704, 3637, 6070, 4788, 3742, 2475, 3046, 3808,
//       2026, 4407, 5848, 9790, 2966, 8740, 1755, 5641, 9121, 2435, 8001,
//       1848, 8349, 5497, 5479, 9125, 4452, 6306, 4317, 2792, 5438, 4785,
//       3039, 9875, 1431, 8848, 9727, 3355, 8280, 7710, 5619, 1169, 6638,
//       2424, 1681, 4008, 1092, 7527, 6635, 7104, 7599, 9206, 4259, 2316,
//       3136, 7626, 6614, 6188, 9274, 5206, 8636, 2671, 7337, 3943, 8197,
//       7566, 9204, 8041, 4885, 3220, 5226, 7136, 2709, 6135, 2922, 5902,
//       7218, 3911, 4153, 9146, 3372, 3608, 6453, 6572, 8468, 4441, 6034,
//       5405, 7129, 9878, 5682, 2653, 1804, 9419, 1180, 7308, 5341, 5021,
//       3909, 6943, 2977, 7256, 1421, 3028, 6837, 9793, 4633, 5257, 4732,
//       9557, 1211, 1744, 6508, 7961, 5943, 3609, 6272, 3935, 1757, 1487,
//       8495, 2191, 6714, 3621, 8791, 4728, 2800, 3825, 7661, 1258, 2948,
//       1541, 7331, 2068, 4128, 5970, 2044, 9542, 5649, 4441, 4466, 2413,
//       1874, 3300, 3351, 5643, 6368, 1133, 8073, 7424, 4928, 8776, 4192,
//       4678, 8493, 4240, 9709, 9551, 9967, 4524, 2866, 5885,
//     ],
//     xLabels: hours,
//   },
// });
// const endDate = "18/04/2024, 10:00";
// const currentDate = "17/04/2024, 17:00";
// if ( currentDate >= startDate && currentDate <= endDate )
// {
//   console.log( "if" );
//   res.send("if")
// }
// const addedTimeRangeData = await addedData.save();
// res.send(addedTimeRangeData);
