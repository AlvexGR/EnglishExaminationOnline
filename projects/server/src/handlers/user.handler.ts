import { User } from "@lib/models/user.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { FilterQuery } from "mongodb";
import { UserRepo } from "../repo/user.repo";
import { ISignUpResponse } from "@lib/interfaces/user.interface";
import { UserBuilder } from "@lib/builders/user.builder";
import { StatusCode } from '@lib/helpers/utility.helper';

export class UserHandler {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }
  async verifyLogIn(
    username: string,
    password: string
  ): Promise<{ statusResponse: IStatusResponse; hasUser: boolean }> {
    const countUser = await this.userRepo.countBy({ username, password });
    if (countUser.statusResponse.status !== StatusCode.Ok) {
      return {
        hasUser: false,
        statusResponse: countUser.statusResponse
      };
    }

    if (countUser.total === 0) {
      return {
        statusResponse: {
          status: StatusCode.BadRequest,
          message: ""
        },
        hasUser: false
      };
    }

    return {
      hasUser: true,
      statusResponse: {
        status: StatusCode.Ok,
        message: ""
      }
    };
  }

  async getBy(
    query: FilterQuery<any>,
    limit?: number
  ): Promise<{ users: Array<User>; statusResponse: IStatusResponse }> {
    const getResult = await this.userRepo.getBy(query, limit);
    if (getResult.statusResponse.status !== StatusCode.Ok) {
      return {
        users: null,
        statusResponse: getResult.statusResponse
      };
    }
    return {
      users: getResult.docs,
      statusResponse: getResult.statusResponse
    };
  }

  async validateNewUser(
    newUser: User
  ): Promise<{ canInsert: boolean; signUpResponse: ISignUpResponse }> {
    // check for username
    const countByUsername = this.userRepo.countBy({
      username: newUser.username
    });

    const countByEmail = this.userRepo.countBy({ email: newUser.email });

    const result = await Promise.all([countByUsername, countByEmail]);

    const usernameResult = result[0];
    const emailResult = result[1];

    if (usernameResult.statusResponse.status !== StatusCode.Ok) {
      return {
        canInsert: false,
        signUpResponse: {
          statusResponse: usernameResult.statusResponse,
          validation: null
        }
      };
    }

    if (emailResult.statusResponse.status !== StatusCode.Ok) {
      return {
        canInsert: false,
        signUpResponse: {
          statusResponse: emailResult.statusResponse,
          validation: null
        }
      };
    }
    const canInsert = usernameResult.total === 0 && emailResult.total === 0;
    const signUpResult: ISignUpResponse = {
      statusResponse: {
        status: StatusCode.Ok,
        message: ""
      },
      validation: {
        usernameValid: usernameResult.total === 0,
        emailValid: emailResult.total === 0
      }
    };

    return { canInsert, signUpResponse: signUpResult };
  }

  async insert(
    newUser: User
  ): Promise<{ inserted: boolean; statusResponse: IStatusResponse }> {
    const insertResult = await this.userRepo.insert(newUser);
    return insertResult;
  }

  createFromObj(obj: any): User {
    const userBuilder = new UserBuilder();

    userBuilder
      .withUsername(obj.username)
      .withPassword(obj.password)
      .withEmail(obj.email)
      .withFirstName(obj.firstName)
      .withLastName(obj.lastName)
      .withGender(obj.gender)
      .withRole(obj.role)
      .withDateOfBirth(obj.dateOfBirth);

    return userBuilder.build();
  }
}
