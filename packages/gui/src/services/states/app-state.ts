import Stream from 'mithril/stream';
import { dashboardSvc } from '..';
import { Dashboards } from '../../models';
import { IAppModel, UpdateStream } from '../meiosis';
/** Application state */

const catModelKey = 'catModel';

export interface IAppStateModel {
  app: {
    apiService: string;
    isSearching: boolean;
    searchQuery?: string;
    page?: Dashboards;
    catModel?: any;
  };
}

export interface IAppStateActions {
  setPage: (page: Dashboards) => void;
  update: (model: Partial<IAppModel>) => void;
  search: (isSearching: boolean, searchQuery?: string) => void;
  changePage: (
    page: Dashboards,
    params?: { [key: string]: string | number | undefined },
    query?: { [key: string]: string | number | undefined }
  ) => void;
}

export interface IAppState {
  initial: IAppStateModel;
  actions: (us: UpdateStream, states: Stream<IAppModel>) => IAppStateActions;
}

// console.log(`API server: ${process.env.SERVER}`);

const cm = localStorage.getItem(catModelKey);

export const appStateMgmt = {
  initial: {
    app: {
      /** During development, use this URL to access the server. */
      apiService: process.env.SERVER || window.location.origin,
      isSearching: false,
      searchQuery: '',
      catModel: cm ? JSON.parse(cm) : undefined,
    },
  },
  actions: (update, _states) => {
    return {
      setPage: (page: Dashboards) => update({ app: { page } }),
      update: (model: Partial<IAppModel>) => update(model),
      search: (isSearching: boolean, searchQuery?: string) =>
        update({ app: { isSearching, searchQuery } }),
      changePage: (page, params, query) => {
        dashboardSvc && dashboardSvc.switchTo(page, params, query);
        update({ app: { page } });
      },
    };
  },
} as IAppState;
