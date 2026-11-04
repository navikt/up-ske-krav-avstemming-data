export function toLocalISODate(date = new Date()) {
    // Gjør dette fordi datoen vi får fra Aksel er i lokal tid, 
    // slik at vi ender opp med (kl. 23:00) dagen før vi egentlig ønsker dersom det er vintertid 
    const pad = (num:number) => String(num).padStart(2, '0');

    const YYYY = date.getFullYear();
    const MM = pad(date.getMonth() + 1); // Months are 0-indexed
    const DD = pad(date.getDate());

    return `${YYYY}-${MM}-${DD}`;
}

export function toLocalShortDate(date:Date|undefined) {
    if (!date) return "aapen";
    const pad = (num:number) => String(num).padStart(2, '0');

    const YYYY = date.getFullYear();
    const MM = pad(date.getMonth() + 1); // Months are 0-indexed
    const DD = pad(date.getDate());

    return `${YYYY}${MM}${DD}`;
}
