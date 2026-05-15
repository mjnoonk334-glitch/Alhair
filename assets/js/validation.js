export function validateForm(data){

  const errors = [];

  if(!data.date){
    errors.push("التاريخ مطلوب");
  }

  if(!data.operator){
    errors.push("اسم المشغل مطلوب");
  }

  if(data.ph < 6.5 || data.ph > 8.5){
    errors.push("قيمة PH غير صحيحة");
  }

  if(data.temperature < 0 || data.temperature > 60){
    errors.push("درجة الحرارة غير منطقية");
  }

  if(data.turbidity < 0){
    errors.push("العكارة غير صحيحة");
  }

  return {
    valid: errors.length === 0,
    errors
  };

}
