'use client';

import { UserContextProvider } from '@/hooks/useUser';
import React from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default UserProvider;
