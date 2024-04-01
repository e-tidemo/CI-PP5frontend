import React, { useState } from "react";
import { Container } from "react-bootstrap";
import RandomPosts from "./RandomPosts";

const DiscoverPage = () => {
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const loadMorePosts = () => {
    setHasMorePosts(false);
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Discover More Crafts</h1>
      <RandomPosts loadMore={loadMorePosts} hasMorePosts={hasMorePosts} />
    </Container>
  );
};

export default DiscoverPage;
