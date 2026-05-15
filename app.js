import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "./firebase.js";

import {
  qs,
  getDayName,
  toast,
  showLoader,
  hideLoader
} from "./helpers.js";

import { validateForm } from "./validation.js";

import {
  saveLocal,
  loadLocal
} from "./storage.js";

import { printReport } from "./print.js";

import { createRecordCard } from "./ui.js";

const saveBtn = qs("#saveBtn");

const printBtn = qs("#printBtn");

const dateGreg = qs("#dateGreg");

const dayName = qs("#dayName");

const recordsContainer = qs("#recordsContainer");

dateGreg.addEventListener("change", () => {

  dayName.value = getDayName(
    dateGreg.value
  );
});

function getFormData() {

  return {

    dateGreg: qs("#dateGreg").value,

    dayName: qs("#dayName").value,

    station: qs("#station").value,

    city: qs("#city").value,

    production: {

      nasah: {
        normal: qs("#nasah_nat").value,
        low: qs("#nasah_low").value,
        reason: qs("#nasah_reason").value
      },

      manf: {
        normal: qs("#manf_nat").value,
        low: qs("#manf_low").value,
        reason: qs("#manf_reason").value
      }
    },

    quality: {

      ph: qs("#q_raw_ph").value,

      turbidity: qs("#q_raw_turb").value,

      tds: qs("#q_raw_tds").value,

      temp: qs("#q_raw_temp").value
    }
  };
}

saveBtn.addEventListener("click", async () => {

  const data = getFormData();

  if (!validateForm(data)) return;

  try {

    showLoader();

    saveLocal(data);

    await addDoc(
      collection(db, "reports"),
      {
        ...data,
        createdAt: serverTimestamp()
      }
    );

    toast("تم حفظ التقرير بنجاح");

    loadReports();

  } catch (error) {

    console.error(error);

    toast("فشل الحفظ", "danger");

  } finally {

    hideLoader();
  }
});

printBtn.addEventListener("click", () => {

  const data = getFormData();

  if (!validateForm(data)) return;

  printReport(data);
});

async function loadReports() {

  try {

    recordsContainer.innerHTML = "";

    const q = query(
      collection(db, "reports"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((docItem) => {

      const data = {
        id: docItem.id,
        ...docItem.data()
      };

      recordsContainer.innerHTML +=
        createRecordCard(data);
    });

    bindDelete();

  } catch (error) {

    console.error(error);
  }
}

function bindDelete() {

  const buttons =
    document.querySelectorAll(".delete-btn");

  buttons.forEach((btn) => {

    btn.addEventListener("click", async () => {

      const id = btn.dataset.id;

      if (!confirm("حذف التقرير؟")) return;

      try {

        await deleteDoc(
          doc(db, "reports", id)
        );

        toast("تم الحذف");

        loadReports();

      } catch (error) {

        toast("فشل الحذف", "danger");
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {

  const localData = loadLocal();

  if (localData) {

    qs("#dateGreg").value =
      localData.dateGreg || "";

    qs("#dayName").value =
      localData.dayName || "";

    qs("#station").value =
      localData.station || "";

    qs("#city").value =
      localData.city || "";
  }

  loadReports();
});
