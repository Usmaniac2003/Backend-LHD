const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: '/uploads' });
const cors = require('cors');
const app = express();


const sellerRoute = require('./API/routes/sellers');
const qualityControllerRoute = require('./API/routes/qualityControllers');
const adminRoute = require('./API/routes/admins');
const productRoute = require('./API/routes/productCategorySelling');
const productSubcategoryRoute = require('./API/routes/productSubcategoryRecycling.js');
const productRecyclingRoute = require('./API/routes/productRecycling');
const productSellingRoute = require('./API/routes/getProductSelling');
const arivalRoute = require('./API/routes/addArival');
const categoryRecyclingForm = require('./API/routes/productCategoryRecycling');
const productCategorySelling = require('./API/routes/productCategorySelling');
const productRecycling = require('./API/routes/productRecycling');
const productSelling = require('./API/routes/productSelling');
const eventRoute = require('./API/routes/eventRoute');
// const userRoute= require('./API/routes/userRoute')
const bannerRoute = require('./API/routes/bannerRoute');
const subCategorySellingRoute = require('./API/routes/subCategorySellingRoute');
const productRoutes = require('./API/routes/addProductRoute.js');
const profileRoutes = require('./API/routes/editProfile.js');
const jobsRoutes = require('./API/routes/addJobs.js');
mongoose
.connect(
	'mongodb+srv://developer:qwert123@cluster0.jmlpgli.mongodb.net/Baazzaar?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.log('Connection failed:', err);
		process.exit(1); // Exit the process if the connection fails
	});
	mongoose.connection.on('error', (err) => {
		console.error('MongoDB connection error:', err);
	});
	// Define an array of allowed origins
	// const allowedOrigins = ['http://localhost:3001/','http://localhost:3000/','http://baaazaaradmin.lighthouseclouds.com/', 'http://baaazaarqualitycontroller.lighthouseclouds.com/', 'https://baaazaarseller.lighthouseclouds.com/'];
	// // Configure CORS options with the array of allowed origins
	// const corsOptions ={
	// 		// origin: allowedOrigins,
	// 		// methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	// 		// allowedHeaders: ['Content-Type', 'Authorization'],
	// 		// credentials: false,
	// 		// optionsSuccessStatus: 200,
	// 	};
	
	// Apply CORS middleware with the specified options
	app.use(cors() );
	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//Seller Routers
app.use('/sellers', sellerRoute);
app.use('/product', productRoute);
app.use('/product', productSubcategoryRoute);
app.use('/product', productRecyclingRoute);
app.use('/product', productSellingRoute);
app.use('/arival', arivalRoute);
app.use('/productcategory', categoryRecyclingForm);
app.use('/productcategory', productCategorySelling);
app.use('/product', productRecycling);
app.use('/product', productSelling);
app.use('/admin', eventRoute);
// app.use("/api",userRoute);
app.use('/admin', bannerRoute);
// app.use("/admin",storeRoute);
app.use('/product', subCategorySellingRoute);
//QualityController Route
app.use('/qualityControllers', qualityControllerRoute);
app.use('/qualityControllers', productRoutes);
app.use('/qualityControllers', profileRoutes);
app.use('/qualityControllers', jobsRoutes);
//Admin Route
app.use('/admin', adminRoute);

module.exports = app;
