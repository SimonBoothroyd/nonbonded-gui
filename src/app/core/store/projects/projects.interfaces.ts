import { Authors, Description, Id, Name } from '@core/models/projects';
import { createDefaultLoadable, Loadable } from '@core/loadable/loadable';

export interface ProjectSummary {
  id: Id;
  name: Name;
  description: Description;
  authors: Authors;
}

export const initialProjectSummary: ProjectSummary = {
  id: '',
  name: '',
  description: '',
  authors: [],
};

export interface Projects {
  summaries: ProjectSummary[];
}

export const initialProjects: Projects = {
  summaries: [],
};

export interface ProjectsState extends Loadable, Projects {}

export const initialProjectsState: ProjectsState = {
  ...createDefaultLoadable(),
  ...initialProjects,
};
