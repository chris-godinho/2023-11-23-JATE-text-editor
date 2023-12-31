const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    console.log(result);
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('JATE was installed.', event);
    window.deferredPrompt = null;
});
