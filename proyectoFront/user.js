const result = document.querySelector('.js_result');

const token = localStorage.getItem('token');

if (!token) {
  console.log(token);
  result.classList.remove('hidden');
} else {
  fetch('servidor');
}
