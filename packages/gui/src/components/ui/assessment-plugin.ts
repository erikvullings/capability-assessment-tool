import m from 'mithril';
import { Select, TextArea } from 'mithril-materialized';
import { IInputField, resolveExpression, render } from 'mithril-ui-form';
import { PluginType } from 'mithril-ui-form-plugin';
import { ILabelled } from '../../models/capability-model/capability-model';

// const range = (start: number, end: number) =>
//   Array.from({ length: end - start + 1 }, (_, k) => k + start);

type AssessmentType = {
  assessmentId: string;
  items: Array<{
    id: string;
    value?: string;
    desc?: string;
  }>;
};

type AssessmentFieldType = IInputField & {
  assessmentOptions: string;
  optionLabel: string;
  assessmentLabel: string;
  descriptionLabel: string;
  overallAssessment: 'min' | 'max' | 'avg';
  overallAssessmentLabel: string;
};

export const assessmentPlugin: PluginType = () => {
  return {
    view: ({ attrs: { field, obj, context = [], onchange } }) => {
      const {
        id = '',
        options = '',
        assessmentOptions = '',
        optionLabel,
        assessmentLabel,
        descriptionLabel,
        overallAssessment,
        overallAssessmentLabel,
      } = field as AssessmentFieldType;
      if (obj instanceof Array) return;
      if (!obj.hasOwnProperty(id)) obj[id] = { assessmentId: '', items: [] } as AssessmentType;

      const items = (obj[id] as AssessmentType).items;
      const opt =
        typeof options === 'string' && (resolveExpression(options, [obj, context]) as ILabelled[]);
      const score =
        typeof options === 'string' &&
        (resolveExpression(assessmentOptions, [obj, context]) as ILabelled[]);
      const computeOutcome = () =>
        score &&
        Math.round(
          items.reduce((acc, cur) => {
            const index = score.findIndex((s) => s.id === cur.value);
            return index < 0
              ? acc
              : overallAssessment === 'max'
              ? Math.max(index, acc)
              : overallAssessment === 'min'
              ? Math.min(index, acc)
              : acc + index / items.length;
          }, 0)
        );
      const outcomeIndex = typeof overallAssessment !== 'undefined' && score && computeOutcome();
      const outcome =
        typeof outcomeIndex === 'number' && score && score.length > outcomeIndex
          ? score[outcomeIndex].label
          : '?';

      return m('.section', [
        m('.divider'),
        overallAssessmentLabel &&
          m(
            '.row',
            m(
              '.col.s12.right-align',
              m(
                '.assessment-score',
                {
                  style:
                    'border: solid 2px black; border-radius: 8px; background: aliceblue; float: right; padding: 5px; margin-top: 10px;',
                },
                [
                  m('strong', `${overallAssessmentLabel}: `),
                  m('span', items.filter((i) => i.value).length > 0 ? outcome : 'TBD'),
                ]
              )
            )
          ),
        m('.row', [
          m('.col.s8.m5', m('h6', m('strong', optionLabel))),
          m('.col.s4.m2', m('h6', m('strong', assessmentLabel))),
          m('.col.s12.m5', m('h6', m('strong', descriptionLabel))),
          opt &&
            score &&
            opt.length > 0 &&
            opt.map((o) => {
              const existing = items.filter((i) => i.id === o.id).shift();
              if (!existing) items.push({ id: o.id });
              const item = existing || items[items.length - 1];
              return m('.condensed', [
                m(
                  '.col.s8.m5.truncate.tooltipped[data-position=bottom]',
                  {
                    'data-tooltip': o.desc
                      ? `<div class="left-align">${render(o.desc).replace(
                          /ul/,
                          'ul class="browser-default"'
                        )}</div>`
                      : undefined,
                    style: 'margin: 9px auto 0 auto;',
                    oncreate: ({ dom }) => o.desc && M.Tooltip.init(dom),
                  },
                  o.label
                ),
                m(
                  '.col.s4.m2',
                  m(Select, {
                    placeholder: 'Pick one',
                    options: score,
                    initialValue: item.value,
                    onchange: (v) => {
                      item.value = v[0] as string;
                      const o = computeOutcome();
                      if (typeof o === 'number')
                        (obj[id] as AssessmentType).assessmentId = score[o].id;
                      onchange && onchange(obj[id]);
                    },
                  })
                ),
                m(
                  '.col.s12.m5',
                  m(TextArea, {
                    initialValue: item.desc,
                    onchange: (v) => {
                      item.desc = v;
                      onchange && onchange(obj[id]);
                      const o = computeOutcome();
                      if (typeof o === 'number')
                        (obj[id] as AssessmentType).assessmentId = score[o].id;
                    },
                  })
                ),
              ]);
            }),
        ]),
      ]);
    },
  };
};
