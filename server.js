const express = require("express");
const app = express();
var ODataServer = require("simple-odata-server");
var Adapter = require("simple-odata-server-nedb");
var Datastore = require("nedb");
var db = new Datastore({ inMemoryOnly: true });
var db1 = new Datastore({ inMemoryOnly: true });

const PORT = process.env.PORT || 3000;

var model = {
  namespace: "jsreport",
  entityTypes: {
    ProductAccessoryType: {
      _id: { type: "Edm.String", key: true },
      productname: { type: "Edm.String" },
      productdescription: { type: "Edm.String" },
      productstatus: { type: "Edm.String" },
    },
    ProductAccessoryMilestonesType: {
      _id: { type: "Edm.String", key: true },
      productid: { type: "Edm.String" },
      statusdate: { type: "Edm.Date" },
      status: { type: "Edm.String" },
    },
  },
  entitySets: {
    productaccessory: {
      entityType: "jsreport.ProductAccessoryType",
    },
    productaccessorymilestones: {
      entityType: "jsreport.ProductAccessoryMilestonesType",
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

var odataServer1 = ODataServer()
  .model(model)
  .adapter(
    Adapter(function (es, cb) {
      cb(null, db1);
    })
  );

app.use("/", function (req, res) {
  odataServer.handle(req, res);
  odataServer1.handle(req, res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//insert product accessories and milestones

db.insert("productaccessory", {
  _id: "VX1-12-222",
  productname: "VoltX1",
  productdescription: "Mobile Phone Holder",
  productstatus: "Available",
});

db1.insert("productaccessorymilestones", {
  _id: "1",
  productid: "VX1-12-222",
  statusdate: "2020-12-12",
  status: "Alpha",
});
db1.insert("productaccessorymilestones", {
  _id: "2",
  productid: "VX1-12-222",
  statusdate: "2021-05-29",
  status: "Beta",
});
db1.insert("productaccessorymilestones", {
  _id: "3",
  productid: "VX1-12-222",
  statusdate: "2022-12-12",
  status: "GA",
});

db.insert("productaccessory", {
  _id: "VX1-10-222",
  productname: "VoltX1",
  productdescription: "Pump Bracket",
  productstatus: "Available",
});
// db1.insert({
//   _id: "1",
//   productid: "VX1-10-222",
//   statusdate: "2021-06-18",
//   status: "GA",
// });

db.insert("productaccessory", {
  _id: "VX1-10-009",
  productname: "VoltX1",
  productdescription: "Rear Light",
  productstatus: "Available",
});
// db1.insert({
//   _id: "1",
//   productid: "VX1-10-009",
//   statusdate: "2021-06-18",
//   status: "GA",
// });

db.insert("productaccessory", {
  _id: "VX1-10-010",
  productname: "VoltX1",
  productdescription: "Front Light",
  productstatus: "Available",
});
db.insert("productaccessory", {
  _id: "VX1-99-990",
  productname: "VoltX1",
  productdescription: "Racing Decal",
  productstatus: "Back Order",
});
