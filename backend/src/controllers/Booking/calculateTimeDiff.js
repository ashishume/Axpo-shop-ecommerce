function calculateTimeDifference(startTime, endTime) {
  const startMatch = startTime.match(/^(\d+):(\d+)\s+(AM|PM)$/);
  const endMatch = endTime.match(/^(\d+):(\d+)\s+(AM|PM)$/);

  if (!startMatch || !endMatch) {
    return "Invalid time format";
  }

  const startHour = parseInt(startMatch[1]);
  const startMinute = parseInt(startMatch[2]);
  const startAMPM = startMatch[3];

  const endHour = parseInt(endMatch[1]);
  const endMinute = parseInt(endMatch[2]);
  const endAMPM = endMatch[3];

  const startTotalMinutes = (startHour % 12) * 60 + (startAMPM === "PM" ? 12 * 60 : 0) + startMinute;
  const endTotalMinutes = (endHour % 12) * 60 + (endAMPM === "PM" ? 12 * 60 : 0) + endMinute;

  let diffMinutes = endTotalMinutes - startTotalMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 12 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours} hours ${minutes} minutes`;
}
module.exports = calculateTimeDifference;
