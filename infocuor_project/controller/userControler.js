import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req,res){

   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//comments
    const user=new User({
        fullName:req.body.fullName,
        faculty:req.body.faculty,
        userType:req.body.userType,
        password:hashedPassword,
        registrationNumber:req.body.registrationNumber,
        email:req.body.email,
        mobileNumber:req.body.mobileNumber
    })


user.save().then(
        ()=>{
            res.json({
                message:"user created successfully"
            })
        }
    ).catch(()=>{
        res.json({
            message:"failed to create user"
        })
    })

}

export function loginUser(req,res){

    const registrationNumber=req.body.registrationNumber;
    const password=req.body.password

    User.findOne({registrationNumber:registrationNumber}).then(
        (user)=>{
            if(user==null){
                res.status(404).json({
                    message:"user not found"
                })
            }else{
                const isPasswordCorrect=bcrypt.compareSync(password,user.password)

                if(isPasswordCorrect){

                    const token=jwt.sign({
                        email:user.email,
                        fullName:user.fullName,
                        faculty:user.faculty,
                        registrationNumber:user.registrationNumber,
                        mobileNumber:user.mobileNumber
    
                    },
                    "infocuor-2026#-website"
                );
                    
                    res.json({
                        message:"login successful",
                       // token:token
                     
                    });
                    
                }
                else{
                res.status(404).json({
                    message:"Invalid password"
                })
            }        
                }
            }
        ).catch(err=>{
            res.status(500).json({
                 message:"server error"
                });
        });
        }