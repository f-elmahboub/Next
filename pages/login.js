"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from '../app/page.module.css';
import { FaGoogle } from 'react-icons/fa';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/ImageList');
    } else {
      const data = await res.json();
      setMessage(data.message);
    }
  };
  const handleSignInGoogle = () => {
   // logique SignInGoogle
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
        <h1 className={styles.welcomeBack}>Welcome back</h1>
        <h5 className={styles.enterDetails}>Welcome back! Please enter your details</h5><br></br>
          <label htmlFor="username" className={styles.label}>Email:</label>
          <input
            id="username"
            type="text"
            className={styles.inputField}
            value={username}
            placeholder='Enter your email'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            className={styles.inputField}
            value={password}
            placeholder="••••••••" 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <input 
          type="checkbox" 
          id="rememberMe" 
          name="rememberMe" 
          value="30days" 
          className={styles.checkbox} />
          <label htmlFor="rememberMe" className={styles.rememberLabel}>Remember me for 30 days</label>
          <a href="#" className={styles.forgotPassword}>Forgot password?</a>
        </div>
        <div className={styles.inputContainer}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        </div>
        <div className={styles.inputContainer}>
          <button type="button" className={styles.googleBtn} onClick={handleSignInGoogle}><FaGoogle className={styles.googleIcon} /> Sign in with Google</button>
        </div>
        <div className={styles.signupContainer}>
          <label htmlFor="signup" className={styles.signupLabel}>Don't have an account?</label>
          <a href="/signup" className={styles.signUp}>Sign up for free!</a>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </form>
      <div className={styles.imageContainer}></div>
    </div>
  );
}


