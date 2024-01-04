import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy} from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService:ConfigService 
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: configService.get('JWT_SECRET'),
            secretOrKey: 'helloworld',

    });
}

    async validate( payload:any): Promise<any>{
        return {...payload.user};
    }
}