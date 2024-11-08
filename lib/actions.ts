"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { write_client } from "@/sanity/lib/write_client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPitch = async (state : any , form : FormData , pitch : string)=>{

    const session = await auth();

    if(!session) return parseServerActionResponse({error : "Not Singned In" , status : "ERRROR"}) ;

    const {title , description , category , link} = Object.fromEntries(Array.from(form).filter(([key])=> key !== 'pitch'));

    const slug = slugify(title as string  , {lower : true , strict : true});

    try {

        const startup = {
            title ,
            description ,
            image : link ,
            category,
            slug : {
                _type : slug,
                current : slug 
            },
            author : {
                _type : 'reference',
                _ref : session?.id
            },
            pitch
        }

        const result = await write_client.create({_type : 'startup' , ...startup})

        return parseServerActionResponse({...result,error : '' , status : "SUCCESS"});
        
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({error : JSON.stringify(error) , status : "ERROR"});

    }
}