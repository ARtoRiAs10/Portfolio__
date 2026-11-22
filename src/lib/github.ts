export type GithubStats = {
  login: string;
  name: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  bio: string | null;
  location: string | null;
};

let cache: { value: GithubStats | null; at: number } | null = null;
const TTL = 10 * 60 * 1000;

export async function fetchGithubStats(): Promise<GithubStats | null> {
  if (cache && Date.now() - cache.at < TTL) return cache.value;

  try {
    const response = await fetch("https://api.github.com/users/ARtoRiAs10", {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const data = (await response.json()) as Partial<GithubStats>;
    const value: GithubStats = {
      login: data.login ?? "ARtoRiAs10",
      name: data.name ?? null,
      publicRepos: data.publicRepos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      bio: data.bio ?? null,
      location: data.location ?? null,
    };
    cache = { value, at: Date.now() };
    return value;
  } catch {
    cache = { value: null, at: Date.now() };
    return null;
  }
}