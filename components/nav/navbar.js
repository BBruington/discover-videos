import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./navbar.module.css"

const NavBar = (props) => {

  const {username} = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');

  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>
            Netflix
          </div>
        </Link>      
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernamBtn}>
              <p className={styles.username}>{username}</p>
              {/* Expand more icon */}
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link href='/login'>
                  <a className={styles.linkName}>
                    Sign Out
                  </a>
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
};

export default NavBar;