import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useGalleryItems } from "../hooks/useQueries";

const STATIC_PHOTOS = [
  {
    src: "/assets/generated/hero-village.dim_1400x600.jpg",
    caption: "મોટી દૂગડોળ - ગ્રામ દૃશ્ય",
  },
  {
    src: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    caption: "PM Awas Yojana - ઘરનું સપનું",
  },
  {
    src: "/assets/generated/scheme-digital.dim_400x250.jpg",
    caption: "ડિજિટલ ઇન્ડિ૯ - ગ્રામીણ",
  },
  {
    src: "/assets/generated/hero-village.dim_1400x600.jpg",
    caption: "ગ્રામ પંચા૯ત કચેરી",
  },
  {
    src: "/assets/generated/scheme-pmay.dim_400x250.jpg",
    caption: "નવા ઘરનું નિર્માણ",
  },
  {
    src: "/assets/generated/scheme-digital.dim_400x250.jpg",
    caption: "NREGA જૉબ કાર્ડ",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const { data: backendItems } = useGalleryItems();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  const photos =
    backendItems && backendItems.length > 0
      ? backendItems
          .filter((i) => i.type === "photo")
          .map((i) => ({ src: i.blob.getDirectURL(), caption: i.caption }))
      : STATIC_PHOTOS;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-secondary mb-2">
          {t("gallery")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto" />
      </div>

      <div className="flex gap-2 mb-6 justify-center">
        <Button
          variant={tab === "photos" ? "default" : "outline"}
          onClick={() => setTab("photos")}
          className={tab === "photos" ? "bg-primary text-white" : ""}
          data-ocid="gallery.photos.tab"
        >
          📸 Photos
        </Button>
        <Button
          variant={tab === "videos" ? "default" : "outline"}
          onClick={() => setTab("videos")}
          className={tab === "videos" ? "bg-primary text-white" : ""}
          data-ocid="gallery.videos.tab"
        >
          🎥 Videos
        </Button>
      </div>

      {tab === "photos" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <button
              type="button"
              key={photo.caption}
              className="relative overflow-hidden rounded-xl shadow-card cursor-pointer group text-left w-full"
              onClick={() => setLightbox(photo.src)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setLightbox(photo.src);
              }}
              data-ocid="gallery.item.1"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs p-3">{photo.caption}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === "videos" && (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="gallery.videos.empty_state"
        >
          <div className="text-5xl mb-4">🎥</div>
          <p className="text-lg font-medium">ભવિષ્યમાં વિડિઓ ઉમેરાવામાં આવશે</p>
          <p className="text-sm">Videos will be added soon</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 w-full h-full max-w-none m-0 border-0"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
          }}
          data-ocid="gallery.lightbox.modal"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2"
            onClick={() => setLightbox(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightbox(null);
            }}
            data-ocid="gallery.lightbox.close_button"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="Fullscreen view"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </dialog>
      )}
    </div>
  );
}
