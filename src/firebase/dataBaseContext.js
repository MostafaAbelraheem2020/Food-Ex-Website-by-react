// App.jsx
import * as React from "react";

import { createContext } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  //   const [loading, setLoading] = useState(true);

  // if (loading) return <p>جاري التحميل...</p>;

  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

export default DataContext;
