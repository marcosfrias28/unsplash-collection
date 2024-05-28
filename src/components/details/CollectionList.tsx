import { useEffect, useState } from "react";
import Remove from "./RemoveCollection";
import { api } from "@/utils/unsplash";

function CollectionList({ id }) {
    const [relatedCollections, setRelatedCollections] = useState<any[]>([])

    useEffect(() => {
        api.photos.get({ photoId: id }).then(({ response }) => {
            setRelatedCollections(response?.related_collections?.results)
        })
    }, []);
    return (
        <>
            {
                relatedCollections.length > 0 && relatedCollections.map(({ title, total_photos, cover_photo, }, i) => (
                    <div className="w-full flex flex-col gap-4">
                        <div
                            className="group rounded-xl p-2 flex flex-row justify-between hover:bg-cleargray dark:hover:bg-zinc-800 transition-colors duration-300"
                        >
                            <aside className="flex flex-row gap-4">
                                <picture className="">
                                    <img className="h-16 w-16 rounded-lg object-cover" src={cover_photo.urls.small} alt="" />
                                </picture>
                                <div>
                                    <p className="font-bold text-black dark:text-white">
                                        {title}
                                    </p>
                                    <small>{total_photos} Photos</small>
                                </div>
                            </aside>
                            <Remove client:visible />
                        </div>
                    </div>
                ))
            }
        </>

    )
}

export default CollectionList;