import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const HOLIDAYS = ["Saturday", "Sunday"];

export function getDeliveryOption(optionId) {
  return deliveryOptions.find((option) => option.id === optionId);
}

export function getDateString(deliveryOptionId) {
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

  return deliveryDate.format("dddd, MMMM D");
}

export function isHoliday(day) {
  return HOLIDAYS.includes(day.format('dddd'));
}

const day = dayjs();
console.log(day.format('dddd'));
console.log(isHoliday(day))
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
