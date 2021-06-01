import m from 'mithril';
import { LayoutForm } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { ICapabilityModel } from '../models/capability-model';
import { MeiosisComponent } from '../services';

export const SettingsPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.SETTINGS),
  view: ({
    attrs: {
      state: {
        app: { catModel = { form: [], data: {} } as ICapabilityModel },
      },
      actions: { saveModel },
    },
  }) => {
    const { form, data = {} } = catModel;

    return [
      m(
        '.row',
        { style: 'height: 95vh' },
        m(LayoutForm, {
          form,
          obj: data,
          section: 'settings',
          onchange: () => {
            console.log('Settings updated');
            saveModel(catModel);
          },
        })
      ),
    ];
  },
});
