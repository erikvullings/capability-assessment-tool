import m from 'mithril';
import { Select, TextArea } from 'mithril-materialized';
import { IInputField, resolveExpression } from 'mithril-ui-form';
import { PluginType } from 'mithril-ui-form-plugin';

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
        typeof options === 'string' &&
        (resolveExpression(options, [obj, context]) as Array<{ id: string; label?: string }>);
      const score =
        typeof options === 'string' &&
        (resolveExpression(assessmentOptions, [obj, context]) as Array<{
          id: string;
          label: string;
        }>);
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
        overallAssessment &&
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
                [m('strong', `${overallAssessmentLabel}: `), m('span', outcome)]
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
              return m('.myrow', [
                m('.col.s8.m5', { style: 'margin: 26px auto 0 auto;' }, o.label),
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
