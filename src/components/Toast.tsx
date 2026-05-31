interface Props {
  message: string | null;
}

export default function Toast({ message }: Props) {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
      <div className="bg-espresso text-cream px-6 py-3 shadow-luxury-lg flex items-center gap-3 whitespace-nowrap">
        <div className="w-1 h-1 rounded-full bg-camel flex-shrink-0" />
        <span className="label-micro" style={{ letterSpacing: '0.12em' }}>{message}</span>
      </div>
    </div>
  );
}
