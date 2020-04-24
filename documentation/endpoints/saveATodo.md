# Save a TODO

The POST /tasks/{id} endpoint allows you to create and Update a specific task using their ID.

#### Example

`http://HOST/tasks`

#### Body (Create)

| Parameter    | Type   | Optional | Description                     |
| ------------ | ------ | -------- | ------------------------------- |
| name         | String | False    | Name of the task                |
| is_completed | Bool   | True     | True if completed, false if not |

#### Body (Update)

| Parameter    | Type   | Optional | Description                     |
| ------------ | ------ | -------- | ------------------------------- |
| ID           | String | False    | ID related to a specific task   |
| name         | String | False    | Name of the task                |
| is_completed | Bool   | True     | True if completed, false if not |

#### Response status

| Status   | Description                                                  |
| -------- | ------------------------------------------------------------ |
| 201      | The operation was executed correctly, it returns a JSON indicating that a new Task was created. |
| 200      | The operation was executed correctly, it returns a JSON indicating that a new Task was successfully updated. |
| 400, 500 | Indicates the occurrence of an error                         |

#### Response example

```json
	{		
        "id": "5e9739707fe8cd0ee69e8a2e",
        "name": "Hacer asado",
        "is_completed": true
     }
```

```json
	{		
        "id": "5ea30c9318d1783e5a18cc43",
        "name": "Alquilar sillas",
        "is_completed": false
	 }
```


#### Error example

```JSON
	{
  			"statusCode": 400,
            "error": "Bad Request",
            "message": "\"name\" is required"
     }
```

