import m from 'mithril';
import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import './css/style.css';
import { routingSvc } from './services/routing-service';
import { registerPlugin } from 'mithril-ui-form';
import {
  assessmentPlugin,
  lookupTable,
  lookupTableCreatorPlugin,
  tablePlugin,
} from './components/ui';
import { i18n } from 'mithriljs-i18n';

registerPlugin('assessment', assessmentPlugin);
registerPlugin('create-lookup-table', lookupTableCreatorPlugin);
registerPlugin('lookup-table', lookupTable);
registerPlugin('table', tablePlugin);

i18n.init(
  {
    en: { name: 'English', fqn: 'en-UK', default: true },
    nl: { name: 'Nederlands', fqn: 'nl-NL' },
  },
  window.localStorage.getItem('CAT_LANGUAGE') || 'nl'
);

i18n.addOnChangeListener(() => {
  routingSvc.init();
  m.route(document.body, routingSvc.defaultRoute, routingSvc.routingTable());
});
