import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavStyle = styled.div`
.nav{
    position: fixed;
    top: 0;
    width:100%;
    padding: 20px;
    height:30px;
    z-index:1;
    /* Animation */
    transition-timing-function:ease-in;
    transition:all 0.5s;
}
.nav_black{
    background-color: black;
}

.nav_logo{
    width: 120px;
    object-fit:contain;
}
.nav_avatar{
    position:fixed;
    right: 10px;
    width: 30px;
    object-fit:contain;
}
`
function Navbar(props) {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", null);
        };
    }, []);
    return (
        <NavStyle>
            <div className={`nav ${show && "nav_black"}`}>
                <img
                    className="nav_logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                    alt="Netflix Logo"
                />
                <img
                    className="nav_avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Profile Pic"
                />
            </div>
        </NavStyle>
    );
}

export default Navbar;