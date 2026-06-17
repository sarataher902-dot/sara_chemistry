import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sara Taher | Chemistry Educator & Science Content Creator",
  description:
    "Expert IGCSE Chemistry education, study resources, and tutoring by Sara Taher. Making chemistry clear, practical, and accessible for every learner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
