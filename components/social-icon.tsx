import type { SocialIconName } from "@/content/site-data";

type SocialIconProps = {
  icon: SocialIconName;
};

export function SocialIcon({ icon }: SocialIconProps) {
  switch (icon) {
    case "scholar":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3 2.5 8 12 13 21.5 8 12 3Zm-5 7.8v4.2c0 1.2 2.3 3 5 3s5-1.8 5-3v-4.2L12 13.5 7 10.8Zm12 1.2v5.2"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7.2 9.4v7.4M7.3 6.6a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM11.3 16.8V9.4h3v1.1c.5-.8 1.5-1.4 2.8-1.4 2.2 0 3.3 1.4 3.3 4v3.7M4.6 3.8h14.8a.8.8 0 0 1 .8.8v14.8a.8.8 0 0 1-.8.8H4.6a.8.8 0 0 1-.8-.8V4.6a.8.8 0 0 1 .8-.8Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="12"
            cy="12"
            r="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5.5 4.5 18.5 19.5M18.2 4.5l-5.3 5.9M10.8 12.8 5.8 19.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3.5"
            y="6"
            width="17"
            height="12"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m4.5 7.5 7.5 6 7.5-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      );
    default:
      return null;
  }
}

