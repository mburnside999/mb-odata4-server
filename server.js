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
    UserType: {
      _id: { type: "Edm.String", key: true },
      name: { type: "Edm.String" },
      age: { type: "Edm.Int32" },
      birthdate: { type: "Edm.DateTimeOffset" },
    },
    ProductType: {
      _id: { type: "Edm.String", key: true },
      productname: { type: "Edm.String" },
      productdescription: { type: "Edm.String" },
      productstatus: { type: "Edm.String" },
    },
  },
  entitySets: {
    odatausers: {
      entityType: "jsreport.UserType",
    },
    odataproducts: {
      entityType: "jsreport.ProductType",
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

db.insert({ type: "odatausers", _id: "1", name: "John Smith", age: 40 });
db.insert({ type: "odatausers", _id: "2", name: "Mary Fogle", age: 41 });
db.insert({ type: "odatausers", _id: "3", name: "Bob Mackey", age: 30 });
db.insert({ type: "odatausers", _id: "4", name: "Stacy Cadwell", age: 60 });
db.insert({ type: "odatausers", _id: "5", name: "Marvin Taylor", age: 62 });
