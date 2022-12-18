export type User = {
	id: string;
	name: string;
	username: string;
	host?: string | null;
	isFollowing?: boolean;
	isBlocking?: boolean;
	isBot: boolean;
};
