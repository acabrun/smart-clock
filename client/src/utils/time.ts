/**
 * Converts a timestamp in seconds into a string representation of days, hours, minutes, and seconds.
 * @param {number} timestamp - The timestamp in seconds to convert.
 * @returns {string} The formatted string representation of the timestamp.
 */
export const formatSeconds = (sec: number): string => {
  sec = sec - 3600; // todo: find another way to fix this timezone issue
  const seconds = Math.floor(sec);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (remainingHours > 0) {
    timeParts.push(`${remainingHours} hour${remainingHours > 1 ? "s" : ""}`);
  }
  if (remainingMinutes > 0) {
    timeParts.push(
      `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
    );
  }
  if (remainingSeconds > 0) {
    timeParts.push(
      `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
    );
  }

  return timeParts.join(", ");
};

/**
 * Calculates the time left until a specified timestamp.
 * @param {number} ring_at - The timestamp to calculate the time left for.
 * @returns {number} The time left in milliseconds.
 */
export const calculateTimeLeft = (ring_at: number): number => {
  const now = new Date().getTime();
  const timeLeft = ring_at - now;

  if (timeLeft < 0) {
    return 0;
  }
  return timeLeft;
};
