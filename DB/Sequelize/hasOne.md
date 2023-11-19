## 데이터베이스 hasOne 의 고찰

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
    const images = await Promise.all(
      req.body.image.map((image) => Image.create({ src: image.filename }))
    );
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
