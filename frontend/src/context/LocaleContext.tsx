import {createContext, PropsWithChildren, useContext} from "react";
type LocaleContextType = {
  databaseId?: number | null;
  localeData?: {
    EN: string | null;
    DE: string | null;
  } | null;
};
const LocaleContext = createContext<LocaleContextType>({
  databaseId: null,
  localeData: {DE: null, EN: null},
});

export const LocaleContextProvider = ({
  children,
  localeData,
}: PropsWithChildren<LocaleContextType>) => {
  return (
    <LocaleContext.Provider value={{localeData: localeData}}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
