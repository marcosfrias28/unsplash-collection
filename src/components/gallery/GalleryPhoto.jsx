import { defaultImages } from "@/services/data";
import { useMediaStore } from "@/store/MediaStore";

export function GalleryPhoto({index}) {

    const {searchResults, loading} = useMediaStore(state => state)
    const {id, urls, alt_description} = searchResults[index];
    return (
    <a href={id} className={`${loading ? 'blur-lg': ''}`}>
                <img
                id={id}
                src={loading === true ? urls.small : urls.regular}
                alt={alt_description}
                className={`object-cover ${loading ? ' animate-pulse': 'hover:scale-105 duration-150'}  w-full h-full rounded-xl cursor-pointer transition-all duration-1000`}
                />
            </a>
);
}
