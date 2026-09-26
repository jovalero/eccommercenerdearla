"use client";

import React, { useRef, useEffect, useState, memo } from 'react';

export const InteractiveTicker = memo(function InteractiveTicker({
  phrases = [
    "| ENVÍO GRATIS EN COMPRAS SELECCIONADAS",
    "| ¡HASTA 6 CUOTAS SIN INTERÉS!",
    "| GARANTÍA OFICIAL HOLUX EN TODAS TUS EXPEDICIONES",
    "| 15% OFF PAGANDO CON TRANSFERENCIA BANCARIA",
    "| 🎡 ¡GIRÁ LA RULETA DE LA FORTUNA Y GANÁ HASTA 25% OFF!",
  ],
  speed = 40,
  className = ''
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const singleContentRef = useRef(null);

  const posRef = useRef(0);
  const singleWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastTimeRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (singleContentRef.current) {
        singleWidthRef.current = singleContentRef.current.offsetWidth || 1200;
      }
    };

    updateWidth();
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updateWidth);
    }
    window.addEventListener('resize', updateWidth);

    const loop = (currentTime) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }
      const deltaSeconds = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      const singleWidth = singleWidthRef.current;

      if (!isDraggingRef.current && !isHoveredRef.current) {
        posRef.current -= speed * deltaSeconds;
      }

      if (singleWidth > 0) {
        while (posRef.current <= -singleWidth) {
          posRef.current += singleWidth;
        }
        while (posRef.current > 0) {
          posRef.current -= singleWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateWidth);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [speed]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    setIsCursorGrabbing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const diffX = e.clientX - startXRef.current;
    posRef.current = dragStartPosRef.current + diffX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsCursorGrabbing(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; handleMouseUp(); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-full overflow-hidden bg-[#1C2321] text-[#F2EFE9] border-b border-[#3C6E71]/30 select-none py-2 text-xs tracking-wider font-display uppercase font-semibold ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <div ref={singleContentRef} className="flex shrink-0 items-center gap-8 pr-8">
          {phrases.map((phrase, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-[#3C6E71] font-bold">★</span>
              <span>{phrase}</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
          {phrases.map((phrase, i) => (
            <span key={`clone-${i}`} className="flex items-center gap-2">
              <span className="text-[#3C6E71] font-bold">★</span>
              <span>{phrase}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default InteractiveTicker;
