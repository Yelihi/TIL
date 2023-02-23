<h2 align="center"> Network </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.2.8](#2023-2-8)
- [2023.2.23](#2023-2-23)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-2-8

### models 에 커스텀 메서드를 추가하기

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

## 2023-2-23

### 데이터베이스 hasOne 의 고찰

<p>프로젝트를 작업하다가 문제가 발생하였는데, 연결된 테이블간의 메서드 사용에서 문제가 발생했다. 기존에 테이블을 서로 associate 하면 자동적으로 사용할 수 있는 메서드를 활용하려고 하였다. 알다싶이 hasOne 은 1:1 관계에서 사용한다.</p>

```js
  static associate(db) {
    db.Cloth.belongsTo(db.User);
    db.Cloth.hasMany(db.Image);
    db.Cloth.hasOne(db.Outer);
    db.Cloth.hasOne(db.Shirt);
    db.Cloth.hasOne(db.Top);
    db.Cloth.hasOne(db.Pant);
    db.Cloth.hasOne(db.Shoes);
    db.Cloth.hasOne(db.Muffler);
  }

```

<p>즉 모델 Cloth 와 모델 Outer 는 1:1 관계라는 의미이다. 그럴수밖에 없는것이 하나의 의류당 하나의 사이즈 정보가 필요하니 말이다. 관계가 형성되면 addModel 메서드를 사용할 수 있을 것이라 판단했다. 하지만 hasOne 관계에서 addModels 메서드를 사용하면 오류가 발생한다. 오류에서는 없는 메서드라고 칭하는데, 1:1 관계는 다른 메서드를 사용해야 한다.</p>

```js
if (req.body.image) {
  if (Array.isArray(req.body.image)) {
    const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image.filename })));
    await cloth.addImages(images);
  } else {
    const image = await Image.create({ src: req.body.image[0].filename });
    // 1:다 관계에서는 addModels 로 작성하자
    await cloth.addImages(image);
  }
}
switch (req.body.categori) {
  case "Top": {
    const top = await Top.postTopbyReq(req);
    // 1:1 에서는 setModel 로 작성해야한다.
    await cloth.setTop(top);
    break;
  }
  // ..
}
```

- 보는것과 같이 사용하는 메서드가 다름을 확인할 수 있다. 간단했지만 이것때문에 꽤나 고생하였다.

<p>주의할 점은 setModel 에서 Model 은 단수라는 점이다. 복수형으로 작성하면 안된다. 여기서 나의 문제가 발생하는데 Shoes 라고 모델명 자체를 복수로 만들어 버리는 바람에, set 메서드를 사용할 수 없게 되었었다. 이에 migration 을 통해 renameTable 을 통해서 model 명을 변경해주어서 해결할 수 있었다.</p>
