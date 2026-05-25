const express=require('express');
const router=express.Router();//mini instance 
const {isLoggedIn}=require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');



//route to see the cart
router.get('/user/cart',isLoggedIn,async (req,res)=>{
    let user = await User.findById(req.user._id).populate('cart');
    let totalAmount = 0;
    let productInfo = "";

    for(let item of user.cart){
        totalAmount += item.price;
        productInfo += item.name + ", ";
    }

    res.render('cart/cart', {
        user,
        totalAmount,
        productInfo
    });
})


//actually adding the prouduct to the cart
router.post('/user/:productId/add',isLoggedIn,async (req,res)=>{
    let {productId}=req.params;
    let userId=req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})


// remove product from cart
router.delete('/user/:productId/remove', isLoggedIn, async(req,res)=>{

    let {productId} = req.params;

    await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            cart: productId
        }
    });

    req.flash('success','Product removed from cart');
    res.redirect('/user/cart');
});





module.exports=router;