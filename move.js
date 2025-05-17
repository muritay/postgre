const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use (express.json());

const con = new Pool({
user: "postgres",
host: "localhost",
port: "5432",
database: "demoport",
password: "master05",
})


app.listen(port, () =>{
    console.log('server listening at htttp://localhost:{port}');
});

app.post('/postData',(req,res) =>{
    const {name, id} = req.body;

    const insert_query = 'INSERT INTO jidetable (name, id) VALUES ($1, $2)'

    con.query(insert_query,[name, id], (err, result) =>{

        if (err)
        {
            res.send(err)
        } else{
            console.log(result)
            res.send("POSTED DATA")
        }
    })
    })

    
    app.get('/fetchData',(req, res)=>{
        const fetch_query = "Select * from jidetable"
        con.query(fetch_query,(err, result)=>{
            if(err)
            {
                res.send(err)
            }else{
                res.send(result,rows)
            }
            })
        })

        
        app.get('/fetchbyId/:id',(req, res) =>{
        const id= req.params.id
        const fetch_query = "Select * from jidetable where id = $1"
        con.query(fetch_query, [id], (err, result) =>{
        if(err)
        {
        res.send(err)
        }else{
        res.send(result, rows)
        }
        })

        })

        
        app.put('/update/:id', (req, res) =>{
        const id = req.params.id;
        const name = req.body.name;
        const address = req.body.address;
        const update_query ="UPDATE jidetable SET name = $1, address =$2 WHERE id=$3"

        con.query(update_query, [name, address, id], (err, result) =>{
        if(err)
        {
        res.send(err)
        }else{
        res.send("UPDATED")
        }
        })
    })

    app.delete('/delete/:id', (req, res) =>{
        const id= req.params.id
        const delete_query ='Delete from jidetable where id =$1'
        con.query(delete_query,[id],(err, result) =>{
        if(err)
        {
        res.send(err)
        }else{
        res.send("Deleted")
        }
        })
    })


con.connect(). then (()  => console.log('connected to PostgreSQL'))
.catch(err => console.error ('Error connecting to PostgreSQL', err));

