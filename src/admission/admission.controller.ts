import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { admissiondto } from './admissiondto/admission.dto';

@Controller('admission')
export class AdmissionController {

    constructor(@Inject(AdmissionService) private readonly admissionservice:AdmissionService){}

    @Post()
    async addadmissionform(@Body() admission:admissiondto){
       return await this.admissionservice.addadmissiondetails(admission);
    }


}
