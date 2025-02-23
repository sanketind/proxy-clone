import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const SupabaseTest = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Supabase Connection Test</h2>
      <p>
        {session ? (
          <>
            Connected as: {session.user.email}
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          </>
        ) : (
          'Not connected - Please sign in'
        )}
      </p>
    </div>
  );
};

export default SupabaseTest;
