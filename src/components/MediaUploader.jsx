import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, CheckCircle2, AlertCircle, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import "./MediaUploader.css";

const ACCEPT_BY_CATEGORY = {
  photo: { mimes: ["image/jpeg", "image/jpg", "image/png", "image/webp"], label: "JPG, JPEG, PNG, WEBP", accept: "image/jpeg,image/png,image/webp" },
  video: { mimes: ["video/mp4", "video/quicktime", "video/webm"], label: "MP4, MOV, WEBM", accept: "video/mp4,video/quicktime,video/webm" },
};

const MAX_FILE_MB = 100;

function makeQueueItem(file) {
  return {
    key: `${file.name}_${file.size}_${Math.random().toString(36).slice(2, 7)}`,
    file,
    title: file.name.replace(/\.[^.]+$/, ""),
    description: "",
    previewUrl: URL.createObjectURL(file),
    status: "pending", // pending | uploading | done | error
    progress: 0,
    error: "",
  };
}

export default function MediaUploader({ category, onUploaded }) {
  const [queue, setQueue] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const config = ACCEPT_BY_CATEGORY[category];

  const validateFile = (file) => {
    if (!config.mimes.includes(file.type)) {
      return `Unsupported file type. Allowed: ${config.label}`;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      return `File is too large. Max ${MAX_FILE_MB}MB.`;
    }
    return null;
  };

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList);
      const items = files.map((file) => {
        const item = makeQueueItem(file);
        const err = validateFile(file);
        if (err) {
          item.status = "error";
          item.error = err;
        }
        return item;
      });
      setQueue((prev) => [...items, ...prev]);
    },
    [config]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const updateItem = (key, patch) => {
    setQueue((prev) => prev.map((it) => (it.key === key ? { ...it, ...patch } : it)));
  };

  const removeItem = (key) => {
    setQueue((prev) => prev.filter((it) => it.key !== key));
  };

  const uploadItem = async (item) => {
    updateItem(item.key, { status: "uploading", progress: 5 });
    try {
      await onUploaded(item.file, { title: item.title, description: item.description }, (pct) =>
        updateItem(item.key, { progress: pct })
      );
      updateItem(item.key, { status: "done", progress: 100 });
      setTimeout(() => removeItem(item.key), 1800);
    } catch (err) {
      updateItem(item.key, { status: "error", error: "Upload failed. Please try again." });
    }
  };

  const uploadAll = () => {
    queue.filter((it) => it.status === "pending").forEach(uploadItem);
  };

  return (
    <div className="media-uploader">
      <div
        className={`media-uploader__dropzone ${isDragging ? "media-uploader__dropzone--active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <UploadCloud size={30} color="var(--saffron)" />
        <p>
          <strong>Drag &amp; drop</strong> {category === "photo" ? "photos" : "videos"} here, or click to browse
        </p>
        <span className="media-uploader__hint">Accepted: {config.label} · Max {MAX_FILE_MB}MB each</span>
        <input
          ref={inputRef}
          type="file"
          accept={config.accept}
          multiple
          hidden
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      <AnimatePresence>
        {queue.length > 0 && (
          <motion.div
            className="media-uploader__queue"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {queue.some((it) => it.status === "pending") && (
              <button className="btn btn-primary btn-sm media-uploader__upload-all" onClick={uploadAll}>
                Upload All
              </button>
            )}

            {queue.map((item) => (
              <div key={item.key} className="media-uploader__item glass-card">
                <div className="media-uploader__preview">
                  {category === "photo" ? (
                    <img src={item.previewUrl} alt={item.title} />
                  ) : (
                    <video src={item.previewUrl} muted />
                  )}
                </div>

                <div className="media-uploader__fields">
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    disabled={item.status !== "pending" && item.status !== "error"}
                    onChange={(e) => updateItem(item.key, { title: e.target.value })}
                  />
                  <textarea
                    rows={2}
                    placeholder="Description (optional)"
                    value={item.description}
                    disabled={item.status !== "pending" && item.status !== "error"}
                    onChange={(e) => updateItem(item.key, { description: e.target.value })}
                  />

                  {item.status === "uploading" && (
                    <div className="media-uploader__progress">
                      <div className="media-uploader__progress-bar" style={{ width: `${item.progress}%` }} />
                    </div>
                  )}

                  {item.status === "error" && (
                    <p className="media-uploader__msg media-uploader__msg--error">
                      <AlertCircle size={14} /> {item.error}
                    </p>
                  )}

                  {item.status === "done" && (
                    <p className="media-uploader__msg media-uploader__msg--success">
                      <CheckCircle2 size={14} /> Uploaded successfully
                    </p>
                  )}

                  {(item.status === "pending" || item.status === "error") && (
                    <div className="media-uploader__actions">
                      <button className="btn btn-primary btn-sm" onClick={() => uploadItem(item)}>
                        {category === "photo" ? <ImageIcon size={14} /> : <VideoIcon size={14} />} Upload
                      </button>
                      <button className="media-uploader__remove" onClick={() => removeItem(item.key)} aria-label="Remove">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
