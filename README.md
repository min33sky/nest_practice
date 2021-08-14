# NeeeeeeeeeeeeeeeeeeeeeeesT

> 나의 Nest 연구소 😫

## Coding NOTE

### `Typeorm`은 root에 위치한 **ormconfig.json**을 알아서 로드하므로 `TypeOrmModule.forRoot()`의 인자로 넣어주지 않아도 된다.

### `EntityMetadataNotFoundError`: No metadata for "User" was found.

- Entity 클래스에 `@Entity()` 데코레이터를 빼먹었다.

### AppModule의 임포트한 `ConfigModule`의 **forRoot({isGlobal: true})** 옵션을 줘도 각 모듈에 ConfigModule를 추가해줘야한다. (`whY?`)

### Error: Unknown authentication strategy "jwt"

> `JwtStrategy`를 module의 `provider`에 넣는 것을 잊지말자
