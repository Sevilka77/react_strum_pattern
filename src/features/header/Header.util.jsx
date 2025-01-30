// src/features/Header/Header.utils.js
export const getPageTitle = (pathname, title) => {
  switch (pathname) {
    case "/":
      return "Strumming.ru – Гитарный бой онлайн: тренажер, схемы и упражнения";
    case "/learn":
      return `Уроки гитарного боя – Учись играть с нуля на Strumming.ru`;
    case "/create":
      return `Создай свой гитарный бой – Уникальный конструктор на Strumming.ru`;
    case "/patterns":
      return `Схемы основных гитарных боев – Шестерка, Восьмерка, Галоп и другие – Strumming.ru`;
    case "/custom":
      return `Пользовательские гитарные бои – Идеи и ритмы от сообщества – Strumming.ru`;
    default:
      return `Гитарный бой ${title} – Схема и тренировка – Strumming.ru `;
  }
};

export const getPageDescription = (pathname, title) => {
  switch (pathname) {
    case "/":
      return "Уникальный тренажер для изучения гитарного боя с подробными схемами и упражнениями.";
    case "/learn":
      return "Уроки для начинающих и опытных музыкантов по техникам гитарного боя.";
    case "/create":
      return "Создайте свой собственный гитарный бой с помощью нашего конструктора.";
    case "/patterns":
      return "Изучите различные схемы гитарных боев, такие как Шестерка, Восьмерка, Галоп и другие.";
    case "/custom":
      return "Откройте для себя пользовательские гитарные бои и ритмы от сообщества Strumming.ru.";
    default:
      return `Схема гитарного боя- ${title} — Тренировка и советы по технике.`;
  }
};

export const getPageHeader = (pathname, title) => {
  switch (pathname) {
    case "/":
      return "Strumming - Онлайн тренажер гитарного боя";
    case "/learn":
      return "Уроки гитарного боя";
    case "/create":
      return "Создание гитарного боя";
    case "/patterns":
      return "Схемы гитарных боев";
    case "/custom":
      return "Пользовательские гитарные бои";
    default:
      return `Гитарный бой - ${title}`;
  }
};
