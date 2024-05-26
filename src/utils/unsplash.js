import { createApi } from "unsplash-js";

export const api = createApi({
    accessKey: import.meta.env.PUBLIC_UNSPLASH_API_KEY
})