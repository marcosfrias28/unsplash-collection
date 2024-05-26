// import { column, defineDb, defineTable } from 'astro:db';

// const User = defineTable({
//     columns: {
//         id: column.number({ primaryKey: true, autoIncrement: true }),
//         username: column.text({ unique: true }),
//         email: column.text({ unique: true }),
//         created_at: column.date(),
//     }
// });

// const ShortenedUrls = defineTable({
//     columns: {
//         url_id: column.number({ primaryKey: true, autoIncrement: true }),
//         user_id: column.number(),
//         original_url: column.text(),
//         shortened_url: column.text({ unique: true }),
//         created_at: column.date()
//     }
// });

// const UserSessions = defineTable({
//     columns: {
//         session_id: column.number({ primaryKey: true, autoIncrement: true }),
//         user_id: column.number(),
//         session_token: column.text({ unique: true }),
//         created_at: column.date(),
//         expires_at: column.date()
//     }
// });


// export default defineDb({
//   tables: { User, ShortenedUrls, UserSessions },
// })