Feature: Aggregated bills
  In order to get aggregated bills
  As an authorized API user
  I want to make API calls to /api/bills/aggregated

  Background: Setup JSON schemas
    Given I have a JSON schema:
    """
    {
      "id": "aggregatedBillsItem",
      "type": "object",
      "properties": {
         "idBills": {"type": "number"},
         "billsCount": {"type": "number"},
         "billsAmount": {"type": "number"},
         "billsPaidCount": {"type": "string"},
         "billsPaidAmount": {"type": "number"},
         "billsAddTimestamp": {"type": "string"}
      },
      "required":[
         "idBills",
         "billsCount",
         "billsAmount",
         "billsPaidCount",
         "billsPaidAmount",
         "billsAddTimestamp"
      ],
      "additionalProperties":false
    }
    """
    And I have a JSON schema:
    """
    {
      "id": "aggregatedBills",
      "type": "object",
      "properties": {
        "page": {"type": "number"},
        "perPage": {"type": "number"},
        "total": {"type": "number"},
        "items": {
          "type": "array",
          "items": {
            "$ref": "aggregatedBillsItem"
          }
        }
      },
      "required":[
         "page",
         "perPage",
         "total",
         "items"
      ],
      "additionalProperties":false
    }
    """

  Scenario: Get aggregated bills without filters
    Given I am authenticated as "candidate@e.ru"
    When I send a GET request to "/api/bills/aggregated"
    Then the response status code should be 200
    And the JSON response schema should be:
    """
    {
      "$ref": "aggregatedBills"
    }
    """
    And the JSON nodes should contain:
    """
    {
      "page": 1,
      "perPage": 10
    }
    """

  Scenario Outline: Get aggregated bills filtered by date
    Given I am authenticated as "candidate@e.ru"
    When I send a GET request to "/api/bills/aggregated" with:
    """
    {
      "parameters": {
        "fromDate": "2018-04-08 19:30:00+00",
        "toDate": "2018-04-08 19:40:00+00",
        "page": <page>,
        "perPage": 1
      }
    }
    """
    Then the response status code should be 200
    And the JSON response schema should be:
    """
    {
      "$ref": "aggregatedBills"
    }
    """
    And the JSON nodes should contain:
    """
    {
      "page": <page>,
      "perPage": 1,
      "total": 3,
      "items": [
        {
          "billsCount": <bills_count>,
          "billsAmount": <bills_amount>
        }
      ]
    }
    """
    Examples:
      | page | bills_count | bills_amount |
      | 1    | 413         | 84918.58     |
      | 2    | 434         | 50555.72     |
      | 3    | 430         | 55318.34     |

  Scenario Outline: Try to get aggregated bills with wrong parameters
    Given I am authenticated as "candidate@e.ru"
    When I send a GET request to "/api/bills/aggregated" with:
    """
    {
      "parameters": {
        "<field>": "<value>"
      }
    }
    """
    Then the response status code should be 400
    And the JSON nodes should contain:
    """
    {
      "error": "<error>",
      "details": {
        "invalidField": "<field>",
        "message": "<message>"
      }
    }
    """
    Examples:
      | field    | value         | error                   | message                                                             |
      | page     | 2             | ERROR_VALIDATION_FAILED | \"page\" greater than 1 is not allowed without \"toDate\" parameter |
      | page     | invalid-value | ERROR_VALIDATION_FAILED | \"page\" must be a number                                           |
      | perPage  | invalid-value | ERROR_VALIDATION_FAILED | \"perPage\" must be a number                                        |
      | toDate   | invalid-value | ERROR_VALIDATION_FAILED | \"toDate\" must be a valid ISO 8601 date                            |
      | fromDate | invalid-value | ERROR_VALIDATION_FAILED | \"fromDate\" must be a valid ISO 8601 date                          |
