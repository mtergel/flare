export const defaultEmojis = ["🛠️", "✨", "⚡", "🔍", "🔥", "🚀", "🙏", "💬"];
export const getRandomEmoji = () => {
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
};

export const themeColor = "#67BAFF";

// TODO
// MOVE THIS THIS BACKEND CONSTRAINT ?
export const blacklistedUsernames = [
  "enter",
  "onboarding",
  "user",
  "search",
  "about",
  "faq",
  "privacy",
  "terms",
  "flare",
];

export const avatarURL =
  "https://anyqfjvtgmdymcwdoeac.supabase.co/storage/v1/object/public/avatar/";

export const postUserFields = "username, display_name, avatar_url, bio";

export const cloudinaryUrl = "https://res.cloudinary.com/flare-community/image";
