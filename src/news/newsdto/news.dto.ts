import { IsString } from "class-validator";

export class newsdto {
  @IsString()
  category!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  date!: string;
}
