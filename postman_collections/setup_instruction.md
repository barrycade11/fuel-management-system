## Postman collection FMS

###### How to import `FMS.postman_collection.json`  to your postman locally

* Open postman application
* At the left sidebar

![1743215690564](image/setup_instruction/1743215690564.png)

* open FMS.postman_collections.json

###### How to update collection

* at your postman locally export your collection by clicking the folder three dots(...)
  ![1743215879773](image/setup_instruction/1743215879773.png)
* then overwrite the `FMS.postman_collection.json` to push your changes to the repo

###### How to create postman enviroment variables

* if no postman env variable not exist create new postman env by clicking
  ![1743216078004](image/setup_instruction/1743216078004.png)
* enter this env variables

  ```
  Variable		type		initialvalue
  localhosturl				http://localhost:5000
  token		
  ```

###### When creating a new route in postman

* before creating a new route always logged in first by calling `Authentication\Login` route to create a  `token`.
  it automatically filled out the postman env variable `token`
* In your created new route go to Authorization tab select Bearer token and call the postman env token `{{token}}`

  ![1743216589340](image/setup_instruction/1743216589340.png)
