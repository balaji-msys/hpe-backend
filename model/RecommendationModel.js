const { default: mongoose } = require("mongoose");

const RecommendationDataSchema = new mongoose.Schema({
  recommendationData: [
    {
      id: Number,
      value: Number,
      label: String,
      color: String,
    },
  ],
});

const RecommendationData = mongoose.model(
  "RecommendationData",
  RecommendationDataSchema
);
module.exports = RecommendationData;

// export const firstData = [
//   { id: 0, value: 10, label: "series A", color: "#00ffff" },
//   { id: 1, value: 50, label: "series B", color: "#800080" },
//   { id: 2, value: 20, label: "series C", color: "#ffa500" },
//   { id: 3, value: 15, label: "series D", color: "#008000" },
//   { id: 4, value: 30, label: "series E", color: "#800000" },
// ];
