import { useState } from "react";

// Custom hook to access geolocation
export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");

      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, position, error, getPosition };
}
