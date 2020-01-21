export class User {
  id?: number;
  name?: string;
  email?: string;
  token?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

