const jwt = require('jsonwebtoken');
// const multer = require('multer');
const seller = require('../models/seller');
const createSeller = async (req, res, next) => {
	

	try{
		// const imageData = req.files.image.map(file => '/image/' + file.filename);
    // const documentData = req.files.images.map(file => '/document/' + file.filename);

	const createSeller = new seller({

			yourName: req.body.yourName,
			brandName: req.body.brandName,
			yourEmail: req.body.yourEmail,
			selectCountry: req.body.selectCountry,
			officialAddress: req.body.officialAddress,
			selectRegion: req.body.selectRegion,
			selectQualityController: req.body.selectQualityController,
			yourPhone: req.body.yourPhone,
			productCategory: req.body.productCategory,
			package: req.body.package,
			sellerBio: req.body.sellerBio,
			createPassword: req.body.createPassword,
			confirmPassword: req.body.confirmPassword,
			status: 'inActive',
		});
		if (req.file) {
			createSeller.image = req.file.path;
	      }
	
		const savedSeller = await createSeller.save();
	// 	console.log("Seller created:", savedSeller);
    // res.status(201).json({ message: "Seller Created" });
	}
	catch (err) {
		console.error("Error creating seller:", err);
		res.status(500).json({ error: "Failed to create seller" });
	  }
	// };
	

	let token;
	try {
		token = jwt.sign(
			{
				sellerId: createSeller.id,
			},
			'supersecret_confidential',
			{ expiresIn: '1h' }
		);
	} catch (err) {
		console.log('signUP failed', 500);
	}
	res.status(201).json({
		sellerId: createSeller.id,
		email: createSeller.yourEmail,
		token: token,
	});
};
const getSeller = async (req, res) => {
	try {
		const sellers = await seller.find();
		res.status(200).json(sellers);
	} catch (err) {
		console.error('Error token:', err);
		res.status(500).json({
			error: err.message,
		});
		// res
		// 	.status(201)
		// 	.json({
		// 		sellerId: createSeller.id,
		// 		email: createSeller.email,
		// 		token: token,
		// 	});
	}
};
const getToken = (id) => {
	let token;
	try {
		token = jwt.sign(
			{
				sellerID: id,
			},
			'supersecret_confidential',
			{ expiresIn: '1h' }
		);
		return token;
	} catch (err) {
		console.log('signUP failed', 500);
	}
};

const updateSeller = async (req, res, next) => {
	const id = req.params.sellerId;
	console.log(id);
	seller.updateOne(
			{ _id: id },
			{
			yourName: req.body.yourName,
			yourEmail: req.body.yourEmail,
			selectCountry: req.body.selectCountry,
			sellerBio: req.body.sellerBio,
			image:req.file?req.file.path:null,
			}
			)
		// 	if (req.file) {
		// 		createSeller.image = req.file.path;
		//       }
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

const createPasswordChangeRequest = async (req, res) => {
	try {
		const id = req.params.sellerId;
		console.log(id);
		const sellerData = await seller.findOne({ _id: id });
		
		if (!sellerData) {
			return res.status(404).json({ error: "Seller not found" });
		}

		const { oldPassword, newPassword, confirmPassword } = req.body;

		if (oldPassword !== sellerData.password) {
			return res.status(400).json({ error: "Old password is incorrect" });
		}

		const updatedSeller = await seller.findOneAndUpdate(
			{ _id: id },
			{ password: req.body.newPassword,
			email: req.body.newEmail
			},
			{ new: true }
		);

		console.log(updatedSeller);
		res.status(200).json(updatedSeller);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
// const loginSeller = async (req, res, next) => {
// 	console.log("Seller Data" , req.body)
// 	// try {
// 		 await seller
// 			.findOne({
// 				yourEmail: req.body.yourEmail,
// 				createPassword: req.body.createPassword,
// 			})
// 			.then((resSeller) => {
// 				// console.log("Seller response Data" , resSeller);

// 				const active  = resSeller.status

// 				// console.log("active", active)
// 				if(active === 'active') {
// 					Console.log("Seller is active ");

// 					return res.status(201).json({
// 						email: resSeller.yourEmail,
// 						sellerID: resSeller._id,
// 						qualityControllerID:resSeller.selectQualityController,
// 						token: getToken(resSeller._id),
// 						message: 'Logged in successfully',
// 					});
					
					
// 				}
// 				else{
// 					res.status(204).json({
// 						message:'You are not Allowed to login yet, Let the ambassador approve your request'
// 					})
// 				}
// 			}).catch((err) => {res.status(500).json({
// 				message:err
// 			})});
			
// 	// } catch (err) {
// 	// 	console.error('Error token:', err);
// 	// 	res.status(500).json({
// 	// 		error: err.message,
// 	// 	});
// 	// }
// };

const loginSeller = async (req, res) => {
    console.log("Seller Data", req.body);
    try {
        await seller
            .findOne({
                yourEmail: req.body.yourEmail,
                createPassword: req.body.createPassword,
            })
            .then((resSeller) => {
                if (!resSeller) {
                    return res.status(204).json({
                        message: 'User not found',
                    });
                }

                const active = resSeller.status;

                if (active === 'active') {
                    console.log("Seller is active");

                    return res.status(201).json({
                        email: resSeller.yourEmail,
                        sellerID: resSeller._id,
                        qualityControllerID: resSeller.selectQualityController,
                        token: getToken(resSeller._id),
                        message: 'Logged in successfully',
                    });
                } else {
                    return res.status(204).json({
                        message: 'You are not allowed to login yet. Please wait for approval.',
                    });
                }
            }).catch((err) => {
                console.error('Error:', err);
                return res.status(500).json({
                    message: 'Internal server error',
                });
            });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};



module.exports = {
	createSeller,
	getSeller,
	loginSeller,
	updateSeller,
	createPasswordChangeRequest
};
