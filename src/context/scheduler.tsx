import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type PropsSchedulerProviders = {
  children: ReactNode;
};

const SchedulerContext = createContext({} as any);

const SchedulerContextProvider = ({ children }: PropsSchedulerProviders) => {
  return (
    <SchedulerContext.Provider value={{}}>{children}</SchedulerContext.Provider>
  );
};

export const useSchedulerContext = () => {
  return useContext(SchedulerContext);
};

export default SchedulerContextProvider;
