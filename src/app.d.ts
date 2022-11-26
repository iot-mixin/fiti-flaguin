declare namespace App {
	// interface Locals {}
	interface PageData {
		title?: string;
		content?: string;
		menus?: { slug: string; title: string }[];
		shouldLoad: boolean;
	}
	// interface Error {}
	// interface Platform {}
}
