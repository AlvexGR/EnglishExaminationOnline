import { UserModel } from "@lib/models/user.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { FilterQuery } from "mongodb";
import { UserRepo } from "../repo/user.repo";
import {
  ISignUpResponse,
  IUserResponse,
  IUsersResponse,
  IUserUpdateResponse
} from "@lib/interfaces/user.interface";
import { UserBuilder } from "@lib/builders/user.builder";
import { StatusCode } from "@lib/helpers/utility.helper";

export class UserHandler {
  private _userRepo: UserRepo;

  constructor() {
    this._userRepo = new UserRepo();
  }

  async getById(id: string): Promise<IUserResponse> {
    if (!id) {
      return {
        user: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${id}`
        }
      };
    }

    const result = await this._userRepo.getById(id);
    return {
      user: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async getBy(
    query: FilterQuery<any>,
    limit?: number
  ): Promise<IUsersResponse> {
    const result = await this._userRepo.getBy(query, limit);
    return {
      users: result.docs,
      statusResponse: result.statusResponse
    };
  }

  async validateNewUser(
    newUser: UserModel
  ): Promise<{ canInsert: boolean; signUpResponse: ISignUpResponse }> {
    // check for username
    const countByUsername = this._userRepo.countBy({
      username: newUser.username
    });

    // check fo email
    const countByEmail = this._userRepo.countBy({ email: newUser.email });

    const results = await Promise.all([countByUsername, countByEmail]);

    // Any error => ignore all and return
    for (const res of results) {
      if (res.statusResponse.status === StatusCode.InternalError) {
        return {
          canInsert: false,
          signUpResponse: {
            statusResponse: res.statusResponse,
            validation: null
          }
        };
      }
    }

    const usernameResult = results[0];
    const emailResult = results[1];

    const canInsert = usernameResult.total === 0 && emailResult.total === 0;
    const signUpResult: ISignUpResponse = {
      statusResponse: {
        status: canInsert ? StatusCode.Ok : StatusCode.BadRequest,
        message: ""
      },
      validation: {
        usernameValid: usernameResult.total === 0,
        emailValid: emailResult.total === 0
      }
    };

    return { canInsert, signUpResponse: signUpResult };
  }

  async insert(newUser: UserModel): Promise<IStatusResponse> {
    return await this._userRepo.insertOne(newUser);
  }

  async validateUpdateUser(
    currentUserId: string,
    inputPassword: string,
    updatedUser: UserModel
  ): Promise<{ canUpdate: boolean; updateResponse: IUserUpdateResponse }> {
    const getResult = await this.getById(currentUserId);
    if (getResult.statusResponse.status !== StatusCode.Ok) {
      return {
        canUpdate: false,
        updateResponse: {
          statusResponse: getResult.statusResponse,
          validation: null
        }
      };
    }

    const currentUser = getResult.user;
    let canUpdate = true;
    // Init value
    const updateResponse: IUserUpdateResponse = {
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
      const usernameResult = await this._userRepo.countBy({
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
      const emailResult = await this._userRepo.countBy({
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

  async update(updatedUser: UserModel): Promise<IUserUpdateResponse> {
    const result = await this._userRepo.updateOne(updatedUser);
    return {
      statusResponse: result,
      validation: null
    };
  }

  createFromObj(obj: any): UserModel {
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
