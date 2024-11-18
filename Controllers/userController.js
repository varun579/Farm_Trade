const express= require('express');
const app=express();
const dotEnv=require('dotenv');
const mongoose=require('mongoose')
const User=require('../Models/UserDetails')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret_key='mysecretkey';
const Category =require('../Models/Category')
const Product =require('../Models/Product')
const Cart =require('../Models/CartItem')
const Wallet =require('../Models/Wallet')
const Order =require('../Models/Orders')
 

 

const getDetails=async(req,res)=>
    {
        const {token}=req.query;
        console.log(token)
        
        try{
            const user = jwt.verify(token,secret_key);
            const useremail=user.email;
           // console.log(useremail)
           const data=await User.findOne({email:useremail})

           const walletExists=await Wallet.findOne({userId:data._id})
            
           //console.log(walletExists)
                //console.log(data)
               return res.send({status:'ok',data:data,wallet:walletExists});
            
        }
        catch(error)
        {
           return res.send({error:error})
        }
    
    }

  const updateDetails= async(req,res)=>
    {
        const {name,email,mobile,gender}=req.body;
        //console.log(name,email)
        console.log('File data:', req.file);  

        const imagePath=req.file ? req.file.path :null
       
        try{
            await User.updateOne({email:email},
                
                { $set:{
                    name,
                    mobile,
                    gender,
                    image:imagePath
                   
                   }
                }
            );
            res.send({status:'ok',data:'updated'})
        }
        catch(error)
        {
            res.send(error);
        }
    
    }



    const getCategory = async(req,res)=>
        {
            const {token} = req.query

          // console.log(token)
           try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            console.log(userEmail);
            const list =await Category.distinct('name')
           // console.log(list)


        
         
         
               return res.send({status:'ok',data:list})


           }
           catch(err)
           {
             return res.send({error:err})
           }

        }

    const getSubCategory=async(req,res)=>
    {
        const{token,name}=req.query
        // console.log(req.query);
        // console.log(token);
        console.log(name);
        try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            console.log(userEmail);
            const list=await Category.find({name},{_id:1});
            //console.log(list)
           const products=await Product.find({categoryId:{$in:list}}).populate({path:"userId",select:'name image'})
           
           //console.log(products);

           const subCategorydata= await Product.find().populate({path:"userId",select:'name image'});
           //console.log(subCategorydata)


        
         
         
               return res.send({status:'ok',data:products,data1:subCategorydata})


           }
           catch(err)
           {
             return res.send({error:err})
           }

    }


    const getFarmerDetails = async(req,res)=>
    {

        const{token}=req.query
        // console.log(req.query);
        // console.log(token);
        //console.log(name);
        try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            //console.log(userEmail);

            const farmerlist= await User.find({userType:"Farmer"})
            console.log(farmerlist)
           

        
         
         
               return res.send({status:'ok',data:farmerlist})


           }
           catch(err)
           {
             return res.send({error:err})
           }

    }



    const addToCart= async(req,res)=>
        {
            const {token,productId,quantity,price}=req.body
            //console.log(token,productId,quantity,price)
            try{
              
                const user=jwt.verify(token,secret_key);
                const userEmail=user.email;
               // console.log(userEmail);
                const data =await User.findOne({email:userEmail})
                //console.log(data)

                 const productData= await Product.findOne({_id:productId})
                //  console.log(productData.quantity);
    
    
               const cartAlreadyExists = await Cart.findOne({userId:data._id});
              // console.log(cartAlreadyExists)
            
              
                if(cartAlreadyExists)
                {
                   const itemIndex =cartAlreadyExists.items.findIndex((item)=>item.product_id.equals(productId))
                   
                   //console.log(itemIndex)
                   


                   if(itemIndex>-1)
                   { 
                  
                    console.log(cartAlreadyExists.items[itemIndex].quantity,productData.quantity)
                    if(cartAlreadyExists.items[itemIndex].quantity<productData.quantity)
                    {
                       // console.log("hi")
                        cartAlreadyExists.items[itemIndex].quantity+=quantity;
                        cartAlreadyExists.items[itemIndex].price+=price;
                   
                    }
                    else
                    {
                        
                        return res.send({status:'ok',data:'Item OutofStock'})
                    }
                    
                   }
                   else
                   {
                          
                        cartAlreadyExists.items.push({
                            product_id:productId,
                            quantity:quantity,
                            price:price
                                 })
                      
                       
                      

                        
                    }
                    await cartAlreadyExists.save();
                    
                }
                else{
    
    
                await Cart.create({
                   userId:data._id,
                   
                    
                    items:[ {

                        product_id:productId,
                        quantity:quantity,
                        price:price



                    }]

                })
               
               
               
               }


               return res.send({status:'ok',data:'Item Added to Cart'})
    
    
    
    
            }
            catch(err)
            {
                return res.send({error:err})
            }
        
    }

    const updateCart= async(req,res)=>
    {
 
        const {token,productId,quantity,price,symbol}=req.body;
        //console.log(token,productId,quantity,price,symbol)

        try{
              
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
           // console.log(userEmail);
            const data =await User.findOne({email:userEmail})
            //console.log(data)


            const productData= await Product.findOne({_id:productId});
            //console.log(productData)


           const cartAlreadyExists = await Cart.findOne({userId:data._id});
          // console.log(cartAlreadyExists)
        
          
            if(cartAlreadyExists)
            {
               const itemIndex =cartAlreadyExists.items.findIndex((item)=>item.product_id.equals(productId))
               
              // console.log(itemIndex)


               if(itemIndex>-1 && symbol==='+')
               {
              
                 console.log(productData.quantity,2)

                if(cartAlreadyExists.items[itemIndex].quantity<productData.quantity){


                    cartAlreadyExists.items[itemIndex].quantity+=quantity;
                    cartAlreadyExists.items[itemIndex].price+=price;

                }
                else
                {
                    
                    return res.send({status:'ok',data:'Item OutofStock'})
                }
                

               }
               else
               {
               
                
                //console.log( cartAlreadyExists.items[itemIndex].quantity)
                if(cartAlreadyExists.items[itemIndex].quantity===1 || cartAlreadyExists.items[itemIndex].quantity===0 || productData.quantity===0){
                  
                    cartAlreadyExists.items.pull({ product_id: productId });
                     
                }
                else{
                  

                    cartAlreadyExists.items[itemIndex].quantity-=quantity;
                    cartAlreadyExists.items[itemIndex].price-=price;
    
    
                }
              

               }
               await cartAlreadyExists.save();
               return res.send({status:'ok',data:'Cart updated',})

            }
           


          




        }
        catch(err)
        {
            return res.send({error:err})

        }





    }


    const getCart =async(req,res)=>
    {
        const{token}=req.query
        // console.log(req.query);
        console.log(token);
     
        try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
          // console.log(userEmail);

            const data= await User.findOne({email:userEmail})

          
            // console.log(data)

            const userCart = await Cart.findOne({userId:data._id}).populate({path:'items.product_id', select:'subname quantity price userId ', populate:[{path:'userId',select:'name'},{path:'categoryId',select:'name'}]}).select('items')
            

            const cartList= userCart.items;

            console.log(cartList)

            return res.send({status:'ok',data:cartList})


           }
           catch(err)
           {
             return res.send({error:err})
             
           }





    }

    const addBalance =async(req,res)=>
    {
        
         
         try{

            const{balance,token}=req.body
            //console.log(balance,token)
          
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
            const data= await User.findOne({email:userEmail})
   
            const walletExists = await Wallet.findOne({userId:data._id})
            console.log(walletExists)
   
   
            if(walletExists)
            {
               walletExists.walletBalance+=balance
                await walletExists.save();
                res.send({status:'ok',message:'Amount Added to the Wallet'});
            }
            else
            {
               await Wallet.create(
                   {
                       userId:data._id,
                       walletBalance:balance
   
                   }
                 
               )
               res.send({status:'ok',message:'Wallet Created Successfully and Amount Added to the Wallet'});
            }
   

         }
         catch(err)
         {
            res.send({error: err})
         }


        
         
        




    }


    const getFarmerSubCategory=async(req,res)=>
    {
             const {token,farmerId}=req.query
             //console.log(token,farmerId)

              
        try{
                
            const user=jwt.verify(token,secret_key);
            const userEmail=user.email;
          // console.log(userEmail);

            const data= await User.findOne({email:userEmail})
            //console.log(data)

            const subcategoryData= await Product.find({userId:farmerId})
            
           // console.log(subcategoryData)

            res.send({status:'ok',data:subcategoryData})
           


           }
           catch(err)
           {
             return res.send({error:err})
             
           }

    }



    const addAddress =async(req,res)=>
    {
          
        try{
            
            const{token, street, city, state, postalCode}=req.body;
          //console.log(token,street, city, state, postalCode)

           const data= await jwt.verify(token,secret_key);
           //console.log(data)

           const userExists= await User.findOne({email:data.email})

          // console.log(userExists)

            userExists.addresses.push({
            street: street,
             city :city,
             state: state,
             postalCode: postalCode

            })

            await userExists.save();

            res.send({status:'ok',data:'Address Added'})



        }
        catch(err)
        {
            res.send({error:err})
        }


    }



    const getAddress =async(req,res)=>
        {
              
            try{
                
                const{token}=req.query;
                //console.log(token)
    
               const data= await jwt.verify(token,secret_key);
               //console.log(data)
    
               const userExists= await User.findOne({email:data.email})
    
              // console.log(userExists)

                const addressData= userExists.addresses;

                //console.log(addressData)
    
    
             
    
              res.send({status:'ok',data:addressData});
    
    
    
            }
            catch(err)
            {
                res.send({error:err})
            }
    
    
        }



        const deleteAddress =async(req,res)=>
            {
                  
                try{
                    
                    const{token,addressId}=req.query;
                    console.log(token,addressId)
        
                   const data= await jwt.verify(token,secret_key);
                   console.log(data)
        
                  

                   await User.updateOne(
                    { email: data.email },
                    { $pull: { addresses: { _id: addressId } } }
                   );


                    res.send({status:'ok',message: 'Address deleted successfully'})
    
                  
    
                   
        
        
                 
        
                 
        
        
        
                }
                catch(err)
                {
                    res.send({error:err})
                }
        
        
            }


        
            // const updateData=async(req,res)=>
            // {
              


            //     try
            //     {
                   
            //         const{cartdata,token,amount}=req.body
            //         console.log(cartdata)
            //         // console.log(token);

            //         const data=jwt.verify(token,secret_key);

            //         const userExists= await User.findOne({email:data.email})
                    
            //         //console.log(userExists)

            //         const walletExists = await Wallet.findOne({userId:userExists._id})

            //         //console.log(walletExists)

            //         if(walletExists) 
            //         {
            //               const walletBalance= walletExists.walletBalance;
            //               //console.log(walletBalance)
            //               if(walletBalance>amount)
            //               {
            //                // console.log(amount)
                           

            //                  cartdata.forEach(async(element) => {
                                
                            
            //                    //console.log(element)
            //                    const productDetails= await Product.findOne({_id:element.product_id._id})
            //                    const actualQuantity=productDetails.quantity;

            //                    if(actualQuantity>=element.quantity)
            //                    {
                                   
            //                     const productData = await Product.findByIdAndUpdate(element.product_id._id,{$set:{quantity: (actualQuantity-element.quantity)}}, { new: true }).populate({path:"userId",select:'_id'})
            //                     // console.log(productData)
            //                     const data= await Wallet.findByIdAndUpdate(walletExists._id,{$set:{walletBalance:(walletExists.walletBalance-element.price)}}, { new: true })
            //                     // console.log(data)

            //                     const farmerId =productData.userId._id;
            //                     // console.log(farmerId)
            //                     const walletData=await Wallet.findOne({userId:farmerId});
            //                     // console.log(walletData) 
                                
            //                     const farmerWallet=await Wallet.findByIdAndUpdate(walletData._id,{$set:{walletBalance:(walletData.walletBalance+element.price)}},{new:true})
            //                     // console.log(farmerWallet) 


                                

            //                    } 
            //                    else 
            //                    { 
            //                      return res.send({status:400,message:`${productDetails.subname} is out of stock quantity Available: ${productDetails.quantity} quantity`})
            //                    }







                              
                                


            //                  });
            //               }
            //               else
            //               {
            //                 return res.send({status:400,message:'Wallet Balance should be Greater than Total Amount'})
            //               }

            //         }
            //         else
            //         {
            //             await Wallet.create(
            //                 {
            //                     userId:userExists._id,
                              
            
            //                 }
                          
            //               )
                        
            //            return res.send({status:400,message:'Wallet Balance should be Greater than Total Amount'})
                         
            //         }


                    
    
            //     }
            //     catch(err)
            //     {
            //         res.send({error:err});
            //     }




            // }

  

            const updateData = async (req, res) => {
                try {
                    const { cartdata, token, amount } = req.body;
                    // console.log(cartdata)
                    const data = jwt.verify(token, secret_key);
                    const userExists = await User.findOne({ email: data.email });
                    const walletExists = await Wallet.findOne({ userId: userExists._id });
            
                    if (!walletExists) {
                        
                        await Wallet.create({ userId: userExists._id });
                        return res.send({
                            status: 400,
                            message: 'Wallet Balance should be Greater than Total Amount'
                        });
                    }
            
                   
                    const walletBalance = walletExists.walletBalance;
                    if (walletBalance < amount) {
                        return res.send({
                            status: 400,
                            message: 'Wallet Balance should be Greater than Total Amount'
                        });
                    }
            
                    let insufficientStock = []; 
                    let totalDeducted = 0;
                    let orderItems = [];       
            
                    for (const element of cartdata) {
                        const productDetails = await Product.findOne({ _id: element.product_id._id });
                        const actualQuantity = productDetails.quantity;
                       
            
                        if (actualQuantity >= element.quantity) {

                            const farmerId = productDetails.userId;
                            
                            await Product.findByIdAndUpdate(
                                element.product_id._id,
                                { $set: { quantity: actualQuantity - element.quantity } },
                                { new: true }
                            );
            
                            totalDeducted += element.price;

                            orderItems.push({
                                productId: element.product_id._id,
                                farmerId:farmerId,
                                quantity: element.quantity,
                                price: element.price,
                                uri: element.uri
                            });
            
                        
                           
                            const farmerWallet = await Wallet.findOne({ userId: farmerId });
                            await Wallet.findByIdAndUpdate(
                                farmerWallet._id,
                                { $set: { walletBalance: farmerWallet.walletBalance + element.price } },
                                { new: true }
                            );
            
                        } else {
                        
                            insufficientStock.push({
                                product: productDetails.subname,
                                availableQuantity: actualQuantity,
                                requestedQuantity: element.quantity
                            });
                        }
                    }
            
                   
                    if (totalDeducted > 0) {
                        await Wallet.findByIdAndUpdate(walletExists._id, {
                            $set: { walletBalance: walletBalance - totalDeducted }
                        });
                    }



                    const newOrder = new Order({
                        userId: userExists._id,
                        items: orderItems,
                        totalAmount: totalDeducted,
                        status: 'Pending'
                    });
        
                    await newOrder.save();

                   











                    await Cart.updateOne({userId:userExists._id},{ $set: { items: [] }});
                    


                    
                   
                 
                    return res.status(200).send({
                        status: 200,
                        message: 'Transaction completed',
                        totalDeducted,
                        remainingBalance: walletBalance - totalDeducted,
                        outOfStock: insufficientStock.length > 0 ? insufficientStock : null
                    });
            
                } catch (err) {
                    console.error("Error:", err);
                    res.status(500).send({ error: err.message });
                }
            };





            const getOrderDetails = async(req,res)=>
            {
                  
                try{
                    
                    const{token}=req.query;
                    console.log(token)
        
                   const data= await jwt.verify(token,secret_key);
                   const userExists = await User.findOne({ email: data.email });
                  


                   const orderData=await Order.find({userId:userExists._id})
                   
                   res.send({status:'ok',data:orderData})
                  
        
                  

    
                  
    
                   
        
        
                 
        
                 
        
        
        
                }
                catch(err)
                {
                    res.send({error:err})
                }
        
            }





            const getFarmerOrderDetails = async (req, res) => {
                try {
                  const { token } = req.query;

              
                  if (!token) {
                    return res.status(400).send({ error: 'Token is required' });
                  }
              
                 
                  const data = await jwt.verify(token, secret_key);
                  const userExists = await User.findOne({ email: data.email });
              
                  if (!userExists) {
                    return res.status(404).send({ error: 'User not found' });
                  }
              
                  const farmerId = userExists._id;
              
                 
                  const orders = await Order.find({
                    'items.farmerId': farmerId,
                  })
                    .populate('userId', 'name') 
                    .populate({
                      path: 'items.productId',
                      select: 'subname', 
                    })
                    .sort({createdAt:-1});
              
                


                  const totalOrders = orders.map(order => {
                 
                    const farmerEarnings = order.items.reduce((total, item) => {
                      if (item.farmerId.equals(farmerId)) {
                        total += item.quantity * item.price;
                      }
                      return total;
                    }, 0);
              
                    return {
                      ...order.toObject(),
                      farmerEarnings,
                    };
                  });
                  

                  console.log(totalOrders)

                  res.send({status:'ok',data:totalOrders,farmerId:farmerId})


















                // console.log(orders)
                  // Respond with the order data and total amount
                 // res.send({ status: 'ok', data: orders, totalAmount });
                } catch (err) {
                  console.error('Error fetching farmer orders:', err);
                  res.status(500).send({ error: err.message });
                }
              };
              
            





            
            
            






    

   
    
    


module.exports={getDetails,updateDetails,getCategory,getSubCategory,getFarmerDetails,addToCart,getCart,updateCart,addBalance,getFarmerSubCategory,addAddress,getAddress,deleteAddress,updateData,getOrderDetails,getFarmerOrderDetails}