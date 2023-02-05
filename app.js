const mongodb = require("mongodb");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/hackDB",(err)=>{
    if(err) console.log(err);
});
mongoose.set('strictQuery', true);

const businessSchema = new mongoose.Schema({
    B_Name: String,
    Address: String,
    Type_B: String,
    GST_No: String,
    Contact: Number,
    Email_Id: String,
    B_website: String,
    Password: String
});

const loginSchema = new mongoose.Schema({
    email: String,
    password: String
});

const docSchema = new mongoose.Schema({
    D_name: String
});

const authorizeSchema = new mongoose.Schema({
    LoginNo: String,
    Password: String
});

const Login = mongoose.model("Login", loginSchema);
const Doc = mongoose.model("Doc", docSchema);
const Authorize = mongoose.model("Authorize", authorizeSchema);
const Business = mongoose.model("Business", businessSchema);


const login = new Login({
    email: "123@gmail.com",
    password: "123"
});

const authorize = new Authorize({
    email: "123@gmail.com",
    password: "123"
});

const doc = new Doc({
    D_name: "aadhar"
});

authorize.save();
login.save();
doc.save();


app.post("/customersignup", function (req, res) {
    var BName = req.body.b_name;
    var Address = req.body.b_add;
    var GSTNo = req.body.gst;
    var Contact = req.body.b_phone;
    var Size = req.body.size;
    var EmailId = req.body.b_mail;
    var Bwebsite = req.body.link;
    var Password = req.body.pws;
    const business = new Business({
        B_Name: BName,
        Address: Address,
        GST_No: GSTNo,
        Contact: Contact,
        size: Size,
        Email_Id: EmailId,
        B_website: Bwebsite,
        Password: Password
    });
    business.save();
    res.sendFile(__dirname + "/homeUser.html");
    // app.set("/CompApp", function (req, res) {
    //     hackDB.findMany({
    //         Email_Id: EmailId
    //     }, function (err, result) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(result);
    //         }
    //     })
    // });
});

app.post("/", function (req, res) {
    Login.find(function (err, login) {
        if (err) {
            console.log(err);
        } else {
            login.forEach(function (login) {
                var email = req.body.email;
                var password = req.body.password;
                if (email === login.email) {
                    if (password === login.password) {
                        res.send("Logged in Successful!");
                    } else {
                        res.send("Oops! Incorrect Password");
                    }
                } else {
                    res.send("You should signup first.");
                }
            })
        }
    });


});

app.post("/upload", function(req,res){
    async function storePdf() {
        const client = await mongodb.MongoClient.connect("mongodb://0.0.0.0:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        //   var date = new Date();
        //   var month = date.getMonth() + 1;
        //   month = (month < 10 ? '0' : '') + month;
        //   var day = date.getDate();
        //   day = (day < 10 ? '0' : '') + day;
        //   var filename = date.getFullYear() + '-' + month + '-' + day + '.js';
        var filename = "Documents";
    
        const db = client.db("pdf");
    
        const data = fs.readFileSync("file.pdf");
    
        async function insertPDF(fileName, data) {
            try {
                await db.collection('files').insertOne({ fileName, data: new Buffer.from(data).toString('binary') });
                console.log('PDF file inserted successfully');
            } catch (err) {
                console.error(err);
            }
        }
        insertPDF("file.pdf", data);
        
        function fetchPDF() {
            try {
                const result = db
                    .collection("files")
                    .findOne({ fileName: "file.pdf" });
                fs.writeFileSync(
                    "./store/" + `${filename}`,
                    new Buffer.from(result.data, "binary")
                );
                console.log("PDF file fetched successfully");
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchPDF();
    
    };
    
    storePdf();
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/homeuser", function (req, res) {
    res.sendFile(__dirname + "/homeUser.html");
});

app.get("/customersignup", function (req, res) {
    res.sendFile(__dirname + "/customerSignup.html");
});

app.get("/tracking", function (req, res) {
    res.sendFile(__dirname + "/tracking.html");
});

app.get("/upload", function (req, res) {
    res.sendFile(__dirname + "/upload.html");
});

app.get("/ahome", function (req, res) {
    res.sendFile(__dirname + "/AHome.html");
});

app.get("/loginpage", function (req, res) {
    res.sendFile(__dirname + "/loginPage.html");
});

app.get("/compapp", function (req, res) {
    res.sendFile(__dirname + "/CompApp.html");
    
    const Model = mongoose.model("Model", businessSchema);
    var EmailId = req.body.b_mail;

    Model.find({}, function(err, businesses){
for (const business of businesses){
    console.log(user.B_Name);
}
    });
    // Model.findOne({
    //     Email_Id: "123@gmail.com"
    // }, function(err,user){
    //     console.log(user);
    // });
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});