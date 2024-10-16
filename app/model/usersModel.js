import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    firstName:{type:String,required: true},
    lastName:{type:String,required: true},
    email:{type:String,required: true,unique:true,lowercase:true},
    mobile:{type:String,required: true},
    password:{type:String,required: true},
    otp:{type:String,default:0},
},
    {
        timestamps: true,
        versionKey: false,
    })

const UserModel = mongoose.model('users', DataSchema);
export default UserModel;