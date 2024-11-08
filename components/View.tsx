import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { Startup_BY_VIEWS_QUERY } from '@/sanity/lib/queries';
import { formatviews } from '@/lib/utils';
import { write_client } from '@/sanity/lib/write_client';
import { unstable_after as after } from 'next/server';
import { log } from 'console';

const View = async ({id}:{id:string}) => {
    const {views : totalviews } = await client.withConfig({useCdn : false}).fetch(Startup_BY_VIEWS_QUERY , {id});

   after(async ()=>{
    await write_client
    .patch(id)
    .set({views : totalviews + 1})
    .commit();
    log();
   })

  return (
    <div className='view-container'>
        <div className="absolute -top-2 -right-2">
              <Ping />
        </div>

        <p className='view-text'>
            <span className='font-black'>
                {formatviews(totalviews)}
            </span>

        </p>
      
    </div>
  )
}

export default View
