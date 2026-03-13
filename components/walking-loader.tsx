type WalkingLoaderProps = {
  label?: string;
};

export function WalkingLoader({
  label = "Walking into the website...",
}: WalkingLoaderProps) {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label={label}>
      <div className="walking-loader">
        <div className="walking-loader__track">
          <div className="walking-loader__walker">
            <svg
              className="walking-loader__figure"
              viewBox="0 0 80 120"
              aria-hidden="true"
            >
              <circle cx="44" cy="16" r="10" />
              <path d="M43 28 L39 54 L49 74 L56 108" />
              <path d="M39 54 L28 84 L23 114" />
              <path d="M41 40 L26 54" />
              <path d="M43 39 L58 52" />
            </svg>
            <div className="walking-loader__shadow" />
          </div>
        </div>
        <p className="walking-loader__label">{label}</p>
      </div>
    </div>
  );
}
