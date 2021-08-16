# NeeeeeeeeeeeeeeeeeeeeeeesT

> 나의 Nest 연구소 😫

## Description

### Projects

- `frontend`: nest-start에서 사용하는 클라이언트
- `letsStart`: express code
- `nest-start`: mongodb를 사용한 서버
- `postgre-sql-practice`: postgreSQL을 사용한 서버

## Coding NOTE

### `Typeorm`은 root에 위치한 **ormconfig.json**을 알아서 로드하므로 `TypeOrmModule.forRoot()`의 인자로 넣어주지 않아도 된다.

### `EntityMetadataNotFoundError`: No metadata for "User" was found.

- Entity 클래스에 `@Entity()` 데코레이터를 빼먹었다.

### AppModule의 임포트한 `ConfigModule`의 **forRoot({isGlobal: true})** 옵션을 줘도 각 모듈에 ConfigModule를 추가해줘야한다. (`whY?`)

### Error: Unknown authentication strategy "jwt"

> `JwtStrategy`를 module의 `provider`에 넣는 것을 잊지말자

### TypeOrm에서 응답 시 password를 포함하지 않기

> Entity의 column 설정을 아래와 같이 하면 알아서 password는 제외하고 응답한다.

```ts
@Column({ select: false })
  password: string;
```

### AppModule의 타입 설정

- `정적 파일 제공 미들웨어`의 경우에는 AppModule의 타입을 설정해야 사용할 수 있다. express를 사용한다면 **NestExpressApplication** 타입 지정을 해주고 fastify를 사용한다면 **NestFastifyApplication** 타입 지정을 해주면 된다.

```ts
// main.ts
const app = await NestFactory.create<NestExpressApplication>(AppModule);

//? 정적 파일 제공 미들웨어 (NestExpressApplication 타입 설정)
app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
  prefix: '/media', // http://localhost:8000/media/cats/abcdefg.png
});
```
