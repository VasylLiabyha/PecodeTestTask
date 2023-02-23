export const createEmail = () => {
  const email = 'user_' + Math.trunc(Math.random() * 100000) + '@gmail.com';
  return email;
};

export const toMoney = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(value);
};



export const user = {
  email : 'super@admin.com',
  password : "password!1"
};

export function getDateFromNow(days, months, years) {

  let date = new Date(); 
  
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);

   return formateDate(date);    
}

function formateDate (date) {

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;   
};

