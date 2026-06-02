/**
 * @author duynguyen © 2025
 */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '../components/api/config/token.storage';

// type User = {
//   username: string;
//   role: 'ADMIN' | 'USER';
// };

type JwtPayload = {
    sub: string;
    // roles: {
    //     authority: string;
    // }[];
    roles: string[];
    exp: number;
};

type User = {
    username: string;
    role: string;
};

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;        // Thêm để PrivateRoute biết đang load
//   login: (user: User) => void;
//   logout: () => void;
// };

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (
        accessToken: string,
        refreshToken: string
    ) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==============================|| AUTH PROVIDER ||============================== //

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   try {
    //     setUser(JSON.parse(storedUser));
    //   } catch (error) {
    //     console.error('Invalid user data in localStorage', error);
    //     localStorage.removeItem('user');
    //   }
    // }
    // setLoading(false);
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
        try {
            const decoded = jwtDecode<JwtPayload>(accessToken);
            setUser({
                username: decoded.sub,
                role:
                    // decoded.roles?.[0]?.authority ?? 'ROLE_USER'
                    decoded.roles[0] ?? 'ROLE_USER'
            });
        } catch (error) {
            tokenStorage.clear();
        }
      }
      setLoading(false);     
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string
  ): string => {
    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(refreshToken);
    // const decoded = jwtDecode<JwtPayload>(accessToken);
    // setUser({
    //     username: decoded.sub,
    //     role:
    //         decoded.roles?.[0]?.authority ?? 'ROLE_USER' 
    // });
    const decoded = jwtDecode<JwtPayload>(accessToken);
    // const role = decoded.roles[0]?.authority ?? 'ROLE_USER';
    const role = decoded.roles[0] ?? 'ROLE_USER';

    setUser({ username: decoded.sub, role });
    return role;
  };

  const logout = () => {
    // localStorage.removeItem('user');
    // setUser(null);
    tokenStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ==============================|| AUTH HOOK ||============================== //

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};