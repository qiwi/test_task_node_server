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
    "url": "/api/bill/item",
    "title": "",
    "name": "getBill",
    "group": "Bill",
    "description": "<p>Возвращает платежные данные по id</p>",
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
            "description": "<p>Объект платежных данных</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "Bill"
  },
  {
    "type": "get",
    "url": "/api/bills/items",
    "title": "",
    "name": "getBills",
    "group": "Bill",
    "description": "<p>Возвращает платежные данные</p>",
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
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>Страница</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Количество на страницу</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "startDate",
            "description": "<p>Начальная дата выборки</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "endDate",
            "description": "<p>Конечная дата выборки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "startDate",
          "content": "2019-04-05T21:40:02.377Z",
          "type": "string"
        },
        {
          "title": "endDate",
          "content": "2019-04-05T21:40:02.377Z",
          "type": "string"
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
            "description": "<p>Массив платежных данных</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"items\": [\n        {\n            \"idBills\": 832,\n            \"billsAddTimestamp\": \"2018-04-01T00:10:00.000Z\",\n            \"billsAmount\": 62761.54,\n            \"billsPaidAmount\": 53934.54,\n            \"billsCount\": 399,\n            \"billsPaidCount\": 369\n        }\n    ],\n    \"total\": 4784,\n    \"page\": 1,\n    \"perPage\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\": \"ERROR_VALIDATION_VALIDATION\",\n    \"details\": {\n        \"invalidField\": \"startDate\",\n        \"invalidValue\": \"2019-04-06T21:40:02.000Z\",\n        \"message\": \"Начальная дата должна быть раньше конечной\",\n        \"type\": \"Date\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes.ts",
    "groupTitle": "Bill"
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
