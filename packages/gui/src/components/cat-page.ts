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
  }) => setPage(Dashboards.CAT),
  view: ({
    attrs: {
      state: {
        app: { catModel = { form: [], data: {} } as ICapabilityModel },
      },
      actions: { saveModel },
    },
  }) => {
    const { form, data = {} } = catModel;
    if (!form) return m(CircularSpinner);
    const sections = form.filter((i) => i.type === 'section').filter((i) => i.id !== 'settings');
    const tabs = [
      {
        title: 'Overview',
        vnode: m('.overview', m('p', 'Overview')),
      } as ITabItem,
      ...sections.map(
        (s) =>
          ({
            title: s.label,
            vnode: m(LayoutForm, {
              form,
              obj: data,
              section: s.id,
              onchange: () => {
                console.log(JSON.stringify(catModel, null, 2));
                saveModel(catModel);
              },
            }),
          } as ITabItem)
      ),
    ];
    return m(
      '.row',
      { style: 'height: 95vh' },
      m(Tabs, { tabs, tabWidth: 'fill' })
      // m(LayoutForm, {
      //   form,
      //   obj: data,
      //   onchange: () => {
      //     console.log('Data updated');
      //     saveModel(catModel);
      //   },
      // })
    );
  },
});
