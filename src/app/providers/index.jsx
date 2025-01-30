import ThemeContextProvider from "./ThemeContextProvider";
import { ConfigProvider } from "./ConfigProvider";
import { CycleProvider } from "./CycleProvider";
import { BeatPatternProvider } from "./BeatPatternProvider";

const Providers = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ConfigProvider>
        <CycleProvider>
          <BeatPatternProvider>{children}</BeatPatternProvider>
        </CycleProvider>
      </ConfigProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
