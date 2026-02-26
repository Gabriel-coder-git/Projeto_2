export function chamarEstilizacao() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/components/SearchBars.css";
    document.head.appendChild(link);
}

