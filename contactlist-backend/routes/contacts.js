const router = require('express').Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// get all contacts
router.get("/mycontacts", auth, async (req, res) => {
    try {
      const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "-password"
      );
  
      return res.status(200).json(myContacts);
    } catch (err) {
      console.log(err);
    }
  });

//create contact

router.post("/new",auth, async(req,res)=>{

    const newContact =  new Contact({

        name : req.body.name,
        email: req.body.email,
        number : req.body.number,
        postedBy: req.user._id,
    })
    try{
        const contact = await newContact.save();
        res.status(200).json(contact);
    }
    catch(err){
        console.log(err.message);
    }
})

//update contact

router.put("/edit/:id", auth, async(req,res) =>{

        const {id} = req.params;

        if(!id) return res.status(400).json("no id specified");

        try{
            const doc = await Contact.findOne({_id:id});

            if (req.user._id.toString() !== doc.postedBy._id.toString()){
      return res
        .status(401)
        .json({ error: "you can't edit other people contacts!" });
            };

            const updatedData = {...req.body,id:undefined};
            const result = await Contact.findByIdAndUpdate(id,updatedData,{new:true,
            });

return res.status(200).json(result);
    }
    catch(err){
        console.log(err.message);
    }
});

//delete a contact

router.delete("/delete/:id", auth, async(req,res) =>{

    const {id} = req.params;

    if(!id) return res.status(400).json("no id specified");

    try{
        const doc = await Contact.findOne({_id:id});

        if (req.user._id.toString() !== doc.postedBy._id.toString()){
  return res
    .status(401)
    .json({ error: "you can't delete other people contacts!" });
        };

        const result = await Contact.deleteOne({ _id: id });

return res.status(200).json("deleted");
}
catch(err){
    console.log(err.message);
}
});

module.exports = router;