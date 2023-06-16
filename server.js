const express = require("express");
const app = express();
var ODataServer = require("simple-odata-server");
var Adapter = require("simple-odata-server-nedb");
var Datastore = require("nedb");
var db = new Datastore({ inMemoryOnly: true });

const PORT = process.env.PORT || 3000;

var model = {
  namespace: "jsreport",
  entityTypes: {
    ebike_accessory: {
      _id: { type: "Edm.String", key: true },
      accessoryname: { type: "Edm.String" },
      accessorydescription: { type: "Edm.String" },
      accessorystatus: { type: "Edm.String" },
      accessoryreleasedate: { type: "Edm.Date" },
      accessoryversion: { type: "Edm.String" },
      product_fkey: { type: "Edm.String" },
      athena_fkey: { type: "Edm.String" },
      dynamo_fkey: { type: "Edm.String" },
      account_fkey: { type: "Edm.String" },
    },
  },
  entitySets: {
    ebike_accessory: {
      entityType: "jsreport.ebike_accessory",
    },
  },
};

var odataServer = ODataServer()
  .model(model)
  .adapter(
    Adapter(function (es, cb) {
      cb(null, db);
    })
  );

app.use("/", function (req, res) {
  odataServer.handle(req, res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//insert accessory accessories and milestones

db.insert({
  _id: "VX1-12-222",
  accessoryname: "VoltX1 - Integrated Mobile Phone Holder",
  accessorydescription:
    "Mobile Phone Holder to suit the VoltX1 electric bike. Adjustable for all IOS and Android deveices.",
  accessorystatus: "Available",
  accessoryreleasedate: "2020-12-12",
  accessoryversion: "1.02",
  product_fkey: "VoltX1",
  athena_fkey: "TX-000101",
  account_fkey: "0012w00001Gz9DEAAZ-extid",
});

db.insert({
  _id: "VX1-10-222",
  accessoryname: "VoltX1 - Compact Pump and Pump Bracket",
  accessorydescription:
    "Pump and Pump Bracket for Volt X1. Red, Green, Blue, Black, Chrome.",
  accessorystatus: "Available",
  accessoryreleasedate: "2023-01-08",
  accessoryversion: "9.0",
  product_fkey: "VoltX1",
  athena_fkey: "TX-000101",
  account_fkey: "0012w00001Gz9DEAAZ-extid",
});

db.insert({
  _id: "VX1-10-010",
  accessoryname: "VoltX1 - Front Light",
  accessorydescription:
    "High brilliance comopact front Light. Black, Red, Green, Blue, Chrome",
  accessorystatus: "Available",
  accessoryreleasedate: "2022-06-08",
  accessoryversion: "4.2",
  product_fkey: "VoltX1",
  athena_fkey: "TX-000101",
  account_fkey: "0012w00001Gz9DEAAZ-extid",
});
db.insert({
  _id: "VX1-99-990",
  accessorydescription: "Racing Decal",
  accessorystatus: "Back Order",
  accessoryreleasedate: "2022-06-30",
  accessoryversion: "3.2",
  product_fkey: "VoltX1",
  athena_fkey: "TX-000101",
  account_fkey: "0012w00001Gz9DEAAZ-extid",
});
