const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = ( id , email ) => {
    return jwt.sign(
        { id , email } ,
         process.env.ACCESS_TOKEN_KEY ,
       {
         expiresIn: "7d"
       }
    )
}

const userRegister = async (req,res) => {
    try{
        const { name , email , password } = req.body;

    const user = await User.findOne( { email } );

    if(user) {
        return res.status(400).json({
            message:"user already existed"
        });
    }
    
    const data = await User.create({
        name,
        email,
        password
    });
    
    res.status(200).json({
        message:`${data.name} user account created successfully`,
        data
    })
    } catch(errors) {
        res.status(400).json({
            message: errors.message
        });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const isPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPassword) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const token = generateToken(
            user._id,
            user.email
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports={ userRegister , userLogin }
