function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.themeMode = getQueryParameter('theme') || 'dark-mode';

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = themeMode === "dark-mode" ? '../prism/prism_dark.css' : '../prism/prism_light.css';
link.id = "prismTheme";
document.head.appendChild(link);