import m from 'mithril';
import { Select } from 'mithril-materialized';
import { LayoutForm } from 'mithril-ui-form';
import { Dashboards, ICapability, ICapabilityModel } from '../models';
import { MeiosisComponent } from '../services';

export const AssessmentPage: MeiosisComponent = () => {
  return {
    oninit: ({
      attrs: {
        state: {
          app: { catModel },
        },
        actions: { setPage, update },
      },
    }) => {
      const id = m.route.param('id');
      if (id && catModel) {
        const { capabilities = [] } = catModel.data;
        const capability =
          capabilities.filter((cap) => cap.id === id).shift() || ({} as ICapability);
        const { id: capabilityId, categoryId, subcategoryId } = capability;
        update({ app: { page: Dashboards.ASSESSMENT, capabilityId, categoryId, subcategoryId } });
      } else {
        setPage(Dashboards.ASSESSMENT);
      }
    },
    view: ({
      attrs: {
        state: {
          app: {
            catModel = { data: {} } as ICapabilityModel,
            categoryId,
            subcategoryId: subCategoryId,
            capabilityId,
          },
        },
        actions: { saveModel, update },
      },
    }) => {
      const { assessment = [], data = {} } = catModel;
      const { categories = [], capabilities } = data;
      const category = categoryId && categories.filter((cat) => cat.id === categoryId).shift();
      const caps =
        capabilities && capabilities.filter((cap) => cap.subcategoryId === subCategoryId);
      const cap = capabilities && capabilities.filter((cap) => cap.id === capabilityId).shift();

      return m(
        '.assessment-page',
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
                onchange: (v) => update({ app: { subcategoryId: v[0] as string } }),
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
          cap && m('h4.col.s12', `Assess capability '${cap.label}'`),
        ],
        cap &&
          m(
            '.row',
            m(LayoutForm, {
              form: assessment,
              obj: cap,
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
