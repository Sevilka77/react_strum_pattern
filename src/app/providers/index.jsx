import ThemeContextProvider from "./ThemeContextProvider";
import { ConfigProvider } from "./ConfigProvider";
import { CycleProvider } from "./CycleProvider";

const Providers = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ConfigProvider>
        <CycleProvider>{children}</CycleProvider>
      </ConfigProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
