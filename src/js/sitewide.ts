import { initializeDisclosureWidgets } from './disclosure';
import { observeAuthState } from './auth/observe-auth-state';
import { updateAuthState } from './auth/update-auth-state';
import { renderStats } from './components/StatsAndSkills';
import { renderStatusEffects } from './components/StatusEffects';
import { renderDamageTypes } from './components/DamageTypes';
import { renderStatUpgrades } from './components/upgrades/StatUpgrades';
import { renderSkillUpgrades } from './components/upgrades/SkillUpgrades';
import { renderHealthUpgrades } from './components/upgrades/HealthUpgrades';
import { renderDefenseUpgrades } from './components/upgrades/DefenseUpgrades';
import { renderOffenseUpgrades } from './components/upgrades/OffenseUpgrades';

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
renderStatUpgrades();
renderSkillUpgrades();
renderHealthUpgrades();
renderDefenseUpgrades();
renderOffenseUpgrades();
