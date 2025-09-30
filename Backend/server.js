
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
});

app.get('/api/add-tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;   
    const sql = "SELECT * FROM tasks WHERE task_id = ?";
    const [rows] = await pool.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(rows[0]); 
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});


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


app.patch('/api/add-tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { is_completed, title, description, category_id, priority_id, due_date } = req.body;

  try {
  
    let fields = [];
    let values = [];

    if (is_completed !== undefined) {
      fields.push("is_completed = ?");
      values.push(is_completed);
    }
    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if (category_id) {
      fields.push("category_id = ?");
      values.push(category_id);
    }
    if (priority_id) {
      fields.push("priority_id = ?");
      values.push(priority_id);
    }
    if (due_date) {
      fields.push("due_date = ?");
      values.push(due_date);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const sql = `UPDATE tasks SET ${fields.join(", ")}, updated_at = NOW() WHERE task_id = ?`;
    values.push(id);

    const [result] = await pool.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", taskId: id });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

app.delete('/api/add-tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE task_id = ?";
    const [result] = await pool.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong ❌",
      error: error.message
    });
  }
});


app.listen(port , ()=>{
    console.log(`running at http://localhost:${port}`);
})
