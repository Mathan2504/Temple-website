// ============================================================
// MEDIA STORE — client-side stand-in for a real backend.
//
// This app runs as a static React/Vite site with no server, so
// there is no Spring Boot / MySQL / cloud storage connected here.
// To make uploads actually work end-to-end for a demo, this module
// persists uploaded files + metadata in the browser's IndexedDB.
//
// IMPORTANT FOR PRODUCTION: replace the function bodies below with
// real `fetch()` calls to your Spring Boot REST API. Keep the same
// function names/signatures and the rest of the app (hooks, pages,
// components) will keep working unmodified. Suggested endpoints:
//   GET    /api/media?category=photo|video&page=&pageSize=
//   POST   /api/media            (multipart: file, title, description, category)
//   PUT    /api/media/{id}       (title, description)
//   DELETE /api/media/{id}
// ============================================================

const DB_NAME = "temple_media_store";
const DB_VERSION = 1;
const STORE_NAME = "media";
const SEED_FLAG_KEY = "temple_media_seeded_v3";

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("category", "category", { unique: false });
        store.createIndex("uploadDate", "uploadDate", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

function tx(storeMode = "readonly") {
  return openDB().then((db) => db.transaction(STORE_NAME, storeMode).objectStore(STORE_NAME));
}

function genId() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Fetch every media record for a category, newest first.
 */
export async function listMedia(category) {
  const store = await tx("readonly");
  return new Promise((resolve, reject) => {
    const items = [];
    const index = store.index("category");
    const request = index.openCursor(IDBKeyRange.only(category));
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        items.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        resolve(items);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save a new media item. `file` is a File/Blob, or `sourceUrl` can be
 * given instead (used for seeding initial temple photos/videos so we
 * don't have to duplicate large seed files into IndexedDB on every load).
 */
export async function addMedia({ file, sourceUrl, category, title, description, mimeType, filename }) {
  const id = genId();
  const record = {
    id,
    category, // "photo" | "video"
    title: title || "",
    description: description || "",
    filename: filename || (file && file.name) || "media",
    mimeType: mimeType || (file && file.type) || "",
    uploadDate: new Date().toISOString(),
    blob: file || null,
    sourceUrl: sourceUrl || null, // used only for static seed items
  };
  const store = await tx("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.add(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

export async function updateMedia(id, patch) {
  const store = await tx("readwrite");
  return new Promise((resolve, reject) => {
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const existing = getReq.result;
      if (!existing) return reject(new Error("Media not found"));
      const updated = { ...existing, ...patch };
      const putReq = store.put(updated);
      putReq.onsuccess = () => resolve(updated);
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

export async function deleteMedia(id) {
  const store = await tx("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

/** Build a usable <img>/<video> src for a media record. */
export function mediaUrl(record) {
  if (record.sourceUrl) return record.sourceUrl;
  if (record.blob) return URL.createObjectURL(record.blob);
  return "";
}

let seedInFlight = null;

/**
 * One-time seed of real temple photos so the gallery isn't empty on
 * first visit. Safe to call on every app load — it no-ops after the
 * first successful run (tracked in localStorage), and concurrent
 * calls (e.g. React StrictMode mounting effects twice in dev) share
 * a single in-flight promise so photos are never inserted twice.
 */
export function seedInitialMedia() {
  if (localStorage.getItem(SEED_FLAG_KEY)) return Promise.resolve();
  if (seedInFlight) return seedInFlight;

  // Claim the flag immediately so a second concurrent call bails out
  // via the check above on its next tick, and dedupe by sourceUrl in
  // case some entries were already inserted by an earlier bug/run.
  localStorage.setItem(SEED_FLAG_KEY, "1");

  seedInFlight = (async () => {
    const seedPhotos = [
    {
      sourceUrl: "/media/photos/perumal-sannidhi.jpg",
      title: "ஸ்ரீ பூமி அளந்த பெருமாள் சன்னிதி",
      description: "Sri Bhoomi Alantha Perumal sannidhi, decorated for pooja.",
      filename: "perumal-sannidhi.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/isakki-amman-sannidhi.jpg",
      title: "ஸ்ரீ இசக்கி அம்மன் சன்னிதி",
      description: "Sri Isakki Amman sannidhi, festival alangaram.",
      filename: "isakki-amman-sannidhi.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/maadan-sannidhi-row.jpg",
      title: "மாடன் சன்னிதிகள் அலங்காரம்",
      description: "Sappani Maadan & Mundan sannidhis, decorated for the Ashtabandhana Maha Kumbabishekam Vizha.",
      filename: "maadan-sannidhi-row.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/maadan-sannidhi-closeup.jpg",
      title: "மாடன் சன்னிதி நெருக்கமான காட்சி",
      description: "Close-up view of a Maadan deity, garlanded for the festival.",
      filename: "maadan-sannidhi-closeup.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/bala-vinayagar-sannidhi.jpg",
      title: "பால வினாயகர் சன்னிதி",
      description: "Bala Vinayagar sannidhi, decorated with garlands and fruit offerings.",
      filename: "bala-vinayagar-sannidhi.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/amman-sannidhi-closeup.jpg",
      title: "அம்மன் சன்னிதி அலங்காரம்",
      description: "Amman sannidhi, beautifully garlanded for the Kumbabishekam festival.",
      filename: "amman-sannidhi-closeup.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-light-decoration.jpg",
      title: "விழா மின் அலங்காரம்",
      description: "Illuminated deity light decoration during the night festival.",
      filename: "festival-light-decoration.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/gopuram-decoration-work.jpg",
      title: "கோவில் கோபுர அலங்காரப் பணி",
      description: "Devotees decorating the temple gopuram ahead of the festival.",
      filename: "gopuram-decoration-work.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-family-group.jpg",
      title: "விழாவில் குடும்பத்துடன்",
      description: "Devotees gathered together during the temple festival.",
      filename: "festival-family-group.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-night-gathering.jpg",
      title: "இரவு நேர விழா கூட்டம்",
      description: "Devotees gathered under the festival pandal at night.",
      filename: "festival-night-gathering.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-children-group.jpg",
      title: "சிறுவர்கள் விழா நினைவு",
      description: "Children at the Ashtabandhana Maha Kumbabishekam Vizha, July 2024.",
      filename: "festival-children-group.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-women-group-1.jpg",
      title: "பெண்கள் விழா குழு புகைப்படம் 1",
      description: "Women devotees at the temple festival.",
      filename: "festival-women-group-1.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/festival-women-group-2.jpg",
      title: "பெண்கள் விழா குழு புகைப்படம் 2",
      description: "Women and children devotees at the temple festival.",
      filename: "festival-women-group-2.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/devotees-outdoor.jpg",
      title: "பக்தர்கள்",
      description: "Devotees at the temple grounds.",
      filename: "devotees-outdoor.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/elder-devotees-night.jpg",
      title: "மூத்த பக்தர்கள்",
      description: "Senior devotees at the night festival.",
      filename: "elder-devotees-night.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/devotee-portrait.jpg",
      title: "பக்தர் நிகழ்ச்சியில்",
      description: "A devotee at the festival grounds.",
      filename: "devotee-portrait.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/devotees-together.jpg",
      title: "நண்பர்களுடன்",
      description: "Devotees together at the temple festival.",
      filename: "devotees-together.jpg",
      mimeType: "image/jpeg",
    },
    {
      sourceUrl: "/media/photos/devotees-refreshments.jpg",
      title: "பக்தர்கள் சிற்றுண்டி நேரம்",
      description: "Devotees enjoying refreshments during the festival.",
      filename: "devotees-refreshments.jpg",
      mimeType: "image/jpeg",
    },
  ];

  try {
    const existing = await listMedia("photo");
    const existingUrls = new Set(existing.map((m) => m.sourceUrl).filter(Boolean));

    // Remove any accidental duplicates already sitting in IndexedDB
    // (e.g. from before this dedupe fix existed).
    const seenUrls = new Set();
    for (const m of existing) {
      if (m.sourceUrl) {
        if (seenUrls.has(m.sourceUrl)) {
          await deleteMedia(m.id);
        } else {
          seenUrls.add(m.sourceUrl);
        }
      }
    }

    for (const p of seedPhotos) {
      if (!existingUrls.has(p.sourceUrl)) {
        await addMedia({ ...p, category: "photo" });
      }
    }
  } catch (e) {
    // If seeding fails (e.g. private browsing blocks IndexedDB), fail silently —
    // the gallery will just show empty state and uploads may not persist.
  }
  })();

  return seedInFlight;
}
