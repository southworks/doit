# Logical delete by ID

The DELETE /tasks/{id} endpoint allows you to soft delete a specific task using their ID.

####Example

`http://HOST/taskt/5e9739707fe8cd0ee69e8a2e`

#### Parameters
|  Parameter | Type  | Optional  | Description  |
| ------------ | ------------ | ------------ | ------------ |
|ID  | String  | False  | ID related to a specific task  |

#### Response status
| Status  |  Description |
| ------------ | ------------ |
| 200  | The operation was executed correctly, it returns a JSON indicating the deleted ID   |
| 400  |  Indicates the occurrence of an error related to the ID |
| 500  |  Internal Server error |

#### Response example
```JSON
	{
  			"message": "TODO deleted!",
  			"id": "5e9739707fe8cd0ee69e8a2e"
     }
```

#### Error example
```JSON
	{
  			"message": "An error occurred, try again later"
     }
```

```JSON
	{
			"statusCode": 500,
 			"error": "Internal Server Error",
 			"message": "Cast to ObjectId failed for value ..."
     }
```