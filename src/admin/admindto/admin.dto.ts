import { IsString } from "class-validator";


export class admindto{

    @IsString()
    username!: string

    @IsString()
    password!: string

}