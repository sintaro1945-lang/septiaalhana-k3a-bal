import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserRole, UserProfile } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  demoLogin: (role: UserRole) => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Default profile if not found
            const defaultProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'Administrator',
              role: 'admin'
            };
            setUserProfile(defaultProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile", err);
          setUserProfile({
            uid: user.uid,
            email: user.email || '',
            displayName: 'Administrator',
            role: 'admin'
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, pass: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      setError(err.message || 'Gagal login. Periksa email dan password.');
      throw err;
    }
  };

  const register = async (email: string, pass: string, name: string, role: UserRole) => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const profile: UserProfile = {
        uid: res.user.uid,
        email,
        displayName: name,
        role
      };
      await setDoc(doc(db, 'users', res.user.uid), profile);
      setUserProfile(profile);
    } catch (err: any) {
      setError(err.message || 'Gagal registrasi.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
      setUserProfile(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // Quick Demo Login for instant testing without Firebase Auth setup friction
  const demoLogin = (role: UserRole) => {
    const mockUser: any = {
      uid: `demo-${role}-${Date.now()}`,
      email: `${role}@samuderaraya.com`,
      displayName: role === 'admin' ? 'Direktur Utama (Admin)' : role === 'operator' ? 'Kepala Operasional Pelabuhan' : 'PT. Pelanggan Sejahtera',
      emailVerified: true
    };
    const profile: UserProfile = {
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      role
    };
    setCurrentUser(mockUser);
    setUserProfile(profile);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, login, register, logout, demoLogin, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
