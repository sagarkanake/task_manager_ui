/* eslint-disable react/prop-types */

import {createContext, useContext, useEffect} from "react";

const UrlContext = createContext();

const UrlProvider = ({children}) => {


  

  return (
    <UrlContext.Provider >
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
