import m from 'mithril';
import { Tabs, ITabItem } from 'mithril-materialized';
import { LayoutForm } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { ICapabilityModel } from '../models/capability-model';
import { MeiosisComponent } from '../services';
import { CircularSpinner } from './ui';

export const CatPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.CAPABILITY),
  view: ({
    attrs: {
      state: {
        app: { catModel = { form: [], settings: [], data: {} } as ICapabilityModel },
      },
      actions: { saveModel },
    },
  }) => {
    const { form, data = {} } = catModel;
    if (!form) return m(CircularSpinner);
    const { capabilities = [] } = data;
    const index = m.route.param('index');
    const id = m.route.param('id');
    const capability = id
      ? capabilities.filter((cap) => cap.id === id).shift()
      : index
      ? capabilities.length > +index
        ? capabilities[+index]
        : capabilities[0]
      : capabilities[0];
    if (!capability) return m(CircularSpinner);

    const sections = form.filter((i) => i.type === 'section');
    const tabs = [
      {
        title: 'Overview',
        vnode: m('.overview', [m('h5', capability.label)]),
      } as ITabItem,
      ...sections.map(
        (s) =>
          ({
            title: s.label,
            active: typeof index !== 'undefined' && s.id === 'prepare',
            vnode: m(LayoutForm, {
              form,
              obj: capability,
              context: data,
              section: s.id,
              onchange: () => {
                console.log(JSON.stringify(catModel, null, 2));
                saveModel(catModel);
              },
            }),
          } as ITabItem)
      ),
    ];
    return m('.row', { style: 'height: 95vh' }, m(Tabs, { tabs, tabWidth: 'fill' }));
  },
});
