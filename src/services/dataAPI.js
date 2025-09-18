// src/services/dataAPI.js

// NOTE: All functions expect NEXT_PUBLIC_SAAVN_API in .env(.local)
// Example: NEXT_PUBLIC_SAAVN_API=https://jiosaavn-api-sigma-sandy.vercel.app

const BASE = process.env.NEXT_PUBLIC_SAAVN_API;

// ----------------------
// Home / Modules
// ----------------------
export async function homePageData(language) {
  try {
    const res = await fetch(
      `${BASE}/modules?language=${encodeURIComponent(language?.toString?.() ?? "english")}`,
      { next: { revalidate: 14400 } }
    );
    const json = await res.json();
    return json?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// ----------------------
// Entities by ID
// ----------------------
export async function getSongData(id) {
  try {
    const res = await fetch(`${BASE}/api/songs?id=${encodeURIComponent(id)}`);
    const json = await res.json();
    return json?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getAlbumData(id) {
  try {
    const res = await fetch(`${BASE}/api/albums?id=${encodeURIComponent(id)}&limit=50`);
    const json = await res.json();
    return json?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPlaylistData(id, limit = 50) {
  try {
    const res = await fetch(`${BASE}/api/playlists?id=${encodeURIComponent(id)}&limit=${limit}`);
    const json = await res.json();
    return json?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// ----------------------
// Artist (details + paginated songs & albums)
// ----------------------
export async function getArtistData(id) {
  try {
    const res = await fetch(`${BASE}/api/artists/${encodeURIComponent(id)}`);
    const json = await res.json();
    return json?.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getArtistSongs(id, page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${BASE}/api/artists/${encodeURIComponent(id)}/songs?page=${page}&limit=${limit}`
    );
    const json = await res.json();
    // many proxies return { data: { songs: [...] } } or { data: [...] }
    return json?.data?.songs ?? json?.data ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getArtistAlbums(id, page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${BASE}/api/artists/${encodeURIComponent(id)}/albums?page=${page}&limit=${limit}`
    );
    const json = await res.json();
    // many proxies return { data: { albums: [...] } } or { data: [...] }
    return json?.data?.albums ?? json?.data ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

// ----------------------
// Search with pagination (AVOIDS "only 3 items" issue)
// Call per-type endpoints instead of a single “search all”
// ----------------------
export async function searchSongs(query, page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${BASE}/api/search/songs?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const json = await res.json();
    return json?.data ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function searchAlbums(query, page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${BASE}/api/search/albums?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const json = await res.json();
    return json?.data ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function searchArtists(query, page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${BASE}/api/search/artists?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const json = await res.json();
    return json?.data ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

// ----------------------
// Utility: safe fetch wrapper if you need it elsewhere
// ----------------------
export async function safeJsonFetch(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
