"use client";
import { useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-neutral-50 text-neutral-900">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <MapPin size={24} />
          </div>
          <h1 className="text-2xl font-bold mb-2">GPS Location API</h1>
          <p className="text-neutral-500 mb-8">
            Click the button below to fetch your current coordinates using the browser's Geolocation API.
          </p>

          <button
            onClick={handleGetLocation}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? "Fetching Location..." : "Get My Location"}
          </button>
        </div>
        
        {location && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex flex-col gap-1">
            <p className="font-medium text-sm text-green-600 uppercase tracking-wider mb-1">Success</p>
            <p className="text-lg"><strong>Latitude:</strong> {location.lat}</p>
            <p className="text-lg"><strong>Longitude:</strong> {location.lng}</p>
          </div>
        )}
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="mt-0.5 text-red-600 shrink-0" size={20} />
            <div>
              <p className="font-medium text-sm text-red-600 uppercase tracking-wider mb-1">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}