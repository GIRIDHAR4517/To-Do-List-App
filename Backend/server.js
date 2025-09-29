
import express, { json } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';




const app = express();
const port = 3001;


const dbConfig ={
    host :"localhost",
    user :'root',
    password:'root',
    database :'to_do_list',
    port: 3307
};

const pool = mysql.createPool(dbConfig);
app.use(cors());

app.use(json());

app.post('/api/add-users', async (req , res)=>{

    const {Name , userName ,email, password} = req.body;
    if(! Name ||! userName||! password || !email){
        return res.status(400).json({ message: 'Missing required fields.' });
    }
     try{
    
        const sql = 'Insert into users( username , email , password_hash ,Name) values(? ,? ,? ,?)';

        const [result] = await pool.execute(sql , [userName ,email ,password ,Name])

            res.status(201).json({
            message: 'User successfully  saved to DB',
            id: result.insertId, 
            dataReceived: { Name, userName , password }
        });
       
     }catch (error) {
        
        console.error('Database INSERT failed:', error);
        res.status(500).json({ 
            message: 'Internal Server Error: Could not save data to MySQL',
            error: error.message 
        });  
}
});

app.get('/api/add-users', async (req , res)=>{
    try{
    const sql = 'select * from users';
    const [rows] = await pool.execute(sql)
    res.json(rows);
    }catch(error){
        res.status(500).json({
            message:"Something went wrong",
            error : error.message
        });
    }
})

app.get('/api/add-tasks' , async(req , res)=>{
    try{
        const sql = 'select * from tasks order by due_date ';
        const[rows] = await pool.execute(sql);
        res.json(rows);

    }catch(error){
        res.status(500).json({
            message:"Something went wrong",
            error : error.message
        });
    }
})



app.post('/api/add-tasks', async (req , res)=>{
    const {title , description , category,priority , Deadline ,userId} = req.body ; //title:"",description:"",category:"",priority:"",Deadline:""

    if(!title || !description || !category||!priority||!Deadline || !userId) return res.status(400).json({message : 'All Fileds required '});

    try{
        const sql = 'Insert Into tasks(user_id ,title ,description ,category_id ,priority_id ,due_date ,is_completed) values (? , ? , ? ,? ,? ,? ,?)'
        
        const [result] = await pool.execute(sql , [userId , title ,description , category ,priority ,Deadline ,0]);

        res.status(201).json({
            message: 'Task successfully  saved to DB',
            id: result.insertId, 
            dataReceived: { title , description ,category ,priority }
        });
        

    }catch(error){
        res.status(500).json({
            message: "Something Went Wrong ",
            error: error.message
        })
    }
})

app.listen(port , ()=>{
    console.log(`running at http://localhost:${port}`);
})
