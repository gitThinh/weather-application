
export const checkLocation = (location1: SuggestionResulf, location2: SuggestionResulf) => {
    const lat1 = location1.lat;
    const lon1 = location1.lon;
    const lat2 = location2.lat;
    const lon2 = location2.lon;

    return lat1 === lat2 && lon1 === lon2
}