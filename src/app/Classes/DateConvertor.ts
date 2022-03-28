export class DateConvertor {

  static UnixToDate(UnixTimeStamp: string): string {
    const date = new Date(UnixTimeStamp);

    return date.getHours() +
      ':' + date.getMinutes() +
      ':' + date.getSeconds() +
      ' ' + date.getDate() +
      '/' + (date.getMonth() + 1) +
      '/' + date.getFullYear();
  }
}
