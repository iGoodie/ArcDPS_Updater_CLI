declare global {
  interface Date {
    formatDate: () => string;
  }
}

Date.prototype.formatDate = function () {
  const year = this.getFullYear();
  const month = this.getMonth().toString();
  const day = this.getDay().toString();
  const hours = this.getHours().toString();
  const minutes = this.getMinutes().toString();
  return (
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` +
    " " +
    `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
  );
};

export default {}; // Why tho?
