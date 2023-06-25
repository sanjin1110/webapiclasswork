const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength:6,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
})

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Sign JWT and return
  userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Match user entered password to hashed password in database
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Generate and hash password token
  userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  

module.exports = new mongoose.model('User', userSchema)





