// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type Welcome = {
    total:      number;
    totalPages: number;
    results:    Result[];
}

export type Result = {
    id:                     string;
    slug:                   string;
    alternativeSlugs:       AlternativeSlugs;
    createdAt:              Date;
    updatedAt:              Date;
    promotedAt:             Date;
    width:                  number;
    height:                 number;
    color:                  string;
    blurHash:               string;
    description:            null | string;
    altDescription:         string;
    breadcrumbs:            Breadcrumb[];
    urls:                   Urls;
    links:                  ResultLinks;
    likes:                  number;
    likedByUser:            boolean;
    currentUserCollections: any[];
    sponsorship:            null;
    topicSubmissions:       ResultTopicSubmissions;
    assetType:              AssetType;
    user:                   User;
    tags:                   Tag[];
}

export type AlternativeSlugs = {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
}

export enum AssetType {
    Photo = "photo",
}

export type Breadcrumb = {
    slug:  string;
    title: string;
    index: number;
    type:  Type;
}

export enum Type {
    LandingPage = "landing_page",
    Search = "search",
}

export type ResultLinks = {
    self:             string;
    html:             string;
    download:         string;
    downloadLocation: string;
}

export type Tag = {
    type:    Type;
    title:   string;
    source?: Source;
}

export type Source = {
    ancestry:        Ancestry;
    title:           string;
    subtitle:        string;
    description:     string;
    metaTitle:       string;
    metaDescription: string;
    coverPhoto:      CoverPhoto;
}

export type Ancestry = {
    type:         Category;
    category:     Category;
    subcategory?: Category;
}

export type Category = {
    slug:       string;
    prettySlug: string;
}

export type CoverPhoto = {
    id:                     string;
    slug:                   string;
    alternativeSlugs:       AlternativeSlugs;
    createdAt:              Date;
    updatedAt:              Date;
    promotedAt:             Date | null;
    width:                  number;
    height:                 number;
    color:                  string;
    blurHash:               string;
    description:            null | string;
    altDescription:         string;
    breadcrumbs:            Breadcrumb[];
    urls:                   Urls;
    links:                  ResultLinks;
    likes:                  number;
    likedByUser:            boolean;
    currentUserCollections: any[];
    sponsorship:            null;
    topicSubmissions:       CoverPhotoTopicSubmissions;
    assetType:              AssetType;
    premium?:               boolean;
    plus?:                  boolean;
    user:                   User;
}

export type CoverPhotoTopicSubmissions = {
    nature?:           CoolTones;
    wallpapers?:       CoolTones;
    texturesPatterns?: CoolTones;
}

export type CoolTones = {
    status:     Status;
    approvedOn: Date;
}

export enum Status {
    Approved = "approved",
}

export type Urls = {
    raw:     string;
    full:    string;
    regular: string;
    small:   string;
    thumb:   string;
    smallS3: string;
}

export type User = {
    id:                         string;
    updatedAt:                  Date;
    username:                   string;
    name:                       string;
    firstName:                  string;
    lastName:                   string;
    twitterUsername:            null | string;
    portfolioURL:               null | string;
    bio:                        null | string;
    location:                   null | string;
    links:                      UserLinks;
    profileImage:               ProfileImage;
    instagramUsername:          null | string;
    totalCollections:           number;
    totalLikes:                 number;
    totalPhotos:                number;
    totalPromotedPhotos:        number;
    totalIllustrations:         number;
    totalPromotedIllustrations: number;
    acceptedTos:                boolean;
    forHire:                    boolean;
    social:                     Social;
}

export type UserLinks = {
    self:      string;
    html:      string;
    photos:    string;
    likes:     string;
    portfolio: string;
    following: string;
    followers: string;
}

export type ProfileImage = {
    small:  string;
    medium: string;
    large:  string;
}

export type Social = {
    instagramUsername: null | string;
    portfolioURL:      null | string;
    twitterUsername:   null | string;
    paypalEmail:       null;
}

export type ResultTopicSubmissions = {
    coolTones?:         CoolTones;
    nature?:            CoolTones;
    streetPhotography?: CoolTones;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): Welcome {
        return cast(JSON.parse(json), r("Welcome"));
    }

    public static welcomeToJson(value: Welcome): string {
        return JSON.stringify(uncast(value, r("Welcome")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "total", js: "total", typ: 0 },
        { json: "total_pages", js: "totalPages", typ: 0 },
        { json: "results", js: "results", typ: a(r("Result")) },
    ], false),
    "Result": o([
        { json: "id", js: "id", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "alternative_slugs", js: "alternativeSlugs", typ: r("AlternativeSlugs") },
        { json: "created_at", js: "createdAt", typ: Date },
        { json: "updated_at", js: "updatedAt", typ: Date },
        { json: "promoted_at", js: "promotedAt", typ: Date },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "color", js: "color", typ: "" },
        { json: "blur_hash", js: "blurHash", typ: "" },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "alt_description", js: "altDescription", typ: "" },
        { json: "breadcrumbs", js: "breadcrumbs", typ: a(r("Breadcrumb")) },
        { json: "urls", js: "urls", typ: r("Urls") },
        { json: "links", js: "links", typ: r("ResultLinks") },
        { json: "likes", js: "likes", typ: 0 },
        { json: "liked_by_user", js: "likedByUser", typ: true },
        { json: "current_user_collections", js: "currentUserCollections", typ: a("any") },
        { json: "sponsorship", js: "sponsorship", typ: null },
        { json: "topic_submissions", js: "topicSubmissions", typ: r("ResultTopicSubmissions") },
        { json: "asset_type", js: "assetType", typ: r("AssetType") },
        { json: "user", js: "user", typ: r("User") },
        { json: "tags", js: "tags", typ: a(r("Tag")) },
    ], false),
    "AlternativeSlugs": o([
        { json: "en", js: "en", typ: "" },
        { json: "es", js: "es", typ: "" },
        { json: "ja", js: "ja", typ: "" },
        { json: "fr", js: "fr", typ: "" },
        { json: "it", js: "it", typ: "" },
        { json: "ko", js: "ko", typ: "" },
        { json: "de", js: "de", typ: "" },
        { json: "pt", js: "pt", typ: "" },
    ], false),
    "Breadcrumb": o([
        { json: "slug", js: "slug", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "index", js: "index", typ: 0 },
        { json: "type", js: "type", typ: r("Type") },
    ], false),
    "ResultLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "download", js: "download", typ: "" },
        { json: "download_location", js: "downloadLocation", typ: "" },
    ], false),
    "Tag": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "title", js: "title", typ: "" },
        { json: "source", js: "source", typ: u(undefined, r("Source")) },
    ], false),
    "Source": o([
        { json: "ancestry", js: "ancestry", typ: r("Ancestry") },
        { json: "title", js: "title", typ: "" },
        { json: "subtitle", js: "subtitle", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "meta_title", js: "metaTitle", typ: "" },
        { json: "meta_description", js: "metaDescription", typ: "" },
        { json: "cover_photo", js: "coverPhoto", typ: r("CoverPhoto") },
    ], false),
    "Ancestry": o([
        { json: "type", js: "type", typ: r("Category") },
        { json: "category", js: "category", typ: r("Category") },
        { json: "subcategory", js: "subcategory", typ: u(undefined, r("Category")) },
    ], false),
    "Category": o([
        { json: "slug", js: "slug", typ: "" },
        { json: "pretty_slug", js: "prettySlug", typ: "" },
    ], false),
    "CoverPhoto": o([
        { json: "id", js: "id", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "alternative_slugs", js: "alternativeSlugs", typ: r("AlternativeSlugs") },
        { json: "created_at", js: "createdAt", typ: Date },
        { json: "updated_at", js: "updatedAt", typ: Date },
        { json: "promoted_at", js: "promotedAt", typ: u(Date, null) },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "color", js: "color", typ: "" },
        { json: "blur_hash", js: "blurHash", typ: "" },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "alt_description", js: "altDescription", typ: "" },
        { json: "breadcrumbs", js: "breadcrumbs", typ: a(r("Breadcrumb")) },
        { json: "urls", js: "urls", typ: r("Urls") },
        { json: "links", js: "links", typ: r("ResultLinks") },
        { json: "likes", js: "likes", typ: 0 },
        { json: "liked_by_user", js: "likedByUser", typ: true },
        { json: "current_user_collections", js: "currentUserCollections", typ: a("any") },
        { json: "sponsorship", js: "sponsorship", typ: null },
        { json: "topic_submissions", js: "topicSubmissions", typ: r("CoverPhotoTopicSubmissions") },
        { json: "asset_type", js: "assetType", typ: r("AssetType") },
        { json: "premium", js: "premium", typ: u(undefined, true) },
        { json: "plus", js: "plus", typ: u(undefined, true) },
        { json: "user", js: "user", typ: r("User") },
    ], false),
    "CoverPhotoTopicSubmissions": o([
        { json: "nature", js: "nature", typ: u(undefined, r("CoolTones")) },
        { json: "wallpapers", js: "wallpapers", typ: u(undefined, r("CoolTones")) },
        { json: "textures-patterns", js: "texturesPatterns", typ: u(undefined, r("CoolTones")) },
    ], false),
    "CoolTones": o([
        { json: "status", js: "status", typ: r("Status") },
        { json: "approved_on", js: "approvedOn", typ: Date },
    ], false),
    "Urls": o([
        { json: "raw", js: "raw", typ: "" },
        { json: "full", js: "full", typ: "" },
        { json: "regular", js: "regular", typ: "" },
        { json: "small", js: "small", typ: "" },
        { json: "thumb", js: "thumb", typ: "" },
        { json: "small_s3", js: "smallS3", typ: "" },
    ], false),
    "User": o([
        { json: "id", js: "id", typ: "" },
        { json: "updated_at", js: "updatedAt", typ: Date },
        { json: "username", js: "username", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "first_name", js: "firstName", typ: "" },
        { json: "last_name", js: "lastName", typ: "" },
        { json: "twitter_username", js: "twitterUsername", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolioURL", typ: u(null, "") },
        { json: "bio", js: "bio", typ: u(null, "") },
        { json: "location", js: "location", typ: u(null, "") },
        { json: "links", js: "links", typ: r("UserLinks") },
        { json: "profile_image", js: "profileImage", typ: r("ProfileImage") },
        { json: "instagram_username", js: "instagramUsername", typ: u(null, "") },
        { json: "total_collections", js: "totalCollections", typ: 0 },
        { json: "total_likes", js: "totalLikes", typ: 0 },
        { json: "total_photos", js: "totalPhotos", typ: 0 },
        { json: "total_promoted_photos", js: "totalPromotedPhotos", typ: 0 },
        { json: "total_illustrations", js: "totalIllustrations", typ: 0 },
        { json: "total_promoted_illustrations", js: "totalPromotedIllustrations", typ: 0 },
        { json: "accepted_tos", js: "acceptedTos", typ: true },
        { json: "for_hire", js: "forHire", typ: true },
        { json: "social", js: "social", typ: r("Social") },
    ], false),
    "UserLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "photos", js: "photos", typ: "" },
        { json: "likes", js: "likes", typ: "" },
        { json: "portfolio", js: "portfolio", typ: "" },
        { json: "following", js: "following", typ: "" },
        { json: "followers", js: "followers", typ: "" },
    ], false),
    "ProfileImage": o([
        { json: "small", js: "small", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "large", js: "large", typ: "" },
    ], false),
    "Social": o([
        { json: "instagram_username", js: "instagramUsername", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolioURL", typ: u(null, "") },
        { json: "twitter_username", js: "twitterUsername", typ: u(null, "") },
        { json: "paypal_email", js: "paypalEmail", typ: null },
    ], false),
    "ResultTopicSubmissions": o([
        { json: "cool-tones", js: "coolTones", typ: u(undefined, r("CoolTones")) },
        { json: "nature", js: "nature", typ: u(undefined, r("CoolTones")) },
        { json: "street-photography", js: "streetPhotography", typ: u(undefined, r("CoolTones")) },
    ], false),
    "AssetType": [
        "photo",
    ],
    "Type": [
        "landing_page",
        "search",
    ],
    "Status": [
        "approved",
    ],
};
