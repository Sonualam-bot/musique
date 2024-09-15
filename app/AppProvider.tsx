"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";

// Define the queue item type
type QueueToRender = {
  id: string;
  title: string;
  votes: number;
  hasUpvoted: boolean;

  userId?: string;
  url?: string;
  extractedId?: string;
  type?: string;

  smallImg?: string;
  bigImg?: string;

  upvotes?: number;
};

// Define the context type
interface ContextProps {
  queue: QueueToRender[];
  setQueue: Dispatch<SetStateAction<QueueToRender[]>>;
}

// Create the context with a default value of `undefined`
export const AppContext = createContext<ContextProps | undefined>(undefined);

// AppProvider component to wrap the children components
function AppProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<QueueToRender[]>([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      votes: 5,

      hasUpvoted: false,
    },
    // { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", votes: 3 },
    // { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", votes: 2 },
    // {
    //   id: "Eo-KmOd3i7s",
    //   title:
    //     "*NSYNC - Bye Bye Bye (Official Video from Deadpool and Wolverine)",
    //   votes: 4,
    // },
  ]);

  // The value object containing the queue and setQueue function
  const value = {
    queue,
    setQueue,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const UseAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context out of reach");
  }

  return context;
};

export default AppProvider;
