import {setWorldConstructor} from "cucumber";
import {IAppJwtConfig, JwtService} from "innots";
import {config} from "../../app";
import fetch, {Request, Response} from 'node-fetch';
import {Validator} from "jsonschema";
import {should} from "chai";

class World {
    protected jwtService: JwtService = new JwtService(config.get('appConfig.jwt') as IAppJwtConfig);
    protected jwtToken: string | undefined;
    protected baseUri: string = `http://localhost:${config.get('appConfig.port')}`;
    protected responseBody: string | undefined;
    protected jsonSchemaValidator: Validator;
    protected _response: Response | undefined;

    public makeRequest(req: Request | string): Promise<Response> {
        if (typeof req === 'string') {
            req = new Request(req);
        }

        if (this.jwtToken && !req.headers.has('Authorization')) {
            req.headers.set('Authorization', `Bearer ${this.jwtToken}`);
        }

        if (!/^https?:\/\//.test(req.url)) {
            req = new Request(this.baseUri + req.url, req);
        }

        return fetch(req);
    }

    public buildQueryString(params: object, parentNode?: string): string {
        return Object
            .keys(params)
            .reduce(
                (nodes, k) => {
                    const value = params[k];
                    if (typeof parentNode === 'string') {
                        k = `${parentNode}[${k}]`;
                    }

                    if (typeof value === 'object') {
                        return nodes.concat(this.buildQueryString(value, k));
                    }

                    nodes.push(`${encodeURIComponent(k)}=${encodeURIComponent(value)}`);

                    return nodes;
                },
                []
            )
            .join('&');
    }

    public parseJson(json: string): object {
        try {
            return JSON.parse(json);
        } catch (ignored) {
            throw new Error(`Expected JSON, passed value is: ${json}`);
        }
    }

    public extractJsonInBody(): object {
        should().exist(this.responseBody, 'Please, make a request before checking a request body.');
        try {
            return JSON.parse(this.responseBody);
        } catch (ignored) {
            throw new Error(`Response body is not in JSON format, actual value is: ${this.responseBody}`);
        }
    }

    set response(response: Response | undefined) {
        this._response = response;
        if (response) {
            response.text().then((value) => {
                this.responseBody = value;
            });
        } else {
            this.responseBody = undefined;
        }
    }

    get response(): Response | undefined {
        return this._response;
    }
}

setWorldConstructor(World);
