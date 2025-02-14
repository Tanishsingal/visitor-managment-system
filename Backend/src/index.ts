import { db } from "./db";


async function ab(){
    let a=await db.employee.create({
        data:{
            fullName:"Tanish",
            email:"tanishsingal245@gmail.com",
            department:"Host",
        },
        select:{
            id:true
        }
    });
    console.log(a);
}
ab();