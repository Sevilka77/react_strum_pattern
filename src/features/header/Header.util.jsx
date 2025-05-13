// src/features/Header/Header.utils.js

export const getPageHeader = (pathname, title) => {
  switch (pathname) {
    case "/":
      return "Strumming - Онлайн тренажер гитарного боя";
    case "/learn":
      return "Уроки гитарного боя";
    case "/rhythm":
      return "Ритмический алфавит";
    case "/create":
      return "Создание гитарного боя";
    case "/patterns":
      return "Схемы гитарных боев";
    case "/custom":
      return "Пользовательские гитарные бои";
    case "/404":
      return "Strumming.ru";
    default:
      return `${title}`;
  }
};
