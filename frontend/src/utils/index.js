export function trimText(str, count) {
  if (!str || str.length <= count) return str;

  return str.substr(0, count) + "...";
}

export function getStatus(confirmedAt, rejectedAt) {
  let status = "Requested";
  if (confirmedAt) {
    status = "Confirmed";
  }
  if (rejectedAt) {
    status = "Rejected";
  }

  return status;
}

export function capitalize(str) {
  if (!str) {
    return "";
  }

  const lower = str.toLowerCase();
  const upper = str.charAt(0).toUpperCase();

  return upper + lower.slice(1);
}

export function getNumberOfDays(startDate, endDate) {
  return endDate.diff(startDate, "days") + 1;
}

export function handleMessage(loading, error, noData) {
  if (error) {
    return "Something went wrong with backend.";
  }
  if (loading) {
    return "Loading...";
  }
  if (noData) {
    return "No Data Found.";
  }
}
