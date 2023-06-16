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
    UserType: {
      _id: { type: "Edm.String", key: true },
      name: { type: "Edm.String" }
      
    },
  },
  entitySets: {
    productaccessory: {
      entityType: "jsreport.ProductAccessoryType",
    },
    usertypes:{
      entityType: "jsreport.UserType",
    }
  },
};

var odataServer = ODataServer()
  .model(model)
  .adapter(
    Adapter(function (es, cb) {
      cb(null, db);
    })
    .adapter(
      Adapter(function (es, cb) {
        cb(null, db1);
      })
  );

app.use("/", function (req, res) {
  odataServer.handle(req, res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

db.insert({
  _id: "VX1-12-222",
  productname: "VoltX1",
  productdescription: "Mobile Phone Holder",
  productstatus: "Available",
});
db.insert({
  _id: "VX1-10-222",
  productname: "VoltX1",
  productdescription: "Pump Bracket",
  productstatus: "Available",
});
db.insert({
  _id: "VX1-10-009",
  productname: "VoltX1",
  productdescription: "Rear Light",
  productstatus: "Available",
});
db.insert({
  _id: "VX1-10-010",
  productname: "VoltX1",
  productdescription: "Front Light",
  productstatus: "Available",
});
db.insert({
  _id: "VX1-99-990",
  productname: "VoltX1",
  productdescription: "Racing Decal",
  productstatus: "Back Order",
});
db1.insert({
  _id: "User1",
  name: "Fred",
  
});
