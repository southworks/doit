# Get by ID

The GET /tasks/{id} endpoint allows you to retrieve a specific task using their ID.

####Example

`http://HOST/taskt/5e9739707fe8cd0ee69e8a2e`

#### Parameters
|  Parameter | Type  | Optional  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|ID  | String  | False  | ID related to a specific task  |

#### Response status
| Status  |  Description |
| ------------ | ------------ |
| 200  | The operation was executed correctly, it returns a JSON type task object.   |
| 400  |  Indicates the occurrence of an error related to the ID |
| 500  |  Internal Server error |

#### Response example
```JSON
	{
			 "_id": "5e9739707fe8cd0ee69e8a2e",
			 "name": "Hacer asado",
            "is_completed": false,
            "deleted": false,
			 "created_at": "2020-04-20T15:27:16.181Z"
            "__v": 0,
     }
```

#### Error example
```JSON
	{
			"error": "invalid id"
     }
```

```JSON
	{
			"statusCode": 500,
 			"error": "Internal Server Error",
 			"message": "Cast to ObjectId failed for value ..."
     }
```