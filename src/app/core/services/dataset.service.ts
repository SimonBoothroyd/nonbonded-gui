import { HttpClient } from '@angular/common/http';
import { PaginationService } from '@core/services/pagination.service';
import { Injectable } from '@angular/core';
import { DATA_SETS_ENDPOINT } from '@core/endpoints';
import { DataSetCollection, QCDataSetCollection } from '@core/models/datasets';

@Injectable()
export class DataSetService extends PaginationService<DataSetCollection> {
  constructor(http: HttpClient) {
    super(http, `${DATA_SETS_ENDPOINT}/phys-prop`);
  }
}

@Injectable()
export class QCDataSetService extends PaginationService<QCDataSetCollection> {
  constructor(http: HttpClient) {
    super(http, `${DATA_SETS_ENDPOINT}/qc`);
  }
}
