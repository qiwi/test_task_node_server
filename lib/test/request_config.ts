
const requestConfig =
{
    minDate: "2018-04-01 00:05:00+00",
    maxDate: "2018-04-17 14:40:00+00",
    host: "http://localhost",
    serverPort: 3000,
    billsUrl: "/api/bills/items",
    billsUrlFilteredByDate: "/api/bills/items/filteredbydate",
    headersWithToken: {
        "Authorization": `Bearer ${process.env.TOKEN}`,
        "accept": "application/json",
        'context-type': "application/json"
    }
}

export { requestConfig };

