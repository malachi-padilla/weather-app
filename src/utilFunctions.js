export function uppercaseFirstLetterOfWord(str) {
  return str
    .split(" ")
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join(" ");
}

export function getIconName(description) {
  description = description.toLowerCase();
  if (description.includes("rain")) {
    return "fas fa-umbrella";
  } else if (description.includes("clouds")) {
    if (description.includes("scattered") || description.includes("broken")) {
      return "fas fa-cloud-sun";
    } else {
      return "fas fa-cloud";
    }
  } else if (description.includes("snow")) {
    return "far fa-snowflake";
  } else {
    return "fas fa-sun";
  }
}
