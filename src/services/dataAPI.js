// src/services/dataAPI.js

const BASE = process.env.NEXT_PUBLIC_SAAVN_API;

// ----------------------
// Home / Modules
// ----------------------
export async function homePageData(language) {
  try {
    const response = await fetch(
      `${BASE}/modules?language=${encodeURIComponent(language?.toString?.() ?? "english")}`,
      { next: { revalidate: 14400 } }
    );
    const data = await response.json();
    return data?.data || [];  // Ensures fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

// ----------------------
// Entities by ID
// ----------------------
export async function getSongData(id) {
  try {
    const response = await fetch(`${BASE}/api/songs/${id}`);
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAlbumData(id) {
  try {
    const response = await fetch(`${BASE}/api/albums?id=${id}`);
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getplaylistData(id) {
  try {
    const response = await fetch(`${BASE}/api/playlists?id=${id}&limit=50`);
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

// ----------------------
// Artist (details + paginated songs & albums)
// ----------------------
export async function getArtistData(id) {
  try {
    const response = await fetch(`${BASE}/api/artists?id=${id}`);
    const data = await response.json();
    return data?.data || {};  // Fallback to empty object if no data
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getArtistSongs(id, page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE}/api/artists/${id}/songs?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getArtistAlbums(id, page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE}/api/artists/${id}/albums?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

// ----------------------
// Search with pagination (AVOIDS "only 3 items" issue)
// ----------------------
export async function searchSongs(query, page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE}/api/search/songs?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function searchAlbums(query, page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE}/api/search/albums?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function searchArtists(query, page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE}/api/search/artists?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data?.data || [];  // Fallback to empty array if no data
  } catch (error) {
    console.log(error);
    return [];
  }
}

// ----------------------
// Utility: safe fetch wrapper if you need it elsewhere
// ----------------------
export async function safeJsonFetch(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
