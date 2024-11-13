import { COUNTRY_NAME } from "~/constants/country";
import type { SuggestionResult } from "~/types/weatherLocationResponse";

const convertLocation = (
  location: SuggestionResult,
  showName: boolean = true
) => {
  const locationName = location?.local_names?.vi ?? location?.name ?? "";
  const locationState = location?.state?.toLowerCase().includes("province")
  ? `${location?.state.replace(/Province/i, "").trim()}`
  : location?.state || "";
  const locationCountry =
    location?.country &&
    (COUNTRY_NAME?.[location?.country] ?? location?.country ?? "");

  const locationFullAddress = `${locationName}, ${
    locationState ? locationState + ", " : ""
  }${locationCountry}`;

  const locationStateAddress = `${
    locationState ? locationState + ", " : ""
  }${locationCountry}`;

  return showName ? locationFullAddress : locationStateAddress;
};

export default convertLocation;
