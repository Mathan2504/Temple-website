import { useCallback, useEffect, useState } from "react";
import { addMedia, deleteMedia, listMedia, mediaUrl, seedInitialMedia, updateMedia } from "../services/mediaStore";

const PAGE_SIZE = 8;

export default function useMediaLibrary(category) {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await seedInitialMedia();
      const items = await listMedia(category);
      setAllItems(items);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const uploadFile = useCallback(
    async (file, { title, description }, onProgress) => {
      // Simulated progress — IndexedDB writes are near-instant, but a
      // visible progress bar matches the UX of a real network upload.
      onProgress?.(15);
      await new Promise((r) => setTimeout(r, 150));
      onProgress?.(55);
      const record = await addMedia({
        file,
        category,
        title,
        description,
        mimeType: file.type,
        filename: file.name,
      });
      onProgress?.(100);
      setAllItems((prev) => [record, ...prev]);
      return record;
    },
    [category]
  );

  const editItem = useCallback(async (id, patch) => {
    const updated = await updateMedia(id, patch);
    setAllItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
  }, []);

  const removeItem = useCallback(async (id) => {
    await deleteMedia(id);
    setAllItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => c + PAGE_SIZE);
  }, []);

  const visibleItems = allItems.slice(0, visibleCount).map((item) => ({
    ...item,
    url: mediaUrl(item),
  }));

  return {
    items: visibleItems,
    total: allItems.length,
    hasMore: visibleCount < allItems.length,
    loading,
    uploadFile,
    editItem,
    removeItem,
    loadMore,
    refresh,
  };
}
