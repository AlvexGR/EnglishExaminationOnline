import { User } from '@lib/models/user.model';

export class UserBuilder {
  private user: User;

  constructor(id?: string) {
    this.user = new User(id);
  }

  withUsername(username: string): UserBuilder {
    if (username) {
      this.user.username = username;
    }
    return this;
  }

  withPassword(password: string): UserBuilder {
    if (password) {
      this.user.password = password;
    }
    return this;
  }

  withEmail(email: string): UserBuilder {
    if (email) {
      this.user.email = email;
    }
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    if (firstName) {
      this.user.firstName = firstName;
    }
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    if (lastName) {
      this.user.lastName = lastName;
    }
    return this;
  }

  withGender(gender: number): UserBuilder {
    if (gender) {
      this.user.gender = gender;
    }
    return this;
  }

  withRole(role: number): UserBuilder {
    if (role) {
      this.user.role = role;
    }
    return this;
  }

  withDateOfBirth(dateOfBirth: Date): UserBuilder {
    if (dateOfBirth) {
      this.user.dateOfBirth = dateOfBirth;
    }
    return this;
  }

  build() {
    return this.user;
  }
}
