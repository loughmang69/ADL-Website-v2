export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  /** Reviewer's Google Maps profile, required attribution when available. */
  authorUri?: string;
  /** Reviewer's profile photo, required attribution when available. */
  authorPhotoUri?: string;
  /** Link to this review on Google Maps (required by Google's policies). */
  reviewUri?: string;
}

export interface GooglePlaceReviews {
  rating?: number;
  total?: number;
  mapsUri?: string;
  reviews: GoogleReview[];
}

interface PlacesApiReview {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
}

interface PlacesApiResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
}

/**
 * Fetch reviews for the configured Google place. Returns null when not
 * configured or on any error, so the Reviews section falls back to the static
 * card. Cached for 24h to stay well within Places API quota.
 */
export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) {
      console.error("Google Places error:", res.status);
      return null;
    }
    const data = (await res.json()) as PlacesApiResponse;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName?.trim() || "Google user",
        rating: typeof r.rating === "number" ? r.rating : 5,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
        authorUri: safeGoogleUrl(r.authorAttribution?.uri),
        authorPhotoUri: safeGoogleUrl(r.authorAttribution?.photoUri),
        reviewUri: safeGoogleUrl(r.googleMapsUri),
      }))
      .filter((r) => r.text.length > 0)
      // The Places API never returns more than 5 reviews; this only guards
      // the grid layout against a future change on Google's side.
      .slice(0, 5);

    if (reviews.length === 0) return null;

    return {
      rating: data.rating,
      total: data.userRatingCount,
      mapsUri: data.googleMapsUri,
      reviews,
    };
  } catch (err) {
    console.error(
      "Google Places fetch failed:",
      err instanceof Error ? err.message : "unknown",
    );
    return null;
  }
}

/**
 * Only render links that point at Google over https. The values come from
 * Google's API, but a URL rendered as a link should never be trusted blindly.
 */
function safeGoogleUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname;
    const isGoogle =
      host === "google.com" ||
      host.endsWith(".google.com") ||
      host.endsWith(".googleusercontent.com") ||
      host === "maps.app.goo.gl";
    return url.protocol === "https:" && isGoogle ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
