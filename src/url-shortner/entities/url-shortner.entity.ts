export class UrlShortner {}

import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

import { EntityHelper } from '../../utils/entity-helper';

@Entity({ name: 'urls' })
export class Url extends EntityHelper {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'originUrl' })
  originUrl: string;

  @Column({ name: 'shortUrl' })
  shortUrl: string;

  @Column({ name: 'bitlyUrl' })
  bitlyUrl: string;

  @Column({ name: 'uuid' })
  nanoId: string;

  @Column({
    name: 'clicks',
    default: 0,
  })
  clicks: number;

  @Column({ name: 'createdAt', type: 'bigint' })
  createdAt: number;

  @Column({ name: 'updatedAt', type: 'bigint' })
  updatedAt: number;
}
