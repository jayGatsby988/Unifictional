export default function FinanceTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white pt-24 sm:pt-28 md:pt-32 pb-8">
      {children}
    </div>
  );
}

