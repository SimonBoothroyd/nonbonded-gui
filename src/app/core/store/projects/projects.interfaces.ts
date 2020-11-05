import { ProjectCollection } from '@core/models/projects';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export const initialProjects: ProjectCollection = {
  projects: [],
};

export interface ProjectsState extends Loadable, ProjectCollection {}

export const initialProjectsState: ProjectsState = {
  ...createDefaultLoadable(),
  ...initialProjects,
};
