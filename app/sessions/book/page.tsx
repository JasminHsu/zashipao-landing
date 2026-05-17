import { SessionBooking } from "@/components/SessionBooking";

export const metadata = {
  title: "選擇本場雜事 — 雜事房"
};

export default function BookSessionPage() {
  return <SessionBooking initialStep="commitment" />;
}
