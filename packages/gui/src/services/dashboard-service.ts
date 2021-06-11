import m, { RouteDefs } from 'mithril';
import { Dashboards, IDashboard } from '../models';
import { actions, states } from './meiosis';
import { Layout } from '../components/layout';
import {
  AboutPage,
  HomePage,
  SettingsPage,
  TaxonomyPage,
  OverviewPage,
  PreparationPage,
  EvaluationPage,
  AssessmentPage,
} from '../components';
import { DevelopmentPage } from '../components/development-page';

class DashboardService {
  private dashboards!: ReadonlyArray<IDashboard>;

  constructor(dashboards: IDashboard[]) {
    this.setList(dashboards);
  }

  public getList() {
    return this.dashboards;
  }

  public setList(list: IDashboard[]) {
    this.dashboards = Object.freeze(list);
  }

  public get defaultRoute() {
    const dashboard = this.dashboards.filter((d) => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }

  public route(dashboardId: Dashboards, query?: { [key: string]: string | number | undefined }) {
    const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
    return dashboard
      ? '#!' + dashboard.route + (query ? '?' + m.buildQueryString(query) : '')
      : this.defaultRoute;
  }

  public href(dashboardId: Dashboards, params = '' as string | number) {
    const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
    return dashboard ? `#!${dashboard.route.replace(/:\w*/, '')}${params}` : this.defaultRoute;
  }

  public switchTo(
    dashboardId: Dashboards,
    params?: { [key: string]: string | number | undefined },
    query?: { [key: string]: string | number | undefined }
  ) {
    const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
    if (dashboard) {
      const url = dashboard.route + (query ? '?' + m.buildQueryString(query) : '');
      m.route.set(url, params);
    }
  }

  public routingTable() {
    // console.log('INIT');
    return this.dashboards.reduce((p, c) => {
      p[c.route] =
        c.hasNavBar === false
          ? {
              render: () => m(c.component, { state: states(), actions }),
            }
          : {
              // onmatch:
              //   c.id === Dashboards.LOGIN
              //     ? undefined
              //     : () => {
              //         if (c.id !== Dashboards.HOME && !Auth.isLoggedIn()) m.route.set('/login');
              //       },
              render: () =>
                m(
                  Layout,
                  { state: states(), actions, options: {} },
                  m(c.component, {
                    state: states(),
                    actions,
                  })
                ),
            };
      return p;
    }, {} as RouteDefs);
  }
}

export const dashboardSvc: DashboardService = new DashboardService([
  {
    id: Dashboards.HOME,
    title: 'HOME',
    icon: 'home',
    route: '/',
    visible: true,
    component: HomePage,
  },
  {
    id: Dashboards.OVERVIEW,
    title: 'Overview',
    icon: 'apps',
    route: '/overview',
    visible: true,
    component: OverviewPage,
  },
  {
    id: Dashboards.PREPARATION,
    title: 'Preparation',
    icon: 'looks_one',
    iconClass: 'blue-text',
    route: '/preparation',
    visible: true,
    component: PreparationPage,
  },
  {
    id: Dashboards.ASSESSMENT,
    title: 'Assessment',
    icon: 'looks_two',
    iconClass: 'blue-text',
    route: '/Assessment',
    visible: true,
    component: AssessmentPage,
  },
  {
    id: Dashboards.DEVELOPMENT,
    title: 'Development',
    icon: 'looks_3',
    iconClass: 'blue-text',
    route: '/development',
    visible: true,
    component: DevelopmentPage,
  },
  {
    id: Dashboards.EVALUATION,
    title: 'Evaluation',
    icon: 'looks_4',
    iconClass: 'blue-text',
    route: '/evaluation',
    visible: true,
    component: EvaluationPage,
  },
  {
    id: Dashboards.TAXONOMY,
    title: 'TAXONOMY',
    icon: 'book',
    route: '/taxonomy',
    visible: true,
    component: TaxonomyPage,
  },
  {
    id: Dashboards.ABOUT,
    title: 'About',
    icon: 'info',
    route: '/about',
    visible: true,
    component: AboutPage,
  },
  {
    id: Dashboards.SETTINGS,
    title: 'Settings',
    icon: 'settings',
    route: '/settings',
    visible: true,
    component: SettingsPage,
  },
]);
