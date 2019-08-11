document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        syncTitle();
    }, 1000);
});

let syncTitle = () => {
    document.title = document.getElementById('app').contentDocument.title;
};