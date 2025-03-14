// Helper function to pad numbers with zeros
function padNumber(num) {
	return num.toString().padStart(2, "0");
}

// Helper function to format series name
function formatSeriesName(name) {
	return name.replace(/[^\w.-]/g, " ").replace(/\s+/g, " ");
}

// Helper function to generate new filename
function generateNewName(seriesName, seasonNum, episodeNum, fileExt) {
	const formattedName = formatSeriesName(seriesName);
	return `${formattedName} S${padNumber(seasonNum)}E${padNumber(episodeNum)}${fileExt}`;
}

// Function to update the preview table
function updatePreviewTable() {
	const tableBody = document.querySelector("#previewTable tbody");
	const previewTable = document.getElementById("previewTable");
	const seriesName = document.getElementById("seriesName").value;
	const season = parseInt(document.getElementById("season").value);
	const startEpisode = parseInt(document.getElementById("startEpisode").value);
	const filePicker = document.getElementById("filePicker");

	if (!filePicker.files.length) return;

	// Clear current table
	tableBody.innerHTML = "";

	// Show table
	previewTable.style.display = "table";

	// For each selected file
	Array.from(filePicker.files).forEach((file, index) => {
		const row = tableBody.insertRow();
		const fileExt = file.name.substring(file.name.lastIndexOf("."));

		// Original name cell
		const originalCell = row.insertCell(0);
		originalCell.textContent = file.name;

		// New name cell
		const newNameCell = row.insertCell(1);
		const episodeNumber = startEpisode + index;
		newNameCell.textContent = generateNewName(seriesName, season, episodeNumber, fileExt);
	});
}
// Update the event listeners to trigger both functions
document.getElementById("seriesName").addEventListener("input", () => {
	updatePreviewTable();
	generatePowerShellCommands();
});

document.getElementById("season").addEventListener("input", () => {
	updatePreviewTable();
	generatePowerShellCommands();
});

document.getElementById("startEpisode").addEventListener("input", () => {
	updatePreviewTable();
	generatePowerShellCommands();
});

document.getElementById("filePicker").addEventListener("change", () => {
	updatePreviewTable();
	generatePowerShellCommands();
});

document.getElementById("folderPicker").addEventListener("change", function () {
	const seriesNameInput = document.getElementById("seriesName");
	if (this.files.length > 0) {
		const fullPath = this.files[0].webkitRelativePath || this.files[0].name;
		const folderName = fullPath.split("/")[0];
		seriesNameInput.value = folderName;
	}
	updatePreviewTable();
	generatePowerShellCommands();
});

function generatePowerShellCommands() {
	const files = document.getElementById("filePicker").files;
	const seriesName = document.getElementById("seriesName").value;
	const season = parseInt(document.getElementById("season").value);
	const startEpisode = parseInt(document.getElementById("startEpisode").value);
	const previewCommand = document.getElementById("previewCommand");

	let commands = "";

	Array.from(files).forEach((file, index) => {
		const episodeNumber = startEpisode + index; // This ensures we start from the selected episode number
		const fileExt = file.name.substring(file.name.lastIndexOf("."));
		const newName = generateNewName(seriesName, season, episodeNumber, fileExt);

		commands += `Rename-Item -Path "${file.name}" -NewName "${newName}"\n`;
	});

	previewCommand.value = commands;
}

document.getElementById("filePicker").addEventListener("change", function () {
	const fileCount = document.getElementById("fileCount");
	const numFiles = this.files.length;
	fileCount.textContent = numFiles > 0 ? `${numFiles} episódio(s) selecionado(s)` : "";

	updatePreviewTable();
	generatePowerShellCommands();
});
