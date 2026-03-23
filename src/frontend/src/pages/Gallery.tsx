import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useGalleryItems } from "../hooks/useQueries";

const STATIC_PHOTOS = [
  {
    src: "/assets/uploads/1774236779820-019d1b6d-7cd1-7502-806f-08a0894fdeaa-7.png",
    caption: "Moti Dugdol Gram Panchayat - Official Notice Board",
  },
  {
    src: "/assets/uploads/1774236789866-019d1b6d-839e-7138-9324-50a28b53390a-8.png",
    caption: "Moti Dugdol Gram Panchayat Logo",
  },
  {
    src: "/assets/uploads/1774278400983-019d1b6d-8c90-728e-9ecd-30cf2c5a515a-10.png",
    caption: "E Gram Panchayat Gujarat - Daily Update",
  },
  {
    src: "/assets/uploads/1774194740365-019d1b6d-8a71-717a-ad9b-b796e8eb8024-9.png",
    caption: "મોટી દૂગડોળ ગ્રામ પંચાયત - અતિ મહત્વની જાહેરાત",
  },
  {
    src: "/assets/uploads/1774236532004-019d1b6d-8d50-7797-8fc4-48afd9a13cd8-11.png",
    caption: "E Gram Panchayat Gujarat Banner",
  },
  {
    src: "/assets/uploads/1774234715974-019d1b6d-8e8c-736d-9c1a-f6ac6c691561-12.png",
    caption: "મોટી દૂગડોળ ગ્રામ પંચાયત - વેરા વસૂલાત",
  },
  {
    src: "/assets/uploads/1774235141353-019d1b6d-92ba-772e-880c-4b1c3f506ba1-13.png",
    caption: "મુખ્ય હેડલાઈન્સ - 23 March 2026",
  },
  {
    src: "/assets/uploads/1774184120545-019d1b6d-9488-73f4-bcbb-f4cb3f0be9fb-14.png",
    caption: "સંદેશ - વસ્તી ગણતરી 2027",
  },
  {
    src: "/assets/uploads/1774154691392_2-019d1b6d-6fac-7525-8494-ac18eef3f19f-2.png",
    caption: "ડિજિટલ સરકારી સેવાઓ - BHASHINI",
  },
  {
    src: "/assets/uploads/1774154544958_2-019d1b6d-727b-75a9-b2d4-6c76b7bcfbed-5.png",
    caption: "E-Nagar Gujarat Portal",
  },
  {
    src: "/assets/uploads/1774154544958_1-019d1b6d-7261-752f-990b-a2a5f3061f7c-6.png",
    caption: "Digital Gujarat - Government Services",
  },
  {
    src: "/assets/uploads/img-20260323-wa0026-019d1b6d-6f75-76f3-9a49-0335b7542dda-1.jpg",
    caption: "Vasudhaiva Kutumbakam - One Earth One Family",
  },
  {
    src: "/assets/uploads/img-20260323-wa0024-019d1b6d-6fc2-731b-8163-4ecf2daaba98-3.jpg",
    caption: "E-Nagar AI Chatbot - Digital Services",
  },
  {
    src: "/assets/uploads/img-20260323-wa0027-019d1b6d-6fb1-76db-90e5-e3bceafdbee5-4.jpg",
    caption: "ન્યૂઝ - સરપ્રાઈઝ ન્યૂઝ",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const { data: backendItems } = useGalleryItems();
  const [lightbox, setLightbox] = useState<{
    src: string;
    caption: string;
  } | null>(null);
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
          {photos.map((photo, idx) => (
            <button
              type="button"
              key={photo.src}
              className="relative overflow-hidden rounded-xl shadow-card cursor-pointer group text-left w-full"
              onClick={() => setLightbox(photo)}
              data-ocid={`gallery.item.${idx + 1}`}
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
            data-ocid="gallery.lightbox.close_button"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center gap-3 max-w-4xl w-full">
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-sm text-center px-4">
              {lightbox.caption}
            </p>
          </div>
        </dialog>
      )}
    </div>
  );
}
