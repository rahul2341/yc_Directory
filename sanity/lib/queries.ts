import { defineQuery } from "next-sanity"

export const Startup_Query = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
    _id ,
    title,
      slug ,
      category ,
      _createdAt,
      author -> {
        name , bio , _id , image , username
      },
      image,
      views,
      description
  }`)

export const Startup_BY_ID = defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id ,
    title,
      slug ,
      category ,
      author -> {
        name , bio , username , image , _id
      },
      pitch,
      _createdAt,
      image,
      description
  }`)

export const Startup_BY_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id , views}`)

export  const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == "author" && id == $id][0]{
  _id ,
  id ,
  name ,
  username ,
  email ,
  image,
  bio
  }`)

  
export  const AUTHOR_BY_ID= defineQuery(`*[_type == "author" && _id == $id][0]{
  _id ,
  id ,
  name ,
  username ,
  email ,
  image,
  bio
  }`)


  export const Startups_By_User = defineQuery(`*[_type == "startup" && author._ref == $id ]  | order(_createdAt desc){
    _id ,
    title,
      slug ,
      category ,
      _createdAt,
      author -> {
        name , bio , _id , image , username
      },
      image,
      views,
      description
  }`)