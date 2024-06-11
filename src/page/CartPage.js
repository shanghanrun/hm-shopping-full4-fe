import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import cartStore from '../store/cartStore'
import userStore from '../store/userStore'
import CartProductCard from "../components/CartProductCard";
import OrderReceipt from "../components/OrderReceipt";
import "../style/cart.style.css";
import { ColorRing } from "react-loader-spinner";

const CartPage = () => {
  const {cart, getCart, cartCount, zeroCart} = cartStore()
  const {user} = userStore()
  const navigate = useNavigate()
  console.log('CartPage의 cart :', cart)

  useEffect(() => {
    zeroCart()
    //카트불러오기
    getCart()
  }, [cartCount]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          <div>
            {cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item)=>(
                <CartProductCard key={item._id} item={item}/>
              ))
            ) : (
              (cartCount === 0) ? (
                <div className="text-align-center empty-bag">
                  <h2>카트가 비어있습니다.</h2>
                  <div>상품을 담아주세요!</div>
                </div>
              ) : (
                <ColorRing />
              )
            )}
          </div>
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt items={cart?.items || []}
            user={user}
          />
        </Col>
      </Row>
    </Container>
  );
  }
export default CartPage;
