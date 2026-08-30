import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDTO {
  // string
  // maxLength: 10
  // minLength: 3
  // pattern:
  // TODO:: must be unique
  @IsString()
  @Length(3, 10)
  @Matches(/^[a-zA-Z0-9_-]*$/g)
  @IsNotEmpty()
  login: string;

  // string
  // maxLength: 20
  // minLength: 6
  @IsString()
  @Length(6, 20)
  password: string;

  // string
  // TODO:: pattern: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
  // TODO:: must be unique
  @IsString()
  @IsEmail()
  email: string;
}
