"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from 'zod'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartFrom = () => {
    const [pitch, setPitch] = useState("");
    const [ errors , setErrors] = useState<Record<string,string>>({});
    const {toast} = useToast();
    const router = useRouter();
    const handleSubmit = async (prev : any , formdata : FormData)=>{

        try {
            const formValue = {
                title : formdata.get("title") as string,
                description: formdata.get("description") as string,
                category : formdata.get("category") as string,
                link : formdata.get("link") as string,
                pitch 
            }
            await formSchema.parseAsync(formValue);
            const result = await createPitch(prev , formdata , pitch);
            console.log(result)
            if(result.status == 'SUCCESS'){
                toast({
                    title : "Success" ,
                    description : "Your Startup have been created" ,
                });

            }

            router.push(`/startup/${result._id}`)

        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldError = error.flatten().fieldErrors; 
                setErrors(fieldError as unknown as Record<string , string>) ;
                toast({
                    title : "Error",
                    description: 'Please check inputs and try again',
                    variant :'destructive'
                })

                return { ...prev , error : "Validation Error" , status : "ERROR"}
            }
            toast({
                title : "Error",
                description: 'Unexplected errro',
                variant :'destructive'
            })
            return {
                ...prev , error : 'An Unexpectded error occured while submitting' , status : "ERROR"
            }
            
        }

    }
    const [state , formAction , isPending ] = useActionState(handleSubmit , {error : "" , status : "INITIAL"});
  return (

    <form action={formAction} className="startup-form">
      <div className="">
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div className="">
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup Description" />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>
      <div className="">
        <label htmlFor="category" className="startup-form_label">Categories</label>
        <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category (Tech , Education , Health...)" />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>
      <div className="">
        <label htmlFor="link" className="startup-form_label">Image URL</label>
        <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL"  />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light" className="">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
       <MDEditor id="pitch" preview="edit" height={300} style={{borderRadius : 20 , overflow :"hidden"}} textareaProps={{placeholder : "Briefly describe your ideas and what problem it solve "}} previewOptions={{disallowedElements : ["style"]}} value={pitch} onChange={(value)=>setPitch(value as string)}  />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <button type="submit" className="startup-form_btn text-white" disabled={isPending}>{isPending ? 'Submitting...' : 'Submit your pitch'}<Send className="size-4 ml-2 inline-flex"/></button>
    </form>
  )
}

export default StartFrom
