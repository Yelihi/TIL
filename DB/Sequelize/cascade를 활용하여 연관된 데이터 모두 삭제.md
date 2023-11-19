## cascade 를 활용하여 연관된 테이블의 데이터 모두 삭제하기

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
