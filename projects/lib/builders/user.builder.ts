import { UserModel } from "@lib/models/user.model";

export class UserBuilder {
  private _user: UserModel;

  constructor(id?: string) {
    this._user = new UserModel(id);
  }

  withUsername(username: string): UserBuilder {
    this._user.username = username;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this._user.password = password;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this._user.email = email;
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    if (firstName) {
      this._user.firstName = firstName;
    }
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this._user.lastName = lastName;
    return this;
  }

  withGender(gender: number): UserBuilder {
    this._user.gender = gender;
    return this;
  }

  withRole(role: number): UserBuilder {
    this._user.role = role;
    return this;
  }

  withDateOfBirth(dateOfBirth: Date): UserBuilder {
    this._user.dateOfBirth = dateOfBirth;
    return this;
  }

  build(): UserModel {
    return this._user;
  }
}
