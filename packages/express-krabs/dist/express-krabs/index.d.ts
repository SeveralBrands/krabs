import { Request, Response } from 'express';
import { Config } from '../utils/config/config';
declare function krabs(req: Request, res: Response, handle: any, app: any, config?: Config): Promise<void>;
export default krabs;
