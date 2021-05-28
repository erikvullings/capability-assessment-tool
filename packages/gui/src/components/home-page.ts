import m from 'mithril';
import { Button, Icon } from 'mithril-materialized';
import background from '../assets/background.jpg';
import { dashboardSvc, MeiosisComponent } from '../services';
import { Dashboards } from '../models';

export const HomePage: MeiosisComponent = () => ({
  oninit: ({
    attrs: {
      actions: { setPage },
    },
  }) => {
    setPage(Dashboards.HOME);
  },
  view: () => [
    m('.row', [
      m(
        '.overlay.center',
        {
          style: 'position: relative; top: 550px;',
        },
        [
          m(Button, {
            className: 'btn-large',
            label: 'Start here',
            onclick: () => {
              dashboardSvc.switchTo(Dashboards.CAT);
            },
          }),
        ]
      ),
      m('img.responsive-img', { src: background }),
      m(
        '.section.white',
        m('.row.container.center', [
          m('.row', [
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'dashboard' })),
                m('h5.center', 'Prepare'),
                m(
                  'p.light',
                  'Create or select the capabilities that are important for your organisations.'
                ),
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'flash_on' })),
                m('h5.center', 'Assess'),
                m(
                  'p.light',
                  `Determine for each capability how important it is, and your current performance, so you can prioritise and focus on the ones you really need.`
                ),
              ])
            ),
            m(
              '.col.s12.m4',
              m('.icon-block', [
                m('.center', m(Icon, { iconName: 'group' })),
                m('h5.center', 'Develop'),
                m(
                  'p.light',
                  'Start working on developing your capabilites, alone or with other organisations, and create your roadmap.'
                ),
              ])
            ),
          ]),
        ])
      ),
    ]),
  ],
});
