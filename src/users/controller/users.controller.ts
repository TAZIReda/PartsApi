import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../model/user.interface';
import { Observable, map } from 'rxjs'; 

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    createUser(@Body() user: User):Observable<User> {
        console.log("user:",user);
        return this.userService.createUser(user).pipe(
            map((user: User) =>user)
        );
    }

    @Post('login')
    login(@Body() user: User):Observable<Object> {
        console.log('first login:',user);
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt}
            })
        );
    }

    @Put(':id')
    updateUser(@Param('id') id:number , @Body() us: User):Observable<any>{
        console.log(us, id)
        return this.userService.updateUser(id, us);
    }

    @Get()
    findAllUsers():Observable<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findOneUser(@Param('id') id: number):Observable<User> {
        return this.userService.findOne(id);
    }


    
    // @Get('parts/:part')
    // findOneByPart(@Param('id') id: number):Observable<User> {
    //     return this.userService.findOneByPart(id);
    // }
}
