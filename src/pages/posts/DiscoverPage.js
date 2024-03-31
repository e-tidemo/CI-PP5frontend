import React from "react";
import { Container } from "react-bootstrap";
import RandomPosts from "./RandomPosts";

const DiscoverPage = () => {
  return (
    <Container>
      <h1 className="text-center mt-5">Discover More</h1>
      <RandomPosts />
    </Container>
  );
};

export default DiscoverPage;
