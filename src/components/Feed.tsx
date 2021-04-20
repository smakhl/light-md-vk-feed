import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Post } from "./Post";
import { getPosts } from "../vk";
import CircularProgress from "@material-ui/core/CircularProgress";

export function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      setPosts(posts as any);
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      {posts.length === 0 && <CircularProgress />}

      {posts.map((post: any) => (
        <Post post={post} key={post.post_id} />
      ))}
    </Container>
  );
}
