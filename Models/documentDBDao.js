var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docDBUtils');

function documentDBDao(documentDBClient, databaseId, collectionId) {
  this.client = documentDBClient;
  this.databaseId = databaseId;
  this.collectionId = collectionId;

  this.database = null;
  this.collection = null;
}

documentDBDao.prototype = {
  init: function(callback) {
    console.log("documentDBDao.init()");
    var self = this;

    docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function(err, db) {
      if (err) {
        callback(err);
      }

      self.database = db;
      docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function(err, coll) {
        if (err) {
          callback(err);
        }
        self.collection = coll;
      });
    });
  },

  find: function(querySpec, callback) {
    console.log("documentDBDao.find()");
    var self = this;

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  
  getItemById: function(itemId, callback) {
    console.log("documentDBDao.getItemById()");
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.id=@id',
      parameters: [{
        name: '@id',
        value: itemId
      }]
    };

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  },

  addItem: function(item, callback) {
    console.log("documentDBDao.addItem()");
    var self = this;
    item.date = Date.now();
    item.softDelete = false;
    self.client.createDocument(self.collection._self, item, function(err, doc) {
      if (err) {
        console.log("dao - error");
        callback(err);
      } else {
        console.log("dao - saved");
        callback(null);
      }
    });
  },

  updateItem: function(itemId, updatedItem, callback) {
    console.log("documentDBDao.updateItem()");
    var self = this;

    self.getItemById(itemId, function(err, doc) {
      if (err) {
        console.log("err");
        console.log(err);
        callback(err);
      } else {
        doc = updatedItem;
        self.client.replaceDocument(doc._self, doc, function(err, replaced) {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      }
    });
  },
  
  softDelete: function(itemId, callback) {
    console.log("documentDBDao.softDelete()");
    var self = this;

    self.getItemById(itemId, function(err, doc) {
      if (err) {
        console.log("err");
        console.log(err);
        callback(err);
      } else {
        doc.softDelete = true;
        self.client.replaceDocument(doc._self, doc, function(err, replaced) {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      }
    });
  },

  getConfig: function(configId, callback) {
    console.log("documentDBDao.getConfig()");
    var self = this;

    self.getItemById(configId, function(err, doc) {
          if (err) {
            callback(err);
          } else {
            callback(null, doc);
          }
     });
  }
  
};

module.exports = documentDBDao;
