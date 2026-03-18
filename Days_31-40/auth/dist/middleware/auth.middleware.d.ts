import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface AuthRequest extends Request {
    user?: JwtPayload | string;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map