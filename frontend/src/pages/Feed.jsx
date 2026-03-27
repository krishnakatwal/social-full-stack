import { useEffect, useState } from "react";
import { postClient } from "../clients/api";
import Post from "../components/Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        // get our posts from db
        const { data } = await postClient.get("/");
        console.log(data)

        // save that in component's state
        setPosts(data);
        //making changes here 
        // setPosts(data.posts);

      } catch (error) {
        console.log(error.response.data);
      }
    }
    getData();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

       const {data}  = await postClient.post('/',{title,body})
        console.log(data)

       
            // add the new post to our state
            setPosts([data, ...posts])

        setTitle('')
        setBody('')
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
          <h2>Leave a post here:</h2>
      <form  onSubmit={handleSubmit}>
      
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="body">Body:</label>
        <textarea
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>

    {/* key should be there in map and filter functions at the top level element*/}
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}
export default Feed;
