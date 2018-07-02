const dbPromise = idb.open('currencydb', 2, upgradeDB => {

  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('currency').createIndex('dateCreated', 'time');
    case 1:
      upgradeDB.createObjectStore('currency', { keyPath: 'id' }).createIndex('id', 'id');
  }
});
dbPromise.then(db => {
  const tx = db.transaction('currency', 'readwrite');
  tx.objectStore('currency').put(results);
  return tx.complete;
});

dbPromise.then(db => {
  return db.transaction('objs')
    .objectStore('currency').getAll();
}).then(data => console.log(data));






