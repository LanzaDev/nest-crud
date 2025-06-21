import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { hash } from "bcrypt";

// Essa interface não define o que o sistema vai enviar, mas o que ele espera receber.
interface CreateUserRequest{ 
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  
  async execute({ email, name, password }: CreateUserRequest) {
    const user = new User({
      email,
      name,
      password: await hash(password, 10), // criptografia da senha
    });

    await this.userRepository.create(user);
    
    return user;
  }
}
