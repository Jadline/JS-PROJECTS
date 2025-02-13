import { createContext,useContext } from "react"
import { faker } from "@faker-js/faker";
import { useState,useEffect } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostContext = createContext()
function PostProvider({children}){
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
      );
      const [searchQuery, setSearchQuery] = useState("");
     
    
      // Derived state for filtering posts
      const searchedPosts =
        searchQuery.length > 0
          ? posts.filter((post) =>
              `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : posts;
    
      function handleAddPost(post) {
        setPosts((prevPosts) => [post, ...prevPosts]);
      }
    
      function handleClearPosts() {
        setPosts([]);
      }
      return(
        <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
        {children}
    </PostContext.Provider>
      )

}
function usePosts(){
    const context = useContext(PostContext)
    if(context === undefined) throw new Error('PostContext was used outside of the PostProvider')
    return context
}
export  {PostProvider,usePosts}