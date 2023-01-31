const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        required: true
    }
});

const Counter = mongoose.model('roboracecounter1', CounterSchema);

const getSequenceNextValue = (seqName) => {
    return new Promise((resolve, reject) => {
        Counter.findByIdAndUpdate(
            { "_id": seqName },
            { "$inc": { "seq": 1 } }
            , (error, codingcounter) => {
                if (error) {
                    reject(error);
                }
                if(codingcounter) {
                    resolve(codingcounter.seq + 1);
                } else {
                    resolve(null);
                }
            });
    });
};

const insertCounter = (seqName) => {
    const newCounter = new Counter({ _id: seqName, seq: 1 });
    return new Promise((resolve, reject) => {
    newCounter.save()
        .then(data => {
            resolve(data.seq);
        })
        .catch(err => reject(err));
    });
}
module.exports = {
    Counter,
    getSequenceNextValue,
    insertCounter
}