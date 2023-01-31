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
const roborace1 = require('./db/robotics/roborace1');
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
    usercollection.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your GID is: " + post._id) });

})
app.get('/code1uid', async (req, res) => {
    coding1.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });

})
app.get('/code4uid', async (req, res) => {
    coding4.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });

})
app.get('/code2uid', async (req, res) => {
    coding2.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });

})
app.get('/code3uid', async (req, res) => {
    coding3.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });

})
app.get('/civil1uid', async (req, res) => {
    civil1.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });
})
app.get('/civil2uid', async (req, res) => {
    civil2.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });
})
app.get('/roborace1uid', async (req, res) => {
    roborace1.findOne().sort('-createdAt').exec(function (err, post) { res.json("Your UID is: " + post._id) });
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
            
            try {
                const gid1Exists = await coding1.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }]
                });
                const gid2Exists = await coding1.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }]
                });
                if (gid1Exists && gid2Exists) {
                    res.json("Both GIDs already exist");
                } else if (gid2Exists) {
                    res.json("GID2 already exists");
                } else if (gid1Exists) {
                    res.json("GID1 already exist");
                } else {
                    let req_id = new coding1(req.body);
                    let code = await req_id.save();
                    res.redirect("/code1uid");
                }

            } catch (error) {
                res.json({ error });
            }


        } else if (Event === 'clash-o-coders') {
            try {
                const gid1Exists = await coding3.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }]
                });
                const gid2Exists = await coding3.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }]
                });
                if (gid1Exists && gid2Exists) {
                    res.json("Both GIDs already exist");
                } else if (gid2Exists) {
                    res.json("GID2 already exists");
                } else if (gid1Exists) {
                    res.json("GID1 already exist");
                } else {
                    let req_id = new coding3(req.body);
                    let code = await req_id.save();
                    res.redirect("/code3uid");
                }

            } catch (error) {
                res.json({ error });
            }
        } else if (Event === 'code-hasher') {
            try {
                const gid1Exists = await coding2.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }]
                });
                const gid2Exists = await coding2.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }]
                });
                if (gid1Exists && gid2Exists) {
                    res.json("Both GIDs already exist");
                } else if (gid2Exists) {
                    res.json("GID2 already exists");
                } else if (gid1Exists) {
                    res.json("GID1 already exist");
                } else {
                    let req_id = new coding2(req.body);
                    let code = await req_id.save();
                    res.redirect("/code2uid");
                }

            } catch (error) {
                res.json({ error });
            }

        } else if (Event === 'webapi') {

           
            try {
                const gid1Exists = await coding4.findOne({
                    $or: [{ gid1: req.body.gid1 }]
                });
                
                if (gid1Exists) {
                    res.json("GID1 already exist");
                } else {
                    let req_id = new coding4(req.body);
                    let code = await req_id.save();
                    res.redirect("/code4uid");
                }

            } catch (error) {
                res.json({ error });
            }


        } else if (Event === 'Setubandhan') {
            try {
                const gid1Exists = await civil1.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }, { gid3: req.body.gid1 }, { gid4: req.body.gid1 }, { gid5: req.body.gid1 }]
                });
                const gid2Exists = await civil1.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }, { gid3: req.body.gid2 }, { gid4: req.body.gid2 }, { gid5: req.body.gid2 }]
                });
                const gid3Exists = await civil1.findOne({
                    $or: [{ gid1: req.body.gid3 }, { gid2: req.body.gid3 }, { gid3: req.body.gid3 }, { gid4: req.body.gid3 }, { gid5: req.body.gid3 }]
                });
                const gid4Exists = await civil1.findOne({
                    $or: [{ gid1: req.body.gid4 }, { gid2: req.body.gid4 }, { gid3: req.body.gid4 }, { gid4: req.body.gid4 }, { gid5: req.body.gid4 }]
                });
                const gid5Exists = await civil1.findOne({
                    $or: [{ gid1: req.body.gid5 }, { gid2: req.body.gid5 }, { gid3: req.body.gid5 }, { gid4: req.body.gid5 }, { gid5: req.body.gid5 }]
                });
                if (gid1Exists && gid2Exists && gid3Exists && gid4Exists && gid5Exists) {
                    res.json("All GIDs already exist");
                } else {
                    let existingGIDs = [];
                    if (gid1Exists) existingGIDs.push(req.body.gid1);
                    if (gid2Exists) existingGIDs.push(req.body.gid2);
                    if (gid3Exists) existingGIDs.push(req.body.gid3);
                    if (gid4Exists) existingGIDs.push(req.body.gid4);
                    if (gid5Exists) existingGIDs.push(req.body.gid5);

                    if (existingGIDs.length > 0) {
                        res.json(`GIDs ${existingGIDs.join(', ')} already exist`);
                    } else {
                        let req_id = new civil1(req.body);
                        let code = await req_id.save();


                        res.redirect("/civil1uid");
                    }

                }
            } catch (error) {
                res.json(error)
            }


        }
        else if (Event === 'mega-arch') {
            try {
                const gid1Exists = await civil2.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }, { gid3: req.body.gid1 }, { gid4: req.body.gid1 }, { gid5: req.body.gid1 }]
                });
                const gid2Exists = await civil2.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }, { gid3: req.body.gid2 }, { gid4: req.body.gid2 }, { gid5: req.body.gid2 }]
                });
                const gid3Exists = await civil2.findOne({
                    $or: [{ gid1: req.body.gid3 }, { gid2: req.body.gid3 }, { gid3: req.body.gid3 }, { gid4: req.body.gid3 }, { gid5: req.body.gid3 }]
                });
                const gid4Exists = await civil2.findOne({
                    $or: [{ gid1: req.body.gid4 }, { gid2: req.body.gid4 }, { gid3: req.body.gid4 }, { gid4: req.body.gid4 }, { gid5: req.body.gid4 }]
                });
                const gid5Exists = await civil2.findOne({
                    $or: [{ gid1: req.body.gid5 }, { gid2: req.body.gid5 }, { gid3: req.body.gid5 }, { gid4: req.body.gid5 }, { gid5: req.body.gid5 }]
                });
                if (gid1Exists && gid2Exists && gid3Exists && gid4Exists && gid5Exists) {
                    res.json("All GIDs already exist");
                } else {
                    let existingGIDs = [];
                    if (gid1Exists) existingGIDs.push(req.body.gid1);
                    if (gid2Exists) existingGIDs.push(req.body.gid2);
                    if (gid3Exists) existingGIDs.push(req.body.gid3);
                    if (gid4Exists) existingGIDs.push(req.body.gid4);
                    if (gid5Exists) existingGIDs.push(req.body.gid5);

                    if (existingGIDs.length > 0) {
                        res.json(`GIDs ${existingGIDs.join(', ')} already exist`);
                    } else {
                        let req_id = new civil2(req.body);
                        let code = await req_id.save();


                        res.redirect("/civil2uid");
                    }

                }
            } catch (error) {
                res.json(error)
            }
        }else if(Event === 'roborace'){
            try {
                const gid1Exists = await roborace1.findOne({
                    $or: [{ gid1: req.body.gid1 }, { gid2: req.body.gid1 }, { gid3: req.body.gid1 }, { gid4: req.body.gid1 }]
                });
                const gid2Exists = await roborace1.findOne({
                    $or: [{ gid1: req.body.gid2 }, { gid2: req.body.gid2 }, { gid3: req.body.gid2 }, { gid4: req.body.gid2 }]
                });
                const gid3Exists = await roborace1.findOne({
                    $or: [{ gid1: req.body.gid3 }, { gid2: req.body.gid3 }, { gid3: req.body.gid3 }, { gid4: req.body.gid3 }]
                });
                const gid4Exists = await roborace1.findOne({
                    $or: [{ gid1: req.body.gid4 }, { gid2: req.body.gid4 }, { gid3: req.body.gid4 }, { gid4: req.body.gid4 }]
                });
                
                if (gid1Exists && gid2Exists && gid3Exists && gid4Exists) {
                    res.json("All GIDs already exist");
                } else {
                    let existingGIDs = [];
                    if (gid1Exists) existingGIDs.push(req.body.gid1);
                    if (gid2Exists) existingGIDs.push(req.body.gid2);
                    if (gid3Exists) existingGIDs.push(req.body.gid3);
                    if (gid4Exists) existingGIDs.push(req.body.gid4);
                    

                    if (existingGIDs.length > 0) {
                        res.json(`GIDs ${existingGIDs.join(', ')} already exist`);
                    } else {
                        let req_id = new roborace1(req.body);
                        let code = await req_id.save();


                        res.redirect("/roborace1uid");
                    }

                }
            } catch (error) {
                res.json(error)
            }
        }else {
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
