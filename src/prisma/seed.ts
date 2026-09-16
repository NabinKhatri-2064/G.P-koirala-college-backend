import "dotenv/config"
import bcrypt from "bcrypt"
import {db ,connectDatabase } from "./db"
import { error } from "node:console"

async function addcredentials(){

    const admin_username = process.env.admin_username
    const plainpassword = process.env.admin_password

    if (!admin_username || !plainpassword)
    {
        throw new Error("Either admin username or admin password is missing")
    }

    await connectDatabase();

    const existingadmin = await db.orm.public.User.where({username : admin_username});

    if(!existingadmin)
    {
        throw new Error(`Admin with ${admin_username} already exists`)
    }

    const hashedpassword = await bcrypt.hash(plainpassword,10);


    const role: "ADMIN" | "USER" ="ADMIN"


    const data = {
        username: admin_username,
        password: hashedpassword,
        role,
    }

    await db.orm.public.User.create(data);

   


}

 addcredentials().then(()=>{

        process.exit(0);

    }).catch((error:unknown)=>{
        console.error(error);
        process.exit(1);
    })