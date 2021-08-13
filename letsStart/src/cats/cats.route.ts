import { Router } from 'express';
import {
  createCat,
  deleteCat,
  readAllCat,
  readCat,
  updateCat,
  updatePartialCat,
} from './cats.service';

const router = Router();

//* 전체 고양이 검색
router.get('/cats', readAllCat);

//* 특정 고양이 검색
router.get('/cats/:id', readCat);

//* 고양이 등록
router.post('/cats', createCat);

//* 고양이 전체 수정
router.put('/cats/:id', updateCat);

//* 고양이 일부 수정
router.patch('/cats/:id', updatePartialCat);

//* 고양이 삭제
router.delete('/cats/:id', deleteCat);

export default router;
