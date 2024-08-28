import { useSearchParams } from "react-router-dom";

// Custom hook to access lat/lng in the URL (query string)
export function useURLGeoposition() { 
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng];
}
