// Utils

const includes = (body) => {
    keys = Object.keys(body);
    
    return keys.includes("name") && keys.includes("price") && keys.includes("ammount");
    
};

const notExists = (rows) => {
  return rows.length === 0;
};

const exists = (rows) => {
  return rows.length > 0;
};

// Exports

module.exports = {
  env: require("dotenv").config({ path: "../.env" }),
  
  includes: includes,
  
  notExists: notExists,
  
  exists: exists
};