import { UIForm } from 'mithril-ui-form';

export const preparationModel = [
  { type: 'section', id: 'partners', label: 'Select partners' },
  {
    type: 'md',
    label: `1. **Select your partners and specify their organizational goals.**
2. Set the group goals that you want to achieve.
3. Specify capability categories to organize the capabilities.
4. Specify the capabilities that you need to achieve the group goals.`,
  },
  {
    id: 'partners',
    label: 'Partner organisations',
    repeat: true,
    pageSize: 1,
    propertyFilter: 'label',
    type: [
      { id: 'id', type: 'text', label: 'Acronym', className: 'col s3 m2' },
      {
        id: 'label',
        label: 'Organisation / department',
        type: 'text',
        className: 'col s9 m7',
      },
      {
        id: 'type',
        label: 'Type of stakeholder',
        type: 'select',
        options: 'stakeholderTypes',
        className: 'col s12 m3',
      },
      {
        id: 'goals',
        label: 'Goals',
        type: 'textarea',
      },
    ],
  },
  { type: 'section', id: 'goals', label: 'Specify group goals' },
  {
    type: 'md',
    label: `1. Select your partners and specify their organizational goals.
2. **Set the group goals that you want to achieve.**
3. Specify capability categories to organize the capabilities.
4. Specify the capabilities that you need to achieve the group goals.`,
  },
  {
    id: 'mainTasks',
    label: 'Main goals',
    repeat: true,
    pageSize: 1,
    sortProperty: 'id',
    type: [
      { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
      { id: 'label', label: 'Goal', type: 'text', className: 'col s9 m10' },
      { id: 'desc', label: 'Description', type: 'textarea', className: 'col s12' },
    ],
  },
  { type: 'section', id: 'categories', label: 'Specify categories' },
  {
    type: 'md',
    label: `1. Select your partners and specify their organizational goals.
2. Set the group goals that you want to achieve.
3. **Specify capability categories to organize the capabilities.**
4. Specify the capabilities that you need to achieve the group goals.`,
  },
  {
    id: 'categories',
    label: 'Capability category',
    repeat: true,
    pageSize: 1,
    propertyFilter: 'label',
    sortProperty: 'id',
    type: [
      { id: 'id', type: 'text', className: 'col s4 m3' },
      { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
      { id: 'desc', type: 'textarea', label: 'Description', className: 'col s12' },
      {
        id: 'subcategories',
        label: 'Subcategory',
        repeat: true,
        pageSize: 1,
        propertyFilter: 'label',
        sortProperty: 'id',
        tabindex: 2,
        className: 'col offset-s1 s11',
        type: [
          { id: 'id', type: 'text', className: 'col s4 m3' },
          { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
          { id: 'desc', type: 'textarea', label: 'Description', className: 'col s12' },
        ],
      },
    ],
  },
  { type: 'section', id: 'capabilities', label: 'Specify capabilities' },
  {
    type: 'md',
    label: `1. Select your partners and specify their organizational goals.
2. Set the group goals that you want to achieve.
3. Specify capability categories to organize the capabilities.
4. **Specify the capabilities that you need to achieve the group goals.**`,
  },
  {
    id: 'capabilities',
    label: 'Create capability',
    repeat: true,
    pageSize: 1,
    propertyFilter: 'label',
    sortProperty: 'categoryId',
    filterLabel: 'Filter capabilities',
    type: [
      {
        id: 'categoryId',
        label: 'Category',
        type: 'select',
        options: 'categories',
        className: 'col s12 m3',
      },
      {
        id: 'subcategoryId',
        label: 'Subcategory',
        type: 'select',
        options: 'categories.categoryId.subcategories',
        className: 'col s12 m3',
      },
      {
        id: 'label',
        label: 'Capability',
        type: 'text',
        className: 'col s12 m4',
      },
      {
        id: 'id',
        label: 'ID',
        type: 'text',
        className: 'col s12 m2',
      },
      {
        id: 'desc',
        label: 'Description',
        placeholder: 'Describe the capability in detail.',
        type: 'textarea',
        className: 'col s12',
      },
      {
        id: 'capabilityPartners',
        label: 'Partners',
        pageSize: 5,
        repeat: true,
        type: [
          {
            id: 'partnerId',
            label: 'Partner',
            type: 'select',
            options: 'partners',
            className: 'col s4 m2',
          },
          {
            id: 'goal',
            label: 'Goals',
            placeholder: 'Specify long and short term goals',
            type: 'textarea',
            className: 'col s8 m10',
          },
        ],
        className: 'col m12',
      },
      {
        id: 'documentation',
        label: 'Documentation',
        repeat: true,
        pageSize: 5,
        type: [
          {
            id: 'documentId',
            label: 'Document ID',
            type: 'text',
            className: 'col s3 m2',
          },
          {
            id: 'label',
            label: 'Title',
            type: 'text',
            className: 'col s6 m6',
          },
          {
            id: 'link',
            label: 'URL',
            type: 'url',
            className: 'col s3 m4',
          },
        ],
        className: 'col m12',
      },
    ],
  },
] as UIForm;
