const screens = document.querySelectorAll('.screen');
const show = (name) => {
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
};

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => show(button.dataset.next));
});

document.querySelectorAll('.no-button').forEach((button) => {
  let lastMove = 0;
  let previousX = -1;
  const dodge = () => {
    const area = button.closest('.no-wrap');
    const maxX = Math.max(0, area.clientWidth - button.offsetWidth);
    const maxY = 115;
    button.style.position = 'absolute';
    let nextX = Math.random() * maxX;
    // Keep each jump noticeable instead of landing almost where it was.
    if (Math.abs(nextX - previousX) < maxX * .25) nextX = maxX - nextX;
    previousX = nextX;
    button.style.left = `${nextX}px`;
    button.style.top = `${Math.random() * maxY - 22}px`;
  };
  const dodgeWhenClose = (event) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const isClose = Math.hypot(event.clientX - centerX, event.clientY - centerY) < 105;
    if (isClose && Date.now() - lastMove > 180) {
      lastMove = Date.now();
      dodge();
    }
  };
  button.addEventListener('pointerenter', dodge);
  button.addEventListener('pointerdown', (event) => { event.preventDefault(); dodge(); });
  button.addEventListener('focus', dodge);
  document.addEventListener('pointermove', dodgeWhenClose);
  window.setInterval(() => {
    if (button.closest('.screen').classList.contains('active')) dodge();
  }, 550);
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
