# Typeorm-mysql

## 먼저 스키마부터 생성하자

```
CREATE SCHEMA test DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

### 권한 주기

```
CREATE TABLE IF NOT EXISTS `test`.`user_authority` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `authority_name` ENUM('ROLE_USER', 'ROLE_ADMIN') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

insert into `test`.`user_authority` (user_id, authority_name) values (4,'ROLE_USER');
insert into `test`.`user_authority` (user_id, authority_name) values (4,'ROLE_ADMIN');
insert into `test`.`user_authority` (user_id, authority_name) values (5,'ROLE_USER');
```
