define({ "api": [
  {
    "type": "post",
    "url": "/api/public/auth/login",
    "title": "",
    "name": "login",
    "group": "Auth",
    "description": "<p>Авторизует пользователя. В ответ на запрос отдаст JWT-Токен. Его необходимо указывать в заголовке Authorization.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта пользователя.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>jwtToken</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\":\n     \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/api/bills/aggregated",
    "title": "",
    "name": "getAggregatedBills",
    "group": "Bills",
    "description": "<p>Возвращает аггрегированные счета</p>",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers-Example:",
          "content": "{\"Authorization\": \"Bearer :jwtToken\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "fromDate",
            "description": "<p>ISO 8601</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "toDate",
            "description": "<p>ISO 8601, <strong>required</strong> when <code>page</code> is greater than <code>1</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>page <strong>must</strong> be used with <code>toDate</code> filter when <code>page</code> is greater than <code>1</code></p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..50",
            "optional": true,
            "field": "perPage",
            "defaultValue": "10",
            "description": "<p>items per page</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "fromDate",
          "content": "2019-01-26T23:20:23.347Z",
          "type": "string"
        },
        {
          "title": "toDate",
          "content": "2019-01-26T23:30:23.347Z",
          "type": "string"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"items\": [\n        {\n            \"idBills\": 4277,\n            \"billsCount\": 106,\n            \"billsAmount\": 11974.18,\n            \"billsPaidCount\": 100,\n            \"billsPaidAmount\": 9984.18,\n            \"billsAddTimestamp\": \"2018-04-01T04:15:00.000Z\"\n        }\n    ],\n    \"total\": 500,\n    \"page\": 1,\n    \"perPage\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ERROR_VALIDATION_FAILED\",\n  \"details\": {\n    \"invalidField\": \"page\",\n    \"invalidValue\": 2,\n    \"message\": \"\\\"page\\\" greater than 1 is not allowed without \\\"toDate\\\" parameter\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "Bills"
  },
  {
    "type": "get",
    "url": "/api/users/item",
    "title": "",
    "name": "getUser",
    "group": "User",
    "description": "<p>Возвращает пользователя по id</p>",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers-Example:",
          "content": "{ \"Authorization\": \"Bearer :jwtToken\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>пользователь.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/items",
    "title": "",
    "name": "getUsers",
    "group": "User",
    "description": "<p>Возвращает список пользователей</p>",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers-Example:",
          "content": "{ \"Authorization\": \"Bearer :jwtToken\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "result",
            "description": "<p>Массив созданных пользователей.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/public/healthcheck",
    "title": "",
    "name": "healthcheck",
    "group": "healthcheck",
    "description": "<p>Всегда вернет 200, когда приложение запущено</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "result",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "healthcheck"
  }
] });
