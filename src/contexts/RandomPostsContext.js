import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        // We will use the pageProfile later
        pageProfile: { results: [] },
        randomPosts: { results: [] }, // Change popularProfiles to randomPosts
    });

    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/posts/" // Change endpoint to fetch posts
                );
                const shuffledPosts = data.results.sort(() => Math.random() - 0.5);
                setProfileData((prevState) => ({
                    ...prevState,
                    randomPosts: { results: shuffledPosts }, // Update state with shuffled posts
                }));
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [currentUser]);
    
    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
