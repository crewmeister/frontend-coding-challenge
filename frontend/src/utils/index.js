export function trimText(str, count) {
  if (!str || str.length <= count) return str;

  return str.substr(0, count) + "...";
}

export function getUser(data = []) {
  if (!data.length) {
    return "";
  }

  return data[0];
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
  const lower = str.toLowerCase();
  const upper = str.charAt(0).toUpperCase();

  return upper + lower.slice(1);
}
