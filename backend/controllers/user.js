import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user.js";

export const login = async(req, res)=>{
  
  const email = req.body.email;
  try {
    const oldUser = await User.findOne({email});

    if(!oldUser){
      return res.status(404).json({message: "user does not exist"});
    }
      
    else {
      let matched = await bcrypt.compare( req.body.password, oldUser.password);
      if (matched) {
        const token = jwt.sign({userId: oldUser._id}, process.env.SECRET, {expiresIn: "1h"});
        res.status(200).json({email: req.body.email, token});
      } else {
        res.status(404).send("No such User exist");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to read data." });
  }
}

export const signup = async(req, res)=>{
  const email = req.body.email
  try {
    const oldUser = await User.findOne({email});

    if(oldUser){
      return res.status(404).json({message: "user already exist"});
    }
    
    else {

      const hashedPassword  = await bcrypt.hash(req.body.password, 12);
      const result = await User.create({
        email: req.body.email, 
        password: hashedPassword, 
      });

      const token = jwt.sign({userId : result._id}, process.env.SECRET, {expiresIn: "1h"});


      res.status(200).send({ email: req.body.email, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}