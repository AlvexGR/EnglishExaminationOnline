import { User } from "@lib/models/user.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { FilterQuery } from "mongodb";
import { UserRepo } from "../repo/user.repo";
import {
  ISignUpResponse,
  IUpdateResponse
} from "@lib/interfaces/user.interface";
import { UserBuilder } from "@lib/builders/user.builder";
import { StatusCode } from "@lib/helpers/utility.helper";

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
    return {
      users:
        getResult.statusResponse.status === StatusCode.Ok
          ? getResult.docs
          : null,
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

    const results = await Promise.all([countByUsername, countByEmail]);

    const usernameResult = results[0];
    const emailResult = results[1];

    for (const result of results) {
      if (result.statusResponse.status !== StatusCode.Ok) {
        return {
          canInsert: false,
          signUpResponse: {
            statusResponse: result.statusResponse,
            validation: null
          }
        };
      }
    }

    const canInsert = usernameResult.total === 0 && emailResult.total === 0;
    const signUpResult: ISignUpResponse = {
      statusResponse: {
        // TODO: Change to bad request if validation wrong
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

  async validateUpdateUser(
    currentUserId: string,
    inputPassword: string,
    updatedUser: User
  ): Promise<{ canUpdate: boolean; updateResponse: IUpdateResponse }> {
    const getResult = await this.getBy({ _id: currentUserId }, 1);
    if (getResult.statusResponse.status !== StatusCode.Ok) {
      return {
        canUpdate: false,
        updateResponse: {
          statusResponse: getResult.statusResponse,
          validation: null
        }
      };
    }
    const currentUser = getResult.users[0];
    let canUpdate = true;
    const updateResponse: IUpdateResponse = {
      statusResponse: {
        status: StatusCode.Ok,
        message: ""
      },
      validation: {
        currentPassword: true,
        email: true,
        username: true
      }
    };

    // Count username
    if (currentUser.username !== updatedUser.username) {
      const usernameResult = await this.userRepo.countBy({
        username: updatedUser.username
      });
      if (usernameResult.statusResponse.status !== StatusCode.Ok) {
        return {
          canUpdate: false,
          updateResponse: {
            statusResponse: usernameResult.statusResponse,
            validation: null
          }
        };
      }
      canUpdate = canUpdate && usernameResult.total === 0;
      updateResponse.validation.username = usernameResult.total === 0;
    }

    // Count email
    if (currentUser.email !== updatedUser.email) {
      const emailResult = await this.userRepo.countBy({
        email: updatedUser.email
      });
      if (emailResult.statusResponse.status !== StatusCode.Ok) {
        return {
          canUpdate: false,
          updateResponse: {
            statusResponse: emailResult.statusResponse,
            validation: null
          }
        };
      }
      canUpdate = canUpdate && emailResult.total === 0;
      updateResponse.validation.email = emailResult.total === 0;
    }

    // Validate password
    if (inputPassword && inputPassword !== currentUser.password) {
      canUpdate = false;
      updateResponse.validation.currentPassword = false;
    }

    updateResponse.statusResponse = {
      message: "",
      status: canUpdate ? StatusCode.Ok : StatusCode.BadRequest
    };

    return { canUpdate, updateResponse };
  }

  async update(updatedUser: User): Promise<IUpdateResponse> {
    const result = await this.userRepo.update(updatedUser);
    return {
      statusResponse: result.statusResponse,
      validation: null
    };
  }

  createFromObj(obj: any): User {
    const userBuilder = new UserBuilder(obj._id);

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
