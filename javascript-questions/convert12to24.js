const convert12to24 = (str) => {
  const [time, modifier] = str.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") hours = "00";

  if (modifier === "PM") hours = parseInt(hours) + 12;

  return `${hours}:${minutes}`;
};

console.log(convert12to24("02:02 PM"));
console.log(convert12to24("04:06 PM"));
console.log(convert12to24("12:00 AM"));
console.log(convert12to24("12:00 PM"));

//////////////////// 12-HOUR ➜ 24-HOUR TIME CONVERSION — CHEAT SHEET ///////////

// Function: convert12to24("hh:mm AM/PM")
//
// Steps:
//
// 1. Split input string into:
//    - time => "hh:mm"
//    - modifier => "AM" or "PM"
//
//      const [time, modifier] = str.split(" ");
//
// 2. Further split time into:
//    - hours => "hh"
//    - minutes => "mm"
//
//      let [hours, minutes] = time.split(":");
//
// 3. Edge case for 12:
//    In 12-hour format:
//      - 12 AM  is 00 in 24-hour format
//      - 12 PM  stays 12 in 24-hour format
//
//    So if hours === "12":
//        convert to "00" first (we'll add +12 later if PM)
//
//      if (hours === "12") hours = "00";
//
// 4. If modifier is "PM":
//      add 12 to convert afternoon times
//      (except 12 PM already handled above)
//
//      if (modifier === "PM") hours = parseInt(hours) + 12;
//
// 5. Return final time in 24-hour format "HH:MM"
//
//      return `${hours}:${minutes}`;
//
// Example results:
//
// "02:02 PM" -> 14:02
// "04:06 PM" -> 16:06
// "12:00 AM" -> 00:00
// "12:00 PM" -> 12:00
//
// Interview talking points:
// - Covers AM/PM edge cases (12 AM, 12 PM correct handling)
// - Simple string parsing and conditional logic
// - Clean conversion to 24-hour time format

///////////////////////////////////////////////////////////////////////////////

// bla bla bla 
// blu blu blu