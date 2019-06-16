import { User } from "@lib/models/user.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { FilterQuery } from "mongodb";
import { UserBuilder } from "@lib/builders/user.builder";
import { UserRepo } from '../repo/user.repo';

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
    if (!countUser.statusResponse.status) {
      return {
        hasUser: false,
        statusResponse: countUser.statusResponse
      };
    }

    if (countUser.statusResponse.status && countUser.total === 0) {
      return {
        statusResponse: {
          status: true,
          message: "Tên tài khoản hoặc mật khẩu không chính xác"
        },
        hasUser: false
      };
    }

    return {
      hasUser: true,
      statusResponse: countUser.statusResponse
    };
  }

  async getBy(
    query: FilterQuery<any>,
    limit?: number
  ): Promise<{
    users: Array<User>;
    statusResponse: IStatusResponse;
  }> {
    const getResult = await this.userRepo.getBy(query, limit);
    if (!getResult.statusResponse.status) {
      return {
        users: null,
        statusResponse: getResult.statusResponse
      };
    }
    const results = new Array<User>();
    let userBuilder: UserBuilder;
    getResult.docs.forEach(doc => {
      if (!doc) {
        return;
      }

      userBuilder = new UserBuilder(doc._id);

      userBuilder
        .withUsername(doc.username)
        .withPassword(doc.password)
        .withEmail(doc.email)
        .withFirstName(doc.firstName)
        .withLastName(doc.lastName)
        .withGender(doc.gender)
        .withRole(doc.role)
        .withDateOfBirth(doc.dateOfBirth);

      results.push(userBuilder.build());
    });

    return {
      users: results,
      statusResponse: getResult.statusResponse
    };
  }
}
