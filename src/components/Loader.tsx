interface LoaderProps {
  label?: string;
}

function Loader({label = "Завантаження..."}: LoaderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-gray-500">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export default Loader;
