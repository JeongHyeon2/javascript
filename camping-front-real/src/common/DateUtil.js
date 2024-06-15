export function getDateFormat(myDate) {
  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1 필요
  const date = String(myDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}
