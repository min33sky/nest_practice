# Nest Practice

> Nest 연습용입니다

## Coding Note

### `Typeorm`은 root에 위치한 **ormconfig.json**을 알아서 로드하므로 `TypeOrmModule.forRoot()`의 인자로 넣어주지 않아도 된다.

### `EntityMetadataNotFoundError`: No metadata for "User" was found.

- Entity 클래스에 `@Entity()` 데코레이터를 빼먹었다.
