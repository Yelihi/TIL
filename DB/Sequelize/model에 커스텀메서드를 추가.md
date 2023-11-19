## models 에 커스텀 메서드를 추가하기

<p>시퀄라이즈는 모델을 생성할때 기본적으로 사용할 수 있는 메서드를 생성해준다. 대표적으로 모델.get,set,add,delete 등이 있다. 이 메서드는 모델을 생성하기만 하면 주어지기 때문에 그대로 활용을 하면 되는데, API 내에서 처리하기에 조금 복잡한 로직이 있다고 가정했을 때, 이 로직을 모델 내 커스텀 메서드로 빼줄 수 있다.</p>

```js
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Shoes extends Model {
  static init(sequelize) {
    return super.init(
      {
        size: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        // 유저 모델에 대한 셋팅
        modelName: "Shoes",
        tableName: "shoes",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Shoes.belongsTo(db.Cloth);
  }
};
```

<p>모델을 클래스를 활용해서 생성했었다. 이를 활용해서 내부 메서드를 생성해줄 수 있는데, 간단한 메서드를 생성해보려고 한다. 상황은 이렇다. 클라이언트에서 post 요청을 받게 될 떄, req.body.categori 에 들어있는 분류에 따라 호출되어야 할 모델이 달라지는 상황이다. 예를 들어 카테고리가 신발이라면 위 모델을 호출해서 이 내부 테이블에 데이터를 저장해야 하는 것이다. 각각의 모델 내 테이블 column 은 당연히 다 다르고(셔츠와 신발이 기입조건이 다른것처럼), 이에 따라 모델.create 를 다 post API 에서 처리해주기에는 너무 과대해진다 판단하였다. 그래서 커스텀 메서드를 간단하게 추가해보자.</p>

```js
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Shoes extends Model {
  static init(sequelize) {
    return super.init(
      {
        size: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        // 유저 모델에 대한 셋팅
        modelName: "Shoes",
        tableName: "shoes",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static postShoesbyReq = async (req) => {
    const result = await this.create({
      size: req.body.size,
    });
    return result;
  };

  static associate(db) {
    db.Shoes.belongsTo(db.Cloth);
  }
};
```

- 메서드를 하나 추가해주었다. req를 받아 데이터를 추가해주는 메서드이다.
- 너무 간단하지만 위 신발 같은 모델의 수가 지금 테스트 과정인데도 벌써 7개정도가 되고 있다.
- 각 모델마다 메서드를 생성해줌으로서 코드를 더 간략하게 사용하게 할 수 있게 되었다.
