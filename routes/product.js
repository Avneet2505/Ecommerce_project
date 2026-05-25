const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router() //mini instance
const {validateProduct,isLoggedIn,isSeller,isProductAuthor}=require('../middleware');

// to show all the products
router.get('/' , isLoggedIn, async(req,res)=>{
    try{let products = await Product.find({});
    res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})


// to show the form for new product
router.get('/new' , isLoggedIn, (req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})

//to actually create the new product
router.post('/' , isLoggedIn, validateProduct, isSeller,async(req,res)=>{
    try{
    let {name , img , price , desc} = req.body;
    await Product.create({name , img , price , desc,author:req.user._id});
    req.flash('success','Product created successfully');
    res.redirect('/products');}
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// to show the details of a particular product
router.get('/:id',isLoggedIn,async (req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show' , {product:foundProduct, success:req.flash('success'), error:req.flash('error')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//form to edit the product
router.get('/:id/edit' , isLoggedIn, async(req,res)=>{
    try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit' , {product:foundProduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to actually update the product
router.patch('/:id' , isLoggedIn, validateProduct ,  async(req,res)=>{
    try{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate(id , {name , img , price , desc});
    req.flash('success','Product updated successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
});

//to delete the product
router.delete('/:id' , isLoggedIn , isProductAuthor, async(req,res)=>{
    try{
    let {id} = req.params;
    const product= await Product.findById(id);

    // for(let id of product.reviews){
    //     await Review.findByIdAndDelete(id);
    // }

    await Product.findByIdAndDelete(id);
    req.flash('success','Product deleted successfully');
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

router.post('/:id/like', isLoggedIn, async(req,res)=>{

    let {id} = req.params;

    let foundProduct = await Product.findById(id);

    let user = await User.findById(req.user._id);

    
    if(user.wishList.includes(id)){

        user.wishList.pull(id);

    } else{

        user.wishList.push(id);

    }

    await user.save();

    res.json({
        success:true
    });

});



module.exports = router;