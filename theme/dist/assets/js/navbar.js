const hamburger = document.getElementById('hamburger');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overLay');


function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.style.display = 'none';
}

hamburger.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

document.addEventListener('mousedown', function(event) {
  if (
    sidebar.classList.contains('active') &&
    !sidebar.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeSidebar();
  }
});