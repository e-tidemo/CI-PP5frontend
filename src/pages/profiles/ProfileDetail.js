import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/ProfilePage.module.css";
import { NavLink, useHistory } from 'react-router-dom';

const ProfileDetail = ({ username }) => {
    const [profile, setProfile] = useState(null);
    const history = useHistory();

    useEffect(() => {
        console.log("Username:", username);
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `/profiles/${username}`
                );
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [username]);

    const handleEditProfile = () => {
        // Redirect user to the edit profile page
        history.push(`/profile/${username}/edit`);
    };

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1>Profile Detail</h1>
            <div>
                <img src={profile.image} alt="Profile" />
                <NavLink to={`/profile/${username}/edit`} className={styles.NavLink}>
                    <i className="fas fa-edit" onClick={handleEditProfile}></i>
                </NavLink>
            </div>
            <p>Username: {profile.username}</p>
            <div>
                <h2>About Me</h2>
                <p>{profile.content}</p>
                <NavLink to={`/profile/${username}/edit`} className={styles.NavLink}>
                    <i className="fas fa-edit" onClick={handleEditProfile}></i>
                </NavLink>
            </div>
            <p>Followers: {profile.followed}</p>
            <p>Following: {profile.following}</p>
            <h2>Posts</h2>
            {profile.posts.map((post) => (
                <div key={post.id}>
                    <p>Title: {post.title}</p>
                    <p>Content: {post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileDetail;
