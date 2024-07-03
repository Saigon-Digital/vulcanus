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
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
