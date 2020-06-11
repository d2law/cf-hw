the program is build by node JS \
Please run npm install first, then run the program by running \
node index.js

Required APIs: \
/api/auth \
    method POST with form-data: \
        {"key":"secret key between client/server"}  \
        To generate JWT token \
        Token will be expired in 5 minutes
/api/getData \
    method GET with Bearer token: \
        Req param: column_name : value \
/api/updateData \
    method POST: \
        Req param: name = value, valid=some_value, count=some_value \
/api/insertData \
    method POST: \
        Req param: column_name1 = value, column_name2= value \
\
error if modify /insert a value does not match exist specification table (invalid column name) \
error if modify /insert value with the wrong format \
