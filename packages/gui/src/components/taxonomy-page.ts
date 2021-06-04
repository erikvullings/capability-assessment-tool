import m from 'mithril';
import { LayoutForm, UIForm, render } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { ICapabilityModel } from '../models/capability-model';
import { MeiosisComponent } from '../services';

const md = `#### Taxonomy

Definitions and abbreviations of commonly used words.`;

const TaxonomyForm = [
  {
    id: 'lexicon',
    label: 'Definitions',
    repeat: true,
    pageSize: 1,
    propertyFilter: 'label',
    sortProperty: 'id',
    type: [
      { id: 'id', label: 'Term', type: 'text', className: 'col s4 m3' },
      { id: 'label', type: 'text', label: 'Description', className: 'col s8 m9' },
    ],
  },
] as UIForm;

export const TaxonomyPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.TAXONOMY),
  view: ({
    attrs: {
      state: {
        app: { catModel = { form: [], settings: [], data: {} } as ICapabilityModel },
      },
      actions: { saveModel },
    },
  }) => {
    const { data = {} } = catModel;
    const { lexicon } = data;

    return [
      m('.row', { style: 'height: 95vh' }, [
        m('.intro', m.trust(render(md))),
        lexicon &&
          lexicon instanceof Array &&
          lexicon.length > 0 &&
          m('table.highlight.responsive-table', { style: 'margin-bottom: 3rem' }, [
            m('thead', m('tr', [m('th', 'Term'), m('th', 'Description')])),
            m(
              'tbody',
              lexicon
                .filter((l) => typeof l.id !== 'undefined' && typeof l.label !== 'undefined')
                .sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1))
                .map((l) =>
                  m('tr', [m('td', m('strong', l.id)), m('td', m.trust(render(l.label)))])
                )
            ),
          ]),
        m(LayoutForm, {
          form: TaxonomyForm,
          obj: data,
          onchange: () => {
            console.log(JSON.stringify(catModel, null, 2));
            saveModel(catModel);
          },
        }),
      ]),
    ];
  },
});
