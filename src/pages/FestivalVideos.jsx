import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import MediaGrid from "../components/MediaGrid";
import MediaUploader from "../components/MediaUploader";
import AdminLoginButton from "../components/AdminLoginButton";
import useMediaLibrary from "../hooks/useMediaLibrary";
import { useAdminMode } from "../hooks/useAdminMode.jsx";
import useSEO from "../hooks/useSEO";
import "./Gallery.css";

export default function FestivalVideos() {
  const { isAdmin } = useAdminMode();
  const { items, loading, hasMore, uploadFile, editItem, removeItem, loadMore } = useMediaLibrary("video");

  useSEO({
    title: "Festival Videos | Temple",
    description: "Watch festival video highlights from Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple.",
  });

  return (
    <div>
      <PageHero titleTa="விழாக்காட்சிகள்" titleEn="Festival Videos" subtitle="Relive the festival, moment by moment" />

      <section className="section">
        <div className="container">
          <div className="gallery-page__header">
            <SectionHeader eyebrow="காணொளிகள்" titleTa="விழா காணொளிகள்" titleEn="Festival Video Highlights" />
            <div className="gallery-page__admin"><AdminLoginButton /></div>
          </div>

          {isAdmin && <MediaUploader category="video" onUploaded={uploadFile} />}

          <MediaGrid
            category="video"
            items={items}
            loading={loading}
            hasMore={hasMore}
            isAdmin={isAdmin}
            onLoadMore={loadMore}
            onEdit={editItem}
            onDelete={removeItem}
          />
        </div>
      </section>
    </div>
  );
}
