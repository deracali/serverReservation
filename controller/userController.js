const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel")




const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password || !email) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            username,
            email,
            password: hashedPassword
        };

        const newUser = new UserModel(userData);
        let user;
        try {
            user = await newUser.save();
        } catch (error) {
            return res.json({ success: false, message: "User registration failed", error: error.message });
        }

        const hardcodedJWTSecret = 'your_hardcoded_secret'; 
        const token = jwt.sign({ userId: newUser._id }, hardcodedJWTSecret);
        
        res.json({ success: true, token, userId: newUser._id });

    } catch (error) {
        console.log("Registration Error:", error);
        res.json({ success: false, message: "Registration failed", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        const hardcodedJWTSecret = 'your_hardcoded_secret'; 
        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, hardcodedJWTSecret);
            res.json({ success: true, token, userId: user._id });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Login Error:", error);
        res.json({ success: false, message: error.message });
    }
}


const getProfile = async (req,res) => {
    try{
        const {userId} = req.params
        const userData = await UserModel.findById(userId)
        
        if (!userData) {
            return { success: false, message: "User not found" };
        }

        res.json({success:true,userData})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const updateProfile = async (req,res) => {
    try{
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }

        await UserModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})

        }

        res.json({success:true,message:"Profile Updated"})


    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// Get users controller
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find(); // Fetch all users from the database
        res.json(users); // Respond with the list of users
    } catch (error) {
     
        res.status(500).json({ message: 'Internal server error' });
    }
};





module.exports = {getUsers,registerUser,loginUser,getProfile,updateProfile}