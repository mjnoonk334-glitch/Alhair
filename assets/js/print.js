export function printReport(report){

  const html = `
  
  <html dir="rtl">

    <head>

      <title>طباعة تقرير</title>

      <style>

        body{
          font-family:Tahoma;
          padding:40px;
        }

        h1{
          margin-bottom:30px;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        td,th{
          border:1px solid #000;
          padding:12px;
          text-align:center;
        }

      </style>

    </head>

    <body>

      <h1>التقرير اليومي</h1>

      <table>

        <tr>
          <th>التاريخ</th>
          <td>${report.date}</td>
        </tr>

        <tr>
          <th>المشغل</th>
          <td>${report.operator}</td>
        </tr>

        <tr>
          <th>PH</th>
          <td>${report.ph}</td>
        </tr>

        <tr>
          <th>الحرارة</th>
          <td>${report.temperature}</td>
        </tr>

        <tr>
          <th>العكارة</th>
          <td>${report.turbidity}</td>
        </tr>

      </table>

    </body>

  </html>
  
  `;

  const win = window.open();

  win.document.write(html);

  win.document.close();

  win.print();

}
