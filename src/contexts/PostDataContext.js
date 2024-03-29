import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";

export const PostDataContext = createContext();
export const SetPostDataContext = createContext();

export const usePostData = () => useContext(PostDataContext);
export const useSetPostData = () => useContext(SetPostDataContext);

export const PostDataProvider = ({ children }) => {
    const [postData, setPostData] = useState({
        randomPosts: { results: [] },
    });

    useEffect(() => {
        const fetchRandomPosts = async () => {
            try {
                const { data } = await axiosReq.get("/posts/");
                const shuffledPosts = shuffleArray(data.results);
                setPostData({ randomPosts: { results: shuffledPosts } });
            } catch (error) {
                console.error("Error fetching random posts:", error);
            }
        };

        fetchRandomPosts();
    }, []);

    return (
        <PostDataContext.Provider value={postData}>
            <SetPostDataContext.Provider value={setPostData}>
                {children}
            </SetPostDataContext.Provider>
        </PostDataContext.Provider>
    );
};

// Helper function to shuffle array randomly
const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};
