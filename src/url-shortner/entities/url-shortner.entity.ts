export class UrlShortner {}

import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

import { EntityHelper } from '../../utils/entity-helper';

@Entity({ name: 'url' })
export class Url extends EntityHelper {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'originUrl', nullable: false })
  originUrl: string;

  @Column({ name: 'shortUrl', nullable: false })
  shortUrl: string;

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
