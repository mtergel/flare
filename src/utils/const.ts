export const defaultEmojis = ["🛠️", "✨", "⚡", "🔍", "🔥", "🚀", "🙏", "💬"];
export const getRandomEmoji = () => {
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
};
