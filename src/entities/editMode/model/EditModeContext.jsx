import { createContext, useReducer, useMemo } from "react";
import { initialEditMode } from "./editModeTypes";

// Создаем контекст
export const EditModeContext = createContext();

export const EditModeProvider = ({ children }) => {
  const [editMode, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_EDIT_MODE":
        return { ...state, edit: action.payload };
      default:
        return state;
    }
  }, initialEditMode);
  // Мемоизируем значение контекста для предотвращения лишних рендеров
  const value = useMemo(() => ({ editMode, dispatch }), [editMode, dispatch]);
  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
};
