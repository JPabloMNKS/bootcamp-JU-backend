import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';
import { hostname } from 'os';

const url = 'http://localhost:8086/';
const token =
  '2_dUQd3PYMfcoayMAQJU-hGu9FlznW2dDJsj6-qCPDMG4hUE8z5RZmTRCn8q0IS0_U63fPWwL_sL1sI2VBbmag==';
const org = 'organizationAdmin';
const bucket = 'bucketAdmin';

export default class InfluxDbService {
  private influxDB: InfluxDB;
  public writeApi: WriteApi;

  private url: string;
  private token: string;
  private org: string;
  private bucket: string;

  constructor() {
    this.url = url;
    this.token = token;
    this.org = org;
    this.bucket = bucket;
    this.writeApi = new InfluxDB({ url, token })
      .getWriteApi(org, bucket, 'ns')
      .useDefaultTags({ location: hostname() });
  }
}
