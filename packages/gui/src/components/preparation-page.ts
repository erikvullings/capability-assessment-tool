import m from 'mithril';
import { ITabItem, Tabs } from 'mithril-materialized';
import { LayoutForm, UIForm } from 'mithril-ui-form';
import { Dashboards, ICapabilityModel } from '../models';
import { MeiosisComponent } from '../services';

export const PreparationPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.PREPARATION),
  view: ({
    attrs: {
      state: {
        app: { catModel = { preparations: [], data: {} } as ICapabilityModel },
      },
      actions: { saveModel },
    },
  }) => {
    const { preparations = [], data = {} } = catModel;

    const prepare = preparations.filter((i) => i.type === 'section') as UIForm;
    const tabs = prepare.map(
      (s, i) =>
        ({
          id: s.id,
          title: `${i + 1}. ${s.label}`,
          vnode: m(LayoutForm, {
            form: preparations,
            obj: data,
            section: s.id,
            onchange: () => {
              console.log(
                JSON.stringify(
                  catModel.data.capabilities ? catModel.data.capabilities[0] : '',
                  null,
                  2
                )
              );
              saveModel(catModel);
            },
          }),
        } as ITabItem)
    );
    return m('.row', { style: 'height: 90vh' }, m(Tabs, { tabs, tabWidth: 'fill' }));
  },
});
