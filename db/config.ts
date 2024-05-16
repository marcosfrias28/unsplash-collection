import { column, defineDb, defineTable } from 'astro:db';

const Users = defineTable({
    columns: {
        id: column.number(),
        username: column.text({primaryKey: true}),
        password: column.text(),
        mail: column.text()
    }
})

const Collections = defineTable({
    columns: {
        id: column.number({primaryKey: true}),
    }
})


export default defineDb({
  tables: { Users, Collections },
})