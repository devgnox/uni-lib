import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidIsbn(code: any) {
  let sum, weight, digit, check, i;

  code = code.replace(/[^0-9X]/gi, "");

  if (code.length != 10 && code.length != 13) {
    return false;
  }

  if (code.length == 13) {
    sum = 0;
    for (i = 0; i < 12; i++) {
      digit = parseInt(code[i]);
      if (i % 2 == 1) {
        sum += 3 * digit;
      } else {
        sum += digit;
      }
    }
    check = (10 - (sum % 10)) % 10;
    return check == code[code.length - 1];
  }

  if (code.length == 10) {
    weight = 10;
    sum = 0;
    for (i = 0; i < 9; i++) {
      digit = parseInt(code[i]);
      sum += weight * digit;
      weight--;
    }
    check = (11 - (sum % 11)) % 11;
    if (check == 10) {
      check = "X";
    }
    return check == code[code.length - 1].toUpperCase();
  }
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((l) => l[0])
    .join("")
    .toUpperCase();
