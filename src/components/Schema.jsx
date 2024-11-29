import { useEffect } from "react";
import { patterns } from "../provider/patterns";

// Компонент для добавления JSON-LD схемы
const Schema = () => {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Виды гитарных боев",
      itemListElement: patterns.map((pattern) => ({
        "@type": "ListItem",
        position: pattern.position,
        name: pattern.title,
        url: `/pattern/${pattern.pattern}`,
        image: `data:image/svg+xml;utf8,${encodeURIComponent(pattern.pattern)}`,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Этот компонент не рендерит ничего на экран, он только добавляет скрипт в head
};

export default Schema;
