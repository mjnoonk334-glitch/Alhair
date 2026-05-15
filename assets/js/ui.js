export function createRecordCard(record) {

  return `
  
  <div class="record-card">

    <div class="d-flex justify-content-between">

      <div>
        <h5>${record.station}</h5>
        <small>${record.dateGreg}</small>
      </div>

      <div>
        <button
          class="btn btn-sm btn-danger delete-btn"
          data-id="${record.id}"
        >
          حذف
        </button>
      </div>

    </div>

  </div>
  `;
}
