import { Link } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { CreateBookingForm } from "./components/CreateBookingForm";

export function CreateBookingPage() {
  return (
    <>
      <PageHeader
        title="New booking"
        subtitle="Reserve a room for your meeting."
        actions={
          <Link to="/bookings" className="text-sm text-muted hover:text-white">
            Back to bookings
          </Link>
        }
      />
      <CreateBookingForm />
    </>
  );
}
