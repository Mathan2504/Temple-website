import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import MediaGrid from "../components/MediaGrid";
import MediaUploader from "../components/MediaUploader";
import AdminLoginButton from "../components/AdminLoginButton";
import useMediaLibrary from "../hooks/useMediaLibrary";
import { useAdminMode } from "../hooks/useAdminMode.jsx";
import useSEO from "../hooks/useSEO";
import "./Gallery.css";

export default function Gallery() {
  const { isAdmin } = useAdminMode();
  const { items, loading, hasMore, uploadFile, editItem, removeItem, loadMore } = useMediaLibrary("photo");

  useSEO({
    title: "Photo Gallery | Temple",
    description: "Browse temple and festival photos from Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple.",
  });

  return (
    <div>
      <PageHero titleTa="புகைப்பட தொகுப்பு" titleEn="Photo Gallery" subtitle="Moments of devotion, captured" />

      <section className="section">
        <div className="container">
          <div className="gallery-page__header">
            <SectionHeader eyebrow="புகைப்படங்கள்" titleTa="கோவில் புகைப்படங்கள்" titleEn="Temple Photo Gallery" />
            <div className="gallery-page__admin"><AdminLoginButton /></div>
          </div>

          {isAdmin && <MediaUploader category="photo" onUploaded={uploadFile} />}

          <MediaGrid
            category="photo"
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
