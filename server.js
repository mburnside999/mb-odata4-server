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
    ProductAccessoryType: {
      _id: { type: "Edm.String", key: true },
      productname: { type: "Edm.String" },
      productdescription: { type: "Edm.String" },
      productstatus: { type: "Edm.String" },
      productreleasedate: { type: "Edm.Date" },
      productversion: { type: "Edm.String" },
    },
  },
  entitySets: {
    productaccessory: {
      entityType: "jsreport.ProductAccessoryType",
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

//insert product accessories and milestones

db.insert({
  _id: "VX1-12-222",
  productname: "VoltX1",
  productdescription: "Mobile Phone Holder",
  productstatus: "Available",
  productreleasedate: "2020-12-12",
  productversion: "1.02",
});

db.insert({
  _id: "VX1-10-222",
  productname: "VoltX1",
  productdescription: "Pump Bracket",
  productstatus: "Available",
  productreleasedate: "2020-12-12",
  productversion: "1.02",
});

db.insert({
  _id: "VX1-10-010",
  productname: "VoltX1",
  productdescription: "Front Light",
  productstatus: "Available",
  productreleasedate: "2020-12-12",
  productversion: "1.02",
});
db.insert({
  _id: "VX1-99-990",
  productname: "VoltX1",
  productdescription: "Racing Decal",
  productstatus: "Back Order",
  productreleasedate: "2020-12-12",
  productversion: "1.02",
});
