import m, { RouteDefs } from 'mithril';
import { Dashboards, IDashboard } from '../models';
import { actions, states } from './meiosis';
import { Layout } from '../components/layout';
import { AboutPage, HomePage, CatPage, SettingsPage, LexiconPage } from '../components';

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

  public route(dashboardId: Dashboards) {
    const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
    return dashboard ? dashboard.route : this.defaultRoute;
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
    id: Dashboards.CAT,
    title: 'CAT',
    icon: 'apps',
    route: '/cat',
    visible: true,
    component: CatPage,
  },
  {
    id: Dashboards.LEXICON,
    title: 'LEXICON',
    icon: 'book',
    route: '/lexicon',
    visible: true,
    component: LexiconPage,
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
