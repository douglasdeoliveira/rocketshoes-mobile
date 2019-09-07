import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { BasketContainer, Container, ItemCount, Logo, Wrapper } from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

export default connect(
  state => ({
    cartSize: state.cart.length,
  }),
  null,
)(Header);
