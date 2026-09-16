import { Button, Divider, Empty, Flex, FloatButton, Modal, Typography } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { clearCart, getCart, getCartLoading, loadCart, removeFromCart } from '../store/cart';
import { useAppDispatch, useAppSelector } from '../hooks';

const Cart = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useAppDispatch();
   const cart = useAppSelector(getCart);
   const isLoading = useAppSelector(getCartLoading);

   const totalAmount = cart?.products.reduce((sum, product) => sum + product.total, 0) || 0;

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   useEffect(() => {
      dispatch(loadCart());
   }, [dispatch]);

   return (
      <>
         <FloatButton
            onClick={showModal}
            tooltip="Корзина"
            badge={{ count: cart?.products.length }}
            icon={<ShoppingCartOutlined />}
            style={{ width: '50px', height: '50px' }}
         />

         <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            loading={isLoading}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
               <Button key="cancel" onClick={handleCancel}>
                  Закрыть
               </Button>,
               <Button key="submit" type="primary" onClick={handleOk} disabled={!cart?.products.length}>
                  Оформить заказ
               </Button>,
            ]}
            width={600}>
            {!!cart?.products.length ? (
               <Flex vertical gap={16}>
                  <Flex vertical gap={8}>
                     {cart.products.map(item => (
                        <Flex
                           key={item.id}
                           gap={16}
                           justify="space-between"
                           align="center"
                           style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '8px', background: '#fafafa' }}>
                           <Flex vertical style={{ flex: 1 }}>
                              <Typography.Text strong>{item.title}</Typography.Text>
                              <Typography.Text type="secondary">
                                 Цена: ${item.price} x {item.quantity} = ${item.total}
                              </Typography.Text>
                           </Flex>
                           <Button danger icon={<DeleteOutlined />} onClick={() => dispatch(removeFromCart(item.id))} />
                        </Flex>
                     ))}
                  </Flex>

                  <Divider />
                  <Flex justify="space-between" align="center">
                     <Typography.Text strong>Итого:</Typography.Text>
                     <Typography.Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                        ${totalAmount.toFixed(2)}
                     </Typography.Text>
                  </Flex>
                  <Button type="link" danger onClick={() => dispatch(clearCart())} style={{ padding: 0, marginTop: '8px' }}>
                     Очистить корзину
                  </Button>
               </Flex>
            ) : (
               <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ваша корзина пуста" style={{ margin: '24px 0' }} />
            )}
         </Modal>
      </>
   );
};

export default Cart;
