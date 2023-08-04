import db from "../../db/index.js";

export const listUsers = async (query) => {
  const {
    q,
    offset = 0,
    limit = 5,
    sort_by = "id",
    sort_order = "desc",
    is_deleted = "",
  } = query;

  const filters = {};
  filters.is_deleted = is_deleted;

  const dbQuery = db("users").select(
    "id",
    "first_name",
    "last_name",
    "username"
  );

  if (q) {
    dbQuery
      .andWhereILike("first_name", `%${q}%`)
      .orWhereILike("last_name", `%${q}%`);
  }

  const total = await dbQuery.clone().count().groupBy("id");

  dbQuery.orderBy(sort_by, sort_order);
  dbQuery.limit(limit).offset(offset);

  const users = await dbQuery;

  res.status(200).json({
    users,
    pageInfo: {
      total: total.length,
      offset,
      limit,
    },
  });
};
