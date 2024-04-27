const jwt = require("jsonwebtoken");
const qualityController = require("../models/qualityController");
const seller = require('../models/seller');
const Withdrawl = require('../models/Withdrawl');
const Topup = require('../models/Topup');
const PaymentTransfer= require('../models/PaymentTransfer');
const Store = require('../models/store');
const bcrypt = require('bcrypt');
const Warehouse = require('../models/Warehouse');
const Racks = require('../models/Racks');
const uploads = require('../middleware/upload');
const SellingProduct = require('../models/productSelling');

const approveSellingProduct=async()=>{
  const id = req.params.id;
  console.log("================================",id);
  // const qualityControllerID = req.params.qualityControllerID;
  try {
      const updatedSellingProduct = await SellingProduct.updateOne(
          { _id: id },
          {
              status:"approved",
          }
      );
      if (updatedSellingProduct.nModified === 0) {
          throw new Error('Seller not found or not updated');
      }
      res.status(200).json({ message: 'Product status updated successfully',seller:updatedSellingProduct });
  } catch (error) {
      console.error('Error updating seller status:', error);
      res.status(500).json({ error: error.message });
  }  
}
const getSeller = async (req, res) => {
	try {
		const sellers = await seller.find();
		res.status(200).json(sellers);
	} catch (err) {
		console.error('Error token:', err);
		res.status(500).json({
			error: err.message,
		});
		res
			.status(200)
			.json({
				sellerId: createSeller.id,
				email: createSeller.email,
				token: token,
			});
	}
};

const approveSeller = async (req, res, next) => {
  const id = req.params.id;
  console.log("================================",id);
  const qualityControllerID = req.params.qualityControllerID;
  try {
      const updatedSeller = await seller.updateOne(
          { _id: id },
          {
              status:req.body.status
          }
      );
      if (updatedSeller.nModified === 0) {
          throw new Error('Seller not found or not updated');
      }
      const updatedQC=await qualityController.findOneAndUpdate(
          { _id: qualityControllerID }, 
          { $push: { sellers: id  } },
          { new: true }
      );
      res.status(200).json({ message: 'Seller status updated successfully',seller:updatedSeller,qc:updatedQC });
  } catch (error) {
      console.error('Error updating seller status:', error);
      res.status(500).json({ error: error.message });
  }
};

const updatePasswordChangeRequest = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    // Retrieve the user from the database
    const user = await qualityController.findOne({ email:email,_id:req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the old password provided by the user with the password stored in the database
    const isPasswordCorrect = oldPassword === user.password;
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }
    // Update the password in the database
    user.password = newPassword; // Assuming newPassword is a plain text string
    await user.save();
    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (err) {
    console.error('Error while updating password:', err);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};



// Quality Controller Login
const loginQualityController = async (req, res, next) => {
	// let admins;
	try {
		const qc = await qualityController
			.findOne({ email: req.body.email, password: req.body.password })
			.then((qc) => {
				res.status(201).json({
					email: qc.email,
					token: getToken(qc.id),
          _id: qc._id,
          message:"Logged In successfully"
				});
			});
	} catch (err) {
		console.error('Error token:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};



// Racks controllers
const createRack = async (req, res) => {
  try {
    console.log("body is here:",req.body);
    const createdRack = new Racks({
      name: req.body.name,
      numberOfRacks: req.body.numberOfRacks,
      rackType: req.body.rackType,
      rackSize: req.body.rackSize,
      type:req.body.type,
      qualityController: req.params.id // Assuming qualityController is in params
    });
    await createdRack.save();
    res.status(201).json({
      message: 'Rack created successfully',
      rack: createdRack
    });
  } catch (err) {
    console.error('Error while creating rack:', err);
    res.status(500).json({
      error: err.message
    });
  }
};
const getRacks = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    const racks = await Racks.find({ qualityController: qualityControllerId });
    res.status(200).json(racks);
  } catch (err) {
    console.error('Error while fetching racks:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getRackById = async (req, res) => {
  try {
    const id = req.params.id;
    const racks = await Racks.find({ _id:id });
    res.status(200).json(racks);
  } catch (err) {
    console.error('Error while fetching racks:', err);
    res.status(500).json({
      error: err.message
    });
  }
};


const updateRack = async (req, res) => {
  try {
    const updatedRack = await Racks.findByIdAndUpdate(req.params.id, 
      { name: req.body.name,
        numberOfRacks: req.body.numberOfRacks,
        rackType: req.body.rackType,
        rackSize: req.body.rackSize,
        qualityController:req.params.id}, { new: true });
    res.status(200).json({ message: 'rack is updated successfully', rack: updatedRack });
  } catch (err) {
    console.error('Error while updating rack:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteRack = async (req, res) => {
  try {
    await Racks.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Rack deleted successfully' });
  } catch (err) {
    console.error('Error while deleting rack:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const createWarehouse = async (req, res) => {
  try {
    console.log("===================",req.body)
    const warehouse = new Warehouse({
      name: req.body.name,
      width: req.body.width,
      height: req.body.height,
      stockcapacity: req.body.stockCapacity,
      address: req.body.address,
      qualityController:req.params.id
    });
    await warehouse.save();

    res.status(201).json({
      message: 'warehouse created successfully',
      warehouse: warehouse
    });
  } catch (err) {
    console.error('Error while creating warehouse:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getWareHouses = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    const warehouses = await Warehouse.find({ qualityController: qualityControllerId });
    res.status(200).json(warehouses);
  } catch (err) {
    console.error('Error while fetching warehouses:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getWarehouseById = async (req, res) => {
  try {
    const warehouseID = req.params.id;
    const warehouse = await Warehouse.find({_id:warehouseID });
    res.status(200).json(warehouse);
  } catch (err) {
    console.error('Error while fetching warehouses:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const updatedWarehouse = await Warehouse.findByIdAndUpdate({_id:req.params.id, qualityController: req.params.qcId}, 
      { name:req.body.name,
        width:req.body.width,
        height:req.body.height,
        stockcapacity:req.body.stockcapacity,
        address:req.body.address,
        }, { new: true });
    res.status(200).json({ message: 'warehouse updated successfully', warehouse: updatedWarehouse });
  } catch (err) {
    console.error('Error while updating warehouse:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteWareHouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'warehouse deleted successfully' });
  } catch (err) {
    console.error('Error while deleting warehouse:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

// store routes start here

const createStore = async (req, res) => {
  try {
    // console.log('Creating store', req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const store = new Store({
      brandName: req.body.brandName,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      country: req.body.country,
      city: req.body.city,
      productCategories: req.body.productCategories,
      contactNumber: req.body.contactNumber,
      qualityController:req.params.id
    });
    if(req.file)
    {
       store.image=req.file.path
    }
    await store.save();

    res.status(201).json({
      message: 'Store created successfully',
      store: store
    });
  } catch (err) {
    console.error('Error while creating store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getStores = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    const stores = await Store.find({ qualityController: qualityControllerId });
    res.status(200).json(stores);
  } catch (err) {
    console.error('Error while fetching stores:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const stores = await Store.find({_id:storeId });
    res.status(200).json(stores);
  } catch (err) {
    console.error('Error while fetching stores:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, 
      { brandName:req.body.brandName
        , name:req.body.name
        , country:req.body.country
        , city:req.body.city,
        contactNumber:req.body.contactNumber}, { new: true });
    res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
  } catch (err) {
    console.error('Error while updating store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error('Error while deleting store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};
const getToken = (id) => {
	let token;
	try {
		token = jwt.sign(
			{
				adminId: id,
			},
			'supersecret_confidential',
			{ expiresIn: '1h' }
		);
		return token;
	} catch (err) {
		console.log('signUP failed', 500);
	}
};
const createQualityController = async (req, res) => {
  console.log("here is the data",req.body);
  try {
    // Extracting image data
    let profileImage = null;
    let cnicFrontImage = null;
    let cnicBackImage = null;
    let businessLogo = null;
    let cvDocument = null;

    if (req.files && req.files.profile && req.files.profile.length > 0) {
      profileImage = '/image/' + req.files.profile[0].filename;
    }
    if (req.files && req.files.cnicFront && req.files.cnicFront.length > 0) {
      cnicFrontImage = '/image/' + req.files.cnicFront[0].filename;
    }
    if (req.files && req.files.cnicBack && req.files.cnicBack.length > 0) {
      cnicBackImage = '/image/' + req.files.cnicBack[0].filename;
    }
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      businessLogo = '/image/' + req.files.logo[0].filename;
    }
    if (req.files && req.files.cv && req.files.cv.length > 0) {
      cvDocument = '/document/' + req.files.cv[0].filename;
    }

    const createController = new qualityController({
      name: req.body.yourName,
      email: req.body.yourEmail,
      experienceStatus: req.body.experianceStatus,
      servicePost: req.body.servicePost,
      gender: req.body.selectGender,
      profile: profileImage,
      phone: req.body.yourPhone,
      youtubeVideoLink: req.body.youtubeVideoLink,
      selectPackage: req.body.selectPackage,
      officialAddress: req.body.enterOfficalAddress,
      highestQualification: req.body.heighestQualification,
      generalSkills: req.body.generalSkills,
      previousExperience: req.body.previousExperience,
      cnicFront: cnicFrontImage,
      cnicBack: cnicBackImage,
      cv: cvDocument,
      bankAccount: req.body.bankAccount,
      branchCode: req.body.branchCode,
      mobileAccount: req.body.mobileAccount,
      registration: req.body.registeration,
      businessLogo: businessLogo,
      joiningAs: req.body.joiningAs,
      specialSkills: req.body.specialSkills,
      country: req.body.selectCountry,
      region: req.body.selectRegion,
      password: req.body.password,
      bankAccountTitle: req.body.bankAccountTittle,
      bankName: req.body.bankName,
      mobileAccountTitle: req.body.mobileAccountTittle,
      selfDescription: req.body.describeYourSelf,
      industryInstituteRegistration: req.body.industryInstituteRegisteration,
      status:"pending"
    });

    const savedController = await createController.save();
    console.log("Quality Controller created:", savedController);
    res.status(201).json({ message: "Quality Controller Created" });
  } catch (err) {
    console.error("Error creating quality controller:", err);
    res.status(500).json({ error: "Failed to create quality controller" });
  }
};
const getQualityController = async (req, res, next) => {
  try {
    const controllers = await qualityController.find();
    res.status(200).json(controllers);
  } catch (err) {
    console.error('Error getting quality controllers:', err);
    res.status(500).json({ error: err.message });
  }
};

const changeSellerStatus = async (req, res) => {
  try {
    const updatedSeller = await seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Seller status updated successfully', updatedSeller: updatedSeller });
  } catch (err) {
    console.error('Error while updating seller status:', err);
    res.status(500).json({ error: err.message });
  }
};

const withdrawAmount = async (req, res) => {
  try {
    const withdrawMoney = new Withdrawl({
      withdrawAmount: req.body.withdrawAmount,
      bankAccountNumber: req.body.bankAccountNumber,
      bankAccountName: req.body.bankAccountName,
      accountHolderName: req.body.accountHolderName,
      qualityController: req.body.qualityController,
      status: "pending",
    });
    const createdWithdraw = await withdrawMoney.save();
    console.log("Withdrawl created:", createdWithdraw);
    res.status(201).json({ message: "Withdrawl request is sent successfully", createdWithdraw: createdWithdraw });
  } catch (err) {
    console.error("Error creating quality controller:", err);
    res.status(500).json({ error: "Failed to create quality controller" });
  };
}
const getAllWithdraws=async(req,res,next)=>{
  try{
    const qualityControllerId = req.params.id; // Assuming you're passing the qualityController ID as a route parameter
    const allWithdrawls = await Withdrawl.find({ qualityController: qualityControllerId });
    res.status(200).json(allWithdrawls);  
  }catch(err){
    res.status(500).json({ error: "Failed to get all withdrawls"});
  }
}
const createTopUp = async (req, res) => {
  try {
      const createdTopUp = new Topup({
      accountNumber: req.body.accountNumber,
      accountHolderName: req.body.accountHolderName,
      transactionID: req.body.transactionID,
      amountToTopUp: req.body.amountToTopUp,
      bankName:req.body.bankName,
      bankName:req.body.bankName.length>0?req.body.bankName:"Allied bank",
      status: "pending",
      qualityController:req.body.qualityController
    });
    if (req.file) {
      createdTopUp.image = req.file.path;
    }
    const topup = await createdTopUp.save();
    console.log("Withdrawl created:", topup);
    res.status(201).json({ message: "topup request is sent successfully", topup: topup });
  } catch (err) {
    console.error("Error creating topup:", err);
    res.status(500).json({ error: "Failed to create topup" });
  };
}
const getAllTopUps=async(req,res,next)=>{
  try{
    const qualityControllerId = req.params.id; // Assuming you're passing the qualityController ID as a route parameter
    const allTopUps = await Topup.find({ qualityController: qualityControllerId });
    res.status(200).json(allTopUps);  
  }catch(err){
    res.status(500).json({ error: "Failed to get all topups"});
  }
}
const transferPayment = async (req, res) => {
  try {
      const createdTransferPayment = new PaymentTransfer({
      receiverID: req.body.receiverID,
      transferAmount: req.body.transferAmount,
      qualityController:req.body.qualityController
    });
    const transPayment = await createdTransferPayment.save();
    console.log("createdTransferPayment created:", transPayment);
    res.status(201).json({ message: "createTransferPayment successful", transferPayment: transPayment });
  } catch (err) {
    console.error("Error creating transfer Payment:", err);
    res.status(500).json({ error: "Failed to create transfer Payment" });
  };
}
const getAllPaymentTransfers=async(req,res,next)=>{
  try{
    const qualityControllerId = req.params.id; // Assuming you're passing the qualityController ID as a route parameter
    const allPaymentTransfers = await PaymentTransfer.find({ qualityController: qualityControllerId });
    res.status(200).json(allPaymentTransfers);  
  }catch(err){
    res.status(500).json({ error: "Failed to get all allPaymentTransfers"});
  }
}
const addJob = async (req, res) => {
	try {
		const job = new JobProduct({
			title: req.body.title,
			date: req.body.date,
			opportunityDetails: req.body.opportunityDetails,
			status: req.body.status,
            qualityController:req.body.qualityController
		});
		if (req.file) {
			job.image = req.file.path;
		}

		await job.save();

		res.status(201).json({
			message: 'Job added successfully',
			job: job,
		});
	} catch (err) {
		console.error('Error while adding job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const getJobs = async (req, res) => {
	try {
		const qualityControllerId = req.params.id;
		const jobs = await JobProduct.find({ qualityController: qualityControllerId });
		res.status(200).json(jobs);
	} catch (err) {
		console.error('Error while fetching jobs:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const updateJob = async (req, res) => {
	try {
		const updatedJob = await JobProduct.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Job updated successfully', job: updatedJob });
	} catch (err) {
		console.error('Error while updating job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteJob = async (req, res) => {
	try {
		await JobProduct.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Job deleted successfully' });
	} catch (err) {
		console.error('Error while deleting job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const addProduct = async (req, res) => {
	try {
		const product = new BuisnessOpportunityProduct({
			title: req.body.title,
			date: req.body.date,
			opportunityDetails: req.body.opportunityDetails,
			status: req.body.status,
            qualityController:req.body. qualityController
		});
		if (req.file) {
			product.image = req.file.path;
		}

		await product.save();

		res.status(201).json({
			message: 'Product added successfully',
			product: product,
		});
	} catch (err) {
		console.error('Error while adding product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const getProducts = async (req, res) => {
	try {
		const qualityControllerId = req.params.id; 
		const products = await BuisnessOpportunityProduct.find({ qualityController: qualityControllerId });
		res.status(200).json(products);
	} catch (err) {
		console.error('Error while fetching products:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await BuisnessOpportunityProduct.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Product updated successfully', product: updatedProduct });
	} catch (err) {
		console.error('Error while updating product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		await BuisnessOpportunityProduct.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		console.error('Error while deleting product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const createProfile = async (req, res) => {
  try {
   
    const profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      sellerBio: req.body.sellerBio,
      qualityController:req.body.qualityController
    });
    if (req.file) {
        profile.image = req.file.path;
    }


    await profile.save();

    res.status(201).json({
      message: 'Profile created successfully',
      profile: profile
    });
  } catch (err) {
    console.error('Error while creating profile:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    await qualityController.find({ _id: qualityControllerId })
    .then((profile)=>{
      res.status(200).json(profile);
    }).catch(err=>{
      res.status(500).json({
        error: err.message
      })
    })
  } catch (err) {
    console.error('Error while fetching profiles:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log("here is the data",req.body);
    uploads.single('image')(req, res, async (err) => {
      const { name, email, bio } = req.body;
      const profile = req.file ? req.file.filename : undefined; 
      const updatedProfile = await qualityController.findByIdAndUpdate({_id:req.params.id}, { name:name, email:email, bio:bio, profile:profile }, { new: true });
      res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    });
  } catch (err) {
    console.error('Error while updating profile:', err);
    res.status(500).json({ error: err.message });
  }
};
  
const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error while deleting profile:', err);
    res.status(500).json({
      error: err.message
    });
  }
};
module.exports = {
  approveSellingProduct,
  getSeller,
  approveSeller,
  updatePasswordChangeRequest,
  loginQualityController,
  createRack,
  getRacks,
  getRackById,
  updateRack,
  deleteRack,
  createWarehouse,
  getWarehouseById,
  getWareHouses,
  updateWarehouse,
  deleteWareHouse,
  getStoreById,
  deleteStore,
  updateStore,
  getStores,
  createStore,
  createQualityController,
  getQualityController,
  changeSellerStatus,
  withdrawAmount,
  getAllWithdraws,
  createTopUp,
  getAllTopUps,
  transferPayment,
  getAllPaymentTransfers,
  addJob,
	getJobs,
	updateJob,
	deleteJob,
  addProduct,
	getProducts,
	updateProduct,
	deleteProduct,
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile
};
