import { GetTransactionResponse } from "../models/transacton.interface";




export function sortTransactionsByDate (transaction: GetTransactionResponse[]) {
    const updatedDate = transaction.map((t)=> {
      const date = new Date(t.createdAt);
      return {...t, createdAt: date};
    })
    return updatedDate.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}



export function Convert(transaction: GetTransactionResponse[]){
  const sortedArray = sortTransactionsByDate(transaction)
  const updatedData = sortedArray.map((item: any) => {
  
  const formattedDate = formatDateToMonthDayWithSuffix(item.createdAt);

  const hours = item.createdAt.getHours().toString().padStart(2, "0");
  const minutes = item.createdAt.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  // Return the updated object with the formatted date
  return { ...item, formattedDate: formattedDate, formattedTime: formattedTime};
});

return updatedData;


}

function formatDateToMonthDayWithSuffix(date: any) {
  const day = date.getDate();
  const options = { month: 'short' };
  const month = date.toLocaleDateString('en-US', options);

  let dayString;
  if (day >= 11 && day <= 13) {
    dayString = day + 'th';
  } else {
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        dayString = day + 'st';
        break;
      case 2:
        dayString = day + 'nd';
        break;
      case 3:
        dayString = day + 'rd';
        break;
      default:
        dayString = day + 'th';
        break;
    }
  }

  return `${month} ${dayString}`;
}

export function FormatDateToMonthDayAndTime(data: GetTransactionResponse){

  const date = new Date(data.createdAt); 
  const formattedDate = formatDateToMonthDayWithSuffix(date);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const newDateFormat = `${formattedDate}, ${formattedTime}`

  return {...data, createdAt: newDateFormat}
}
