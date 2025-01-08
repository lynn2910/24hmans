export const users = [
    {
        "id": "e052f135-13db-4a0d-aa15-f9bffac00359",
        "email": "test@gmail.com",
        "hashed_password": "$2y$10$gYOVSYwy/SJvkoWRBQvkNu2So9RTMa./.zFq8bj1Edm9zn.e92mma",
        "first_name": "Test",
        "last_name": "Family",
        "created_at": "2024-11-19 11:41:11"
    },
    {
        "id": "f4f434b3-f256-484b-8935-29e13126c9e8",
        "email": "carla@gmail.com",
        "hashed_password": "$2y$10$hc/SewW8/cyVHDuSHHXDyOyrzbPrwcFjAIjXHOWqwAsLn0QxHfF4i",
        "first_name": "Carla",
        "last_name": "Wilson",
        "created_at": "2024-11-19 11:41:11"
    }
]

export const user_orders = [
    {
        user_id: "e052f135-13db-4a0d-aa15-f9bffac00359",
        order_id: "b04806c0-7790-4bf0-bb49-a7564c8b338e",

        total_price: 225.92,
        date: new Date("2025-01-07T09:14:34.576Z"),

        articles: [
            {
                article_id: 1,
                article: {
                    item_id: 1,
                    shop_id: "5bc1bcf2-0d5e-4adf-9402-5dafa3777413",
                    name: "Porte-clé frein",
                    image: null,
                    category_id: "be2cff03-7d12-4369-acff-037d12a36993",
                    stock: 79,
                    price: 16.99,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                unit_price: 16.99,
                amount: 3
            },
            {
                article_id: 3,
                article: {
                    item_id: 3,
                    shop_id: "5bc1bcf2-0d5e-4adf-9402-5dafa3777413",
                    name: "Écusson Porsche",
                    image: null,
                    category_id: "9af710a9-9c13-43d7-b710-a99c1323d77d",
                    stock: 14,
                    price: 34.99,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                unit_price: 34.99,
                amount: 5
            }
        ],

        tickets: [
            {
                ticket_id: 1,
                ticket: {
                    category_id: "baf910a9-9l13-43c9-b780-a77c1323d87d",
                    forfait_id: ["tjz859s2-8g40-43t5-h845-z87g1589t15h", "tjz859s2-8g42-43t5-h845-z87g1589t15h"],
                    personne_id: ["hrs561r5-4f65-24f5-y45v1556f25g"],
                }
            }
        ],
    }
]