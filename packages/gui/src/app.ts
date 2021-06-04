import m from 'mithril';
import 'material-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css';
import './css/style.css';
import { dashboardSvc } from './services/dashboard-service';
import { registerPlugin } from 'mithril-ui-form';
import { assessmentPlugin, lookupTable, lookupTableCreatorPlugin } from './components/ui';

registerPlugin('assessment', assessmentPlugin);
registerPlugin('create-lookup-table', lookupTableCreatorPlugin);
registerPlugin('lookup-table', lookupTable);

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable());
