import { useEffect, useRef } from "react";
import { useInView, useAnimation as useFramerAnimation } from "framer-motion";

export const useAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "0px 0px -200px 0px" // Увеличим значение, чтобы анимация запускалась раньше
  });
  const controls = useFramerAnimation();

  useEffect(() => {
    if (isInView) {
      // Запускаем общую анимацию для видимости
      controls.start({ opacity: 1, y: 0, x: 0 });
      // Также устанавливаем состояние "visible"
      controls.start("visible");
    } else {
      // Если элемент не виден, сбрасываем анимацию
      controls.start({ opacity: 0 });
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};
