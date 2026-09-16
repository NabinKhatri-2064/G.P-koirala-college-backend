import {IsString,IsEmail, IsInt, } from "class-validator"

export class admissiondto{

    @IsString()
    name!:string

    @IsString()
    @IsEmail()
    email!:string

    @IsString()
    mobilenumber!:string

    @IsString()
    interestedin!:string

}