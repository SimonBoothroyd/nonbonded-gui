import { HttpClient } from '@angular/common/http';
import { PaginationService } from '@core/services/pagination.service';
import { Injectable } from '@angular/core';
import { PROJECTS_ENDPOINT } from '@core/endpoints';
import { ProjectCollection } from '@core/models/projects';

@Injectable()
export class ProjectService extends PaginationService<ProjectCollection> {
  constructor(http: HttpClient) {
    super(http, PROJECTS_ENDPOINT);
  }
}
