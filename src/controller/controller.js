const {PrismaClient, Prisma} = require('@prisma/client');
const {userValidatation} = require('./inputValidation');
const Joi = require('joi');
const winston = require('winston');

const prisma = new PrismaClient();


const getUser = async (req, res)=>{
    prisma.$connect()
        .then(async ()=>{
            const getUsers = await prisma.user.findMany({});
            if(getUsers){
                 res.status(200).send(getUsers);
            } else{
                 res.status(404).send("There is no user found...");
            }
            await prisma.$disconnect();
        }).catch(err=>{
            winston.log("error", ""+new Error(err));
        });

};

const getUserByEmail = async (req, res)=>{
    const email = req.params.email;
    if(email.length) {
        await prisma.$connect()
            .then(async ()=>{
                const user = await prisma.user.findMany({where: {email: email}});
                if(!user.length) res.status(404).send("There is no user with this email ...");
                res.status(200).send(user);
                await prisma.$disconnect();
            }).catch(err=>{
                winston.log("error", ""+new Error(err));
            });
    }
};

const addUser = async (req, res)=>{
    const {error} = userValidatation(req.body.user);
    if(error) {
         res.status(400).send("Invalid inputs...");
    }

    prisma.$connect()
        .then(async ()=>{
            const checkUser = await prisma.user.findMany({where : {email : req.body.user.email}});
            if(checkUser.length)  res.send("This user already exist...");

            const newUser =  await prisma.user.create({data: {
                name: req.body.user.name,
                email: req.body.user.email,
                posts: req.body.user.posts
            }});

            if(newUser)  res.status(200).send(newUser);

            await prisma.$disconnect();

        }).catch(err=>{
            winston.log("error", ""+new Error(err));
            console.log(""+new Error(err));
        });
};

const updateUser = async (req, res)=>{
    const email = req.params.email;
    //console.log(email);
    const getUser = await prisma.user.findUnique({where: {
        email: email
    },
    select: {
        email: true,
        name: true
    }});
    if(!getUser) res.status(404).send("There is no user with this email");
    const updatedUser = await prisma.user.update({
        where: {email: email},
         data: {
                name: req.body.name,
                posts: req.body.posts
            }
        });
    console.log(updatedUser);
    if(updatedUser) res.status(200).send({user: updatedUser});

};

const deleteUser = async (req, res)=>{
    const id = parseInt(req.params.id);
    if(!id) res.status(400).send("invalid id...");

    const findUser = await prisma.user.findUnique({where: {id}});
    if(!findUser) res.status(404).send("User not exist...");
    const deleteUser = await prisma.user.delete({where: {id}});
    if(!deleteUser) res.status(400).send("invalid requset...");
    res.status(200).send("successfuly deleted..");
};


module.exports = {
    addUser,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
};