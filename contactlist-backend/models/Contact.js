const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({


    name:{
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    email:{
        type: String,
        min:3,
        max:40,
    },
    number:{
        type: Number,
        require: true,
        max:1000000000
    },
    postedBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    }

}
)

module.exports = new mongoose.model("Contact",contactSchema);