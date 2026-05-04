import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signIn, 
  signOut, 
  getCurrentUser, 
  fetchUserAttributes,
  confirmSignIn,
  AuthUser
} from 'aws-amplify/auth';

interface UserAttributes {
  email?: string;
  email_verified?: string;
  sub?: string;
  name?: string;
  family_name?: string;
  given_name?: string;
  phone_number?: string;
  phone_number_verified?: string;
  preferred_username?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  userAttributes: UserAttributes | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  getJwtToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const fetchUserAttributesData = async () => {
    try {
      const attributes = await fetchUserAttributes();
      setUserAttributes(attributes);
    } catch (error) {
      console.error('Error fetching user attributes:', error);
      setUserAttributes(null);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchUserAttributesData();
      } else {
        setUserAttributes(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setUserAttributes(null);
    }
  };

  // const handleSignIn = async (username: string, password: string) => {
  //   try {
  //     const signInOutput = await signIn({ username, password });
      
  //     if (signInOutput.isSignedIn && signInOutput.nextStep.signInStep === 'DONE') {
  //       await refreshUser();
  //       return signInOutput;
  //     } else if (signInOutput.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
  //       // Handle new password required case
  //       return signInOutput;
  //     } else if (signInOutput.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
  //       // Handle SMS code confirmation
  //       return signInOutput;
  //     }
      
  //     return signInOutput;
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     throw error;
  //   }
  // };
const handleSignIn = async (username: string, password: string) => {
  try {
    const res = await signIn({ username, password });

    console.log("SIGN IN RESPONSE:", res);

    // ✅ LOGIN SUCCESS
    if (res.isSignedIn) {
      await refreshUser();
      return res;
    }

    // 🔐 OTP case
    if (res.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
      return res;
    }

    // 🔐 New password case
    if (res.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
      return res;
    }

    return res;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setUserAttributes(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const getJwtToken = async (): Promise<string | null> => {
    try {
      // Import fetchAuthSession dynamically to avoid circular dependencies
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession();
      return session?.tokens?.accessToken?.toString() || null;
    } catch (error) {
      console.error('Error fetching JWT token:', error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const value: AuthContextType = {
    user,
    userAttributes,
    isLoading,
    isAuthenticated,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshUser,
    getJwtToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
