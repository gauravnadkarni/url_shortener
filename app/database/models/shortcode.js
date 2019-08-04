'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShortCode = sequelize.define('Short_Code', {
    shortCode: DataTypes.STRING,
    used: DataTypes.STRING
  });
  ShortCode.associate = function (models) {
    //ShortCode.hanOne(models.LongUrl, { foreignKey: 'shortCode', as: 'longUrl' });
  };
  ShortCode.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return ShortCode;
};