const db = require("../db");


// Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')

        // if (typeof value === "string" && value.indexOf(" ") >= 0) {
        //   value = "'" + value + "'";
        // }

          value = "'" + value + "'";

        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }


  function update (table, objColVals, condition, cb) {

       const queryString  = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`
       db.query(queryString, (err,rows) => {
        if(err) {
            throw err;
        }
        cb(rows)
    });

  }

  module.exports = update;