export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-warm-peach/20 py-8 text-center mt-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌅</span>
          <p className="m-0 text-warm-brown font-medium">
            Made with <span className="text-sunset-orange">❤️</span> in 2026
          </p>
        </div>
        <p className="text-sm text-warm-gray">
          Powered by OpenWeather
        </p>
      </div>
    </footer>
  );
}