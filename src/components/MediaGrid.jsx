import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import "./MediaGrid.css";

export default function MediaGrid({ category, items, loading, hasMore, isAdmin, onLoadMore, onEdit, onDelete }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const openViewer = (i) => setActiveIndex(i);
  const closeViewer = () => setActiveIndex(null);
  const prev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % items.length);
  };

  const startEdit = (item, e) => {
    e.stopPropagation();
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDesc(item.description);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    await onEdit(editingItem.id, { title: editTitle, description: editDesc });
    setEditingItem(null);
  };

  const confirmDelete = (item, e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${item.title || item.filename}"? This cannot be undone.`)) {
      onDelete(item.id);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="media-grid__loading">
        <Loader2 className="media-grid__spinner" size={26} /> Loading...
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="media-grid__empty">
        <ImageIcon size={30} />
        <p>No {category === "photo" ? "photos" : "videos"} uploaded yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`media-grid ${category === "photo" ? "media-grid--masonry" : ""}`}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="media-grid__tile glass-card temple-border"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
          >
            <button className="media-grid__thumb" onClick={() => openViewer(i)} aria-label={`Open ${item.title}`}>
              {category === "photo" ? (
                <img src={item.url} alt={item.title} loading="lazy" className="media-grid__img" />
              ) : (
                <>
                  <video src={item.url} muted preload="metadata" className="media-grid__img" />
                  <span className="media-grid__play"><Play size={22} fill="currentColor" /></span>
                </>
              )}
            </button>

            {isAdmin && (
              <div className="media-grid__admin-actions">
                <button onClick={(e) => startEdit(item, e)} aria-label="Edit"><Pencil size={14} /></button>
                <button onClick={(e) => confirmDelete(item, e)} aria-label="Delete"><Trash2 size={14} /></button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="media-grid__load-more">
          <button className="btn btn-outline" onClick={onLoadMore}>Load More</button>
        </div>
      )}

      {/* VIEWER: lightbox for photos, modal player for videos */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="media-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
            role="dialog"
            aria-modal="true"
          >
            <button className="media-viewer__close" onClick={closeViewer} aria-label="Close">
              <X size={26} />
            </button>
            {items.length > 1 && (
              <>
                <button className="media-viewer__nav media-viewer__nav--prev" onClick={prev} aria-label="Previous">
                  <ChevronLeft size={28} />
                </button>
                <button className="media-viewer__nav media-viewer__nav--next" onClick={next} aria-label="Next">
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="media-viewer__content" onClick={(e) => e.stopPropagation()}>
              {category === "photo" ? (
                <img src={items[activeIndex].url} alt={items[activeIndex].title} />
              ) : (
                <video
                  src={items[activeIndex].url}
                  controls
                  autoPlay
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            className="media-edit-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingItem(null)}
          >
            <motion.form
              className="media-edit-form glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={saveEdit}
            >
              <h3>Edit details</h3>
              <label>
                Title
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </label>
              <label>
                Description
                <textarea rows={3} value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
              </label>
              <div className="media-edit-form__actions">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingItem(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">Save</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
