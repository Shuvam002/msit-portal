const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const Counter = require('./civilcount2')
const regSchema = new mongoose.Schema({
    _id: Number,
    Event: {
        type: String,
        required: true
    },
    gid1: {
        type: Number,
        unique: true

    },
    gid2: {
        type: Number,
        unique: true
    },
    gid3:{
        type:Number,
        required:true
    },
    gid4:{
        type:Number,
        required:true
    },
    gid4:{
        type:Number,
        required:true
    },
    gid5:{
        type:Number,
        required:true
    },
    phone: {
        type: Number,
        required: true
    }
},
    { timestamps: true, _id: false }
);

regSchema.pre("save", function (next) {
    let doc = this;
    Counter.getSequenceNextValue("user_id").then(codingcounter => {
        console.log("done", codingcounter);
        if (!codingcounter) {
            Counter.insertCounter("user_id").then(codingcounter => {
                doc._id = codingcounter;
                console.log(doc)
                next();
            }).catch(error => next(error));
        } else {
            doc._id = codingcounter;
            next();
        }
    }).catch(error => next(error));
});

const rd = mongoose.model('civil2', regSchema)
module.exports = rd;