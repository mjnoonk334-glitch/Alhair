// js/helpers.js

export const qs = (el) => document.querySelector(el);

export const qsa = (el) => document.querySelectorAll(el);

export function getDayName(dateString) {

  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  ];

  return days[new Date(dateString).getDay()];
}

export function showLoader() {
  qs("#loader").style.display = "flex";
}

export function hideLoader() {
  qs("#loader").style.display = "none";
}

export function toast(message, type = "success") {

  const toastZone = qs("#toastZone");

  const div = document.createElement("div");

  div.className = `alert alert-${type} shadow`;

  div.innerText = message;

  toastZone.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}
