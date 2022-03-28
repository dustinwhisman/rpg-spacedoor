import { initializeDisclosureWidgets } from './disclosure';
import { observeAuthState } from './auth/observe-auth-state';
import { updateAuthState } from './auth/update-auth-state';
import { renderStats } from './components/StatsAndSkills';
import { renderStatusEffects } from './components/StatusEffects';
import { renderDamageTypes } from './components/DamageTypes';

if (localStorage.getItem('is-logged-in')) {
  updateAuthState(true);
}

document.addEventListener('user-logged-in', () => {
  updateAuthState(true);
});

document.addEventListener('user-logged-out', () => {
  updateAuthState(false);
});

initializeDisclosureWidgets();
observeAuthState();

renderStats();
renderStatusEffects();
renderDamageTypes();
