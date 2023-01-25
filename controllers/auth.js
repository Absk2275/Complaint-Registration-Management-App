const User = require("../models/User");
const PostComp = require("../models/PostComp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/keys");

exports.signupController = async (req, res) => {
  // console.log(req.body);
  const { username, email, phoneNo, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exist",
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.phoneNo = phoneNo;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // console.log(newUser.password);
    await newUser.save();
    res.json({
      successMessage: "Registration success. Please Signin",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Ivalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid Credentials",
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log("jwt error", err);
      const { _id, username, email, phoneNo, role } = user;

      res.json({
        token,
        user: { _id, username, email, phoneNo, role },
      });
    });
  } catch (err) {
    console.log("signinController error", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};


exports.postController = async(req,res) =>{


  const { firstName,
    lastName,
    phoneNo,
    email,
    address,
    district,
    block,
    pincode,
    department,
    description } = req.body;


    try {
    const newPost = new PostComp();
    // const uid = Math.floor(Math.random()*1000000)+1
    // const post = await PostComp.findOne({ uid: uid });
    // if(post){
    //   uid = Math.floor(Math.random()*1000000)+1
    // }
    newPost.uid= Date.now(),
    newPost.firstName= firstName,
    newPost.lastName =lastName,
    newPost.phoneNo =phoneNo,
    newPost.email= email,
    newPost.address=address,
    newPost.district= district,
    newPost.block =block,
    newPost.pincode= pincode,
    newPost.department=department,
    newPost.description =description,
    newPost.adminread = 0,
    newPost.adminstatus =0,
    newPost.deptread =0,
    newPost.deptstatus =0,
    newPost.empname="",
    
    newPost.empID=0,
    newPost.empNo=0,
    

    await newPost.save();
    res.json({
      successMessage: "Complaint has been posted !",
    });
    }
    catch (err) {
      console.log("postController error: ", err);
      res.status(500).json({
        errorMessage: "Server error",
      });
    }
};