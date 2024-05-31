const { default: mongoose } = require("mongoose");

const VmDataSchema = new mongoose.Schema( {
    vmData: [ {
        seoul: Number,
        tokyo: Number,
        month: String,
        seoulColor:String,
    }]
});

const VmData = mongoose.model("VmData", VmDataSchema);
module.exports = VmData;
