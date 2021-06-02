import m from 'mithril';
import { LayoutForm, UIForm, render } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { ICapabilityModel } from '../models/capability-model';
import { MeiosisComponent } from '../services';

const md = `#### Lexicon

Definitions and abbreviations of commonly used words.`;

const lexiconForm = [
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

export const LexiconPage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => setPage(Dashboards.LEXICON),
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
          m('table.highlight.responsive-table', [
            m('thead', m('tr', [m('th', 'Term'), m('th', 'Description')])),
            m(
              'tbody',
              lexicon.map((l) =>
                m('tr', [m('td', m('strong', l.id)), m('td', m.trust(render(l.label)))])
              )
            ),
          ]),
        m(LayoutForm, {
          form: lexiconForm,
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
