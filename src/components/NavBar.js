import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import logo from "../assets/logo1.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from './Avatar';
import axios from 'axios'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    const addPostIcon = (
        <NavLink
            className={styles.NavLink}
            activeclassname={styles.Active}
            end to="/posts/create"
        >
            <i className='far fa-plus-square'></i>Add post
        </NavLink>
    )
    const loggedInIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeclassname="active"
                end to="/feed">
                <i className='fas fa-stream'></i>Feed
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeclassname="active"
                end to="/liked">
                <i className='fas fa-heart'></i>Liked
            </NavLink>
            <NavLink
                className={styles.NavLink}
                onClick={handleSignOut}
                to='/'>
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
            <NavLink
                className={styles.NavLink}
                end to={`/profiles/${currentUser?.profile_id}`}>
                <Avatar src={currentUser?.profile_image} text='Profile' height={40} />
            </NavLink>
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink
                className={styles.NavLink} activeclassname={styles.Active}
                end to="/signin">
                <i className="fas fa-sign-in-alt"></i> Sign in
            </NavLink>
            <NavLink
                className={styles.NavLink} activeclassname={styles.Active}
                end to="/signup">
                <i className="fas fa-user-plus"></i> Sign up
            </NavLink>
        </>
    );

    return (
        <Navbar
            expanded={expanded}
            className={styles.NavBar}
            expand="md"
            fixed="top"
        >
            <Container>
                <NavLink end to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="150" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            className={styles.NavLink} activeclassname={styles.Active}
                            end to="/"
                        >
                            <i className="fas fa-home"></i> Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar