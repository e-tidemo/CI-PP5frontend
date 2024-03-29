import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { usePostData } from "../../contexts/PostDataContext"; // Import from PostDataContext
import Post from "../posts/Post";
import { shuffleArray } from "../../utils/utils";

const RandomPosts = ({ mobile }) => {
  const { randomPosts } = usePostData(); // Access randomPosts from the context

  // Function to shuffle array randomly
  const shufflePosts = () => {
    return shuffleArray(randomPosts?.results || []); // Access results from randomPosts
  };

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {(randomPosts?.results?.length || 0) > 0 ? ( // Access results from randomPosts
        <>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {shufflePosts().slice(0, 4).map((post) => (
                <Post key={post.id} {...post} mobile />
              ))}
            </div>
          ) : (
            shufflePosts().map((post) => (
              <Post key={post.id} {...post} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default RandomPosts;
