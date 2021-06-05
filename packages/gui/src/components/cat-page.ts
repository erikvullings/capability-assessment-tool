import m from 'mithril';
import { Tabs, ITabItem } from 'mithril-materialized';
import { LayoutForm, render } from 'mithril-ui-form';
import { Dashboards } from '../models';
import { ICapabilityModel } from '../models/capability-model/capability-model';
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
        id: 'overview',
        title: capability.label ? `"${capability.label}" overview` : 'Overview',
        vnode: m('.overview', [
          m('h4', `Capability: ${capability.label}`),
          capability.desc && m('p', capability.desc),
          capability.goal && [m('h5', 'Group goal'), m('p', capability.goal)],
          capability.capabilityPartners &&
            capability.capabilityPartners.length > 0 && [
              m('h5', 'Partners'),
              m(
                'ul.browser-default',
                capability.capabilityPartners.map((p) =>
                  m('li', [
                    m('strong', `${p.partnerId}'s goals: `),
                    p.goal && m('span', m.trust(render(p.goal, true))),
                  ])
                )
              ),
            ],
          m('h5', 'Assessment'),
          m(LayoutForm, {
            form: [
              {
                readonly: true,
                id: 'taskAssessment',
                type: 'assessment',
                options: 'mainTasks',
                optionLabel: 'Main task',
                assessmentOptions: 'taskScale',
                assessmentLabel: 'Importance',
                descriptionLabel: 'Explanation',
                overallAssessmentLabel: 'Maximum importance',
                overallAssessment: 'max',
              },
              {
                readonly: true,
                id: 'performanceAssessment',
                type: 'assessment',
                options: 'performanceAspects',
                optionLabel: 'Performance aspect',
                assessmentOptions: 'performanceScale',
                assessmentLabel: 'Performance',
                descriptionLabel: 'Explanation',
                overallAssessmentLabel: 'Average performance',
                overallAssessment: 'avg',
              },
              {
                readonly: true,
                id: 'gapAssessment',
                type: 'assessment',
                options: 'mainGaps',
                optionLabel: 'Cause of the problem',
                assessmentOptions: 'gapScale',
                assessmentLabel: 'Problem',
                descriptionLabel: 'Explanation',
              },
              {
                readonly: true,
                id: 'assessmentId',
                label: 'Overall assessment',
                type: 'lookup-table',
                table: 'assessmentTable',
                options: 'assessmentScale',
                rowId: 'taskAssessment.assessmentId',
                colId: 'performanceAssessment.assessmentId',
              },
              {
                type: 'md',
                value: `###### **GO / NO GO decision: ${
                  capability.shouldDevelop ? 'GO' : 'NO GO'
                }**`,
                className: 'right-align',
              },
            ],
            obj: capability,
            context: data,
          }),
        ]),
      } as ITabItem,
      ...sections.map(
        (s) =>
          ({
            id: s.id,
            title: s.label,
            active: typeof index !== 'undefined' && s.id === 'prepare',
            vnode: m(LayoutForm, {
              form,
              obj: capability,
              context: data,
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
      ),
    ];
    return m(
      '.capability-page',
      // {
      //   style: 'height: 95vh',
      // },
      m(Tabs, {
        tabs,
        tabWidth: 'fill',
      })
    );
  },
});
