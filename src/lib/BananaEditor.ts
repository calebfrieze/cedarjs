export interface BananaEditor {
	element: HTMLElement;
	setEditMode: (isEditable: boolean) => void;
	setContent: (content: string) => void;
	getContent: () => string;
	setCursorPosition: (pos: number) => void;
}

export interface BananaEditorConfig {
	readonly id: string;
	readonly defaultContent?: string;
}
