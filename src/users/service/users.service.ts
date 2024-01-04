import { Injectable } from '@nestjs/common';
import { User } from '../model/user.interface';
import { Observable, from, map, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { UserEntity } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // findOneByPart(id: number): Observable<User> {
  //   // throw new Error('Method not implemented.');

  // }
  login(user: User): Observable<string> {
    // console.log('first login')
    return this.validate(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          // console.log('first login')
          return this.authService
            .generateJwt(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          // console.log('first login failed')
          return 'error';
        }
      }),
    );
  }


  updateUser(id: number, user: User): Observable<User> {
    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => 
        this.findOne(id)
      )
    )
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({id: id})).pipe(
      map((user: User) =>{
        const {password, ...result}=user;
        return result;
      })
    );
  }

  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) =>{
        users.forEach(function(v){delete v.password} );
        return users;
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        console.log(hashedPassword);
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.password = hashedPassword;
        newUser.address = user.address;
        newUser.email = user.email;
        newUser.phone = user.phone;
        newUser.entreprise = user.entreprise;
        newUser.role = user.role;
        console.log(newUser);

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
        );
      }),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userRepository.findOneBy({ email: email }));
  }

  validate(email: string, password: string): Observable<User> {
    // console.log('first check', email)
    return from(this.findByEmail(email)).pipe(
      switchMap((user: User) =>
        this.authService.comparePassword(user.password, password).pipe(
          map((match: boolean) => {
            if (match) {
              console.log('first check', email)
              const { password, ...result } = user;
              return result;
            } else {
              console.log(match)
              throw new Error();
            }
          }),
        ),
      ),
    );
  }
}
