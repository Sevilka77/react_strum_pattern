import { useEffect } from "react";

const useWakeLock = () => {
  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          // console.log("Wake Lock was released");
        });
        // console.log("Wake Lock is active");
      } catch (err) {
        // console.error(`${err.name}, ${err.message}`);
      }
    };

    // Запрос блокировки при монтировании компонента
    requestWakeLock();

    // Обработка потери фокуса окна и повторный запрос блокировки
    const handleVisibilityChange = async () => {
      if (wakeLock !== null && document.visibilityState === "visible") {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (wakeLock !== null) {
        wakeLock
          .release()
          .catch((err) => console.error(`${err.name}, ${err.message}`));
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

export default useWakeLock;
