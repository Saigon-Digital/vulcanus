"use client";

import React, {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
} from "react";
import TSwiper from "swiper";
export const ModalContext = createContext<any>(null);

export const ModalContextProvider = ({children}: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(0);
  const [gallery, setGallery] = useState<any[]>([]);
  const [swiper, setSwiper] = useState<TSwiper | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openModal = (id: number, gallery: any[]) => {
    setOpen(true);
    setActiveModal(id);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const enterFullScreen = () => {
    if (typeof document.documentElement === undefined) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };
  const exitFullScreen = () => {
    if (typeof document.documentElement === undefined) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };
  return (
    <ModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        gallery,

        activeModal,
        setActiveModal,
        enterFullScreen,
        exitFullScreen,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
