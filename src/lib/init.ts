import type { BananaEditor, BananaEditorConfig } from "./BananaEditor";

export const init = ({
	id,
	defaultContent,
}: BananaEditorConfig): BananaEditor => {
	if (!id) {
		throw new Error("Must provide an id to init");
	}

	const editor = document.getElementById(id);
	if (!editor) {
		throw new Error(`Could not find element with id ${id}`);
	}

	const bananaEditor: BananaEditor = {
		element: editor,
		setEditMode(isEditable: boolean) {
			this.element.contentEditable = isEditable ? "true" : "false";
		},
		setContent(content?: string) {
			if (!content || content === "") {
				content = this.element.innerHTML;
			}
			this.element.innerHTML = content;
		},
		getContent() {
			return this.element.innerHTML;
		},
		setCursorPosition(pos: number) {
			const range = document.createRange();
			const sel = window.getSelection();
			range.setStart(this.element.childNodes[0], pos);
			range.collapse(true);
			if (sel) {
				sel.removeAllRanges();
				sel.addRange(range);
			}
			this.element.focus();
		},
	};

	const cursorPos = defaultContent?.length || 0;
	bananaEditor.setContent(defaultContent || "");

	bananaEditor.element.addEventListener("click", () => {
		bananaEditor.setEditMode(true);
		bananaEditor.setCursorPosition(cursorPos);
	});

	bananaEditor.element.addEventListener("blur", () => {
		bananaEditor.setEditMode(false);
	});

	bananaEditor.element.addEventListener("focus", () => {
		bananaEditor.setEditMode(true);
	});

	return bananaEditor;
};
