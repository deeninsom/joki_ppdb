/* eslint-disable @typescript-eslint/no-explicit-any */
export const FormateDateLocal = (dates: any) => {
  const date = new Date(dates);

  // Options for formatting
  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Jakarta', // Specify the time zone for Indonesia
  };

  // Format the date to the local time zone and locale
  const formattedDate = date.toLocaleString('id-ID', options);
  return formattedDate
}