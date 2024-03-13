# Oauth2-Implimentation
change database password in //modules/sqlPool.js

curl --location 'localhost:3000/auth/token/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=userA' \
--data-urlencode 'client_secret=clientAsecret' \
--data-urlencode 'client_id=clientA' \
--data-urlencode 'password=userApw1'

curl --location 'localhost:3000/auth/token/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode 'client_secret=clientAsecret' \
--data-urlencode 'client_id=clientA' \
--data-urlencode 'refresh_token=dcf6e60ed016891b0763d052b54ac0b13437f3f5'

curl --location 'localhost:3000/auth/' \
--header 'Authorization: Bearer 879912f9229d873d5ef09fad070aaa3a9b376774'

