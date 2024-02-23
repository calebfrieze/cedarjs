export const init = (id: string) => {
	if (!id) {
		throw new Error("Must provide an id to init");
	}

	const editor = document.getElementById(id);
	if (!editor) {
		throw new Error(`Could not find element with id ${id}`);
	}

	editor.innerHTML = "Hello, world!";
};
