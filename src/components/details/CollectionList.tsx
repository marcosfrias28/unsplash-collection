import { useMediaStore } from "@/store/MediaStore";
import { useEffect, useState } from "react";
import Remove from "./RemoveCollection";
import { api } from "@/utils/unsplash";

function CollectionList({ id }) {
    const [relatedCollections, setRelatedCollections] = useState<any[]>([])

    useEffect(() => {
        api.photos.get({ photoId: id }).then(({ response }) => {
            console.log(response.related_collections.results);
            setRelatedCollections(response?.related_collections?.results)
        })
    }, []);
    return (
        <>
            {
                relatedCollections.length > 0 && relatedCollections.map((collection, i) => (
                    <div className="w-full sm:w-[555px] flex flex-col gap-4">
                        <div
                            className="group rounded-xl p-2 flex flex-row justify-between hover:bg-cleargray dark:hover:bg-zinc-800 transition-colors duration-300"
                        >
                            <aside className="flex flex-row gap-4">
                                <picture className="h-16 w-16 rounded-lg bg-slate-100">
                                    <img src="" alt="" />
                                </picture>
                                <div>
                                    <p className="font-bold text-black dark:text-white">
                                        Collection Name
                                    </p>
                                    <small>29 Photos</small>
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