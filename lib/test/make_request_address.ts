import { requestConfig as config } from "./request_config";

export function makeRequestAddress(port: number, resource: string): string {
    return `${config.host}:${port}${resource}`;
}