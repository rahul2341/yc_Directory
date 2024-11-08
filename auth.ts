
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { write_client } from "./sanity/lib/write_client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks :{
    async signIn({user , profile}){
      const { email, name, image } = user;
      const { id, login, bio } = profile as { id: string; login: string; bio?: string };
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY , {id});

      if(!existingUser){
        await write_client.create({
          _type : 'author',
          id,
          name,
          username : login ,
          email,
          image,
          bio
        });
      }

      if(existingUser){
        return true;
      }
    },
    async jwt({token , account , profile}){

      if(account && profile){
        const user = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY , {id : profile?.id})

        token.id = user._id ;
      }

      return token

    },
    async session({session , token}){
      Object.assign(session , {id : token.id});
      return session ;
    }
  }
})