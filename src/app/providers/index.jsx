// import ThemeContextProvider from "./ThemeContextProvider";
import { EditModeProvider } from "@/entities/editMode/model/EditModeContext";
import { CycleSettingsProvider } from "@/entities/cycleSettings/model/CycleSettingsContext";
import { SequenceSettingsProvider } from "@/entities/sequenceSettings/model/SequenceSettingsContext";
import { ToneSettingsProvider } from "@/entities/toneSettings/model/ToneSettingsContext";
import { SoundSettingsProvider } from "@/entities/soundSettings/model/SoundSettingsContext";
import { ChordSettingsProvider } from "@/entities/chordSettings/model/ChordSettingsContext";
const Providers = ({ children }) => {
  return (
    // <ThemeContextProvider>
    <EditModeProvider>
      <CycleSettingsProvider>
        <SoundSettingsProvider>
          <ToneSettingsProvider>
            <ChordSettingsProvider>
              <SequenceSettingsProvider>{children}</SequenceSettingsProvider>
            </ChordSettingsProvider>
          </ToneSettingsProvider>
        </SoundSettingsProvider>
      </CycleSettingsProvider>
    </EditModeProvider>
    // </ThemeContextProvider>
  );
};

export default Providers;
