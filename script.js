document.documentElement.classList.add('js');

const tabs = [...document.querySelectorAll('[role="tab"]')];

function select(tab, focus = false) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).classList.toggle('active', on);
  });
  if (focus) tab.focus();
  history.replaceState(null, '', '#' + tab.id.replace('tab-', ''));
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', e => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step) {
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length], true);
    }
  });
});

const initial = document.getElementById('tab-' + location.hash.slice(1)) || tabs[0];
select(initial);

document.querySelectorAll('[data-tab]').forEach(link =>
  link.addEventListener('click', e => {
    e.preventDefault();
    select(document.getElementById('tab-' + link.dataset.tab), true);
    window.scrollTo({ top: 0 });
  })
);
