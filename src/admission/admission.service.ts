import {  Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { admissiondto } from './admissiondto/admission.dto';

@Injectable()
export class AdmissionService {

    constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}

    async addadmissiondetails(admission:admissiondto)
    {   
        return await this.prisma.db.orm.public.admissionform.create(admission);

    }



}
