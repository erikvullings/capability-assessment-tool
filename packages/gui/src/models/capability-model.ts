import { UIForm } from 'mithril-ui-form';

export interface ICapabilityModel {
  form: UIForm;
  data: Record<string, any>;
  // data: {
  //   partners: Array<{ id: string, label: string, type: '' }>
  // };
}

export const defaultCapabilityModel = {
  form: [
    { id: 'prepare', label: 'Preparations', type: 'section' },
    {
      id: 'partners',
      label: 'Partner organisations',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'label',
      type: [
        { id: 'id', autogenerate: 'id' },
        {
          id: 'label',
          label: 'Organisation / department',
          type: 'text',
          className: 'col s12 m8',
        },
        {
          id: 'type',
          label: 'Type of stakeholder',
          type: 'select',
          options: 'stakeholderTypes',
          className: 'col s12 m4',
        },
      ],
    },
    {
      id: 'capabilities',
      label: 'Capabilities',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'label',
      type: [
        {
          id: 'id',
          label: 'ID',
          type: 'text',
          className: 'col s12 m2',
        },
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          className: 'col s12 m4',
        },
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
          id: 'desc',
          label: 'Description',
          type: 'textarea',
          className: 'col m12',
        },
        {
          id: 'capabilityPartners',
          label: 'Partners',
          type: 'select',
          multiple: true,
          options: 'partners',
          className: 'col m12',
        },
      ],
    },
    { id: 'assess', label: 'Assessment', type: 'section' },
    { id: 'develop', label: 'Development', type: 'section' },
    { id: 'settings', label: 'Settings', type: 'section' },
    {
      id: 'categoryTypes',
      label: 'Category types',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'label',
      sortProperty: 'id',
      type: [
        { id: 'id', type: 'text', className: 'col s4 m3' },
        { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
      ],
    },
    {
      id: 'categories',
      label: 'Categories for capabilities',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'label',
      sortProperty: 'id',
      type: [
        { id: 'id', type: 'text', className: 'col s4 m3' },
        { id: 'label', type: 'text', label: 'Name', className: 'col s8 m6' },
        {
          id: 'type',
          type: 'select',
          label: 'Type',
          className: 'col s8 m3',
          options: 'categoryTypes',
        },
        { id: 'desc', type: 'textarea', label: 'Description', className: 'col s12' },
        {
          id: 'subcategories',
          label: 'Subcategories',
          repeat: true,
          pageSize: 1,
          propertyFilter: 'label',
          sortProperty: 'id',
          tabindex: 2,
          className: 'col offset-s4 s8',
          type: [
            { id: 'id', type: 'text', className: 'col s4 m3' },
            { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
            { id: 'desc', type: 'textarea', label: 'Description', className: 'col s12' },
          ],
        },
      ],
    },
    {
      id: 'stakeholderTypes',
      label: 'Stakeholder types',
      repeat: true,
      pageSize: 1,
      propertyFilter: 'label',
      sortProperty: 'id',
      type: [
        { id: 'id', type: 'text', className: 'col s4 m3' },
        { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
      ],
    },
  ] as UIForm,
  data: {
    categoryTypes: [
      { id: 'primary', label: 'Primary' },
      { id: 'enabling', label: 'Enabling' },
      { id: 'preparatory', label: 'Preparatory' },
    ],
    categories: [
      {
        id: 'IV',
        label: 'Investigate',
        type: 'primary',
        subcategories: [
          { id: 'IV1', label: 'Entity' },
          { id: 'IV2', label: 'Platform' },
          { id: 'IV3', label: 'Infrastructure' },
          { id: 'IV4', label: 'OSINT' },
          { id: 'IV5', label: 'Financial' },
        ],
      },
      {
        id: 'PV',
        label: 'Prevent',
        type: 'primary',
        subcategories: [
          { id: 'PV1', label: 'Monitoring' },
          { id: 'PV2', label: 'Deterrence' },
          { id: 'PV3', label: 'Prevent money laundering' },
        ],
      },
      {
        id: 'PI',
        label: 'Disrupt & Intervene',
        type: 'primary',
        subcategories: [
          { id: 'DI1', label: 'Platform disruption' },
          { id: 'DI2', label: 'Undercover work' },
          { id: 'DI3', label: 'Takedowns' },
          { id: 'DI4', label: 'Offensive work' },
          { id: 'DI5', label: 'Confiscate valuta' },
        ],
      },
      {
        id: 'FA',
        label: 'Find & Arrest',
        type: 'primary',
        subcategories: [
          { id: 'FA1', label: 'Digital forensics' },
          { id: 'FA1', label: 'Arrest' },
        ],
      },
      {
        id: 'PE',
        label: 'Prosecute & Evidence',
        type: 'primary',
        subcategories: [
          { id: 'PE1', label: 'Digital evidence' },
          { id: 'PE2', label: 'Physical evidence' },
          { id: 'PE3', label: 'Making evidence understandable in court' },
          { id: 'PE4', label: 'Provide supportive documentation' },
        ],
      },
      {
        id: 'IN',
        label: 'Intelligence',
        type: 'enabling',
        subcategories: [
          { id: 'IN1', label: 'Data collection & processing' },
          { id: 'IN2', label: 'Data analysis' },
          { id: 'IN3', label: 'Real time intelligence' },
        ],
      },
      {
        id: 'CD',
        label: 'Coordinate',
        type: 'enabling',
        subcategories: [
          { id: 'CD1', label: 'Lead' },
          { id: 'CD2', label: 'Target identification' },
          { id: 'CD3', label: 'Planning & coordination' },
        ],
      },
      {
        id: 'CL',
        label: 'Collaborate',
        type: 'enabling',
        subcategories: [
          { id: 'CL1', label: 'Standardisation' },
          { id: 'CL2', label: 'Joint investigations' },
          { id: 'CL3', label: 'Create non-LEA network' },
          { id: 'CL4', label: 'Partner management' },
        ],
      },
      {
        id: 'PP',
        label: 'Prepare',
        type: 'preparatory',
        subcategories: [
          { id: 'PP1', label: 'Monitoring' },
          { id: 'PP2', label: 'Trend identification' },
          { id: 'PP3', label: 'Research & development' },
          { id: 'PP4', label: 'Legislative & institutional framework' },
          { id: 'PP5', label: 'Strategic foresight' },
        ],
      },
      {
        id: 'TR',
        label: 'Training',
        type: 'preparatory',
        subcategories: [
          { id: 'TR1', label: 'Skill training' },
          { id: 'TR2', label: 'Education' },
          { id: 'TR3', label: 'Evaluate' },
        ],
      },
      {
        id: 'LO',
        label: 'Logistics',
        type: 'preparatory',
        subcategories: [
          { id: 'LO1', label: 'Technical augmentation' },
          { id: 'LO2', label: 'Material purchase & maintenance' },
          { id: 'LO3', label: 'Sustainable personnel' },
          { id: 'LO4', label: 'OPSEC' },
        ],
      },
    ],
    stakeholderTypes: [
      { id: 'st1', label: 'Government' },
      { id: 'st2', label: 'Public safety' },
      { id: 'st3', label: 'First response' },
    ],
    lexicon: [
      {
        id: 'Capability',
        label:
          'A **capability** is the ability of an organisation to, within a period of time with the available personnel, material means and methods, execute a task or role adequately.',
      },
    ],
  },
} as ICapabilityModel;
