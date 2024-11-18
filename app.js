const express= require('express');
const app=express();
const dotEnv=require('dotenv');
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cors = require('cors');
const authRoute=require('./Routes/authRoute')
const userRoute=require('./Routes/userRoute')
const farmRoute =require('./Routes/farmRoute')
const path=require('path');




app.use(cors());
app.use(express.json());
dotEnv.config();
const MONGO_URI=process.env.MONGO_URL;
const secret_key=process.env.secret_key;



    app.listen(5000,()=>
    {
        console.log('Server is running');
    })
    
    
    
    app.get('/',(req,res)=>
    {
       res.send('hii')
    })


    mongoose.connect(MONGO_URI)
    .then(()=>
    {
        console.log('database connected');
    })
    .catch((error)=>
    {
        console.log(error);
    })


app.use('/',authRoute)
app.use('/',userRoute)
app.use('/',farmRoute)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));













// app.posata',async(req,res)=>
//     {
//         const {token}=req.body;
        
//         try{
//             const user = jwt.verify(token,secret_key);
//             const useremail=user.email;
//             console.log(useremail)
//            const data=await User.findOne({email:useremail})
            
//                 console.log(data)
//                return res.send({status:'ok',data:data});
            
//         }
//         catch(error)
//         {
//            return res.send({error:error})
//         }
    
//     })
    
    
//     app.post('/update-user',async(req,res)=>
//     {
//         const {name,email,mobile,gender}=req.body;
    
//         try{
//             await User.updateOne({email:email},
                
//                 { $set:{
//                     name,
//                     mobile,
//                     gender
//                    }
//                 }
//             );
//             res.send({status:'ok',data:'updated'})
//         }
//         catch(error)
//         {
//             res.send(error);
//         }
    
//     })
    

 