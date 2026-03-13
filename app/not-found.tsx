import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found__eyebrow">Not found</p>
      <h1 className="not-found__title">That page wandered off the route.</h1>
      <p className="not-found__summary">
        The detail page you wanted is not here. Head back to the landing page and
        continue from there.
      </p>
      <Link href="/" className="button-link">
        Return home
      </Link>
    </div>
  );
}

