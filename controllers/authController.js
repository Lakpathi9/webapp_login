const User1 = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
 
const registerUser = async (req, res) => {
   const { user, email, password } = req.body
   const userExist = await User.findOne({email})

    if(userExist){
        return res.status(200).send({success:false, msg: "User already exist "})
    }else{
        try {   //password Hashing 
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newEntry = await User.create({
                user: user,
                email: email,
                password: hashedPassword

            })
            //const newEntry = new User(req.body)
            //newEntry.save()
            console.log(newEntry)

            return res.status(200).send({success:true, msg : "Registered successfully"})

        } catch (error) {
            return res.status(400).send({success:false, msg: "error"})
        }
    }
}

const loginUser =async (req, res) =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            if(user && (await bcrypt.compare(password, user.password))){
                //jwt token secret data
                const tokenData ={
                    _id: user._id,
                    user: user.user,
                    email: user.email
                }
                const token = jwt.sign(tokenData, "Secretkey123", {expiresIn:'30d'})
                return res.status(200).send({success:true, msg:"login success", token: token})
            }else{
                return res.send({success:false, msg:"Invalild credentials"})
            }
            
        }
    } catch (error) {
            return res.send({success:false, msg:"Invalild credentials"})
    }

}
module.exports ={ 
    registerUser,
    loginUser
    
}
