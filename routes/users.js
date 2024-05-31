var express = require("express");
const VmList = require("../model/VmListModel");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// router.post("/", async (req, res, next) => {
//   try {
//     const addedList = await new VmList({
//       vmList: [
//         {
//           name: "ECBAC01",
//           host: "ecvm02.eurocircuits.local",
//           datastores: "DATASTORE01-ECNIM01",
//           array: "ECNIMA01 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC02",
//           host: "ecvm03.eurocircuits.local",
//           datastores: "DATASTORE01-ECNIM02",
//           array: "ECNIMA02 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC03",
//           host: "ecvm04.eurocircuits.local",
//           datastores: "DATASTORE03-ECNIM01",
//           array: "ECNIMA03 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC04",
//           host: "ecvm05.eurocircuits.local",
//           datastores: "DATASTORE04-ECNIM01",
//           array: "ECNIMA04 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC05",
//           host: "ecvm06.eurocircuits.local",
//           datastores: "DATASTORE05-ECNIM01",
//           array: "ECNIMA05 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC06",
//           host: "ecvm07.eurocircuits.local",
//           datastores: "DATASTORE06-ECNIM01",
//           array: "ECNIMA06 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC07",
//           host: "ecvm08.eurocircuits.local",
//           datastores: "DATASTORE07-ECNIM01",
//           array: "ECNIMA07 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC08",
//           host: "ecvm09.eurocircuits.local",
//           datastores: "DATASTORE08-ECNIM01",
//           array: "ECNIMA08 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC09",
//           host: "ecvm10.eurocircuits.local",
//           datastores: "DATASTORE09-ECNIM01",
//           array: "ECNIMA09 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//         {
//           name: "ECBAC10",
//           host: "ecvm11.eurocircuits.local",
//           datastores: "DATASTORE10-ECNIM01",
//           array: "ECNIMA10 (AF-214738)",
//           totalUsage: "94.1 GiB",
//           vcpu: {
//             average: "136 MHz",
//             peak: "247 MHz",
//           },
//           vmem: {
//             average: "352.4 MHz",
//             peak: "723.6 MHz",
//           },
//           lastActivity: "15 hours ago",
//         },
//       ],
//     } );
//     const savedList=await addedList.save()
//     res.send(savedList);
//   } catch (err) {
//     console.log(err, "err in vm list");
//   }
// });

router.get( "/list", async ( req, res, next ) =>
{
  try
  {
    const getVmList = await VmList.findOne( {} );
    res.send(getVmList)
  } catch ( err )
  {
    console.log( err, "err in getting vm list" );
    next(err)
  }
})

module.exports = router;
