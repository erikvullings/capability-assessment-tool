import m from 'mithril';
import { Select, FlatButton } from 'mithril-materialized';
import { Dashboards } from '../models';
import { ICapability, ICapabilityDataModel, ICapabilityModel } from '../models/capability-model';
import { MeiosisComponent } from '../services';
import { TextInputWithClear } from './ui';

export const OverviewPage: MeiosisComponent = () => {
  const colors = [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999',
  ];

  const createTextFilter = (txt: string) => {
    if (!txt) return () => true;
    const checker = new RegExp(txt, 'i');
    return ({ label = '', desc = '' }: { label: string; desc?: string }) =>
      checker.test(label) || checker.test(desc);
  };

  let key = 1;
  let filterValue = '';
  let stakeholderFilter = undefined as undefined | Array<string | number>;
  let stakeholderId = '';

  return {
    oninit: ({
      attrs: {
        actions: { setPage },
      },
    }) => setPage(Dashboards.OVERVIEW),
    view: ({
      attrs: {
        state: {
          app: { catModel = {} as ICapabilityModel },
        },
        actions: { changePage, createRoute },
      },
    }) => {
      const {
        data = {
          categories: [],
          capabilities: [],
        } as ICapabilityDataModel,
      } = catModel;
      catModel.data = data;
      const { categories, capabilities } = data;
      const filterText = createTextFilter(filterValue);
      console.log(stakeholderFilter);
      console.log(stakeholderId);

      const maxItems =
        categories && capabilities
          ? categories.reduce((acc, cur) => {
              const height = cur.subcategories
                ? cur.subcategories.reduce((acc2, sc) => {
                    const count = capabilities.filter((cap) => cap.subcategoryId === sc.id).length;
                    return Math.max(acc2, count);
                  }, 0)
                : 0;
              return Math.max(acc, height);
            }, 0)
          : 0;

      return m('.row', [
        m(
          '.col.s12.l3',
          m(
            'ul#slide-out.sidenav.sidenav-fixed',
            {
              style: 'height: 95vh',
              oncreate: ({ dom }) => {
                M.Sidenav.init(dom);
              },
            },
            [
              m(FlatButton, {
                label: 'New capability',
                iconName: 'add',
                class: 'col s11',
                style: 'margin: 1em;',
                onclick: () => {
                  if (!catModel.data.capabilities) return;
                  catModel.data.capabilities.push({} as ICapability);
                  changePage(Dashboards.CAPABILITY, {
                    index: catModel.data.capabilities.length - 1,
                  });
                },
              }),
              m('h5', { style: 'margin-left: 0.5em;' }, 'Filters'),
              [
                m(TextInputWithClear, {
                  key,
                  label: 'Text filter of events',
                  id: 'filter',
                  initialValue: filterValue,
                  placeholder: 'Part of title or description...',
                  iconName: 'filter_list',
                  onchange: (v?: string) => (filterValue = v ? v : ''),
                  style: 'margin-right:100px',
                  className: 'col s12',
                }),
              ],
              data.partners &&
                m(Select, {
                  placeholder: 'Select one',
                  label: 'Stakeholder',
                  checkedId: stakeholderId,
                  options: data.partners,
                  iconName: 'public',
                  multiple: true,
                  onchange: (f) => (stakeholderFilter = f),
                  className: 'col s12',
                }),
              m(FlatButton, {
                label: 'Clear all filters',
                iconName: 'clear_all',
                class: 'col s11',
                style: 'margin: 1em;',
                onclick: () => {
                  key++;
                  filterValue = '';
                  stakeholderFilter = undefined;
                },
              }),
            ]
          )
        ),
        categories &&
          m('.col.s12.l9', [
            categories.map(({ label, subcategories }, i) =>
              m('.category', [
                i > 0 && m('.divider'),
                m(i > 0 ? '.section' : 'div', [
                  m('h5', label),
                  subcategories &&
                    subcategories.length > 0 &&
                    m(
                      '.row',
                      subcategories.map((sc) =>
                        m(
                          '.col.s12.m4',
                          m(
                            '.card',
                            {
                              style: `background: ${colors[i % colors.length]}; height: ${
                                80 + maxItems * 32
                              }px`,
                            },
                            [
                              m('.card-content.white-text', [
                                m(
                                  'span.card-title.black-text.white.center-align',
                                  { style: 'padding: 0.4rem' },
                                  m('strong', sc.label)
                                ),
                                capabilities &&
                                  capabilities.length > 0 &&
                                  m(
                                    'ul',
                                    capabilities
                                      .filter((cap) => cap.subcategoryId === sc.id)
                                      .filter(filterText)
                                      .map((cap) =>
                                        m(
                                          'li',
                                          m(
                                            'a.white-text.truncate',
                                            {
                                              alt: cap.label,
                                              href: createRoute(Dashboards.CAPABILITY, {
                                                id: cap.id,
                                              }),
                                            },
                                            cap.label
                                          )
                                        )
                                      )
                                  ),
                              ]),
                            ]
                          )
                        )
                      )
                    ),
                ]),
              ])
            ),
          ]),
      ]);
    },
  };
};
