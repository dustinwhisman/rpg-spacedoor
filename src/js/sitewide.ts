import { initializeDisclosureWidgets } from './disclosure';
import { observeAuthState } from './auth/observe-auth-state';
import { updateAuthState } from './auth/update-auth-state';
import { getCharacters } from './characters/get-characters';
import { updateCharacterLinks } from './characters/update-character-links';
import { renderStats } from './components/StatsAndSkills';
import { renderStatusEffects } from './components/StatusEffects';
import { renderDamageTypes } from './components/DamageTypes';
import { renderStatUpgrades } from './components/upgrades/StatUpgrades';
import { renderSkillUpgrades } from './components/upgrades/SkillUpgrades';
import { renderHealthUpgrades } from './components/upgrades/HealthUpgrades';
import { renderDefenseUpgrades } from './components/upgrades/DefenseUpgrades';
import { renderOffenseUpgrades } from './components/upgrades/OffenseUpgrades';
import { renderActionUpgrades } from './components/upgrades/ActionUpgrades';
import { renderBonusActionUpgrades } from './components/upgrades/BonusActionUpgrades';
import { renderReactionUpgrades } from './components/upgrades/ReactionUpgrades';

if (localStorage.getItem('is-logged-in')) {
  updateAuthState(true);
}

document.addEventListener('user-logged-in', async () => {
  updateAuthState(true);
  const characters = await getCharacters();
  updateCharacterLinks(characters.map(({ name }: { name: string }) => name));
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
renderActionUpgrades();
renderBonusActionUpgrades();
renderReactionUpgrades();
