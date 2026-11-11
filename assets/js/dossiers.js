const themeFilter = document.getElementById('themefilter');
const countFilter = document.getElementById('countfilter');
function filterDossiers() {
  const theme = themeFilter.value;
  const count = countFilter.value;
  let visible = 0;
  document.querySelectorAll('.dossierpreview').forEach(card => {
    const show = (theme === 'all' || card.dataset.theme === theme) && (count === 'all' || card.dataset.count === count);
    card.hidden = !show;
    if (show) visible++;
  });
  document.getElementById('listingcount').textContent = visible + ' dossier' + (visible === 1 ? '' : 's') + ' gevonden';
  document.getElementById('listingempty').hidden = visible > 0;
}
themeFilter.addEventListener('change', filterDossiers);
countFilter.addEventListener('change', filterDossiers);
filterDossiers();
