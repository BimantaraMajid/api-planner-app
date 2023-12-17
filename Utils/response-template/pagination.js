module.exports = ({
  items = [],
  page = 1,
  limit = 0,
  totalItems = 0,
}) => ({
  page,
  total_pages: Math.ceil(totalItems / limit),
  total_items: totalItems,
  items,
});
