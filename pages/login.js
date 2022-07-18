import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css";

const Login = () => {

  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('');

  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
    
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    if (email) {
      setUserMsg('');
      if (email === 'someEmail@lmao.com') {
        router.push('/')
      
      } else {
        setUserMsg('Failed to login')
      }
    } else {
      // show user message
      setUserMsg('Enter a valid email address');
    } 
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign In</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image 
                src='/static/netflix.svg' 
                alt='netflix logo' 
                width='128px'
                height='34px' 
              />
            </div>
          </a>
        </div>
      </header>      
      <main className={styles.main}>

        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input 
          className={styles.emailInput} 
          type='text' 
          placeholder='Email address' 
          onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>

          <button 
          className={styles.loginBtn} 
          onClick={handleLoginWithEmail}>Sign In
          </button>
        </div>
      </main>
    </div>
  )
};

export default Login;