import React, { createContext } from 'react';
export type User = {
  user: any;
};

export const UserContext: React.Context<User> = createContext({ user: null });
