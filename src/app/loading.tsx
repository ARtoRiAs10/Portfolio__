export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="flex items-center gap-2 text-[10px] text-term-dim">
        <span className="text-term-green">$</span>
        <span>booting portfolio</span>
        <span className="cursor-blink text-term-green">▊</span>
      </div>
    </div>
  );
}