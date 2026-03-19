"use client";

import { useCallback, useEffect, useState } from "react";

import type { ProjectItem } from "@/content/site-data";

import { SectionCard } from "./section-card";

const AUTO_ADVANCE_MS = 2500;

type ProjectsCarouselProps = {
  items: ProjectItem[];
};

export function ProjectsCarousel({ items }: ProjectsCarouselProps) {
  const totalProjects = items.length;
  const hasMultipleProjects = totalProjects > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(() => (totalProjects > 1 ? 1 : 0));
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const renderedSlides = hasMultipleProjects
    ? [items[totalProjects - 1], ...items, items[0]]
    : items;

  const goToNext = useCallback(() => {
    if (!hasMultipleProjects || isAnimating) {
      return;
    }

    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setTrackIndex((current) => current + 1);
    setActiveIndex((current) => (current + 1) % totalProjects);
  }, [hasMultipleProjects, isAnimating, totalProjects]);

  const goToPrevious = useCallback(() => {
    if (!hasMultipleProjects || isAnimating) {
      return;
    }

    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setTrackIndex((current) => current - 1);
    setActiveIndex((current) => (current - 1 + totalProjects) % totalProjects);
  }, [hasMultipleProjects, isAnimating, totalProjects]);

  const goToIndex = useCallback(
    (index: number) => {
      if (!hasMultipleProjects || isAnimating || index === activeIndex) {
        return;
      }

      setIsAnimating(true);
      setIsTransitionEnabled(true);
      setTrackIndex(index + 1);
      setActiveIndex(index);
    },
    [activeIndex, hasMultipleProjects, isAnimating],
  );

  useEffect(() => {
    if (!hasMultipleProjects || isAnimating) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      goToNext();
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, goToNext, hasMultipleProjects, isAnimating]);

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

  if (!totalProjects) {
    return null;
  }

  const trackClassName = `projects-carousel__track${
    isTransitionEnabled ? "" : " projects-carousel__track--no-transition"
  }`;

  function handleTrackTransitionEnd() {
    if (!hasMultipleProjects || !isAnimating) {
      return;
    }

    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(totalProjects);
      setIsAnimating(false);
      return;
    }

    if (trackIndex === totalProjects + 1) {
      setIsTransitionEnabled(false);
      setTrackIndex(1);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false);
  }

  return (
    <div className="projects-carousel" aria-roledescription="carousel" aria-label="Projects">
      <div className="projects-carousel__viewport">
        <div
          className={trackClassName}
          style={{ transform: `translateX(-${trackIndex * 100}%)` }}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {renderedSlides.map((project, index) => (
            <div key={`${project.slug}-${index}`} className="projects-carousel__slide">
              <SectionCard
                href={`/projects/${project.slug}`}
                eyebrow={project.period}
                title={project.title}
                summary={project.summary}
                meta={[project.period]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="projects-carousel__controls">
        <button
          type="button"
          className="projects-carousel__button"
          onClick={goToPrevious}
          aria-label="Show previous project"
          disabled={!hasMultipleProjects || isAnimating}
        >
          Previous
        </button>

        <button
          type="button"
          className="projects-carousel__button"
          onClick={goToNext}
          aria-label="Show next project"
          disabled={!hasMultipleProjects || isAnimating}
        >
          Next
        </button>
      </div>

      <div className="projects-carousel__indicator">
        <p className="projects-carousel__status">
          {activeIndex + 1}/{totalProjects}
        </p>

        <div className="projects-carousel__dots" aria-label="Project position">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={`projects-carousel__dot${
                index === activeIndex ? " projects-carousel__dot--active" : ""
              }`}
              aria-label={`Go to project ${index + 1}: ${item.title}`}
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
