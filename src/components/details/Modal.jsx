import { useMediaStore } from "@/store/MediaStore";

export function Modal({id}) {
    const selectedImage = useMediaStore(state => state.selectedImage)

    return (
    <div
        id="imageModal"
        class="hidden absolute w-full h-full sm:w-3/4 sm:h-3/4 mx-auto my-1/2 left-0 right-0 z-50 backdrop:blur-xl backdrop-brightness-50"
      >
        <img
          id={id}
          src={url || selectedImage?.urls.regular}
          alt={alt_description || selectedImage?.alt_description}
          className={`object-cover ${
            loading ? "blur-3xl animate-pulse" : "hover:scale-105 duration-150"
          }  w-full h-full rounded-xl cursor-pointer transition-all duration-1000`}
        />
        <button
          id="closeModal"
          class="absolute uppercase right-0 top-0 px-3 py-1 m-5 text-4xl font-black bg-black/20 rounded-xl"
          >x</button
        >
      </div> 
      )}

export default Modal;