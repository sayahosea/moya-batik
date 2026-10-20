import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function buatKoneksiAdmin() {
  let cookieStore;
  try {
    cookieStore = await cookies();
  } catch {
    cookieStore = {
      getAll: () => [],
      set: () => {},
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum disetel di environment variable."
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Abaikan jika dipanggil dari konteks yang tidak mengizinkan penulisan cookies
        }
      },
    },
  });
}

export { buatKoneksiAdmin as createAdminClient };
