// The newest LibreShard release, read from GitHub when the site is built: the one GitHub marks
// "Latest". Drafts and pre-releases don't count (a version is a pre-release while people try it,
// then becomes a release), and neither do releases without an installer: 0.2.0 was once published
// empty while its installers sat in a separate draft, and the page offered nothing to download. If GitHub can't be reached, the page links to the releases list instead of failing
// the build.

const REPO = 'libreshard/libreshard';
export const RELEASES_URL = `https://github.com/${REPO}/releases`;

export interface ReleaseAsset {
	name: string;
	url: string;
	size: number;
}

export interface Release {
	version: string;
	date: string;
	url: string;
	windows?: ReleaseAsset;
	deb?: ReleaseAsset;
	appImage?: ReleaseAsset;
	mac?: ReleaseAsset;
	sums?: ReleaseAsset;
}

let cached: Promise<Release | null> | undefined;

export function latestRelease(): Promise<Release | null> {
	cached ??= fetchLatest();
	return cached;
}

async function fetchLatest(): Promise<Release | null> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	// Optional, to avoid GitHub's limit for anonymous requests (set in the build environment)
	if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	try {
		const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`, { headers });
		if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
		const list = (await res.json()) as any[];
		const installer = /\.(exe|deb|AppImage|dmg)$/;
		const r = list.find((x) => !x.draft && !x.prerelease && x.assets?.some((a: any) => installer.test(a.name)));
		if (!r) return null;
		const assets: ReleaseAsset[] = r.assets.map((a: any) => ({ name: a.name, url: a.browser_download_url, size: a.size }));
		const find = (re: RegExp) => assets.find((a) => re.test(a.name));
		return {
			version: String(r.tag_name).replace(/^v/, ''),
			date: r.published_at,
			url: r.html_url,
			windows: find(/-Setup-.*\.exe$/),
			deb: find(/_amd64\.deb$/),
			appImage: find(/\.AppImage$/),
			mac: find(/\.dmg$/),
			sums: find(/^SHA256SUMS\.txt$/),
		};
	} catch (err) {
		console.warn(`[release] couldn't read the latest release: ${(err as Error).message}`);
		return null;
	}
}

export function formatSize(bytes: number): string {
	return `${Math.round(bytes / 1e6)} MB`;
}
