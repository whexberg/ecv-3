// curl --request POST \
//      --url 'https://apisandbox.dev.clover.com/invoicingcheckoutservice/v1/checkouts' \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --header 'X-Clover-Merchant-Id: {merchantId}' \
//      --data '{
// "customer": {
//     "email": "customer@example.com",
//         "firstName": "Alex",
//         "lastName": "Smith",
//         "phoneNumber": "5555551010"
// },
// "shoppingCart": {
//     "lineItems": [
//         {
//             "note": "No pulp",
//             "name": "Orange juice",
//             "price": 600,
//             "unitQty": 2
//         },
//         {
//             "note": "Non-dairy",
//             "name": "French toast",
//             "price": 1200,
//             "unitQty": 1
//         }
//     ]
// }
// }'

import { CloverConfig } from '@/lib/config';

export const makeRequest = () =>
    fetch('https://www.clover.com/global-developer-home/invoicingcheckoutservice/v1/checkouts', {
        method: 'POST',
        mode: 'no-cors',
        // headers: {
        //     accept: 'application/json',
        //     'content-type': 'application/json',
        //     'X-Clover-Merchant-Id': `${CloverConfig.merchantId}`,
        // },
        body: JSON.stringify({
            customer: {
                email: 'customer@example.com',
                firstName: 'Alex',
                lastName: 'Smith',
                phoneNumber: '5555551010',
            },
            shoppingCart: {
                lineItems: [
                    {
                        note: 'No pulp',
                        name: 'Orange juice',
                        price: 600,
                        unitQty: 2,
                    },
                    {
                        note: 'Non-dairy',
                        name: 'French toast',
                        price: 1200,
                        unitQty: 1,
                    },
                ],
            },
        }),
    });
