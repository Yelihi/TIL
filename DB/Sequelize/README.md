<h2 align="center"> Network </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.2.8](#2023-2-8)
- [2023.2.23](#2023-2-23)
- [2023.3.9](#2023-3-9)
- [2023.3.10](#2023-3-10)

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

## 2023-3-9

### 데이터 타입에 객체도 설정하는것이 가능하다

<p>시퀄라이즈는 다양한 데이터 타입을 제공해주는데, 그 중 객체 또한 부분적으로 가능하다.</p>

```js
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Images",
          "visionSearch",
          {
            type: Sequelize.DataTypes.JSON,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn("Images", "visionSearch", { transaction: t })]);
    });
  },
};
```

- migrate 코드인데, 여기서 type 을 보게 되면, DateTypes.JSON 을 저장할 수 있다. 다만 한계점이 있는데, 배열로는 저장할 수 없다는 점이다
- postSQL 에서는 DataType.ARRAY(DataType.JSON) 으로 가능하지만 기본 mysql 에서는 불가능하다.
- 그래서 일단은 JSON 형태로 객체저장을 하였지만, 이후 전달되는 데이터 객체의 형식을 수정해야할 듯 싶다.

## 시퀄라이즈에서 PATCH API 구현하기 예시

<p>프로젝트를 진행하다가 게시글에 대한 수정이 필요했는데, 단순히 patch 를 통한 update 에서 끝나지 않아서 한번 코드를 기록하고자 한다. 수정되어야 할 내용들은 크게 기본 아이템에 대한 이름등의 입력값과, 카테고리에 따른 수치입력값, 그리고 이미지 이렇게 3가지로 나눠볼 수 있겠다.</p>

```js
router.patch("/clothes/:clothId", isLoggedIn, async (req, res, next) => {
  try {
    /**
     * 우선 수정하고자 하는 데이터를 찾는다. findOne 을 활용하면 된다.
     * 다만 cloth 에 연결되어있는 테이블 들 중에서 카테고리에 맞는 테이블을 가져와야 한다
     * 지금으로서는 include 를 통해 전체 테이블를 검색해서 foregn key 로 연결되어있는 테이블을 검색하는수밖에..
     */
    const cloth = await Cloth.findOne({
      where: { id: req.params.clothId },
      include: [Outer, Top, Pant, Shirt, Shoe, Muffler, Image],
    });
    // 데이터가 없다면 메세지를 보낸다.
    if (!cloth) {
      return res.status(403).send("의류가 존재하지 않습니다.");
    }
    /**
     * 데이터가 있다면, req 에서 받아온 데이터를 기반으로 기존 데이터를 업데이트 한다.
     * 우선 cloth 테이블 한 곳에만 있는 데이터들은 쉽게 업데이트가 가능하다.
     */
    await Cloth.update(
      {
        productName: req.body.items.productName,
        description: req.body.items.description,
        price: req.body.items.price,
        color: req.body.items.color,
        categori: req.body.items.categori,
        purchaseDay: req.body.items.purchaseDay,
        UserId: req.user.id,
      },
      {
        where: { id: req.params.clothId },
      }
    );

    /**
     * 카테고리에 따른 업데이트를 해야한다.
     * 현재 서버는 의류 데이터가 어떠한 수치 테이블과 연결되어있는지 알 수 없다
     * 예를 들어 기존에 머플러로 저장되어있던 카테고리가 수정하면서 상의티셔츠로 변경할 수 있다.
     * 이렇게 된다면 기존 머플러의 데이터는 삭제하고, 상의티셔츠 테이블에서는 새롭게 데이터를 생성해야한다
     * 즉 update 를 사용하는것이 아니다.
     */
    if (req.body.items.categori !== cloth.categori) {
      // destroy 를 통해 기존 카테고리의 데이터를 삭제한다. db를 import 해온 다음 활용할 수 있다.
      await db[cloth.categori].destroy({ where: { ClothId: req.params.clothId } });
      // 다음 테이블 메서드를 호출하기 위해 기존에 생성해둔 객체를 호출한다. 이 객체는 뒤에 코드로 남기겠다.
      getCatagori[req.body.items.categori]["postWithId"](cloth, req);
    } else if (req.body.items.categori === cloth.categori) {
      // 만일 카테고리가 기존과 동일하다면 그냥 update 를 해주면 된다.
      getCatagori[req.body.items.categori]["update"](req, req.params.clothId);
    }

    /**
     * 이미지의 경우 어떤 내부 입력값을 update 하기에는 파일명이기 때문에 곤란하다.
     * 그래서 그냥 처음부터 삭제와 생성으로 초점을 맞추는것이 좋다
     * 다만 모든 데이터를 다 지우고 새로 다시 생성하는것보다, 기존 사진은 남겨두고, 지울건 지우고 생성할것은 생성해주는것이 더 바람직할 것이다.
     *  - 현재 테이블에 존재하는 이미지를 가지고 온다.
     *  - 프론트에서 전달해온 이미지를 저장한다
     *  - 다루기 쉽게 배열로 타입들을 전환시켜준다
     *  - 지울 이미지를 골라준다 (테이블 내 이미지 - 프론트에서 전달한 이미지)
     *  - 이미지를 지운다
     *  - 추가해줄 이미지를 골라준다 (프론트에서 전달한 이미지 - 테이블 내 이미지)
     *  - 이미지를 추가해준다
     */
    if (req.body.items.image) {
      // 우선 이미지를 찾아준다. cloth foregn key 로 찾아준다
      const existingImages = await Image.findAll({ where: { ClothId: req.params.clothId } });
      // 이때의 existingImages 데이터 구조를 주의하자. 배열이긴 하지만 내부가 객체다
      // 다음 프론트에서 전달한 이미지 파일 역시 정리해준다. 처음에는 객체로 전달되니 이를 유의
      const filenameArray = req.body.items.image.map((v) => {
        return { src: v.src, visionSearch: v.visionSearch };
      });
      // 이후 이미지파일값만 따로 배열화 시켜준다.
      const filenameArrayKey = filenameArray.map((v) => v.src);

      // 현 테이블 내 이미지 중에서 프론트에서 전달한 이미지에 포함하지 않는 이미지들만 filter 한다.
      const imagesToRemove = existingImages.filter((img) => !filenameArrayKey.includes(img.src));
      // 필터된 이미지의 주소를 통해 Image 테이블에서 해당 이미지를 삭제해준다. 데이터베이스의 처리과정은 모두 비동기다.
      await Promise.all(imagesToRemove.map((imgSrc) => Image.destroy({ where: { src: imgSrc.dataValues.src } })));

      // 이제 이미지를 추가해주자. 프론트에서 가져온 이미지 데이터중에서, 기존 테이블에 없는 데이터를 선별한다.
      const imagesToAdd = filenameArray.filter((img) => !existingImages.some((ei) => ei.dataValues.src === img.src));
      // 마찮가지로 이미지를 create 를 통해서 저장해주자. 같이 딸려온 visionSearch 부분도 역시 같이 저장해주자. 추가로 ClothId 역시 같이 저장해주어야 한다.
      // 왜냐하면 addImages 메서드를 활용할 수 없기 때문이다.
      await Promise.all(imagesToAdd.map((image) => Image.create({ src: image.src, visionSearch: image.visionSearch, ClothId: req.params.clothId })));
    }

    res.status(200).send("데이터를 수정하였습니다");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```

<p>수정하려는 데이터들의 타입들에 따라서 patch api 가 좀 복잡해질 수 있다. 과정 자체가 더 복잡해지는 걸 막기 위해 sequelize 에서 제공하는 내부 메서드 생성을 통해 이를 좀 간소화 해보곤 있다. 유지보수의 편리성도 더해서</p>

```js
const { Muffler, Outer, Pant, Shirt, Shoe, Top } = require("../../back/models");

const getCatagori = {
  Top: {
    post: async function (cloth, req) {
      const top = await Top.postTopbyReq(req);
      await cloth.setTop(top);
    },
    postWithId: async function (req, clothId) {
      await Top.postTopWithClothId(req, clothId);
    },
    update: async function (req, clothId) {
      await Top.updateTopbyReq(req, clothId);
    },
  },
  Outer: {
    post: async function (cloth, req) {
      const outer = await Outer.postOuterbyReq(req);
      await cloth.setOuter(outer);
    },
    postWithId: async function (req, clothId) {
      await Outer.postOuterWithClothId(req, clothId);
    },
    update: async function (req, clothId) {
      await Outer.updateOuterbyReq(req, clothId);
    },
  },

  /**
   * ...
   * 생략
   * 여러 테이블들이 존재한다.
   * ...
   */

  Muffler: {
    post: async function (cloth, req) {
      const muffler = await Muffler.postMufflerbyReq(req);
      await cloth.setMuffler(muffler);
    },
    postWithId: async function (req, clothId) {
      await Muffler.postMufflerWithClothId(req, clothId);
    },
    update: async function (req, clothId) {
      await Muffler.updateMufflerbyReq(req, clothId);
    },
  },
};

module.exports = getCatagori;
```

- 객체 형식으로 key 값으로 메서드를 호출할 수 있도록 설계했다.
- 테이블이 추가된다면, 위 객체에 추가해주면 된다.

## 2023-3-10

### cascade 를 활용하여 연관된 테이블의 데이터 모두 삭제하기

<p>저장한 의류를 삭제한다고 가정하자. 이 의류는 의류, 이미지, 카테고리별 테이블 이렇게 3군데에 서로 연관이 되어있다. 연관된 데이터 모두를 삭제해야 데이터를 삭제했다고 할 수 있겠다. 각 테이블은 foreign key 로 연결되어있다. 이 점을 활용하면 분명 삭제시 모두 삭제가 될 수 있을것이라 판단하여 찾아본 결과 방법이 있었다.</p>

```js
db.Cloth.hasMany(db.Image, {
  onDelete: "cascade",
  hooks: true,
});
```

- foreign key 는 설정하지 않으면 자동적으로 이름이 설정이되고, cloth 에서 시작되니 ClothId 로 자동 설정된다.
- 이 key 를 가진 데이터들을 모두 삭제하고자, `onDelete : 'cascade'` 로 설정해주자.
- 처음했을 때 제대로 적용되지 않아 추가로 `hooks: true` 까지 설정을 해주었다.

<p>보통은 여기까지 하면 잘 작동을 하는데, 이상하게 작동하지 않아 계속 검색한 결과, 일종의 에러라고 한다. (아닐수도 있지만 대부분 사람들이 그렇게 말한다). 신기하게도 api 를 작성할 때 보통 Cloth.destory() 를 통해서 한번에 삭제를 구현하는데, cascade 를 활용하기 위해선 아래 코드처럼 작성해야한다.</p>

```js
router.delete("/clothes/:clothId", isLoggedIn, async (req, res, next) => {
  try {
    const cloth = await Cloth.findOne({
      where: { id: req.params.clothId },
    });
    await cloth.destroy();
    res.status(200).send(`${req.params.clothId}를 삭제했습니다.`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```

- 이유는 알 수 없지만 먼저 데이터를 찾고 난 뒤, destroy 를 적용시킨다.
- 이렇게 하면 연관된 모든 데이터가 삭제됨을 확인할 수 있다.
