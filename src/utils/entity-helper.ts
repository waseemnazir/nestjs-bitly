import { instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity } from 'typeorm';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    const plainObject = instanceToPlain(this);
    // Asserting 'this' as BaseEntity and accessing 'id' field
    if (
      (this as any).id &&
      typeof (this as any).id === 'object' &&
      (this as any).id.toHexString
    ) {
      plainObject.id = (this as any).id.toHexString();
    }
    return plainObject;
  }
}
