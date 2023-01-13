const express = require('express');
// const bodyP = require('body-parser');
const path = require('path');
const bodyParser = require('body-parser');
const port = 6969;
const usercollection = require('./db/data')
const coding1 = require('./db/coding/coding1');
const coding2 = require('./db/coding/coding2');
const coding3 = require('./db/coding/coding3');
const coding4 = require('./db/coding/coding4');
const civil1 = require('./db/civil/civil1');
const civil2 = require('./db/civil/civil2');
require('./db/conn')
// const ejs = require('ejs');
const app = express();
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname , 'public')));
// app.set('views',path.join(__dirname , 'views') );

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.json())
let main = path.join(__dirname, "../");

// app.get('/',(req,res)=>{
//     res.send('homepage');
// })
app.get('/', (req, res) => {
    res.sendFile(main + '/index.html')
})

app.get('/fetch', async (req, res) => {
    usercollection.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your GID is: "+post._id) });

})
app.get('/code1uid', async (req, res) => {
    coding1.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: "+post._id) });

})
app.get('/code4uid', async (req, res) => {
    coding4.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: "+post._id) });

})
app.get('/code2uid', async (req, res) => {
    coding2.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: "+post._id) });

})
app.get('/code3uid', async (req, res) => {
    coding3.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: "+post._id) });

})
app.get('/civil1uid', async (req,res)=>{
    civil1.findOne().sort('-createdAt').exec(function(err,post){res.json("Your UID is: "+post._id)});
})
app.get('/civil2uid', async (req,res)=>{
    civil2.findOne().sort('-createdAt').exec(function(err,post){res.json("Your UID is: "+post._id)});
})
app.get('/event', async (req, res) => {
    res.sendFile(main + '/event registration.html')
})
app.post('/', async (req, res) => {
    let req_user = new usercollection(req.body);
    req_user.save((err, item) => {
        const id = item._id;
        res.redirect('/fetch');
    });
    // usercollection.findOne().sort('-createdAt').exec(function(err, post) { res.json(post) });


})
app.post('/event', async (req, res) => {
    try {
        const Event = req.body.Event;
        
        if (Event === 'code-tyro') {
            // let req_id = new coding1(req.body);
            // let code=await req_id.save();
            // res.redirect('/code1uid');
            try {
                const {gid1, gid2, phone} = req.body;
                
               const a = await coding1.find().sort(_id);
                var arr=[];
               for(var i=0;i<coding1.findone().sort(-_id);i++){
                arr[i]=a.arr.map(coding1.findOne({gid1:i+1}));
               }
               for(var i=0;i<coding1.findone().sort(-_id);i++){
                res.json(a[i]);
               }
                
            } catch (error) {
                res.json(err)
            }
            
            // if(val1.gid2===gid2 && val2.gid1===gid1){
            //     res.json('gid already exists');
            // }else{
            //     let req_id = new coding1(req.body);
            //     let code=await req_id.save();
            //     res.redirect('/code1uid');
            // }
        }else if(Event==='clash-o-coders'){
            try {
                const gid1 = req.body.gid1;
                const gid2 = req.body.gid2;
                const user1 = await coding3.findOne({gid1});
                const user2 = await coding3.findOne({gid2});
                if(user1){
                    res.json('gid1 already exists')
                }else if(user2){
                    res.json('gid2 already exists')
                }else{
                    let req_id = new coding3(req.body);
                    let code=await req_id.save();
                    res.redirect('/code3uid');
                }
            } catch (error) {
                res.json(err)
            }
        }else if(Event==='code-hasher'){
            try {
                const gid1 = req.body.gid1;
                const gid2 = req.body.gid2;
                const user1 = await coding2.findOne({gid1});
                const user2 = await coding2.findOne({gid2});
                if(user1){
                    res.json('gid1 already exists')
                }else if(user2){
                    res.json('gid2 already exists')
                }else{
                    let req_id = new coding2(req.body);
                    let code=await req_id.save();
                    res.redirect('/code2uid');
                }
            } catch (error) {
                res.json(err)
            }
            
        }else if(Event==='webapi'){
           
            try {
                const gid1 = req.body.gid1;
                const gid2 = req.body.gid2;
                const user1 = await coding4.findOne({gid1});
                const user2 = await coding4.findOne({gid2});
                if(user1){
                    res.json('gid1 already exists')
                }else if(user2){
                    res.json('gid2 already exists')
                }else{
                    let req_id = new coding4(req.body);
                    let code=await req_id.save();
                    res.redirect('/code4uid');
                }
            } catch (error) {
                res.json(err)
            }
           
        }else if(Event==='Setubandhan'){
            try {
                const gid1 = req.body.gid1;
                const gid2 = req.body.gid2;
                const gid3 = req.body.gid3;
                const gid4 = req.body.gid4;
                const gid5 = req.body.gid5;
                const user1 = await civil1.findOne({gid1});
                const user2 = await civil1.findOne({gid2});
                const user3 = await civil1.findOne({gid3});
                const user4 = await civil1.findOne({gid4});
                const user5 = await civil1.findOne({gid5});
                if(user1){
                    res.json('gid1 already exists')
                }else if(user2){
                    res.json('gid2 already exists')
                }else if(user3){
                    res.json('gid3 already exists')
                }else if(user4){
                    res.json('gid4 already exists')
                }else if(user5){
                    res.json('gid5 already exists')
                }
                else{
                    let req_id = new civil1(req.body);
                    let code=await req_id.save();
                    res.redirect('/civil1uid');
                }
            } catch (error) {
                res.json(err)
            }
        }else if(Event==='mega-arch'){
            try {
                const gid1 = req.body.gid1;
                const gid2 = req.body.gid2;
                const gid3 = req.body.gid3;
                const gid4 = req.body.gid4;
                const gid5 = req.body.gid5;
                const user1 = await civil2.findOne({gid1});
                const user2 = await civil2.findOne({gid2});
                const user3 = await civil2.findOne({gid3});
                const user4 = await civil2.findOne({gid4});
                const user5 = await civil2.findOne({gid5});
                if(user1){
                    res.json('gid1 already exists')
                }else if(user2){
                    res.json('gid2 already exists')
                }else if(user3){
                    res.json('gid3 already exists')
                }else if(user4){
                    res.json('gid4 already exists')
                }else if(user5){
                    res.json('gid5 already exists')
                }
                else{
                    let req_id = new civil2(req.body);
                    let code=await req_id.save();
                    res.redirect('/civil2uid');
                }
            } catch (error) {
                res.json(err)
            }
        }
        else{
            res.json("Couldn't add");
        }
    } catch (error) {
        res.status(400).send(error);
    }

    // let req_id = new rd(req.body);
    // req_id.save((err,item)=>{
    //     const uid = item._id;
    //     res.redirect('/uid');
    // });
})

app.listen(port, () => {
    console.log('connected');
});
