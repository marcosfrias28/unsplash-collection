import { useMediaStore } from "@/store/MediaStore";
import Plus from "../icons/Plus";
import Download from "../icons/Download";
import Remove from "../icons/RemoveCollection";

export function ImageDetails({ id }) {
  if (!id) return;
  const { searchResults, default } = useMediaStore((state) => state);
  const selectedPhoto = searchResults.find((image) => image.id === id);

  const { urls, alt_description, user, created_at, link } = selectedPhoto;

  return (
    <article class="sm:pl-10 place-self-start flex flex-col gap-5">
      <picture class="flex flex-row gap-4 items-center mb-5">
        <img
          class="w-12 h-12 rounded-full bg-slate-100"
          src={selectedPhoto.user.profile_image}
          alt="Photo profile of the Author / Owner of this photo"
        />
        <h3 class="font-bold text-black dark:text-white">{user.name}</h3>
      </picture>
      <small class="text-sm">Published on {created_at}</small>
      <div class="flex flex-row gap-4">
        <div class="rounded-md group flex flex-row gap-2 bg-cleargray text-black px-4 py-2">
          <Plus />
          <button class=""> Add to Collection</button>
        </div>
        <a
          href={link}
          target="_blank"
          class="rounded-md group flex flex-row gap-2 bg-cleargray text-black px-4 py-2 items-center justify-center"
        >
          <Download /> <span>Download</span>
        </a>
      </div>
      <section id="Collections">
        <h3 class="text-xl">Collections</h3>
        <div class="w-full sm:w-[555px] flex flex-col gap-4">
          <div class="group rounded-xl p-2 flex flex-row justify-between hover:bg-cleargray dark:hover:bg-zinc-800 transition-colors duration-300">
            <aside class="flex flex-row gap-4">
              <picture class="h-16 w-16 rounded-lg bg-slate-100">
                <img src="" alt="" />
              </picture>
              <div>
                <p class="font-bold text-black dark:text-white">
                  Collection Name
                </p>
                <small>29 Photos</small>
              </div>
            </aside>
            <Remove
              client:visible
              class="group-hover:opacity-100 opacity-0 transition-opacity justify-self-end self-center flex flex-row gap-2 justify-center items-center"
            />
          </div>
        </div>
      </section>
    </article>
  );
}
