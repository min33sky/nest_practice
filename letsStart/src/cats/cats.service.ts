import { Request, Response } from 'express';
import { Cat } from './cats.model';

//* 전체 고양이 검색
export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    if (!cats) throw new Error('고양이가 없어요.');
    res.send({ cats });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* 특정 고양이 검색
export const readCat = (req: Request, res: Response) => {
  try {
    const cat = Cat.find((c) => c.id === req.params.id);
    if (!cat) throw new Error('해당 고양이가 없습니다.');
    res.send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* 고양이 등록
export const createCat = (req: Request, res: Response) => {
  console.log(req.body);
  try {
    Cat.push(req.body);
    res.send({
      success: true,
      data: {
        cats: Cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* 고양이 전체 수정
export const updateCat = (req: Request, res: Response) => {
  try {
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === req.params.id) {
        cat = body;
        result = cat;
      }
    });

    res.send({
      success: true,
      data: {
        result,
        cats: Cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* 고양이 일부 수정
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const body = req.body;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === req.params.id) {
        cat = {
          ...cat,
          ...body,
        };
        result = cat;
      }
    });

    res.send({
      success: true,
      data: {
        result,
        cats: Cat,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* 고양이 삭제
export const deleteCat = (req: Request, res: Response) => {
  try {
    const updated = Cat.filter((cat) => cat.id !== req.params.id);
    res.send({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
