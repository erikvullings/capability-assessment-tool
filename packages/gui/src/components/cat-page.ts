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
                overallAssessmentLabel: 'Problem cause is well known',
                overallAssessment: 'max',
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
          capability.projectProposals &&
            capability.projectProposals.length > 0 && [
              m('h5', 'Development'),
              capability.projectProposals.map((project) =>
                m(LayoutForm, {
                  form: [
                    {
                      readonly: true,
                      id: 'label',
                      label: 'Proposal name',
                      show: '!approved',
                      type: 'text',
                      className: 'col s6 m4',
                    },
                    {
                      readonly: true,
                      id: 'label',
                      label: 'Project name',
                      show: 'approved',
                      type: 'text',
                      className: 'col s6 m4',
                    },
                    {
                      readonly: true,
                      id: 'start',
                      label: 'Start time',
                      placeholder: 'YYYY Q1 or YYYY M1',
                      type: 'text',
                      className: 'col s3 m4',
                    },
                    {
                      readonly: true,
                      id: 'duration',
                      label: 'Duration',
                      placeholder: 'In months',
                      type: 'text',
                      className: 'col s3 m4',
                    },
                    {
                      readonly: true,
                      id: 'proposal',
                      label: 'Project summary',
                      type: 'textarea',
                      className: 'col s12',
                    },
                    {
                      readonly: true,
                      id: 'projectPartners',
                      label: 'Partners',
                      pageSize: 5,
                      repeat: true,
                      type: [
                        {
                          readonly: true,
                          id: 'partnerId',
                          label: 'Partner',
                          type: 'select',
                          options: 'partners',
                          className: 'col s4 m2',
                        },
                        {
                          readonly: true,
                          id: 'persons',
                          label: 'Persons involved',
                          type: 'textarea',
                          className: 'col s8 m10',
                        },
                      ],
                      className: 'col m12',
                    },
                    {
                      readonly: true,
                      id: 'gapAssessment',
                      type: 'assessment',
                      options: 'mainGaps',
                      optionLabel: 'Problem areas',
                      assessmentOptions: 'gapScale',
                      assessmentLabel: 'Addressed',
                      descriptionLabel: 'How is it addressed?',
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
                      overallAssessmentLabel: 'Expected performance',
                      overallAssessment: 'avg',
                    },
                    {
                      type: 'md',
                      value: '###### PROJECT APPROVED<br>',
                      className: 'margins right-align',
                    },
                    {
                      type: 'md',
                      value: `###### **Project approved: ${project.approved ? 'YES' : 'NO'}**`,
                      className: 'right-align',
                    },
                  ],
                  obj: project,
                  context: [capability, data],
                })
              ),
            ],
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
      '.capability-page.margins',
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
