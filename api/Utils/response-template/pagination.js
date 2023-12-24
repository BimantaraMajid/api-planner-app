module.exports = ({
  items = [],
  page = 1,
  limit = 0,
  totalItems = 0,
}) => ({
  page,
  totalPages: Math.ceil(totalItems / limit),
  totalItems,
  items,
});
