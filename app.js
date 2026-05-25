
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed')
const ejsMate = require('ejs-mate');
const methodOverride=require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User =require('./models/User');
const MongoStore = require('connect-mongo');
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const productApi = require('./routes/api/productapis');
const paymentRoutes = require('./routes/payment');


const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/shopping-sam-app';

mongoose.set('strictQuery', true);
mongoose.connect(dbURL)
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})


let secret = process.env.SECRET || 'keyboardcat';


let store = MongoStore.create({
    mongoUrl: dbURL,
    secret:secret
})
store.on("error", function(e){
    console.log("SESSION STORE ERROR", e)
})

//session
const sessionConfig = {
    store:store,
    name:'bhaukaal',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // views folder 
app.use(express.static(path.join(__dirname , 'public'))); // public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));




app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

//PASSPORT 
passport.use(new LocalStrategy(User.authenticate()));

// seeding database
//seedDB()

app.use('/products', productRoutes); //so that harr incoming request ke liye path check kiya jaae
app.use('/products', reviewRoutes); // review routes
app.use('/', authRoutes); // auth routes
app.use('/', cartRoutes); // cart routes
app.use('/api/products', productApi); // product api routes
app.use('/payment', paymentRoutes); // payment routes

app.get('/', (req,res)=>{
    res.render('home');
});


const port = 5000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
