import React, { useState } from 'react';

// Styles
import "./Header.scss";

// useHeaderColor Hook
import useHeaderColor from "../../hooks/useHeaderColor";

// getMenuStyles
import { getMenuStyles } from "../../utils/common";

// OutsideClickHandler
import OutsideClickHandler from "react-outside-click-handler";

// BiMenuAltRight
import { BiMenuAltRight } from "react-icons/bi";

// Link Router
import { Link, NavLink } from "react-router-dom";

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

// Components
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import Modal from '../Modal/Modal';

// Mantine Provider 
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'

// useAuthCheck
import useAuthCheck from '../../hooks/useAuthCheck'


const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const headerColor = useHeaderColor();

    // Add Property Modal State
    const [modalOpened, setModalOpened] = useState(false);

    // Source Code Modal State
    const [MSOpened, setMSOpened] = useState(false)

    // Auth0
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();


    // validateLogin
    const { validateLogin } = useAuthCheck();

    // handleAddPropertyClick
    const handleAddPropertyClick = () => {
        if (validateLogin()) {
            setModalOpened(true)
        }
    }



    return (
        <section className='h-wrapper' style={{ background: headerColor }}>

            <div className='flexCenter innerWidth paddings h-container'>
                {/* logo */}
                <Link to='/'>
                    <img src="./logo.png" alt="logo" width={100} />
                </Link>

                {/* menu */}
                <OutsideClickHandler onOutsideClick={() => {
                    setMenuOpened(false);
                }}>
                    <div
                        // ref={menuRef}
                        className='flexCenter h-menu'
                        style={getMenuStyles(menuOpened)}
                    >
                        <div>
                            <div style={{ cursor: "pointer" }} onClick={() => setMSOpened(true)}>Get Source Code</div>
                            <Modal
                                open={MSOpened}
                                onClose={() => setMSOpened(false)}
                            >
                            </Modal>
                        </div>

                        <NavLink to='/properties'>Properties</NavLink>

                        <a href="mailto:a.afarinifard10@gmail.com">Contact</a>

                        {/* add property */}
                        <div style={{ cursor: "pointer" }} onClick={handleAddPropertyClick}>Add Property</div>
                        <MantineProvider>
                            <AddPropertyModal
                                opened={modalOpened}
                                setOpened={setModalOpened}
                            />
                        </MantineProvider>

                        {/* login button */}
                        {!isAuthenticated ? (
                            <button className="button" onClick={loginWithRedirect}>
                                Login
                            </button>
                        ) : (
                            <MantineProvider>
                                <ProfileMenu user={user} logout={logout} />
                            </MantineProvider>
                        )}

                    </div>
                </OutsideClickHandler>

                {/* for medium and small screens */}
                <div
                    className="menu-icon"
                    onClick={() => setMenuOpened((prev) => !prev)}
                >
                    <BiMenuAltRight size={30} />
                </div>
            </div >

        </section >
    );
};

export default Header;