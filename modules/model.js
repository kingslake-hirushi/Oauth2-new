var model = module.exports;

function js_yyyy_mm_dd_hh_mm_ss(datetime) {
  let year = "" + datetime.getFullYear();
  let month = "" + (datetime.getMonth() + 1);
  if (month.length == 1) {
    month = "0" + month;
  }
  let day = "" + datetime.getDate();
  if (day.length == 1) {
    day = "0" + day;
  }
  let hour = "" + datetime.getHours();
  if (hour.length == 1) {
    hour = "0" + hour ;
  }
  let minute = "" + datetime.getMinutes();
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  let second = "" + datetime.getSeconds();
  if (second.length == 1) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}

model.getAccessToken = function (bearerToken, callback) {
  console.log("getAcceesToken");
  global.sqlPool.getConnection(function (err, connection) {
    let sqlGetToken =
      "select * from token where token = '" +
      bearerToken +
      "' and tokentype = 'access';";
    connection.query(sqlGetToken, function (error, results, fields) {
      connection.release();
      if (!error) {
        let token = results[0];

        if (token) {
          return callback(false, {
            accessToken: token.token,
            accessTokenExpiresAt: token.expires,
            client: {
              clientId: token.clientId,
            },
            user: {
              username: token.userId,
            },
            scope: null,
          });
        } else {
          callback(false, false);
        }
      } else {
        console.log(error);
        callback(false, false);
      }
    });
  });
};

model.getRefreshToken = function (bearerToken, callback) {
  console.log("getrefreshToken");
  global.sqlPool.getConnection(function (err, connection) {
    let sqlGetToken =
      "select * from token where token = '" +
      bearerToken +
      "' and tokentype = 'refresh';";
    connection.query(sqlGetToken, function (error, results, fields) {
      connection.release();
      if (!error) {
        let token = results[0];

        if (token) {
          return callback(false, {
            refreshToken: token.token,
            client: { clientid: token.clientid },
            user: { id: token.userid },
            refreshTokenExpiresAt: token.expires,
          });
        } else {
          callback(false, false);
        }
      } else {
        console.log(error);
        callback(false, false);
      }
    });
  });
};

model.getClient = function (clientId, clientSecret, callback) {
  console.log("getclient");
  global.sqlPool.getConnection(function (err, connection) {
    let sqlGetClient =
      "select * from client where clientid = '" +
      clientId +
      "' and clientsecret = '" +
      clientSecret +
      "';";
    connection.query(sqlGetClient, function (error, results, fields) {
      connection.release();
      if (!error) {
        let client = results[0];
        if (client) {
          const grants = client.grants.split(",").map((grant) => grant.trim());
          return callback(false, {
            clientId: client.clientid,
            clientSecret: client.clientsecret,
            redirectUri: client.redirecturi,
            grants: grants,
          });
        } else {
          callback(false, false);
        }
      } else {
        console.log(error);
        callback(false, false);
      }
    });
  });
};

model.saveToken = function (token, client, user, callback) {
  console.log("saveToken");
  global.sqlPool.getConnection(function (err, connection) {
    let sqlClearToken =
      "delete from token where tokentype = 'access' and clientid = '" +
      client.clientId +
      "' and userid = " +
      user.id +
      ";" +
      "delete from token where tokentype = 'refresh' and clientid = '" +
      client.clientId +
      "' and userid = " +
      user.id +
      ";";
    let sqlAddToken =
      "insert into token(token, tokentype, clientid, userid, expires) values('" +
      token.accessToken +
      "', 'access', '" +
      client.clientId +
      "', " +
      user.id +
      ", '" +
      js_yyyy_mm_dd_hh_mm_ss(token.accessTokenExpiresAt) +
      "');" +
      "insert into token(token, tokentype, clientid, userid, expires) values('" +
      token.refreshToken +
      "', 'refresh', '" +
      client.clientId +
      "', " +
      user.id +
      ", '" +
      js_yyyy_mm_dd_hh_mm_ss(token.refreshTokenExpiresAt) +
      "');";
    connection.query(

      sqlClearToken + sqlAddToken,
      function (error, results, fields) {
        connection.release();
        if (!error) {
        callback(false, {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            user: user,
          });
        } else {
          console.log(error);
          callback(true);
          
          
        }
      }
    );
  });
};

model.getUser = function (username, password, callback) {
  console.log("getUser");
  global.sqlPool.getConnection(function (err, connection) {
    let sqlGetUser =
      "select * from user where username = '" +
      username +
      "' and password = '" +
      password +
      "';";
    connection.query(sqlGetUser, function (error, results, fields) {
      connection.release();

      if (!error) {
        let user = results[0];
        if (user) {
          return callback(false, {
            id: user.id,
            username: user.username,
            password: user.password,
          });
        } else {
          callback(false, false);
        }
      } else {
        console.log(error);
        callback(false, false);
      }
    });
  });
};


model.revokeToken = function (token, callback) {
  console.log("revokeToken");
  global.sqlPool.getConnection(function (err, connection) {
   
    let sqlClearToken =
      "delete from token where tokentype = 'access' and clientid = '" +
      token.client.clientid +
      "' and userid= " +
      token.user.id +
      ";" +
      "delete from token where tokentype = 'refresh' and clientid = '" +
      token.client.clientid +
      "' and userid = " +
      token.user.id +
      ";";

    connection.query(sqlClearToken, function (error, results, fields) {
      connection.release();
      if (!error) {
        
        callback(false, true);
      } else {
        console.log(error);
        callback(true);
      }
    });
  });
};
