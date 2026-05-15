import { toast } from "./helpers.js";

export function validateForm(data) {

  if (!data.dateGreg) {
    toast("يرجى إدخال التاريخ", "danger");
    return false;
  }

  if (!data.station) {
    toast("يرجى إدخال اسم المحطة", "danger");
    return false;
  }

  if (!data.city) {
    toast("يرجى إدخال المدينة", "danger");
    return false;
  }

  return true;
}
