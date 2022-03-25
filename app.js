const express = require( 'express');
const bodyParser = require('body-parser');
const https = require('https');

const  app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {

   res.sendFile(__dirname +"/signup.html");

});

app.post("/",function (req,res) {
  const fname= req.body.Firstname;
  const lname= req.body.Lastname;
  const email= req.body.email;

  var data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  const jsonData= JSON.stringify(data);

  const url="https://us14.api.mailchimp.com/3.0/lists/062217c44e";
  const options={
    method:"POST",
    auth:"Raj_Mehra:0ca60276d40b2ff256a1291c96f0fc61-us14"
  };
  const request=https.request(url,options,function (resp) {
   if(resp.statusCode===200){
     res.sendFile(__dirname+"/success.html");
   }
   else {
     res.sendFile(__dirname+"/failuer.html");
   }


    resp.on("data",function (data) {
      console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);

  request.end();
});

app.post("/failuer",function (req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function () {
  console.log("app running");

})


//0ca60276d40b2ff256a1291c96f0fc61-us14
//062217c44e
