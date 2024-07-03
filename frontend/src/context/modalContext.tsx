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
  const [image, setImage] = useState<string | null | undefined>("");
  const [gallery, setGallery] = useState<Array<string | null | undefined>>([]);

  const openModal = (image: string | null | undefined) => {
    setImage(image);
    setOpen(true);
    // setActiveModal(id);
  };
  const closeModal = () => {
    setImage("");
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
        image,
        gallery,
        setGallery,
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
