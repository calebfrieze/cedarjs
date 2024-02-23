/**
 * @typedef {object} BananaEditor
 * @property {HTMLElement} element - The element the editor is initialized on
 * @property {function} setEditMode - Sets the edit mode of the editor
 * @property {function} setContent - Sets the content of the editor
 * @property {function} getContent - Gets the content of the editor
 * @property {function} setCursorPosition - Sets the cursor position of the editor
 */
/**
 * @typedef {object} BananaConfig
 * @property {string} id - The id of the element to initialize the editor on
 * @property {string=} defaultContent - The default content to set in the editor
 */

/**
 * @name init
 * @description Initializes the editor on the provided element
 * @param {BananaConfig} BananaConfig
 * @returns {BananaEditor}
 */
export const init = ({ id, defaultContent }) => {
	if (!id) {
		throw new Error("Must provide an id to init");
	}

	const editor = document.getElementById(id);
	if (!editor) {
		throw new Error(`Could not find element with id ${id}`);
	}

	const bananaEditor = {
		element: editor,
		setEditMode(isEditable) {
			this.element.contentEditable = isEditable ? "true" : "false";
		},
		setContent(content) {
			if (!content || content === "") {
				content = this.element.innerHTML;
			}
			this.element.innerHTML = content;
		},
		getContent() {
			return this.element.innerHTML;
		},
		setCursorPosition(pos) {
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
