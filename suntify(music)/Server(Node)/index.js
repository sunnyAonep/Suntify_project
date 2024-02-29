const {app} = require("./app")
const mongoose = require("mongoose");
const { config } = require("./config");


mongoose.connect(config.MONGO_URL)
.then(()=>{
    console.log("connect to db");
}).catch(err=>{
    console.log(err);
})

const PORT = process.env.PORT || 1500

app.listen(PORT , ()=>{
    console.log(`the server is running on port ${PORT}`);
})
