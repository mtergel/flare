export const defaultEmojis = ["🛠️", "✨", "⚡", "🔍", "🔥", "🚀", "🙏", "💬"];
export const getRandomEmoji = () => {
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
};

export const themeColor = "#67BAFF";

// TODO
// MOVE THIS THIS BACKEND CONSTRAINT
export const blacklistedUsernames = [
  "dashboard",
  "enter",
  "new",
  "onboarding",
  "settings",
];

export const avatarURL =
  "https://anyqfjvtgmdymcwdoeac.supabase.co/storage/v1/object/public/avatar/";
