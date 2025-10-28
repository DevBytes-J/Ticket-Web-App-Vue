export const getPriorityColor = (priority) => {
  const colors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };
  return colors[priority] || colors.medium;
};

export const getStatusColor = (status) => {
  const colors = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-amber-100 text-amber-800",
    closed: "bg-gray-100 text-gray-800",
  };
  return colors[status] || colors.open;
};
