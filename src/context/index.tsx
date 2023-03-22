import  { ReactNode } from "react";
import SchedulerContextProvider from "./scheduler";
import InputDataContextProvider from "./inputData";

type PropsParentContextProvider = {
  children: ReactNode;
};

const ContextProvider = ({ children }: PropsParentContextProvider) => {
  return (
    <SchedulerContextProvider>
      <InputDataContextProvider>{children}</InputDataContextProvider>
    </SchedulerContextProvider>
  );
};

export default ContextProvider;
