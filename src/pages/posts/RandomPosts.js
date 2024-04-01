import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/RandomPosts.module.css";
import Asset from "../../components/Asset";
import { usePostData } from "../../contexts/PostDataContext";
import { Link } from "react-router-dom";
import { shuffleArray } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

const RandomPosts = ({ mobile, numPosts }) => {
  const { randomPosts, fetchRandomPosts } = usePostData();

  const shufflePosts = () => {
    return shuffleArray(randomPosts?.results || []);
  };

  return (
    <Container className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}>
      {(randomPosts?.results?.length || 0) > 0 ? (
        <InfiniteScroll
          dataLength={randomPosts.results.length}
          next={fetchRandomPosts}
          hasMore={randomPosts.next !== null}
          endMessage={<p className="text-muted">No more posts to show!</p>}
          scrollThreshold={0.9}
        >
          <Row style={{ overflowX: "hidden" }}>
            {shufflePosts().slice(0, numPosts).map((post) => (
              <Col key={post.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                <Link to={`/posts/${post.id}`}>
                  <img
                    src={post.image}
                    alt="Post"
                    className={`img-fluid ${!mobile ? styles["random-post-desktop-image"] : ""}`}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      ) : (
        <Asset spinner={false} /> // No spinner
      )}
    </Container>
  );
};

RandomPosts.defaultProps = {
  numPosts: 6
};

export default RandomPosts;
