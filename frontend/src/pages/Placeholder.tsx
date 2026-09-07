export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-emerald-400 border-4 border-slate-900 p-8 shadow-[8px_8px_0_0_rgba(15,23,42,1)] text-center max-w-sm w-full">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-widest">{title}</h1>
        <p className="mt-4 text-slate-900 font-medium text-sm">This module is currently under construction.</p>
      </div>
    </div>
  );
}
