type InternalPath = Readonly<{
	type: "internal";
	relative: string;
}>;

type ExternalPath = Readonly<{
	type: "external";
	name: string;
}>;

export type Path = InternalPath | ExternalPath;

export function pathText(p: Path): string {
	return p.type === "internal" ? p.relative : p.name;
}
