document.getElementById('more-info').addEventListener('click', () => {
    const hiddenText = document.getElementById('hidden-text');
    if (hiddenText.style.display === 'none') {
        hiddenText.style.display = 'block';
    } else {
        hiddenText.style.display = 'none';
    }
});