import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => {
      setIsHovering(true);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkIfMobile();

    // Delay cursor appearance for smoother loading
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkIfMobile);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .tech-pill");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkIfMobile);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 2 : 1,
        opacity: 1,
      }}
      transition={{
        x: { duration: 0.1, ease: "linear" },
        y: { duration: 0.1, ease: "linear" },
        scale: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div 
        className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/50"
        style={{
          transform: "translate(-50%, -50%)"
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
