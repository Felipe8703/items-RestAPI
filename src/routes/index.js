// Librarys

const router = require("express").Router();
const pool = require("../db.js");

const { includes, notExists, exists } = require("../lib/utils");

// GET Routes

router.get("/", (req, res) => {
  res.json({
    message: "Home"
  });
});

router.get("/items", async (req, res) => {
  let rows = await pool.query("SELECT * FROM items");
  
  return res.json(rows);
  
});

router.get("/item/:id?", async (req, res) => {
  
  if (req.params.id != undefined) {
    
    let ID = req.params.id;
    
    let rows = await pool.query(`SELECT * FROM items WHERE ID = ${ID}`);
    
    if (rows.length > 0) {
      
      let { name, price, ammount} = rows[0];
      
      let json = {
        name,
        price,
        ammount
      };
      
      return res.json(json);
      
    } else {
      return res.json({
        message: "Item Not Exists"
      });
    }
  } else {
    return res.json({
      message: "Please enter an ID!"
    });
  }
});

// POST Routes

router.post("/create", async (req, res) => {
  
  if (includes(req.body)) {
    
    let rows = await pool.query(`SELECT * FROM items WHERE name = '${req.body.name}'`);
    
    if (notExists(rows)) {
    
      let info = await pool.query(`INSERT INTO items(name, price, ammount) VALUES ('${req.body.name}', ${req.body.price}, ${req.body.ammount})`);
    
      let json = {
        
        message: "Created Item Successfully",
        ID: info.insertID
      };
      
      return res.json(json);
    } else {
      return res.json({
        message: "The Item Already Exists"
      });
    }
  } else {
    return res.json({
      message: "Please Insert all info!"
    });
  }
});

// DELETE Routes

router.delete("/delete/:id?", async (req, res) => {
  
  if (req.params.id != undefined) {
    
    let ID = req.params.id;
    
    let rows = await pool.query(`SELECT * FROM items WHERE ID = ${ID}`);
    
    if (exists(rows)) {
      await pool.query(`DELETE FROM items WHERE ID = ${ID}`);
      
      return res.json({
        message: "Deleted Item Successfully"
      });
    }
    return res.json({
      message: "Item Not notExists"
    });
  }
  return res.json({
    message: "Please Enter an ID!"
  });
  
});

// PUT Routes

router.put("/edit/:id?", async (req, res) => {
  
  if (includes(req.body)) {
    if (req.params.id != undefined) {
      
      let ID = req.params.id;
    
      let rows = await pool.query(`SELECT * FROM items WHERE ID = ${ID}`);
    
      let { name, price, ammount } = req.body;
    
      if (exists(rows)) {
        
        await pool.query(`UPDATE items SET name = '${name}', price = ${price}, ammount = ${ammount} WHERE ID = ${ID}`);
        
        return res.json({
          message: "Updated Item Successfully"
        });
      }
      return res.json({
        message: "Item Not Exists"
      });
    }
    return res.json({
      message: "Please insert an ID!"
    });
  }
  return res.json({
    message: "Please Insert all valuea"
  });
});

module.exports = router;