import { Link } from "react-router-dom";

import { PageHeader } from "../components/ui/PageHeader";

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="Page not found" subtitle="That route doesn't exist in this app." />
      <Link to="/" className="btn-primary">
        Back to dashboard
      </Link>
    </>
  );
}
