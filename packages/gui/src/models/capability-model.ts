import { UIForm } from 'mithril-ui-form';

export interface ICapabilityDataModel {
  partners?: IPartner[];
  categories?: ICategory[];
  capabilities?: ICapability[];
  mainTasks?: ILabelled[];
  taskScale?: ILabelled[];
  performanceAspects?: ILabelled[];
  performanceScale?: ILabelled[];
  lexicon?: ILabelled[];
}

export interface ICapabilityModel {
  form: UIForm;
  settings: UIForm;
  // data: Record<string, any>;
  data: ICapabilityDataModel;
}

export interface ILabelled {
  id: string;
  label: string;
  desc?: string;
}

export interface ICategory extends ILabelled {
  subcategories: ILabelled[];
}

export interface ICapability extends ILabelled {
  categoryId: string;
  subcategoryId: string;
  desc?: string;
  partnerIds?: string[];
  assessmentId?: string;
}

export interface IPartner extends ILabelled {
  typeId: string;
}

export const defaultCapabilityModel = {
  form: [
    { id: 'prepare', label: '1. Preparations', type: 'section' },
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
      id: 'goal',
      label: 'Group goal',
      type: 'textarea',
      placeholder: 'What are the long and short term goals that you want to achieve as a group.',
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
    { id: 'assess', label: '2. Assessment', type: 'section' },
    { type: 'md', value: '##### Capability importance', className: '.assess' },
    {
      id: 'taskAssessment',
      type: 'assessment',
      options: 'mainTasks',
      optionLabel: 'Main task',
      assessmentOptions: 'taskScale',
      assessmentLabel: 'Importance',
      descriptionLabel: 'Description',
      overallAssessmentLabel: 'Maximum importance',
      overallAssessment: 'max',
    },
    {
      id: 'performanceAssessment',
      type: 'assessment',
      options: 'performanceAspects',
      optionLabel: 'Performance aspect',
      assessmentOptions: 'performanceScale',
      assessmentLabel: 'Performance',
      descriptionLabel: 'Description',
      overallAssessmentLabel: 'Average performance',
      overallAssessment: 'avg',
    },
    {
      id: 'assessmentId',
      label: 'Overall assessment',
      type: 'lookup-table',
      table: 'assessmentTable',
      options: 'assessmentScale',
      rowId: 'taskAssessment.assessmentId',
      colId: 'performanceAssessment.assessmentId',
    },
    { type: 'md', value: '###### GO / NO GO decision' },
    {
      id: 'shouldDevelop',
      type: 'switch',
      label: '',
      options: [
        { id: 'NO GO', label: 'NO GO' },
        { id: 'go', label: 'GO' },
      ],
    },
    { id: 'develop', label: '3. Development', type: 'section' },
  ] as UIForm,
  settings: [
    { type: 'md', value: '##### Category settings' },
    {
      id: 'categories',
      label: 'Categories for capabilities',
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
          label: 'Subcategories',
          repeat: true,
          pageSize: 1,
          propertyFilter: 'label',
          sortProperty: 'id',
          tabindex: 2,
          className: 'col offset-s2 s10',
          type: [
            { id: 'id', type: 'text', className: 'col s4 m3' },
            { id: 'label', type: 'text', label: 'Name', className: 'col s8 m9' },
            { id: 'desc', type: 'textarea', label: 'Description', className: 'col s12' },
          ],
        },
      ],
    },
    { type: 'md', value: '##### Partner/stakeholder settings' },
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
    { type: 'md', value: '##### Task settings' },
    {
      id: 'mainTasks',
      label: 'Main tasks a capability needs to support',
      repeat: true,
      pageSize: 1,
      sortProperty: 'id',
      type: [
        { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
        { id: 'label', label: 'Task', type: 'text', className: 'col s9 m10' },
        { id: 'desc', label: 'Description', type: 'textarea', className: 'col s12' },
      ],
    },
    {
      id: 'taskScale',
      label: 'Scale for the main tasks',
      repeat: true,
      pageSize: 1,
      sortProperty: 'id',
      type: [
        { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
        { id: 'label', label: 'Value', type: 'text', className: 'col s9 m10' },
      ],
    },
    { type: 'md', value: '##### Performance settings' },
    {
      id: 'performanceAspects',
      label: 'Performance aspects',
      repeat: true,
      pageSize: 1,
      sortProperty: 'id',
      type: [
        { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
        { id: 'label', label: 'Task', type: 'text', className: 'col s9 m10' },
        { id: 'desc', label: 'Description', type: 'textarea', className: 'col s12' },
      ],
    },
    {
      id: 'performanceScale',
      label: 'Scale for performance score',
      repeat: true,
      pageSize: 1,
      sortProperty: 'id',
      type: [
        { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
        { id: 'label', label: 'Value', type: 'text', className: 'col s9 m10' },
      ],
    },
    { type: 'md', value: '##### Task to performance table lookup' },
    {
      id: 'assessmentScale',
      label: 'Scale for assessment score',
      repeat: true,
      pageSize: 1,
      sortProperty: 'id',
      type: [
        { id: 'id', label: 'ID', type: 'text', className: 'col s3 m2' },
        { id: 'label', label: 'Value', type: 'text', className: 'col s9 m10' },
      ],
    },
    {
      id: 'assessmentTable',
      type: 'create-lookup-table',
      label: 'task \\ perf. scale',
      options: 'assessmentScale',
      rows: 'taskScale',
      cols: 'performanceScale',
    },
  ] as UIForm,
  data: {
    stakeholderTypes: [
      { id: 'ST1', label: 'Government' },
      { id: 'ST2', label: 'Public safety' },
      { id: 'ST3', label: 'First response' },
    ],
    partners: [
      { id: 'P1', label: 'NCTV', typeId: 'ST1' },
      { id: 'P2', label: 'IFV', typeId: 'ST2' },
    ],
    categories: [
      {
        id: 'C1',
        label: 'Primary capabilities',
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
        label: 'Enabling capabilities',
        subcategories: [
          { id: 'E1', label: 'Intelligence' },
          { id: 'E2', label: 'Coordinate' },
          { id: 'E3', label: 'Collaborate' },
        ],
      },
      {
        id: 'C3',
        label: 'Preparatory capabilities',
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
    mainTasks: [
      { id: 'MT1', label: 'Preventing dark web & cryptocurrency criminality' },
      { id: 'MT2', label: 'Reduce impact of dark web & cryptocurrency criminality' },
      {
        id: 'MT3',
        label: 'Finding, arresting and prosecuting criminals operating on the dark web',
      },
    ],
    taskScale: [
      { id: 'TS1', label: 'Barely' },
      { id: 'TS2', label: 'Low' },
      { id: 'TS3', label: 'Moderate' },
      { id: 'TS4', label: 'High' },
      { id: 'TS5', label: 'Essential' },
    ],
    performanceAspects: [
      {
        id: 'PA1',
        label: 'Effectivity of the capability:',
        desc: `- Quality of the results
- Timeliness of the results
- The ability to deliver results as long as required`,
      },
      {
        id: 'PA2',
        label: 'Safe work environment professionals',
        desc: 'Physical and mental health of employees policing the dark web while carrying out or as the result of this capability.',
      },
      {
        id: 'PA3',
        label: 'Efficiency',
        desc: 'The extent to which financial resources for this capability are proportionate to the desired results (output) of this capability.',
      },
    ],
    performanceScale: [
      { id: 'PS1', label: 'Bad' },
      { id: 'PS2', label: 'Inadequate' },
      { id: 'PS3', label: 'Moderate' },
      { id: 'PS4', label: 'Adequate' },
      { id: 'PS5', label: 'Good' },
    ],
    assessmentScale: [
      { id: 'AS1', label: 'None' },
      { id: 'AS2', label: 'Limited' },
      { id: 'AS3', label: 'Moderate' },
      { id: 'AS4', label: 'High' },
      { id: 'AS5', label: 'Very high' },
    ],
    assessmentTable: [
      { rowId: 'TS1', colId: 'PS1', optionId: 'AS3' },
      { rowId: 'TS1', colId: 'PS2', optionId: 'AS3' },
      { rowId: 'TS1', colId: 'PS3', optionId: 'AS2' },
      { rowId: 'TS1', colId: 'PS4', optionId: 'AS2' },
      { rowId: 'TS1', colId: 'PS5', optionId: 'AS1' },
      { rowId: 'TS2', colId: 'PS1', optionId: 'AS4' },
      { rowId: 'TS2', colId: 'PS2', optionId: 'AS3' },
      { rowId: 'TS2', colId: 'PS3', optionId: 'AS3' },
      { rowId: 'TS2', colId: 'PS4', optionId: 'AS2' },
      { rowId: 'TS2', colId: 'PS5', optionId: 'AS1' },
      { rowId: 'TS3', colId: 'PS1', optionId: 'AS4' },
      { rowId: 'TS3', colId: 'PS2', optionId: 'AS4' },
      { rowId: 'TS3', colId: 'PS3', optionId: 'AS3' },
      { rowId: 'TS3', colId: 'PS4', optionId: 'AS3' },
      { rowId: 'TS3', colId: 'PS5', optionId: 'AS1' },
      { rowId: 'TS4', colId: 'PS1', optionId: 'AS5' },
      { rowId: 'TS4', colId: 'PS2', optionId: 'AS4' },
      { rowId: 'TS4', colId: 'PS3', optionId: 'AS4' },
      { rowId: 'TS4', colId: 'PS4', optionId: 'AS3' },
      { rowId: 'TS4', colId: 'PS5', optionId: 'AS1' },
      { rowId: 'TS5', colId: 'PS1', optionId: 'AS5' },
      { rowId: 'TS5', colId: 'PS2', optionId: 'AS5' },
      { rowId: 'TS5', colId: 'PS3', optionId: 'AS4' },
      { rowId: 'TS5', colId: 'PS4', optionId: 'AS4' },
      { rowId: 'TS5', colId: 'PS5', optionId: 'AS1' },
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
