# GET a set of Tasks
​
The GET /tasks/ endpoint allows you to retrieve a set of task data.
-  You can use QueryParams for pagination:
   `page: This sets the page number that you want to retrieve.`
  ` limit: This sets the quantity of items per page.`
- If you use the QueryParams with empty values, it will use the defaults value. 
 `page = "0"`
  `limit = "3"`
- If instead you don´t use any QueryParams (you just use "/tasks/"), it will retrieve the full list of tasks.
​
####Example
​
`http://HOST/tasks?page=1&limit=6`
`http://HOST/tasks?page&limit`
`http://HOST/tasks/`
​
#### QueryParams
|  Parameter | Type  | Optional  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|Page  | String  | True  | The page number that you want to retrieve.  |
|Limit  | String  | True  | Quantity of items per page.  |
​
#### Response status
| Status  |  Description |
| ------------ | ------------ |
| 200  | The operation was executed correctly, it returns a JSON array containing task objects.   |
| 400  |  Indicates the occurrence of an error. |
​
#### Response example

```JSON
[
		{
				 "_id": "5e9739707fe8cd0ee69e8a2e",
				 "name": "Hacer asado",
				"is_completed": false,
				"deleted": false,
				 "created_at": "2020-04-20T15:27:16.181Z"
				"__v": 0,
		 },
		 		{
				 "_id": "5e973aaa0daea30fa1fb1407",
				 "name": "Comprar coca",
				"is_completed": false,
				"deleted": true,
				 "created_at": "2020-04-23T15:00:37.928Z"
				"__v": 0,
		 }
]
```
