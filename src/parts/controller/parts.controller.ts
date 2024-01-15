import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Part } from '../model/part.interface';
import { PartsService } from '../service/parts.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@Controller('parts')
export class PartsController {

    constructor(private partService: PartsService){}

    @UseGuards(JwtAuthGuard) 
    @Post('createPart')
    createPart(@Body() part: Part, @Request() request):Observable<Part>{
        const user= request.user;
        return this.partService.createPart(part, user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updatePart(@Body() part: Part, @Param('id') id:number):Observable<Part>{
        return this.partService.updatePart(Number(id),part);
    }

    @Get(':id')
    findOne(@Param('id') id:number):Observable<Part>{
        return this.partService.findOne(Number(id)); 
    }

    @Get()
    findAll():Observable<Part[]>{
        return this.partService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePart(@Param('id') id:number):Observable<Part>{
        return this.partService.deletePart(Number(id));
    }

    @Get('user/:user')
    findAllPartsByUser(@Param('user') user:number):Observable<Part[]>{
        return this.partService.findAllPartsByUser(user);
    }
}
