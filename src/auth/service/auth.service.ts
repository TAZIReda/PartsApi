import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/users/model/user.interface';
import * as bcrypt from 'bcrypt';
// const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
     salt:number =bcrypt.genSalt(12);

    generateJwt(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user}))
    }

    hashPassword(password: string): Observable<any> {
        return from(Promise.resolve(bcrypt.hash(password, 12)));

    }

    comparePassword(password: string, hashedPassword :string): Observable<any> {
        console.log(password, hashedPassword);
        return of<any|boolean>(bcrypt.compare(password, hashedPassword));
    }
}
