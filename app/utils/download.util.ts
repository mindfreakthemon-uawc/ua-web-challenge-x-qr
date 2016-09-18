export function download(content, filename, contentType = 'application/octet-stream') {
	let a = document.createElement('a');
	let blob = new Blob([content], { type: contentType });

	a.href = window.URL.createObjectURL(blob);
	a.setAttribute('download', filename);
	a.click();
}
