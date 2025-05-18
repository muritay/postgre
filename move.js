const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use (express.json());

const pool = new Pool({
user: "postgres",
host: "localhost",
port: "5432",
database: "demoport",
password: "master05",
})


app.listen(port, () =>{
    console.log('server listening at htttp://localhost:{port}');
});

app.post('/postData', async (req,res) =>{
     try {
    const {name, id} = req.body;

      const result = await pool.query('INSERT INTO jidetable (name, id) VALUES ($1, $2)')

       res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  });

 

     app.get('/fetchData', async(req, res)=>{
         try {
        const result = await pool.query ("Select * from jidetable")
          res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
      }
    });
  

        
        app.get('/fetchbyId/:id', async(req, res) =>{
             try {
        const {id}= req.params;
         const result = await pool.query ("Select * from jidetable where id = $1")
        
          if (result.rows.length === 0) {
        return res.status(404).json({ message: 'id not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    })
  ;

        
        app.put('/update/:id', async (req, res) =>{
              try {
        const { id } = req.params;
        const name = req.body.name;
        const address = req.body.address;
         const result = await pool.query("UPDATE jidetable SET name = $1, address =$2 WHERE id=$3")

            if (result.rows.length === 0) {
        return res.status(404).json({ message: 'id not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

    app.delete('/delete/:id', async (req, res) =>{
         try {
        const {id}= req.params
          const result = await pool.query ('Delete from jidetable where id =$1')
         if (result.rows.length === 0) {
        return res.status(404).json({ message: 'id not found' });
      }
      res.json({ message: 'Item deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


con.connect(). then (()  => console.log('connected to PostgreSQL'))
.catch(err => console.error ('Error connecting to PostgreSQL', err));


