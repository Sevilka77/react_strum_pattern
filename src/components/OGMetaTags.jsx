import { useEffect } from "react";

// Компонент для обновления Open Graph мета-тегов
const OGMetaTags = ({ title, image }) => {
  useEffect(() => {
    // Функция для обновления Open Graph мета-тегов
    const updateOGMetaTags = (title, image) => {
      // Обновление тега og:title
      let metaOGTitle = document.querySelector('meta[property="og:title"]');
      if (metaOGTitle) {
        metaOGTitle.setAttribute("content", `Схема гитарного боя - ${title}`);
      } else {
        metaOGTitle = document.createElement("meta");
        metaOGTitle.setAttribute("property", "og:title");
        metaOGTitle.setAttribute("content", `Схема гитарного боя - ${title}`);
        document.head.appendChild(metaOGTitle);
      }

      // Обновление тега og:description
      let metaOGDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (metaOGDescription) {
        metaOGDescription.setAttribute(
          "content",
          `Схема для гитарного боя ${title}, подходящая для практики`,
        );
      } else {
        metaOGDescription = document.createElement("meta");
        metaOGDescription.setAttribute("property", "og:description");
        metaOGDescription.setAttribute(
          "content",
          `Схема для гитарного боя ${title}, подходящая для практики`,
        );
        document.head.appendChild(metaOGDescription);
      }

      // Обновление тега og:image
      let metaOGImage = document.querySelector('meta[property="og:image"]');
      if (metaOGImage) {
        metaOGImage.setAttribute("content", image);
      } else {
        metaOGImage = document.createElement("meta");
        metaOGImage.setAttribute("property", "og:image");
        metaOGImage.setAttribute("content", image);
        document.head.appendChild(metaOGImage);
      }
    };

    // Вызываем функцию для обновления мета-тегов
    if (title && image) {
      updateOGMetaTags(title, image);
    }
  }, [title, image]); // Эффект сработает при изменении title или image

  return null; // Этот компонент ничего не рендерит
};

export default OGMetaTags;
