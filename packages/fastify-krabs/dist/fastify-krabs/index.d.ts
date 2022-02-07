import type { FastifyRequest, FastifyReply } from 'fastify';
import { Config } from '../utils/config/config';
export default function krabs(request: FastifyRequest, reply: FastifyReply, handle: any, app: any, config?: Config): Promise<void>;
