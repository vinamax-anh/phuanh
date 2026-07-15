const screens = document.querySelectorAll('.screen');
const show = (name) => {
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
};

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => show(button.dataset.next));
});

document.querySelectorAll('.no-button').forEach((button) => {
  const dodge = () => {
    const area = button.closest('.no-wrap');
    const maxX = Math.max(0, area.clientWidth - button.offsetWidth);
    const maxY = 100;
    button.style.position = 'absolute';
    button.style.left = `${Math.random() * maxX}px`;
    button.style.top = `${(Math.random() - .35) * maxY}px`;
  };
  button.addEventListener('pointerenter', dodge);
  button.addEventListener('pointerdown', (event) => { event.preventDefault(); dodge(); });
  button.addEventListener('focus', dodge);
});

const hearts = document.querySelector('.falling-hearts');
for (let i = 0; i < 26; i += 1) {
  const heart = document.createElement('span');
  heart.textContent = i % 3 === 0 ? '♡' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.animationDelay = `${Math.random() * -8}s`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  hearts.appendChild(heart);
}
