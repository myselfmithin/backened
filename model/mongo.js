var mongoose=require('mongoose');

var contactListSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
   },
    email:{
        type:String,
        required:true
   },
   number:{
       type:Number,
       required:true
   }
});
var contactList=module.exports=mongoose.model('contactList',contactListSchema)