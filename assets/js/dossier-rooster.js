const people = ['Riya', 'Sam', 'Noor', 'Mevrouw de Graaf'];
const devices = ['Telefoon', 'Laptop', 'Tablet', 'Computer'];
const apps = ['Instagram', 'WhatsApp', 'Quizlet', 'Roblox'];
const grid = document.createElement('table');
grid.className = 'logic';

function row(cells) {
  const tr = document.createElement('tr');
  cells.forEach(cell => tr.append(cell));
  grid.append(tr);
}

function heading(text, className = '', span = 1) {
  const th = document.createElement('th');
  th.textContent = text;
  th.className = className;
  th.colSpan = span;
  return th;
}

function markCell(left, right) {
  const td = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.value = '';
  button.setAttribute('aria-label', `${left} en ${right}: onbekend`);
  button.addEventListener('click', () => {
    button.dataset.value = button.dataset.value === '' ? 'no' : button.dataset.value === 'no' ? 'yes' : '';
    button.textContent = button.dataset.value === 'no' ? '×' : button.dataset.value === 'yes' ? '✓' : '';
    button.setAttribute('aria-label', `${left} en ${right}: ${button.dataset.value || 'onbekend'}`);
  });
  td.append(button);
  return td;
}

row([heading(''), heading('', '', 4), heading('', '', 4)]);
row([heading(''), ...devices.map(item => heading(item)), ...apps.map(item => heading(item))]);

for (const person of people) {
  row([heading(person, 'rowhead'), ...devices.map(device => markCell(person, device)), ...apps.map(app => markCell(person, app))]);
}

for (const device of devices) {
  const empty = Array.from({ length: 4 }, () => {
    const td = document.createElement('td');
    td.className = 'emptycorner';
    return td;
  });
  row([heading(device, 'rowhead'), ...apps.map(app => markCell(app, device)), ...empty]);
}

document.getElementById('logic-grid').append(grid);
document.getElementById('clear-grid').addEventListener('click', () => {
  if (!confirm('Alle kruisjes en vinkjes wissen?')) return;
  grid.querySelectorAll('td button').forEach(button => {
    button.dataset.value = '';
    button.textContent = '';
  });
});
