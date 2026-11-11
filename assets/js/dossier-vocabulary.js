const terms = [
  ['stiekem', 'secretly'],
  ['het apparaat', 'the device'],
  ['de telefoon', 'the phone'],
  ['de foto plaatsen', 'to post a photo'],
  ['het bericht', 'the message'],
  ['ontvangen', 'to receive'],
  ['de bioscoop', 'the cinema'],
  ['het bureau', 'the desk'],
  ['de docent', 'the teacher'],
  ['de woordjes', 'the vocabulary words'],
  ['uit je hoofd leren', 'to memorise'],
  ['vergeten', 'to forget'],
  ['het verhaal', 'the story'],
  ['de vind-ik-leuk', 'the like'],
  ['de reactie', 'the comment'],
  ['verbeteren', 'to improve'],
  ['de verjaardag', 'the birthday'],
  ['het kluisje', 'the locker'],
  ['de schoolregel', 'the school rule'],
  ['het bewijs', 'the evidence'],
  ['de verdachte', 'the suspect']
];

const search = document.getElementById('vocabulary-search');
const list = document.getElementById('vocabulary-list');

function renderVocabulary(filter = '') {
  list.replaceChildren();
  const matches = terms.filter(([dutch, english]) => `${dutch} ${english}`.toLowerCase().includes(filter.toLowerCase()));
  for (const [dutch, english] of matches) {
    const entry = document.createElement('div');
    entry.className = 'vocabentry';
    const word = document.createElement('strong');
    word.textContent = dutch;
    const translation = document.createElement('span');
    translation.textContent = english;
    entry.append(word, translation);
    list.append(entry);
  }
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Geen woorden gevonden.';
    list.append(empty);
  }
}

search.addEventListener('input', () => renderVocabulary(search.value));
renderVocabulary();
