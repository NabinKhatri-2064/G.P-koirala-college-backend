import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { roleguard } from './roles.guard';
import { authguard } from './auth.guard';

@Module({

    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET
    })],

    providers: [roleguard,authguard],
    exports: [roleguard, authguard]


})
export class AuthModule {
    
}
