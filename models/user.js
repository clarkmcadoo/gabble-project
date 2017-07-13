"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.message, { as: "messages", foreignKey: "authorid" }),
    user.hasMany(models.like, { as: "likes", foreignKey: "likerid" });

  };

  return user;
};

// "use strict";
// module.exports = function(sequelize, DataTypes) {
//   var user = sequelize.define(
//     "user",
//     {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       bio: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         defaultValue: "I'm just a person floating around the sun."
//       }
//     },
//     {}
//   );

//   user.associate = function(models) {
//     user.hasMany(models.post, { as: "posts", foreignKey: "authorid" });
//     user.hasMany(models.comment, { as: "comments", foreignKey: "authorid" });
//   };

//   return user;
// };
