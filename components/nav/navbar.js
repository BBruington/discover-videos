import Link from "next/link";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { magic } from "../../lib/magic-client";

import styles from "./navbar.module.css";

const NavBar = () => {
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [didToken, setDidToken] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    const applyUsernameInNav = async () => {
      try {
        const { email, issuer } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (email) {
          setUsername(email);
          setDidToken(didToken);
        }
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    };
    applyUsernameInNav();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/'>
          <a>
            <div className={styles.logoWrapper}>
              <Image 
                    src='/static/netflix.svg' 
                    alt='netflix logo' 
                    width='128px'
                    height='34px' />
            </div>
          </a>
        </Link>      
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button 
            className={styles.usernameBtn}
            onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>                
                <Image 
                src='/static/expand_more.svg' 
                alt='expand dropdown' 
                width='24px' 
                height='24px' />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignout} className={styles.linkName}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
};

export default NavBar;