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
      await db[cloth.categori].destroy({
        where: { ClothId: req.params.clothId },
      });
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
      const existingImages = await Image.findAll({
        where: { ClothId: req.params.clothId },
      });
      // 이때의 existingImages 데이터 구조를 주의하자. 배열이긴 하지만 내부가 객체다
      // 다음 프론트에서 전달한 이미지 파일 역시 정리해준다. 처음에는 객체로 전달되니 이를 유의
      const filenameArray = req.body.items.image.map((v) => {
        return { src: v.src, visionSearch: v.visionSearch };
      });
      // 이후 이미지파일값만 따로 배열화 시켜준다.
      const filenameArrayKey = filenameArray.map((v) => v.src);

      // 현 테이블 내 이미지 중에서 프론트에서 전달한 이미지에 포함하지 않는 이미지들만 filter 한다.
      const imagesToRemove = existingImages.filter(
        (img) => !filenameArrayKey.includes(img.src)
      );
      // 필터된 이미지의 주소를 통해 Image 테이블에서 해당 이미지를 삭제해준다. 데이터베이스의 처리과정은 모두 비동기다.
      await Promise.all(
        imagesToRemove.map((imgSrc) =>
          Image.destroy({ where: { src: imgSrc.dataValues.src } })
        )
      );

      // 이제 이미지를 추가해주자. 프론트에서 가져온 이미지 데이터중에서, 기존 테이블에 없는 데이터를 선별한다.
      const imagesToAdd = filenameArray.filter(
        (img) => !existingImages.some((ei) => ei.dataValues.src === img.src)
      );
      // 마찮가지로 이미지를 create 를 통해서 저장해주자. 같이 딸려온 visionSearch 부분도 역시 같이 저장해주자. 추가로 ClothId 역시 같이 저장해주어야 한다.
      // 왜냐하면 addImages 메서드를 활용할 수 없기 때문이다.
      await Promise.all(
        imagesToAdd.map((image) =>
          Image.create({
            src: image.src,
            visionSearch: image.visionSearch,
            ClothId: req.params.clothId,
          })
        )
      );
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
