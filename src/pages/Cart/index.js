import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';
import colors from '../../styles/colors';
import { formatPrice } from '../../util/format';

import {
  Container,
  EmptyContainer,
  EmptyText,
  GoShopButton,
  GoShopButtonText,
  Order,
  OrderText,
  Product,
  ProductAmount,
  ProductControlButton,
  ProductControls,
  ProductDelete,
  ProductDetails,
  ProductImage,
  ProductInfo,
  ProductPrice,
  Products,
  ProductSubtotal,
  ProductTitle,
  TotalAmount,
  TotalContainer,
  TotalText,
} from './styles';

export default function Cart({ navigation }) {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0,
      ),
    ),
  );

  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    })),
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {products.length ? (
        <>
          <Products
            data={products}
            extraData={products}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <Product>
                <ProductInfo>
                  <ProductImage source={{ uri: item.image }} />
                  <ProductDetails>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>{item.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(item.id))
                    }>
                    <Icon
                      name="delete-forever"
                      size={30}
                      color={colors.primary}
                    />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(item)}>
                    <Icon
                      name="remove-circle-outline"
                      size={26}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(item.amount)} />
                  <ProductControlButton onPress={() => increment(item)}>
                    <Icon
                      name="add-circle-outline"
                      size={26}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductSubtotal>{item.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            )}
          />
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
          <GoShopButton onPress={() => navigation.navigate('Main')}>
            <GoShopButtonText>Ir as compras!</GoShopButtonText>
          </GoShopButton>
        </EmptyContainer>
      )}
    </Container>
  );
}
