const mongoose = require('mongoose');

const Product = require('./models/Product');


const products = [
    {
        name:"Iphone 14pro",
        img:"https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D" ,
        price: 125000,
        desc: "kisse hi lena itna mehenga" 
    },
    {
        name:"Macbook m2 pro",
        img:"https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMG0yJTIwcHJvfGVufDB8fDB8fHww",
        price: 290000 , 
        desc:"HP better big dawg"
    },
    {
        name:"Iwatch",
        price:61000,
        img:"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXdhdGNofGVufDB8fDB8fHww",
        desc:"analog watch pehna karo ye sab bakwaas hai"
    },
    {
        name:"iPad Pro", 
        img: "https://media.istockphoto.com/id/1344018786/photo/woman-holding-ipad-pro-with-white-screen-on-white-background-office-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=sNC8rpyhCon2lN3sgacd68sSW1T9mg70Mr9w1DhEkNE=", 
        price: 237900, 
        desc: "kya matlab badi screen ka T_T"
    },
    {
        name:"airpods" , 
        img:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D" , 
        price: 25000 ,
        desc: "kaam to boat bhi kar jaate hai iska kya use"
    }
]

async function seedDB(){
    //await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports = seedDB;