import {createContext, useContext} from "react";
type LocaleContextType = {
  databaseId?: number;
  localeData?:any
};
const LocaleContext = createContext<LocaleContextType | any>(null);

export const LocaleContextProvider = ({children, localeData}:any) => {
  return (
    <LocaleContext.Provider value={{localeData:localeData}}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
