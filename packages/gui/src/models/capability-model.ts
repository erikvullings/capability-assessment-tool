import { UIForm } from 'mithril-ui-form';

export interface ICapabilityDataModel {
  partners?: IPartner[];
  categories?: ICategory[];
  capabilities?: ICapability[];
  lexicon?: ILabelled[];
}

export interface ICapabilityModel {
  form: UIForm;
  // data: Record<string, any>;
  data: ICapabilityDataModel;
}

export interface ILabelled {
  id: string;
  label: string;
}

export interface ICategory extends ILabelled {
  subcategories: ILabelled[];
}

export interface ICapability extends ILabelled {
  categoryId: string;
  subcategoryId: string;
  desc?: string;
  partnerIds?: string[];
}

export interface IPartner extends ILabelled {
  typeId: string;
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
          id: 'partnerIds',
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
    stakeholderTypes: [
      { id: 'st1', label: 'Government' },
      { id: 'st2', label: 'Public safety' },
      { id: 'st3', label: 'First response' },
    ],
    categories: [
      {
        id: 'C1',
        label: 'Primary',
        subcategories: [
          { id: 'P1', label: 'Investigate' },
          { id: 'P2', label: 'Prevent' },
          { id: 'P3', label: 'Disrupt & Intervene' },
          { id: 'P4', label: 'Find & Arrest' },
          { id: 'P5', label: 'Prosecute & Evidence' },
        ],
      },
      {
        id: 'C2',
        label: 'Enabling',
        subcategories: [
          { id: 'E1', label: 'Intelligence' },
          { id: 'E2', label: 'Coordinate' },
          { id: 'E3', label: 'Collaborate' },
        ],
      },
      {
        id: 'C3',
        label: 'Preparatory',
        subcategories: [
          { id: 'Y1', label: 'Intelligence' },
          { id: 'Y2', label: 'Coordinate' },
          { id: 'Y3', label: 'Collaborate' },
        ],
      },
    ],
    capabilities: [
      { id: 'IV1', categoryId: 'C1', subcategoryId: 'P1', label: 'Entity' },
      { id: 'IV2', categoryId: 'C1', subcategoryId: 'P1', label: 'Platform' },
      { id: 'IV3', categoryId: 'C1', subcategoryId: 'P1', label: 'Infrastructure' },
      { id: 'IV4', categoryId: 'C1', subcategoryId: 'P1', label: 'OSINT' },
      { id: 'IV5', categoryId: 'C1', subcategoryId: 'P1', label: 'Financial' },
      { id: 'PV1', categoryId: 'C1', subcategoryId: 'P2', label: 'Monitoring' },
      { id: 'PV2', categoryId: 'C1', subcategoryId: 'P2', label: 'Deterrence' },
      { id: 'PV3', categoryId: 'C1', subcategoryId: 'P2', label: 'Prevent money laundering' },
      { id: 'DI1', categoryId: 'C1', subcategoryId: 'P3', label: 'Platform disruption' },
      { id: 'DI2', categoryId: 'C1', subcategoryId: 'P3', label: 'Undercover work' },
      { id: 'DI3', categoryId: 'C1', subcategoryId: 'P3', label: 'Takedowns' },
      { id: 'DI4', categoryId: 'C1', subcategoryId: 'P3', label: 'Offensive work' },
      { id: 'DI5', categoryId: 'C1', subcategoryId: 'P3', label: 'Confiscate valuta' },
      { id: 'FA1', categoryId: 'C1', subcategoryId: 'P4', label: 'Digital forensics' },
      { id: 'FA1', categoryId: 'C1', subcategoryId: 'P4', label: 'Arrest' },
      { id: 'PE1', categoryId: 'C1', subcategoryId: 'P5', label: 'Digital evidence' },
      { id: 'PE2', categoryId: 'C1', subcategoryId: 'P5', label: 'Physical evidence' },
      {
        id: 'PE3',
        categoryId: 'C1',
        subcategoryId: 'P5',
        label: 'Making evidence understandable in court',
      },
      {
        id: 'PE4',
        categoryId: 'C1',
        subcategoryId: 'P5',
        label: 'Provide supportive documentation',
      },
      { id: 'IN1', categoryId: 'C2', subcategoryId: 'E1', label: 'Data collection & processing' },
      { id: 'IN2', categoryId: 'C2', subcategoryId: 'E1', label: 'Data analysis' },
      { id: 'IN3', categoryId: 'C2', subcategoryId: 'E1', label: 'Real time intelligence' },
      { id: 'CD1', categoryId: 'C2', subcategoryId: 'E2', label: 'Lead' },
      { id: 'CD2', categoryId: 'C2', subcategoryId: 'E2', label: 'Target identification' },
      { id: 'CD3', categoryId: 'C2', subcategoryId: 'E2', label: 'Planning & coordination' },
      { id: 'CL1', categoryId: 'C2', subcategoryId: 'E3', label: 'Standardisation' },
      { id: 'CL2', categoryId: 'C2', subcategoryId: 'E3', label: 'Joint investigations' },
      { id: 'CL3', categoryId: 'C2', subcategoryId: 'E3', label: 'Create non-LEA network' },
      { id: 'CL4', categoryId: 'C2', subcategoryId: 'E3', label: 'Partner management' },
      { id: 'PP1', categoryId: 'C3', subcategoryId: 'Y1', label: 'Monitoring' },
      { id: 'PP2', categoryId: 'C3', subcategoryId: 'Y1', label: 'Trend identification' },
      { id: 'PP3', categoryId: 'C3', subcategoryId: 'Y1', label: 'Research & development' },
      {
        id: 'PP4',
        categoryId: 'C3',
        subcategoryId: 'Y1',
        label: 'Legislative & institutional framework',
      },
      { id: 'PP5', categoryId: 'C3', subcategoryId: 'Y1', label: 'Strategic foresight' },
      { id: 'TR1', categoryId: 'C3', subcategoryId: 'Y2', label: 'Skill training' },
      { id: 'TR2', categoryId: 'C3', subcategoryId: 'Y2', label: 'Education' },
      { id: 'TR3', categoryId: 'C3', subcategoryId: 'Y2', label: 'Evaluate' },
      { id: 'LO1', categoryId: 'C3', subcategoryId: 'Y3', label: 'Technical augmentation' },
      {
        id: 'LO2',
        categoryId: 'C3',
        subcategoryId: 'Y3',
        label: 'Material purchase & maintenance',
      },
      { id: 'LO3', categoryId: 'C3', subcategoryId: 'Y3', label: 'Sustainable personnel' },
      { id: 'LO4', categoryId: 'C3', subcategoryId: 'Y3', label: 'OPSEC' },
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
