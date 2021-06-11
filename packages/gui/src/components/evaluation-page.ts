import m from 'mithril';
import { Select } from 'mithril-materialized';
import { LayoutForm } from 'mithril-ui-form';
import { Dashboards, ICapabilityModel } from '../models';
import { MeiosisComponent } from '../services';

export const EvaluationPage: MeiosisComponent = () => {
  return {
    oninit: ({
      attrs: {
        actions: { setPage },
      },
    }) => setPage(Dashboards.EVALUATION),
    view: ({
      attrs: {
        state: {
          app: {
            catModel = { data: {} } as ICapabilityModel,
            categoryId,
            subCategoryId,
            capabilityId,
          },
        },
        actions: { saveModel, update },
      },
    }) => {
      const { evaluation = [], data = {} } = catModel;
      const { categories = [], capabilities } = data;
      const category = categoryId && categories.filter((cat) => cat.id === categoryId).shift();
      const caps =
        capabilities && capabilities.filter((cap) => cap.subcategoryId === subCategoryId);
      const cap = capabilities && capabilities.filter((cap) => cap.id === capabilityId).shift();

      return m(
        '.evaluation-page',
        { style: 'min-height: 95vh; padding-bottom: 20px' },
        [
          m('.row', [
            m(Select, {
              className: 'col s4',
              placeholder: 'Pick one',
              label: 'Select category',
              initialValue: categoryId,
              options: categories,
              onchange: (v) => update({ app: { categoryId: v[0] as string } }),
            }),
            category &&
              m(Select, {
                className: 'col s4',
                placeholder: 'Pick one',
                label: 'Select subcategory',
                initialValue: subCategoryId,
                options: category && category.subcategories,
                onchange: (v) => update({ app: { subCategoryId: v[0] as string } }),
              }),
            caps &&
              caps.length > 0 &&
              m(Select, {
                className: 'col s4',
                placeholder: 'Pick one',
                label: 'Select capability',
                initialValue: capabilityId,
                options: caps,
                onchange: (v) => update({ app: { capabilityId: v[0] as string } }),
              }),
          ]),
          cap && m('h4.col.s12', `Evaluate capability '${cap.label}'`),
        ],
        cap &&
          m(
            '.row',
            m(LayoutForm, {
              form: evaluation,
              obj: cap || {},
              context: data,
              onchange: () => {
                saveModel(catModel);
              },
            })
          )
      );
    },
  };
};
