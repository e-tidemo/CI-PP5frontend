import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";

import { axiosReq } from "../../api/axiosDefault";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css"
import { useLocation } from "react-router";
import NoResults from "../../assets/no-results.png";
import Post from "./Post";

function DiscoverPage() {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [query, pathname]);

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="text"
                    className="mr-sm.2"
                    placeholder="Search posts" />
            </Form>
            {hasLoaded ? (
                <InfiniteScroll
                    dataLength={posts.results.length}
                    next={() => { }}
                    hasMore={!!posts.next}
                    loader={<div>Loading...</div>}
                >
                    {posts.results.length ? (
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                            {posts.results.map((post) => (
                                <Col key={post.id}>
                                    <Post {...post} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset src={NoResults} message={'No results found'} />
                        </Container>
                    )}
                </InfiniteScroll>
            ) : (
                <div>Loading...</div>
            )}
        </Container>
    );
}

export default DiscoverPage;
