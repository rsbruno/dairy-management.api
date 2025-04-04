export function formatNumberToMoney(value: number | string): number {
  const numb = Math.round(Number(value) * 100) / 100;
  return isNaN(numb) ? 0 : numb;
}
