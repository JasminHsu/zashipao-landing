import { SessionBooking } from "@/components/SessionBooking";

export const metadata = {
  title: "預約場次 — 雜事房"
};

export default function SessionsPage() {
  return <SessionBooking initialStep="sessions" />;
}
