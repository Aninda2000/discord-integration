"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if the user is logged in
  useEffect(() => {
    const userToken = Cookies.get('access_token');
    if (userToken) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn && !loading) { // Only redirect when loading is done
      router.push('/Login');
    }
  }, [isLoggedIn, loading, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
