import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


export class jwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err, user, info) {
        if (err ||!user) {
            throw err || info
        }
        return user
    }
}