const express = require('express')
const app = express()
var ODataServer = require('simple-odata-server')
var Adapter = require('simple-odata-server-nedb')
var Datastore = require('nedb')
var db = new Datastore({ inMemoryOnly: true })
const PORT = process.env.PORT || 5000

var model = {
  namespace: 'jsreport',
  entityTypes: {
    'UserType': {
      '_id': {'type': 'Edm.String', key: true},
      'name': {'type': 'Edm.String'},
      'age': {'type': 'Edm.Int32'},
      'birthdate': {'type': 'Edm.DateTimeOffset'},
    }
  },
  entitySets: {
    'users': {
      entityType: 'jsreport.UserType'
    }
  }
}

var odataServer = ODataServer()
  .model(model)
  .adapter(Adapter(function (es, cb) { cb(null, db) }))

app.use("/", function (req, res) {
    odataServer.handle(req, res);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

db.insert({'_id': '1', 'test': 'a', num: 1, addresses: [{'street': 'a1'}]})
db.insert({'_id': '2', 'test': 'b', num: 2, addresses: [{'street': 'a2'}]})
db.insert({'_id': '3', 'test': 'c', num: 3})
db.insert({'_id': '4', 'test': 'd', num: 4})
db.insert({'_id': '5', 'test': 'e', num: 5})