import Head from "next/head";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { magic } from "../lib/magic-client";

import styles from "../styles/Login.module.css";

const Login = () => {

  useEffect( () => {
    const handleComplete = () => {
      setIsLoading(false)
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router])

  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
    
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    
    if (email) {
      setUserMsg('');
      if (email === 'psychological_chemist@hotmail.com') {
        
        try {
          setIsLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({ 
            email: email /*could be only email since both are same*/,})
            console.log({ didToken });
            if (didToken) {
              router.push('/');
            }
          } catch(error) {
          console.error("there was an error", error)
          setIsLoading(false);
        }

      
      } else {
        setUserMsg('Failed to login')
        setIsLoading(false);
      }
    } else {
      setUserMsg('Enter a valid email address');
      setIsLoading(false);
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
          onClick={handleLoginWithEmail}>{isLoading? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  )
};

export default Login;