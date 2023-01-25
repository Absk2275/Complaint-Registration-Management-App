const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    uid:{
     type:String,
    },
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
        type: String,
        required: true,
      },
      block: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      adminread:{ type: Number,},
      adminstatus:{ type: Number,},
      deptread:{ type: Number,},
      deptstatus:{ type: Number,},
      empname:{ type: String,},
      empID:{ type: String,},
      empNo:{ type: Number,},
      empemail: {
        type: String,
        
      },
      date:{
        type:Date,
      },

      
  },
  { timestamps: true }
);

const PostComp = mongoose.model("PostComp", PostSchema);
module.exports = PostComp;