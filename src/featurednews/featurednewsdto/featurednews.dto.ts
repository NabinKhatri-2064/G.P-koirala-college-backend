import { IsString } from "class-validator";



export class featurednewsdto {
    
@IsString()
category!: string

@IsString()
headline!: string

@IsString()
firstparagraph!: string


@IsString()
secondparagraph!: string

}