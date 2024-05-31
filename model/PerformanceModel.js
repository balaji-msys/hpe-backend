const { default: mongoose } = require("mongoose");

// const last24hrsDataSchema = new mongoose.Schema({
//   performanceData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   networkData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   memoryData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
// });

// //NetworkDataSchema
// const lastWeeklyDataSchema = new mongoose.Schema({
//   performanceData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   networkData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   memoryData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
// });

// //MemoryDataSchema
// const lastBiWeeklyDataSchema = new mongoose.Schema({
//   performanceData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   networkData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
//   memoryData: {
//     uData: [Number],
//     pData: [Number],
//     xLabels: [String],
//   },
// });
const timeRangeSchema = new mongoose.Schema({
  performanceData: {
    uData: [Number],
    pData: [Number],
    xLabels: [String],
  },
  networkData: {
    uData: [Number],
    pData: [Number],
    xLabels: [String],
  },
  memoryData: {
    uData: [Number],
    pData: [Number],
    xLabels: [String],
  },
});

// const last24hrsData = mongoose.model(
//   "last24hrsData",
//   last24hrsDataSchema
// );
// const lastWeeklyData = mongoose.model("lastWeeklyData", lastWeeklyDataSchema);
// const lastBiWeeklyData = mongoose.model(
//   "lastBiWeeklyData",
//   lastBiWeeklyDataSchema
// );
const timeRangeData = mongoose.model("timeRangeData", timeRangeSchema);

module.exports = {
  // last24hrsData,
  // lastWeeklyData,
  // lastBiWeeklyData,
  timeRangeData,
};
