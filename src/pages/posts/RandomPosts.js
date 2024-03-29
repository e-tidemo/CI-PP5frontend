import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Post from "../posts/Post"; // Assuming you have a Post component
import { shuffleArray } from "../../utils/utils"; // Helper function to shuffle array

const RandomPosts = ({ mobile }) => {
  const { popularPosts } = useProfileData(); // Assuming you have a context for posts

  // Function to shuffle array randomly
  const shufflePosts = () => {
    return shuffleArray(popularPosts.results);
  };

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularPosts.results.length ? (
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
