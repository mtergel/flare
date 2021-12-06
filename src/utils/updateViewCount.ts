import { supabase } from "./supabaseClient";

const updateViewCount = (slug: string) => {
  return supabase.rpc("increment_page_view", {
    post_slug: slug,
  });
};

export default updateViewCount;
