import { auth } from "@/auth"
import StartFrom from "@/components/StartFrom"
import { redirect } from "next/navigation";

const page =  async() => {

    const session = await auth();
    if(!session) redirect('/');
  return (
    <>
    <section className="pink_container !min-h-[230px] ">
        <h1 className="heading">Submit Your Startup</h1>
    </section>
    <StartFrom />

    </>
  )
}

export default page
