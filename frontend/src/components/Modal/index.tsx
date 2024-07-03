import {useModalContext} from "@/context/modalContext";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useMemo} from "react";
import {XIcon} from "@/components/Icons";
import Image from "next/image";
import {motion} from "framer-motion";
const Modal = () => {
  const {open, closeModal, image, gallery} = useModalContext();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={closeModal} as="div" className="relative z-[1000] ">
        <div className="fixed inset-0 h-screen w-screen overflow-y-auto bg-primary-black-main/40">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="text-chocolate-lite relative flex h-screen w-screen  transform items-center justify-center overflow-hidden rounded-sm bg-primary-black-background py-10 text-left align-middle  shadow-xl transition-all ">
              <div className="absolute right-4 top-5 z-[9999] mix-blend-lighten lg:right-10  lg:top-6 ">
                <button
                  type="button"
                  className=" group z-[100] h-16  w-16 justify-center  rounded-full
                    border-2   border-white text-4xl  font-thin after:absolute after:z-[100] 
                    after:h-full  after:w-full  focus:ring-0  "
                  onClick={closeModal}>
                  <div className="grid h-full w-full place-items-center rounded-full border-2 border-white transition-all md:group-hover:scale-110">
                    <XIcon className="scale-90 text-white transition-all lg:scale-100" />
                  </div>
                </button>
              </div>

              {gallery &&
                gallery.length > 0 &&
                gallery.map((e: any, id: number) => {
                  return (
                    <motion.div
                      animate={{display: image === e ? "block" : "none"}}
                      transition={{duration: 0}}
                      key={id}
                      className=" absolute left-1/2 top-1/2 grid h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 place-items-center">
                      <Image
                        fill
                        fetchPriority="high"
                        src={e || ""}
                        alt="gallery image"
                        className="object-contain"
                      />
                    </motion.div>
                  );
                })}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
