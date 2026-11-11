const people = ['Riya', 'Sam', 'Noor', 'Mevrouw de Graaf'];
const devices = ['Telefoon', 'Laptop', 'Tablet', 'Computer'];
const apps = ['Instagram', 'WhatsApp', 'Quizlet', 'Roblox'];

for (const [id, options] of [['answer-person', people], ['answer-device', devices], ['answer-app', apps]]) {
  const select = document.getElementById(id);
  select.add(new Option('Kies…', ''));
  options.forEach(value => select.add(new Option(value, value)));
}

document.getElementById('check-answer').addEventListener('click', () => {
  const person = document.getElementById('answer-person').value;
  const device = document.getElementById('answer-device').value;
  const app = document.getElementById('answer-app').value;
  const result = document.getElementById('answer-result');
  result.textContent = !person || !device || !app
    ? 'Vul eerst alle drie de antwoorden in.'
    : person === 'Riya' && device === 'Telefoon' && app === 'Instagram'
      ? 'Goed onderzocht! Je hebt de geheime foto opgelost.'
      : 'Nog niet helemaal. Kijk opnieuw naar het bewijs en de kaarten.';
});
