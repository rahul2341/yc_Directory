import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { Startup_Query } from "@/sanity/lib/queries";

export default async  function Home({searchParams} : {searchParams : Promise<{query?:string}>}) {
   const query = (await searchParams).query;
   const params = {search:query || null};
   const session =  await auth();
  //  console.log(session?.id)
   const {data : posts} = await sanityFetch({query:Startup_Query, params})
  //  console.log(JSON.stringify(posts , null , 2))
  return (
   <>
   <section className=" pink_container pattern ">
   <h1 className="heading">Pitch Yiur Startup ,<br/> Connect With Entrepreneurs</h1>
   <p className="sub-heading !max-w-3xl">
    Sunmit Ideas , Vote on Pitches , and Get Noticed in Virtual Competition.
   </p>
   <SearchForm query={query} />
   </section>
   <section className="section_container">
    <p className="text-30-semibold">
      {query ? `Search result for ${query}` : 'All Startups'}
    </p>

    <ul className="mt-7 card_grid">
        {posts?.length > 0  ?(
          posts.map((post : StartupTypeCard , index : number)=>(
            <StartupCard key={index} post={post} />
          ))
        ):(
          <p className="no-results">No StartUp Found</p>
        )}
    </ul>

   </section>
   <SanityLive/>
   </>
  );
}
