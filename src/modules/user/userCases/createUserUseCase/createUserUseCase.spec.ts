import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to create user", async () => {
    expect(userRepositoryInMemory.users).toEqual([])
    const user = await createUserUseCase.execute({
      email: "email@email.com",
      name: "Lanza",
      password: "RDX"
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it("Should be able to create user with password encrypted", async () => {
    const userPasswordWithoutEncryption = "RDX"

    const user = await createUserUseCase.execute({
      email: "email@email.com",
      name: "Lanza",
      password: userPasswordWithoutEncryption
    });

    const userHasPasswordWithoutEncryption = await compare(
      userPasswordWithoutEncryption,
      user.password
    );
    
    expect(userHasPasswordWithoutEncryption).toBeTruthy();
  });
});
