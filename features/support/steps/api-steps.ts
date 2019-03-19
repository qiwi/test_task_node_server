import {After, Before, Given, Then, When} from "cucumber";
import {should, expect, use} from "chai";
import {Validator} from "jsonschema";
import {Request} from 'node-fetch';

// chai-subset cannot have exported types, so `import` is not available for this
// tslint:disable-next-line
use(require('chai-subset'));

Before(function(): void {
    this.jsonSchemaValidator = new Validator();
});

After(function(): void {
    this.jwtToken = undefined;
});

Given(/^I have a JSON schema:$/, function(jsonSchema: string): void {
    this.jsonSchemaValidator.addSchema(this.parseJson(jsonSchema));
});

Given(/^I am authenticated as "([^"]+)"$/, function(email: string): void {
    this.jwtToken = this.jwtService.getToken(email);
});

type TMethod = 'GET';

When(/^I send a (GET) request to "([^"]+)"$/, async function(
    method: TMethod,
    uri: string
): Promise<void> {
    this.response = await this.makeRequest(new Request(uri, {method}));
});

interface IRequestConfig {
    parameters?: {
        [key: string]: string
    };
}

When(/^I send a (GET) request to "([^"]+)" with:$/, async function(
    method: TMethod,
    uri: string,
    jsonRequestConfig: string
): Promise<void> {
    let req = new Request(uri, {method});
    const requestConfig: IRequestConfig = this.parseJson(jsonRequestConfig);
    if (requestConfig.parameters) {
        let queryString = this.buildQueryString(requestConfig.parameters);
        if (uri.indexOf('?') === -1) {
            queryString = '?' + queryString;
        }

        req = new Request(req.url + queryString, req);
    }

    this.response = await this.makeRequest(req);
});

Then(/^the response status code should be (\d+)$/, function(statusCode: number): void {
    should().exist(this.response, 'Please, make a request before checking status code.');
    should().equal(this.response.status, statusCode);
});

Then(/^the JSON response schema should be:$/, async function(jsonSchema: string): Promise<void> {
    const body: object = this.extractJsonInBody();
    this.jsonSchemaValidator.validate(
        body,
        this.parseJson(jsonSchema),
        {allowUnknownAttributes: false, throwError: true}
    );
});

Then(/^the JSON nodes should contain:$/, async function(jsonSchema: string): Promise<void> {
    const schema: object = this.parseJson(jsonSchema);
    const body: object = this.extractJsonInBody();
    expect(body).containSubset(schema);
});

Then(/^print last response$/, function(): void {
    console.log(this.responseBody);
});
