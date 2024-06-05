import {useRouter} from "next/router";
import {createContext, PropsWithChildren, useContext} from "react";
type LocaleContextType = {
  databaseId?: number | null;
  locale?: string | undefined;
  pathname?: string | undefined;
  asPath?: string;
  localeData?: {
    EN: string | null;
    DE: string | null;
  } | null;
};
const LocaleContext = createContext<LocaleContextType>({
  databaseId: null,
  locale: undefined,
  pathname: undefined,

  localeData: {DE: null, EN: null},
});

export const LocaleContextProvider = ({
  children,
  localeData,
}: PropsWithChildren<LocaleContextType>) => {
  //#region locale
  const {locale, pathname, asPath} = useRouter();

  //#endregion
  return (
    <LocaleContext.Provider
      value={{
        localeData: localeData,
        locale: locale,
        pathname: pathname,
        asPath: asPath,
      }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
