// js/storage.js

export function saveLocal(data) {

  localStorage.setItem(
    "daily-report",
    JSON.stringify(data)
  );
}

export function loadLocal() {

  const data = localStorage.getItem(
    "daily-report"
  );

  return data ? JSON.parse(data) : null;
}
