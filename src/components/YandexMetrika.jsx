import { useEffect } from "react";

const METRIKA_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;
const YandexMetrika = () => {
  useEffect(() => {
    // Функция для загрузки скрипта Яндекс.Метрики
    const loadMetrika = () => {
      if (typeof window !== "undefined" && !window.ym) {
        (function (m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function () {
              (m[i].a = m[i].a || []).push(arguments);
            };
          m[i].l = 1 * new Date();
          (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
        })(
          window,
          document,
          "script",
          "https://mc.yandex.ru/metrika/tag.js",
          "ym"
        );
      }
    };

    // Загрузка скрипта и инициализация метрики
    loadMetrika();

    // После загрузки скрипта инициализируем Яндекс.Метрику
    if (typeof window !== "undefined" && METRIKA_ID) {
      window.ym(METRIKA_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    }
  }, []);

  return null; // Компонент ничего не рендерит
};

export default YandexMetrika;
