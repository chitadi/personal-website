"use client";

import { type ReactNode, type TouchEvent, useCallback, useEffect, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD = 36;
const MOBILE_MEDIA_QUERY = "(max-width: 760px)";

type MobileSlideCarouselProps = {
  ariaLabel: string;
  dotLabelPrefix: string;
  slides: ReactNode[];
  slideKeys: string[];
  autoAdvanceMs?: number;
};

export function MobileSlideCarousel({
  ariaLabel,
  dotLabelPrefix,
  slides,
  slideKeys,
  autoAdvanceMs = AUTO_ADVANCE_MS,
}: MobileSlideCarouselProps) {
  const totalSlides = slides.length;
  const hasMultipleSlides = totalSlides > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(() => (totalSlides > 1 ? 1 : 0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    function handleMediaChange(event: MediaQueryListEvent) {
      setIsMobileViewport(event.matches);
    }

    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const renderedSlides = hasMultipleSlides ? [slides[totalSlides - 1], ...slides, slides[0]] : slides;
  const renderedSlideKeys = hasMultipleSlides
    ? [slideKeys[totalSlides - 1], ...slideKeys, slideKeys[0]]
    : slideKeys;

  const goToNext = useCallback(() => {
    if (!hasMultipleSlides || isAnimating || !isMobileViewport) {
      return;
    }

    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setTrackIndex((current) => current + 1);
    setActiveIndex((current) => (current + 1) % totalSlides);
  }, [hasMultipleSlides, isAnimating, isMobileViewport, totalSlides]);

  const goToPrevious = useCallback(() => {
    if (!hasMultipleSlides || isAnimating || !isMobileViewport) {
      return;
    }

    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setTrackIndex((current) => current - 1);
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  }, [hasMultipleSlides, isAnimating, isMobileViewport, totalSlides]);

  const goToIndex = useCallback(
    (index: number) => {
      if (!hasMultipleSlides || isAnimating || index === activeIndex || !isMobileViewport) {
        return;
      }

      setIsAnimating(true);
      setIsTransitionEnabled(true);
      setTrackIndex(index + 1);
      setActiveIndex(index);
    },
    [activeIndex, hasMultipleSlides, isAnimating, isMobileViewport],
  );

  useEffect(() => {
    if (!hasMultipleSlides || isAnimating || !isMobileViewport) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      goToNext();
    }, autoAdvanceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, autoAdvanceMs, goToNext, hasMultipleSlides, isAnimating, isMobileViewport]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return undefined;
    }

    let secondFrameId: number | undefined;
    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      if (secondFrameId) {
        window.cancelAnimationFrame(secondFrameId);
      }
    };
  }, [isTransitionEnabled]);

  useEffect(() => {
    if (isMobileViewport || !hasMultipleSlides) {
      return;
    }

    setIsAnimating(false);
    setIsTransitionEnabled(true);
    setActiveIndex(0);
    setTrackIndex(1);
  }, [hasMultipleSlides, isMobileViewport]);

  if (!totalSlides) {
    return null;
  }

  const trackClassName = `projects-carousel__track${
    isTransitionEnabled ? "" : " projects-carousel__track--no-transition"
  }`;

  function handleTrackTransitionEnd() {
    if (!hasMultipleSlides || !isAnimating || !isMobileViewport) {
      return;
    }

    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(totalSlides);
      setIsAnimating(false);
      return;
    }

    if (trackIndex === totalSlides + 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    const touch = event.changedTouches[0];

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (startX === null || startY === null || !touch) {
      return;
    }

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  }

  return (
    <div className="projects-carousel" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        className="projects-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={trackClassName}
          style={{ transform: `translateX(-${trackIndex * 100}%)` }}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {renderedSlides.map((slide, index) => (
            <div
              key={`${renderedSlideKeys[index] ?? `slide-${index}`}-${index}`}
              className="projects-carousel__slide"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="projects-carousel__indicator">
        <div className="projects-carousel__dots" aria-label={`${dotLabelPrefix} position`}>
          {slideKeys.map((key, index) => (
            <button
              key={key}
              type="button"
              className={`projects-carousel__dot${
                index === activeIndex ? " projects-carousel__dot--active" : ""
              }`}
              aria-label={`Go to ${dotLabelPrefix} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              disabled={isAnimating}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
