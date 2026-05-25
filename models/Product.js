const mongoose = require('mongoose');
const Review = require('./Review');
const productSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    } , 
    img:{
        type:String,
        trim:true
    } ,
    price: {
        type:Number,
        //min:0,
        required:true
    } ,
    desc: {
        type:String,
        trim:true
    },
    avgRating: {
        type: Number,
        default:0 
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


//middleware jo BTS mongodb ke operations karwane par use hota hai and iske andar pre and 
//post middleware hote hai which are used over the schema and before the model in js class.

productSchema.post('findOneAndDelete' , async function(products){
    if(products.reviews.length>0){
        await Review.deleteMany({_id:{$in:products.reviews}})
    }
})

let Product = mongoose.model('Product' , productSchema);
module.exports = Product;