import { client } from '@/sanity/lib/client'
import { Startups_By_User } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'

const UsersStartups = async ({id} : {id:string}) => {
    const startups =await client.fetch(Startups_By_User , {id})
  return (
    <>
    {startups.length > 0 ? startups.map((startup : StartupTypeCard)=>(
      <StartupCard key={startup._id} post={startup} />  
    )):(
        <p className='no-result'>No Post yet</p>
    )}
      
    </>
  )
}

export default UsersStartups
