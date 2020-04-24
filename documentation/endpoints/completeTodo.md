# Complete a TODO by ID

The COMPLETE a TODO /tasks/{id} endpoint allows to mark a specific task as Completed.

####Example

'http://HOST/task/5e9739707fe8cd0ee69e8a2e'

#### Parameters
|  Parameter | Type  | Optional  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|ID  | String  | False  | ID related to a specific task  |

#### Response status
| Status  |  Description |
| ------------ | ------------ |
| 200  | The operation was executed correctly, it returns a JSON indicating the deleted ID   |
| 400  |  Indicates the occurrence of an error related to the ID |
| 405  |  Indicates the task was already deleted |
| 500  |  Internal Server error |

#### Response example
```JSON
	{
  			"statusCode": 200,	
				"message": " [taskName] - Completed",  			
     }
```

#### Error example
```JSON
	{
  			"statusCode": 400,	
				"message": " [id]  - ID not found "
     }
```

```JSON
	{
			"statusCode": 405, 			
 			"message": " [taskName] - was Deleted "
     }
```

```JSON
	{
			"statusCode": 500,
 			"error": "Internal Server Error",
 			"message": "Cast to ObjectId failed for value ..."
     }
```