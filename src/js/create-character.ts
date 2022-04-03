import { renderEffectTypeChecklist } from './components/CheckboxList';
import { renderPrimaryStatRanking, renderSecondaryStatRanking } from './components/SortableList';

renderPrimaryStatRanking();
renderSecondaryStatRanking();
renderEffectTypeChecklist('vulnerabilities');
renderEffectTypeChecklist('resistances');
renderEffectTypeChecklist('immunities');
