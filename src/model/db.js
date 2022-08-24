const { PrismaClient, Prisma } = require('@prisma/client');
const winston = require('winston');

const prisma = new PrismaClient();

const main = async ()=>{
  prisma.$connect().then(async()=>{
    let includePosts = false;
    let user = Prisma.UserCreateInput;
    if (includePosts) {
        user = {
          email: 'ali@prisma.io',
          name: 'ali Prisma',
          posts: {
            create: {
              title: 'Include this post!'
            }
          }
        }
    }else{
      user = {
        email: 'ali@prisma.io',
        name: 'Amir Prisma'
      }
    }
    const checkUser = await prisma.user.findMany({where: { email : user.email}});
    if(checkUser.length) return console.log("This User is already exist!!", checkUser);
    const createUSer = await prisma.user.create({data: user});
    if(createUSer) console.log("The user has successfuly registered..", createUSer);

    await prisma.$disconnect();

  }).catch(err=>{
    winston.log("error", ""+new Error(err));
  });
}
// const main = async ()=>{
//     await prisma.user.create({
//         data: {
//             name: 'Alice',
//             email: 'alice@prisma.io',
//             posts: {
//               create: { title: 'Hello World' },
//             },
//             profile: {
//               create: { bio: 'I like turtles' },
//             }
//         }
//     });

//     const allUsers = await prisma.user.findMany({
//         include: {
//           posts: true,
//           profile: true,
//         }
//     });
//     console.log(allUsers, { depth: null });
// }

// async function main() {
//   const post = await prisma.post.update({
//     where: { id: 1 },
//     data: { published: true },
//   })
//   console.log(post)
// }

module.exports = {
  main
  };
