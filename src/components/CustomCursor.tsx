import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX - (isHovering ? 30 : 20),
        y: e.clientY - (isHovering ? 30 : 20),
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterHoverable = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.dataset.cursorText;
      if (text) setCursorText(text);
    };

    const onMouseLeaveHoverable = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);
    
    const hoverables = document.querySelectorAll('[data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterHoverable);
      el.addEventListener('mouseleave', onMouseLeaveHoverable);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable);
        el.removeEventListener('mouseleave', onMouseLeaveHoverable);
      });
    };
  }, [isHovering]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onMouseEnterHoverable = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.dataset.cursorText;
      if (text) setCursorText(text);
    };

    const onMouseLeaveHoverable = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const observer = new MutationObserver(() => {
      const hoverables = document.querySelectorAll('[data-cursor-hover]');
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterHoverable);
        el.removeEventListener('mouseleave', onMouseLeaveHoverable);
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: isHovering ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring hidden md:flex items-center justify-center ${isHovering ? 'hover' : ''}`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono text-white uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
