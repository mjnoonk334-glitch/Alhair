import { qs } from "./helpers.js";

export function printReport(data) {

  const printPage = qs("#print-page");

  printPage.innerHTML = `

  <div class="print-wrapper">

    <h2>تقرير التشغيل اليومي</h2>

    <table class="table table-bordered">

      <tr>
        <td>التاريخ</td>
        <td>${data.dateGreg}</td>
      </tr>

      <tr>
        <td>اليوم</td>
        <td>${data.dayName}</td>
      </tr>

      <tr>
        <td>المحطة</td>
        <td>${data.station}</td>
      </tr>

      <tr>
        <td>المدينة</td>
        <td>${data.city}</td>
      </tr>

    </table>

  </div>
  `;

  window.print();
}
