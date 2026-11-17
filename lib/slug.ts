/**
 * Ubah nama pengguna menjadi slug URL portofolio publik.
 * Contoh: "Raka Pratama" -> "raka-pratama"
 */
export function toProfileSlug(name: string | null | undefined): string {
  const slug = (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "user";
}
