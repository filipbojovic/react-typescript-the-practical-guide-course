import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./components/util/http";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // without useEffect, the request will be being sent in the inf loop
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const fetchedData = (await get(
          "https://jsonplaceholder.typicode.com/postsssssssssdfsfs"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = fetchedData.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });

        setFetchedPosts(blogPosts);
      } catch (error) {
        // setError((error as Error).message);
        if (error instanceof Error) {
          setError(error.message);
        }
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error} />;
  } else if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  } else if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Img" />
      {content}
    </main>
  );
}

export default App;
