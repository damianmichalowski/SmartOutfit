interface Props {
  message: string | null;
}

export default function Toast({ message }: Props) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-espresso text-cream px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 max-w-xs">
        <span className="text-camel text-lg">✓</span>
        <span className="text-sm font-medium leading-snug">{message}</span>
      </div>
    </div>
  );
}
