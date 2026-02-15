import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number; // ms per character
  delay?: number; // ms after writing before deleting
  className?: string;
  cursorClassName?: string;
}

const TypewriterEffect = ({
  texts,
  speed = 80,
  delay = 1200, // shorter pause after writing
  className = "",
  cursorClassName = ""
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentText) {
      // Pause after writing before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayText === '') {
      // Immediately start typing next text
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const nextChar = isDeleting
      ? displayText.slice(0, -1)
      : currentText.slice(0, displayText.length + 1);

    const typeSpeed = isDeleting ? speed / 1.5 : speed;

    timer = setTimeout(() => {
      setDisplayText(nextChar);
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, texts, speed, delay]);

  return (
    <div className="typewriter-container">
      <span className={className}>{displayText}</span>
      <span
        className={`typewriter-cursor ${cursorClassName}`}
        style={{
          visibility: showCursor ? 'visible' : 'hidden',
          transition: 'visibility 0.2s'
        }}
      >
        |
      </span>
    </div>
  );
};

export default TypewriterEffect;
