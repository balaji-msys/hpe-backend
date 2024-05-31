const { default: mongoose } = require("mongoose");

const VmListSchema = new mongoose.Schema({
  vmList: [
    {
      name: String,
      host: String,
      datastores: String,
      array: String,
      totalUsage: String,
      vcpu: {
        average: String,
        peak: String,
      },
      vmem: {
        average: String,
        peak: String,
      },
      lastActivity: String,
    },
  ],
});

const VmList = mongoose.model("VmList", VmListSchema);
module.exports = VmList;
