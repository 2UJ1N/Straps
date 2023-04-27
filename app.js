import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  productRouter,
  orderRouter,
  shippingRouter,
  categoryRouter,
} from './routers';
import { errorHandler } from './middlewares';

const app = express();

// CORS ���� ����
app.use(cors());

// Content-Type: application/json ������ �����͸� �ν��ϰ� �ڵ鸵�� �� �ְ� ��.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded ������ �����͸� �ν��ϰ� �ڵ鸵�� �� �ְ� ��.
app.use(express.urlencoded({ extended: false }));

// html, css, js �����
app.use(viewsRouter);

// api �����
// �Ʒ�ó�� �ϸ�, userRouter ���� '/login' ���� ���� ���� �����δ� �տ� /api�� �پ
// /api/login ���� ��û�� �ؾ� �ϰ� ��. �鿣��� ������� �����ϱ� ������.
app.use('/api', userRouter);
app.use('/api/product', productRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);

app.use(errorHandler);

export { app };
