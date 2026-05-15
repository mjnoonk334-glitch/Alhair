app.js

import {
  createReport,
  getReports
} from "./firebase.js";

import {
  validateReport
} from "./validation.js";

import {
  printReport
} from "./print.js";

let reports = [];

function gv(id){

  return document
    .getElementById(id)
    ?.value
    ?.trim();

}

function toast(msg,type="success"){

  const colors = {

    success:"#198754",
    danger:"#dc3545",
    info:"#0d6efd"

  };

  const div =
    document.createElement("div");

  div.style.cssText = `
    background:${colors[type]};
    color:#fff;
    padding:12px 20px;
    border-radius:10px;
    margin-top:10px;
    font-weight:700;
  `;

  div.textContent = msg;

  document
    .getElementById("toastZone")
    .appendChild(div);

  setTimeout(()=>{

    div.remove();

  },3000);

}

function showLoader(){

  document
    .getElementById("loader")
    .style.display = "flex";

}

function hideLoader(){

  document
    .getElementById("loader")
    .style.display = "none";

}

function collectForm(){

  return {

    dateGreg:
      gv("dateGreg"),

    dayName:
      gv("dayName"),

    station:
      gv("station"),

    city:
      gv("city"),

    nasah_nat:
      gv("nasah_nat"),

    nasah_low:
      gv("nasah_low"),

    nasah_reason:
      gv("nasah_reason"),

    manf_nat:
      gv("manf_nat"),

    manf_low:
      gv("manf_low"),

    manf_reason:
      gv("manf_reason"),

    q_raw_ph:
      gv("q_raw_ph"),

    q_raw_turb:
      gv("q_raw_turb"),

    q_raw_tds:
      gv("q_raw_tds"),

    q_raw_temp:
      gv("q_raw_temp")

  };

}

async function saveReport(){

  try{

    const data =
      collectForm();

    const validation =
      validateReport(data);

    if(!validation.valid){

      toast(
        validation.errors.join("\n"),
        "danger"
      );

      return;
    }

    showLoader();

    await createReport(data);

    toast(
      "تم حفظ التقرير"
    );

    await loadReports();

  }catch(err){

    console.error(err);

    toast(
      "حدث خطأ",
      "danger"
    );

  }finally{

    hideLoader();

  }

}

async function loadReports(){

  reports =
    await getReports();

  renderReports();

}

function renderReports(){

  const container =
    document.getElementById(
      "recordsContainer"
    );

  if(!reports.length){

    container.innerHTML = `
      <p class="text-center text-muted">
        لا توجد تقارير
      </p>
    `;

    return;

  }

  container.innerHTML =
    reports.map(r=>`

    <div class="border rounded p-3 mb-2">

      <div class="fw-bold">

        ${r.dateGreg}

      </div>

      <div>

        ${r.station}

      </div>

      <div class="mt-2 d-flex gap-2">

        <button
          class="btn btn-sm btn-primary"
          onclick='window.printCurrent(${JSON.stringify(r)})'
        >
          طباعة
        </button>

      </div>

    </div>

  `).join("");

}

window.printCurrent = function(r){

  printReport(r);

};

document
  .getElementById("saveBtn")
  .addEventListener(
    "click",
    saveReport
  );

document
  .getElementById("printBtn")
  .addEventListener(
    "click",
    ()=>{

      printReport(
        collectForm()
      );

    }
  );

document
  .getElementById("dateGreg")
  .addEventListener(
    "change",
    function(){

      const days = [

        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"

      ];

      document
        .getElementById("dayName")
        .value =
        days[
          new Date(this.value)
          .getDay()
        ];

    }
  );

loadReports();
