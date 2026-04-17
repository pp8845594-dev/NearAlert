export function AdBanner({ isPremium }: { isPremium: boolean }) {
  if (isPremium) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white text-center p-2 z-50">
      Ad Banner Test
    </div>
  );
}