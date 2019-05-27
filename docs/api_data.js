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
    "url": "/api/bills/",
    "title": "",
    "name": "getBills",
    "group": "Bills",
    "description": "<p>Возвращает список Счетов</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ISODate",
            "optional": true,
            "field": "fromDate",
            "description": "<p>Начало временных рамок. Считается включая дату</p>"
          },
          {
            "group": "Parameter",
            "type": "ISODate",
            "optional": true,
            "field": "toDate",
            "description": "<p>Конец временных рамок. Исключая дату</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "allowedValues": [
              "1..100"
            ],
            "optional": true,
            "field": "pageSize",
            "defaultValue": "10",
            "description": "<p>Размер страницы для пагинации</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": true,
            "field": "pageIndex",
            "defaultValue": "0",
            "description": "<p>Номер страницы для пагинации</p>"
          }
        ]
      }
    },
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
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Счета</p>"
          }
        ]
      }
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
