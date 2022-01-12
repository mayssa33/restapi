const express = require ('express');
const connect = require('./CONFIG/connectDB');
const User = require('./models/User');
require('dotenv').config({ path: './CONFIG/.env' })

var app = express()
app.use(express.json());


// get / post / put / delete

app.post('/post',async(req,res)=>{
    const {fullName,email,phone}=req.body
    try {
        const newUser = new User({
            fullName,
            email,
            phone,
        })
        await newUser.save();
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
})
// get users
app.get("/get",async(req,res)=>{
    const users = await User.find();
    res.send(users);

});
//get one user
app.get("/get/:id",async(req,res)=>{
    const singleUser = await User.findById(req.params.id);
    res.send(singleUser);

});
// update
app.put("/update/:id",async(req,res)=>{
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.send(editedUser);
    } catch (error) {
        console.log(error)
    }

}
)
// delete
app.delete("/delete/:id",async(req,res)=>{
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
})


connect()

var PORT = process.env.PORT || 5000;


app.listen(PORT,err=>err?console.error(err):console.log(`server is running on port ${PORT}`)
);