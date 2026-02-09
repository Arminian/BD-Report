export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-orange-400/20 py-8 text-center mt-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌅</span>
          <p className="m-0 text-orange-50 font-medium">
            Made with <span className="text-orange-500">❤️</span> in 2026
          </p>
        </div>
        <p className="text-sm text-orange-50">
          Powered by OpenWeather
        </p>
      </div>
    </footer>
  );
}