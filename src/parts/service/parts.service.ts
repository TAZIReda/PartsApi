import { Injectable } from '@nestjs/common';
import { Part } from '../model/part.interface';
import { User } from 'src/users/model/user.interface';
import { PartEntity } from '../model/part.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable()
export class PartsService {
    
    constructor(
        @InjectRepository(PartEntity) private readonly partRepository:Repository<PartEntity>
    ){}

    createPart(part: Part, user: User) {
        part.user = user
        return from(this.partRepository.save(part));
    }

    updatePart(id: number, part: Part): Observable<PartEntity> {
        console.log('first update')
        return from(this.partRepository.update(id, part)).pipe(
            switchMap(()=>this.findOne(id))
            )
        ;
    }

    findOne(id: number): Observable<Part> {
        console.log('first find')
        return from(this.partRepository.findOne({
            where: {id},
            relations: ['user']}));
    }

    findAll(): Observable<Part[]> {
     return from(this.partRepository.find({relations:['user']}));   
    }

    deletePart(id: number): Observable<any> {
       return from(this.partRepository.delete({id}));
    }

    findAllPartsByUser(user: number): Observable<Part[]> {
        return from(this.partRepository.find({
            where:{
                user: {id: user}
            },
            relations:['user']
        })).pipe(
            map((part:PartEntity[]) =>part
        ))
    }
    
    
  

}
