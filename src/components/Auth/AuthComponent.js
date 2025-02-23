import React, { useState, useEffect } from 'react'
import { signIn, signUp, signOut, getCurrentUser, onAuthStateChange } from '../../utils/auth'

const AuthComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for current user on component mount
    getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    // Subscribe to auth changes
    const { data: authListener } = onAuthStateChange((user) => {
      setUser(user)
    })

    return () => {
      // Cleanup subscription
      authListener?.unsubscribe()
    }
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const { user } = await signIn(email, password)
      setUser(user)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Error signing in:', error.message)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const { user } = await signUp(email, password)
      setUser(user)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Error signing up:', error.message)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      )}
    </div>
  )
}

export default AuthComponent
