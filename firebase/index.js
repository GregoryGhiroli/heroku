const PORT = process.env.PORT || 3000

const apiKey = "t1nylRVhQVOczMootgsJBXa4aH9af0sl6ASNygru";// firebase database secret

var admin = require("firebase-admin");

var express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


var admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\gpg95\\firebase\\serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://photon-58df2.firebaseio.com"
});


var db = admin.database();

app.get("/",function(req,res){


res.send("hello");

});

app.post("/photondata/data.json", function(req,res){

    //just the apikey , you could modify the webhook header ,etc to use idfferent auth

    if(req.query.auth === apiKey){

            console.log(req);
            db.ref('photondata/data').push(req.body);
            res.status(200).send("data posted");


    }//end of if
    else{

        res.set('Allow', 'POST');
        res.status(405).send("Method not allowed");



    }//end of else

});



app.listen(PORT,() => {

    console.log('Server listening on: http://localhost%s', PORT);



});



