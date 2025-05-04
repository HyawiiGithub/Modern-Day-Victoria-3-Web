// Example Devlog Data
const devlogs = [
  {
    title: "Dev Diary #1 - Vision and Timeline",
    date: "2025-04-10",
    content: "We’re starting the mod development with a full overhaul of the tech tree..."
  },
  {
    title: "Dev Diary #2 - Economic Revamp",
    date: "2025-04-15",
    content: "Our economy will feature new production methods, trade routes and realistic inflation mechanics..."
  }
];

// Render devlogs
const container = document.getElementById("devlog-container");
devlogs.forEach(log => {
  const entry = document.createElement("div");
  entry.classList.add("devlog");
  entry.innerHTML = `<h3>${log.title}</h3><small>${log.date}</small><p>${log.content}</p>`;
  container.appendChild(entry);
});
