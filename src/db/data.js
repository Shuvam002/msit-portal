const Counter = require('./counter');
const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    _id:Number,
    fullname:{
        type:String,
        require:true,
        lowercase:true
    },
    email:{
        type:mongoose.SchemaTypes.Mixed,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    Roll_No:{
        type:Number,
        required:true
    }

    // password:{
    //     type:String,
    //     required:true
    // }
},
{timestamps:true,_id:false}

);

regSchema.pre("save",function(next){
    let doc = this;
    Counter.getSequenceNextValue("user_id").then(counter=>{
        console.log("done",counter);
        if(!counter){
            Counter.insertCounter("user_id").then(counter=>{
                doc._id=counter;
                console.log(doc)
                next();
            }).catch(error=>next(error));
        }else{
            doc._id=counter;
            next();
        }
    }).catch(error=>next(error));
});

const usercollection = mongoose.model('Test3',regSchema)
module.exports = usercollection;